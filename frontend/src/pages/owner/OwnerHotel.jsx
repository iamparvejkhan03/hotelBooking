import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heading, Input, DeleteModalDialogue, OwnerSidebar, OwnerContainer } from "../../components";
import { faHotel, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleIsHotelOwner, toggleIsUserLoggedIn, updateUser } from "../../features/forms/UserAuthSlice.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateHotel } from "../../features/forms/HotelRegSlice.js";

function OwnerHotel(){
    const hotel = useSelector(state => state.hotel.hotel);
    const accessToken = useSelector(state => state.user.user.accessToken);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: hotel.name || '',
            phone: hotel.phone || '',
            address: hotel.address || '',
            city: hotel.city || ''
        }
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdateHotel = async (hotelData) => {
        try {
            const formData = {
                name:hotelData.name,
                phone:hotelData.phone,
                address:hotelData.address,
                city:hotelData.city,
            }

            const { data } = await axios.put('/api/v1/hotels/update', formData, {headers:{Authorization: `Bearer ${accessToken}`}});

            if(data){
                console.log(data);
                dispatch(updateHotel(data.hotel));
                toast.success(data.message);
            }
        } catch (error) {
            console.error(error.message);
            toast.error(error.response.data.message);
        }
    }

    const handleDeleteHotel = async () => {
        try {
            const { data } = await axios.delete('/api/v1/hotels/delete', {headers: {Authorization: `Bearer ${accessToken}`}});

            if(data.success){
                dispatch(updateHotel({}));
                dispatch(updateUser({...data.owner, accessToken}));
                dispatch(toggleIsHotelOwner(false));
                toast.success(data.message);
                navigate('/user/dashboard');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }

    const [showDeleteModal, setShowDeleteModel] = useState(false);

    return (
        <section className="flex min-h-[70vh]">
            {
                showDeleteModal && (
                <div className="top-0 left-0 right-0 bottom-0 bg-black/70 z-50 flex items-center justify-center fixed">
                    <DeleteModalDialogue popToHide={setShowDeleteModel} funcToRun={handleDeleteHotel} />
                </div>)
            }

            <OwnerSidebar />

            <OwnerContainer>
                <div className="max-w-full">
                    <Heading heading="Hotel" subHeading="View, edit, or manage your listed hotel. Keep the information up-to-date to provide the best experience for users." />
                </div>

                <div className="flex gap-4 mt-16">
                    <div
                        className="w-full lg:w-4/5 xl:w-3/5 shadow-[-5px_-5px_20px_rgba(0,0,0,0.1),5px_5px_20px_rgba(0,0,0,0.1)] p-4 rounded-xl h-fit relative">
                        <div>
                            <form onSubmit={handleSubmit(handleUpdateHotel)}>
                                <h3 className="my-3 text-lg text-center">Update Hotel</h3>
                                <div className="grid sm:grid-cols-2 gap-2">
                                    <div className="w-full">
                                        <Input type="text" placeholder="Hotel name" label="Hotel Name" {...register('name', {required:true})} />
                                    </div>
                                    <div className="w-full">
                                        <Input type="tel" placeholder="Hotel contact no." label="Phone" {...register('phone', {required:true})} />
                                    </div>
                                    <div className="w-full">
                                        <Input type="text" placeholder="Hotel address" label="Address" {...register('address', {required:true})} />
                                    </div>
                                    <div className="w-full my-1">
                                        <label className="text-gray-600">City</label>
                                        <select className="text-black border-2 border-blue-100 py-1.5 px-2 rounded my-1 w-full focus:outline-2 focus:outline-blue-300" {...register('city', {required:true})}>
                                            <option value="select">Select City</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="Chennai">Chennai</option>
                                            <option value="Banglore">Banglore</option>
                                            <option value="Kolkata">Kolkata</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full rounded bg-blue-500 mt-4 text-white text">
                                    <button type="submit" className="w-full p-2 cursor-pointer">
                                        <FontAwesomeIcon icon={faHotel} />
                                        <span className="mx-2">Update Hotel</span>
                                    </button>
                                </div>
                            </form>

                            <div className="w-full rounded bg-red-500 mt-4 text-white text">
                                <button onClick={() => { setShowDeleteModel(true) }} className="w-full p-2 cursor-pointer">
                                    <FontAwesomeIcon icon={faTrashCan} />
                                    <span className="mx-2">Delete Hotel</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </OwnerContainer>
        </section>
    );
}

export default OwnerHotel;