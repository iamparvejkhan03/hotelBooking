import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets, dashboardDummyData, userBookingsDummyData } from "../../assets/assets";
import { Heading, UserContainer, UserSidebar } from "../../components";
import { faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

function UserBookings() {
    const accessToken = useSelector(state => state.user.user.accessToken);
    const [userBookings, setUserBookings] = useState(null);

    useEffect(() => {
        const getUserBookings = async () => {
            try {
                const { data } = await axios.get('/api/v1/bookings/user', { headers: { Authorization: `Bearer ${accessToken}` } });

                if (data.success) {
                    setUserBookings(data.userBookings);
                }
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
        getUserBookings();
    }, [])

    return (
        <section className="flex min-h-[70vh]">
            <UserSidebar />

            <UserContainer>
                <div>
                    <Heading heading="My Bookings" subHeading="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks." />

                    <div className="my-5">
                        <div className="hidden sm:grid sm:grid-cols-[1fr_1fr_100px] sm:gap-5 md:grid-cols-[1fr_150px_100px] lg:grid-cols-[1fr_250px_100px] items-center py-3 border-b-2 border-b-blue-200">
                            <h5 className="text-lg">Hotels</h5>
                            <h5 className="text-lg">Date & Timings</h5>
                            <h5 className="text-lg">Payments</h5>
                        </div>

                        {
                            userBookings
                            &&
                            (
                                <div>
                                    {
                                        userBookings.map(booking => (
                                            <div key={booking._id} className="grid md:grid-cols-[1fr_150px_100px] lg:grid-cols-[1fr_250px_100px] gap-5 items-center py-5">
                                                <Link to={`/room/${booking.room._id}`} className="grid grid-cols-1 md:grid-cols-[100px_1fr] lg:grid-cols-[150px_1fr] gap-5 items-center">
                                                    <img src={booking.room.images[0]} alt="room image" className="rounded-md " />

                                                    <div>
                                                        <h6 className="text-lg">{booking.room.hotel.name} <span className="text-xs">
                                                            [{booking.room.type}]</span></h6>
                                                        <p className="text-gray-600 text-sm"><FontAwesomeIcon icon={faLocationDot} /><span className="ml-1">{booking.room.hotel.address}</span></p>
                                                        <p className="text-gray-600 text-sm"><FontAwesomeIcon icon={faUser} /><span className="ml-1">Guests: </span>{booking.guests}</p>
                                                        <p>Total: ${booking.amount}</p>
                                                    </div>
                                                </Link>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
                                                    <div>
                                                        <p>Check-In:</p>
                                                        <p className="text-gray-600 text-sm">{new Date(booking.checkIn).toDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p>Check-Out:</p>
                                                        <p className="text-gray-600 text-sm">{new Date(booking.checkOut).toDateString()}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className={`flex  items-center gap-1 ${booking.isPaid ? 'text-green-600' : 'text-red-600'}`}><span className={`h-2 w-2 ${booking.isPaid ? 'bg-green-600' : 'bg-red-600'} rounded-full`}></span> <span>{booking.isPaid ? 'Paid' : 'Unpaid'}</span></p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </UserContainer>
        </section>
    );
}

export default UserBookings;