import { useForm } from "react-hook-form";
import { assets } from "../../assets/assets";
import { OwnerContainer, OwnerSidebar, Heading } from "../../components";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateRoom } from "../../features/RoomSlice";
import { useEffect } from "react";

const amenities = ['Free WiFi', 'Free Breakfast', 'Room Service', 'Mountain View', 'Pool Access'];

function OwnerEditRoom() {
    const accessToken = useSelector(state => state.user.user.accessToken);

    const [editing, setEditing] = useState(false);
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [isLoading, SetIsLoading] = useState(true);

    useEffect(() => {
        const getRoomData = async () => {
            try {
                const { data } = await axios.get(`/api/v1/rooms/${roomId}`);

                if (data.success) {
                    setRoom(data.room);
                    SetIsLoading(false);
                }
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message);
            }
        }
        getRoomData();
    }, [])

    const { register, handleSubmit, watch, setValue, getValues, reset, formState:{errors} } = useForm({
        defaultValues: {
            images: {
                img1: room?.images[0] || null,
                img2: room?.images[1] || null,
                img3: room?.images[2] || null,
                img4: room?.images[3] || null,
            },
            type: room?.type || 'select',
            price: room?.price || '',
            amenities: room?.amenities || []
        }
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEditRoom = async (roomData) => {
        try {
            setEditing(true);
            const formData = new FormData();

            Object.values(roomData.images).forEach(img => {
                if(img instanceof FileList){
                    formData.append('images', img[0]);
                }
            })

            formData.append('type', roomData.type);

            formData.append('price', roomData.price);

            roomData.amenities.map(amenity => {
                formData.append('amenities', amenity);
            })

            const { data } = await axios.put(`/api/v1/rooms/edit/${roomId}`, formData, { headers: { Authorization: `Bearer ${accessToken}` } });

            if (data.success) {
                setEditing(false);
                toast.success(data.message);
                dispatch(updateRoom(data.room));
                setRoom(data.room);
                navigate('/owner/all-rooms');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }

    const images = watch('images');

    useEffect(() => {
        if(room){
            reset({
            images: {
                img1: room?.images[0],
                img2: room?.images[1],
                img3: room?.images[2],
                img4: room?.images[3],
            },
            type: room?.type || 'select',
            price: room?.price || '',
            amenities: room?.amenities || []
        })
        }
    }, [room])

    return (
        room
            ?
            (
                <section className="flex min-h-[70vh]">
                    <OwnerSidebar />

                    <OwnerContainer>
                        <div className="max-w-full">
                            <Heading heading="Edit Room" subHeading="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience." />
                        </div>

                        <div className="my-10">
                            <h3 className="text-lg my-2">Images</h3>
                            <form onSubmit={handleSubmit(handleEditRoom)} encType="multipart/form-data">
                                <div className="flex gap-3 flex-wrap">
                                    {
                                        Object.keys(images).map((img, i) => (
                                            <label key={i}>
                                                <input type="file" className="sr-only" {...register(`images.${img}`, { required:false})} />

                                                <img src={images[img] instanceof FileList ? URL.createObjectURL(images[img][0]) : images[img]} alt="Upload Area" className="max-w-40 object-cover cursor-pointer rounded-md" />
                                            </label>
                                        ))
                                    }
                                </div>
                                {errors.images && <p className="text-red-500">Error: Upload all images.</p>}

                                <div className="flex flex-wrap gap-5 my-5">
                                    <div className="flex flex-col w-full sm:w-56">
                                        <label htmlFor="roomType">Room Type</label>
                                        <select id="roomType" className="text-black border-2 border-gray-200 p-2 rounded my-1" {...register('type', { required: true })}>
                                            <option value="select" >Select Room Type</option>
                                            <option value="double bed">Double Bed</option>
                                            <option value="single bed">Single Bed</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col w-full sm:w-24">
                                        <label htmlFor="price">Price/night</label>
                                        <input type="number" placeholder="0" className="text-black border-2 border-gray-200 p-2 rounded my-1" {...register('price', { required: true })} />
                                    </div>
                                </div>

                                <div className="my-5">
                                    <h3 className="text-lg my-2">Amenities</h3>
                                    <div className="flex flex-col w-full ">
                                        {
                                            amenities.map((amenity, i) => (
                                                <label key={i} className="flex gap-1">
                                                    <input type="checkbox" value={amenity} {...register('amenities', { required: true })} />
                                                    <span>{amenity}</span>
                                                </label>
                                            ))
                                        }
                                    </div>
                                </div>

                                <button type="submit" className="py-2 px-6 rounded bg-blue-500 text-white cursor-pointer active:bg-blue-600/90">{editing ? 'Editing...' : 'Edit Room'}</button>
                            </form>
                        </div>
                    </OwnerContainer>
                </section>
            )
            :
            isLoading
                ?
                (
                    <div className="min-h-screen w-full flex justify-center items-center mt-24 lg:mt-32">
                        <span className="h-12 w-12 border-4 border-blue-300 rounded-full border-b-blue-600 animate-spin"></span>
                    </div>
                )
                :
                (
                    <div className="min-h-screen w-full flex justify-center items-center mt-24 lg:mt-32 -translate-y-16">
                        <h2 className="text-2xl font-semibold">No Room Found</h2>
                    </div>
                )
    );
}

export default OwnerEditRoom;