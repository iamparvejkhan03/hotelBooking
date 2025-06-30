import { useParams } from "react-router-dom";
import { Container, Heading, Input } from "../components";
import { assets, roomsDummyData, facilityIcons, roomCommonData, userDummyData, testimonials, hotelDummyData } from "../assets/assets";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUser, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Room(){
    const {id} = useParams();
    const [mainImg, setMainImg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [room, setRoom] = useState(null);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`/api/v1/rooms/${id}`);

                if(data){
                    setIsLoading(false);
                    setRoom(data?.room);
                    setMainImg(data?.room?.images[0]);
                }
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message);
            }
        }

        fetchRoom();
    }, [id])

    const { register, handleSubmit, formState: {errors} } = useForm({
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
                room 
                ?
                (
                    <Container className="mt-24 lg:mt-32">
                        <section>
                            <div className="flex gap-3 items-center">
                                <h5 className="text-xl md:text-2xl">{room.hotel.name}</h5>
                                <p className="text-sm">[{room.type}]</p>
                                <span className="text-sm bg-blue-500 py-1 px-3 rounded-full text-white">20% off</span>
                            </div>
                            <p className="flex my-2">
                                {
                                    Array(5).fill('').map((_, i) => (
                                        5 > i ? <img key={i} src={assets.starIconFilled} alt="star" /> : <img key={i} src={assets.starIconOutlined} alt="nostar" />
                                    ))
                                }
                                <span className="mx-3">185+ reviews</span>
                            </p>
                            <p className="text-gray-600 text-sm"><FontAwesomeIcon icon={faLocationDot} /><span className="mx-2">{room.hotel.address}, {room.hotel.city}</span></p>
                        </section>

                        <section className="my-5 w-full flex flex-col md:flex-row gap-8">
                            <div className="w-full min-h-96 md:w-1/2">
                                {mainImg && <img src={mainImg} alt="roomImg" className="rounded-xl cursor-grab hover:scale-[101%] transition duration-200 shadow-lg h-full w-full object-cover" />}
                            </div>

                            <div className="w-full md:max-w-1/2 grid grid-cols-2 gap-3">
                                {
                                    room.images.map((img, i) => (
                                        <img onClick={() => setMainImg(img)} key={i} src={img} alt="roomImg" className={` rounded-lg cursor-pointer w-full h-full object-cover ${mainImg === img && 'outline-2 outline-blue-500'}`} />
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
                            <p className="text-2xl">${room.price}/day</p>
                        </div>

                        <form onSubmit={handleSubmit(handleSearchForm)} className="my-10 bg-white px-5 py-3 rounded-lg shadow-[-5px_-5px_20px_rgba(0,0,0,0.1),5px_5px_20px_rgba(0,0,0,0.1)]">
                            <div className="bg-white p-6 rounded-md grid lg:grid-cols-4 md:grid-cols-2 md:gap-3 lg:gap-5 lg:items-end">

                                <Input type="number" label="No. of Guests" labelIcon={faUser} placeholder="0" {...register('guests', {required:true})} />

                                <Input type="date" label="Check-In" labelIcon={faCalendar} {...register('checkIn', {required:true})} />

                                <Input type="date" label="Check-Out" labelIcon={faCalendar} {...register('checkOut', {required:true})} />

                                <Input type="submit" value="Search" className="bg-black text-white rounded-md px-4 py-2 cursor-pointer " />

                                {(errors.destination || errors.checkIn || errors.checkOut || errors.guests) && <p className="text-sm text-red-500 mx-2">All fields are required.</p>}
                            </div>
                        </form>

                        <section>
                            <div className="w-full sm:w-3/5 lg:w-2/5 border-b-2 border-b-blue-100 py-6">
                                {
                                    roomCommonData.map(data => (
                                        <div key={data.title} className="grid grid-cols-[25px_1fr] gap-2">
                                            <img src={data.icon} alt={data.title} />
                                            <div>
                                                <h6 className="text-lg">{data.title}</h6>
                                                <p className="text-gray-600">{data.description}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <p className="border-b-2 border-b-blue-100 py-6 text-gray-600">Guests will be allocated on the ground floor based on availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guests, at guests slot please mark the number of guests to get the exact price for groups. The guests will be allocated for ground floor based on the availability.</p>
                        </section>

                        <section className="py-8 border-b-2 border-b-blue-100">
                            <Heading heading="Location on Map" />

                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.0618532189!2d-74.30983837594135!3d40.69719141526012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1750477593219!5m2!1sen!2sin" className="w-full h-[300px] md:h-[450px] lg:h-[600px] rounded my-5" style={{border:0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

                            <h5 className="text-lg my-5">{room.hotel.name}</h5>
                            <p className="text-gray-600">It's like a home away from home.</p>
                        </section>

                        <section className="my-10">
                            <div className="grid grid-cols-[50px_1fr] gap-5 lg:w-4/5">
                                <img src={room.hotel.owner.image} alt="owner image" className="rounded-full border-2 border-blue-200" />
                                <div className="flex flex-col gap-2 items-start">
                                    <h5 className="font-semibold">Hosted By {room.hotel.owner.fullName}</h5>
                                    <div className="grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 md:gap-4 lg:gap-8">
                                        <span className="flex gap-0.5 items-center">
                                            {
                                                Array(5).fill('').map((_, i) => (
                                                    hotelDummyData.rating > i ? <img src={assets.starIconFilled} alt="stars" key={i} className="h-5" /> : <img src={assets.starIconOutlined} alt="nostar" key={i} className="h-5" />
                                                ))    
                                            }
                                            <p className="mx-2">{hotelDummyData.reviews}+ reviews</p>
                                        </span>
                                        <p>Response rate: 100%</p>
                                        <p>Response time: 30 min</p>
                                    </div>
                                    <button className="bg-blue-500 text-white rounded py-2 px-5 cursor-pointer">Contact Now</button>
                                </div>
                            </div>
                        </section>
                    </Container>
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
            }
        </>
    );
}

export default Room;