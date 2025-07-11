import { useSelector } from "react-redux";
import { assets, dashboardDummyData, userBookingsDummyData } from "../../assets/assets";
import { Heading, OwnerContainer, OwnerSidebar } from "../../components";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function OwnerDashboard() {
    const accessToken = useSelector(state => state.user.user.accessToken);
    const [ownerBookings, setOwnerBookings] = useState(null);

    useEffect(() => {
        const getOwnerBookings = async () => {
            try {
                const { data } = await axios.get('/api/v1/bookings/owner', { headers: { Authorization: `Bearer ${accessToken}` } });

                if (data.success) {
                    setOwnerBookings(data.ownerBookings);
                }
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
        getOwnerBookings();
    }, [])

    return (
        <section className="flex min-h-[70vh]">
            <OwnerSidebar />

            <OwnerContainer>
                <div className="max-w-4/5">
                    <Heading heading="Dashboard" subHeading="Monitor your room listings, track bookings, and analyze revenue-all in one place. Stay updated with real-time insights to ensure smooth operations." />
                </div>

                <div className="grid grid-cols-1 justify-start sm:flex flex-wrap gap-5 my-5">
                    <div className="bg-blue-100 flex flex-col text-center sm:text-left sm:flex-row gap-3 p-3 rounded">
                        <img src={assets.totalBookingIcon} alt='Total Bookings' className="h-9" />

                        <div>
                            <h5 className="text-blue-500 font-semibold">Total Bookings</h5>
                            <p>{ownerBookings ? ownerBookings.length : 0}</p>
                        </div>
                    </div>

                    <div className="bg-blue-100 flex flex-col text-center sm:text-left sm:flex-row gap-3 p-3 rounded">
                        <img src={assets.totalRevenueIcon} alt='Total Revenue' className="h-9" />

                        <div>
                            <h5 className="text-blue-500 font-semibold">Total Revenue</h5>
                            <p>${ownerBookings ? ownerBookings.reduce((acc, val) => val.amount + acc, 0) : 0}</p>
                        </div>
                    </div>
                </div>

                {
                    (ownerBookings
                    &&
                    ownerBookings.length > 0)
                    &&
                    (
                        <div>
                            <Heading heading="Recent Bookings" />

                            <div className="overflow-x-auto">
                                <table className="text-left my-5">
                                    <thead className="border-2 border-blue-100 bg-blue-100">
                                        <tr>
                                            <th className="p-1 sm:p-2 md:p-3 break-all font-normal md:font-semibold">Full Name</th>
                                            <th className="p-1 sm:p-2 md:p-3 break-all font-normal md:font-semibold">Room</th>
                                            <th className="p-1 sm:p-2 md:p-3 break-all font-normal md:font-semibold">Amount</th>
                                            <th className="p-1 sm:p-2 md:p-3 break-all font-normal md:font-semibold">Payment</th>
                                        </tr>
                                    </thead>

                                    <style>
                                        {
                                            `
                                        table tr:nth-child(even){
                                            background-color: #DBEAFE;
                                        }
                                    `
                                        }
                                    </style>

                                    <tbody>
                                        {
                                            ownerBookings.map(booking => (
                                                <tr key={booking._id} className="border-2 border-blue-100">
                                                    <td className="p-1 sm:p-2 md:p-3 break-all font-normal">{booking.userData.fullName}</td>
                                                    <td className="p-1 sm:p-2 md:p-3 break-all font-normal">{booking.room.type}</td>
                                                    <td className="p-1 sm:p-2 md:p-3 break-all font-normal">${booking.amount}</td>
                                                    <td className={`p-1 sm:p-2 md:p-3 break-all font-normal`}><span className={`py-1 px-4 rounded-full capitalize ${booking.isPaid ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'}`}>{booking.isPaid ? 'Paid' : 'Unpaid'}</span></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
            </OwnerContainer>
        </section>
    );
}

export default OwnerDashboard;