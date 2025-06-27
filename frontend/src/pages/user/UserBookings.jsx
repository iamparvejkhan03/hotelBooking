import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets, dashboardDummyData, userBookingsDummyData } from "../../assets/assets";
import { Heading, UserContainer, UserSidebar } from "../../components";
import { faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function UserBookings(){
    const date = new Date();
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

                        <div>
                            {
                                userBookingsDummyData.map(booking => (
                                    <div key={booking._id} className="grid md:grid-cols-[1fr_150px_100px] lg:grid-cols-[1fr_250px_100px] gap-5 items-center py-5">
                                        <Link to={`/room/${booking.room._id}`} className="grid grid-cols-1 md:grid-cols-[100px_1fr] lg:grid-cols-[150px_1fr] gap-5 items-center">
                                            <img src={booking.room.images[0]} alt="room image" className="rounded-md " />

                                            <div>
                                                <h6 className="text-lg">{booking.hotel.name} <span className="text-xs">
                                                    [{booking.room.roomType}]</span></h6>
                                                <p className="text-gray-600 text-sm"><FontAwesomeIcon icon={faLocationDot} /><span className="ml-1">{booking.hotel.address}</span></p>
                                                <p className="text-gray-600 text-sm"><FontAwesomeIcon icon={faUser} /><span className="ml-1">Guests: </span>{booking.guests}</p>
                                                <p>Total: ${booking.totalPrice}</p>
                                            </div>
                                        </Link>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
                                            <div>
                                                <p>Check-In:</p>
                                                <p className="text-gray-600 text-sm">{new Date(booking.checkInDate).toDateString()}</p>
                                            </div>
                                            <div>
                                                <p>Check-Out:</p>
                                                <p className="text-gray-600 text-sm">{new Date(booking.checkOutDate).toDateString()}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className={`flex  items-center gap-1 ${booking.isPaid ? 'text-green-600' : 'text-red-600'}`}><span className={`h-2 w-2 ${booking.isPaid ? 'bg-green-600' : 'bg-red-600'} rounded-full`}></span> <span>{booking.isPaid ? 'Paid' : 'Unpaid'}</span></p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </UserContainer>
        </section>
    );
}

export default UserBookings;