import { useForm } from "react-hook-form";
import { assets } from "../../assets/assets";
import { OwnerContainer, OwnerSidebar, Heading } from "../../components";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateRoom } from "../../features/RoomSlice";

const amenities = ['Free WiFi', 'Free Breakfast', 'Room Service', 'Mountain View', 'Pool Access'];

function OwnerAddRoom(){
    const accessToken = useSelector(state => state.user.user.accessToken);

    const [creating, setCreating] = useState(false);

    const room = useSelector(state => state.room.room);
    console.log(room);

    const {register, handleSubmit, watch} = useForm({
        defaultValues:{
            images:{
                img1:null,
                img2:null,
                img3:null,
                img4:null,
            },
            type:'select',
            price:'',
            amenities:[]
        }
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddRoom = async (roomData) => {
        try {
            setCreating(true);
            const formData = new FormData();
            Object.values(roomData.images).forEach(img => {
                formData.append('images', img[0]);
            })
            formData.append('type', roomData.type);
            formData.append('price', roomData.price);
            roomData.amenities.map(amenity => {
                formData.append('amenities', amenity);
            })

            const { data } = await axios.post('/api/v1/rooms/register', formData, {headers: {Authorization: `Bearer ${accessToken}`}});

            if(data.success){
                setCreating(false);
                console.log(data);
                toast.success(data.message);
                dispatch(updateRoom(data.room));
                navigate('/owner/all-rooms');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }

    const images = watch('images');

    return (
        <section className="flex min-h-[70vh]">
            <OwnerSidebar />

            <OwnerContainer>
                <div className="max-w-full">
                    <Heading heading="Add Room" subHeading="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience." />
                </div>

                <div className="my-10">
                    <h3 className="text-lg my-2">Images</h3>
                    <form onSubmit={handleSubmit(handleAddRoom)} encType="multipart/form-data">
                        <div className="flex gap-3 flex-wrap">
                            {
                                Object.keys(images).map((img, i) => (
                                    <label key={i}>
                                        <input type="file" className="sr-only" {...register(`images.${img}`, {required:true})} />

                                        <img src={(images[img] instanceof FileList) ? URL.createObjectURL(images[img][0]) : assets.uploadArea} alt="Upload Area" className="max-w-40 object-cover cursor-pointer rounded-md" />
                                    </label>
                                ))
                            }
                        </div>

                        <div className="flex flex-wrap gap-5 my-5">
                            <div className="flex flex-col w-full sm:w-56">
                                <label htmlFor="roomType">Room Type</label>
                                <select id="roomType" className="text-black border-2 border-gray-200 p-2 rounded my-1" {...register('type', {required:true})}>
                                    <option value="select" >Select Room Type</option>
                                    <option value="double bed">Double Bed</option>
                                    <option value="single bed">Single Bed</option>
                                </select>
                            </div>

                            <div className="flex flex-col w-full sm:w-24">
                                <label htmlFor="price">Price/night</label>
                                <input type="number" placeholder="0" className="text-black border-2 border-gray-200 p-2 rounded my-1" {...register('price', {required:true})} />
                            </div>
                        </div>

                        <div className="my-5">
                            <h3 className="text-lg my-2">Amenities</h3>
                            <div className="flex flex-col w-full ">
                                {
                                    amenities.map((amenity, i) => (
                                        <label key={i} className="flex gap-1">
                                            <input type="checkbox" value={amenity} {...register('amenities', {required:true})} />
                                            <span>{amenity}</span>
                                        </label>
                                    ))
                                }
                            </div>
                        </div>

                        <button type="submit" className="py-2 px-6 rounded bg-blue-500 text-white cursor-pointer active:bg-blue-600/90">{creating ? 'Creating...' : 'Add Room'}</button>
                    </form>
                </div>
            </OwnerContainer>
        </section>
    );
}

export default OwnerAddRoom;