import { assets, dashboardDummyData, userBookingsDummyData } from "../../assets/assets";
import { Heading, OwnerContainer, OwnerSidebar } from "../../components";

function OwnerDashboard(){
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
                            <p>{dashboardDummyData.totalBookings}</p>
                        </div>
                    </div>
                    
                    <div className="bg-blue-100 flex flex-col text-center sm:text-left sm:flex-row gap-3 p-3 rounded">
                        <img src={assets.totalRevenueIcon} alt='Total Revenue' className="h-9" />

                        <div>
                            <h5 className="text-blue-500 font-semibold">Total Revenue</h5>
                            <p>${dashboardDummyData.totalRevenue}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <Heading heading="Recent Bookings" />

                    <div className="overflow-x-auto">
                        <table className="text-left my-5">
                            <thead className="border-2 border-blue-100 bg-blue-100">
                                <tr>
                                    <th className="p-1 sm:p-2 md:p-3 break-all font-normal md:font-semibold">Username</th>
                                    <th className="p-1 sm:p-2 md:p-3 break-all font-normal md:font-semibold">Room</th>
                                    <th className="p-1 sm:p-2 md:p-3 break-all font-normal md:font-semibold">Total Amount</th>
                                    <th className="p-1 sm:p-2 md:p-3 break-all font-normal md:font-semibold">Payment Status</th>
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
                                    userBookingsDummyData.map(booking => (
                                        <tr key={booking._id} className="border-2 border-blue-100">
                                            <td className="p-1 sm:p-2 md:p-3 break-all font-normal">{booking.user.username}</td>
                                            <td className="p-1 sm:p-2 md:p-3 break-all font-normal">{booking.room.roomType}</td>
                                            <td className="p-1 sm:p-2 md:p-3 break-all font-normal">{booking.totalPrice}</td>
                                            <td className={`p-1 sm:p-2 md:p-3 break-all font-normal`}><span className={`py-1.5 px-4 rounded-full capitalize ${booking.isPaid ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'}`}>{booking.status}</span></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </OwnerContainer>
        </section>
    );
}

export default OwnerDashboard;