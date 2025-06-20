import { useParams } from "react-router-dom";
import { Container, Input } from "../components";
import { assets, roomsDummyData, facilityIcons } from "../assets/assets";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUser, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

function Room(){
    const {id} = useParams();
    const [mainImg, setMainImg] = useState(null);

    const [room, setRoom] = useState(null);

    useEffect(() => {
        setRoom(roomsDummyData.find(roomData => roomData._id === id));
        room && setMainImg(room.images[0]);
    }, [id, room])

    const {register, handleSubmit, formState: {errors}, getValues, setValue} = useForm({
        defaultValues: {
            checkIn:"",
            checkOut:"",
            guests:""
        }
    });

    const handleSearchForm = (data) => {
        console.log(data);
    }

    return (
        <>
            {
                room && (
                    <Container className="mt-24 lg:my-32">
                        <section>
                            <div className="flex gap-3 items-center">
                                <h5 className="text-xl md:text-2xl">{room.hotel.name}</h5>
                                <p className="text-sm">[{room.roomType}]</p>
                                <span className="text-sm bg-blue-500 py-1 px-3 rounded-full text-white">20% off</span>
                            </div>
                            <p className="flex my-2">
                                {
                                    Array(5).fill('').map((_, i) => (
                                        room.hotel.rating > i ? <img key={i} src={assets.starIconFilled} alt="star" /> : <img key={i} src={assets.starIconOutlined} alt="nostar" />
                                    ))
                                }
                                <span className="mx-3">{room.hotel.reviews}+ reviews</span>
                            </p>
                            <p className="text-gray-600 text-sm"><FontAwesomeIcon icon={faLocationDot} /><span className="mx-2">{room.hotel.address}, {room.hotel.city}</span></p>
                        </section>

                        <section className="my-5 w-full flex flex-col md:flex-row gap-8">
                            <div className="w-full md:max-w-1/2">
                                {mainImg && <img src={mainImg} alt="roomImg" className="rounded-xl cursor-grab hover:scale-[101%] transition duration-200" />}
                            </div>

                            <div className="w-full md:max-w-1/2 flex flex-row justify-center flex-wrap gap-3">
                                {
                                    room.images.map((img, i) => (
                                        <img onClick={() => setMainImg(img)} key={i} src={img} alt="roomImg" className={`w-[48%] rounded-lg cursor-pointer ${mainImg === img && 'outline-2 outline-blue-500'}`} />
                                    ))
                                }
                            </div>
                        </section>

                        <div className="flex justify-between items-center py-3 border-b-2 border-b-gray-300">
                            <div>
                                <h3 className="text-xl">Experience Luxury Like Never Before</h3>
                                <div className="flex text-sm gap-2 flex-wrap my-3">
                                    {
                                        room.amenities.map((amenity, i) => (
                                            <span key={amenity} className="flex gap-2 rounded-md bg-blue-100 p-2">
                                                <img className="h-4" src={facilityIcons[amenity]} alt={amenity} />
                                                <p>{amenity}</p>
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>
                            <p className="text-2xl">${room.pricePerNight}/day</p>
                        </div>

                        <form onSubmit={handleSubmit(handleSearchForm)} className="my-5 bg-white px-5 py-3 rounded-lg shadow-[5px_5px_20px_rgba(0,0,0,0.1)] w-auto">
                            <div className="bg-white p-6 rounded-md flex sm:flex-row items-end w-auto flex-wrap">

                                <Input type="number" label="No. of Guests" labelIcon={faUser} placeholder="0" {...register('guests', {required:true})} />

                                <Input type="date" label="Check-In" labelIcon={faCalendar} {...register('checkIn', {required:true})} />

                                <Input type="date" label="Check-Out" labelIcon={faCalendar} {...register('checkOut', {required:true})} />

                                <Input type="submit" value="Search" className="bg-black text-white rounded-md px-4 py-2 cursor-pointer " />

                                {(errors.destination || errors.checkIn || errors.checkOut || errors.guests) && <p className="text-sm text-red-500 mx-2">All fields are required.</p>}
                            </div>
                        </form>
                    </Container>
                )
            }
        </>
    );
}

export default Room;