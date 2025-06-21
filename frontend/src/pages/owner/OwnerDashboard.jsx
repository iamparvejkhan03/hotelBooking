import { assets, dashboardDummyData } from "../../assets/assets";
import { Heading, OwnerContainer, OwnerSidebar } from "../../components";

function OwnerDashboard(){
    return (
        <section className="flex min-h-[70vh]">
            <OwnerSidebar />

            <OwnerContainer>
                <Heading heading="Dashboard" subHeading="Monitor your room listings, track bookings, and analyze revenue-all in one place. Stay updated with real-time insights to ensure smooth operations." />

                <div className="flex gap-5 my-5">
                    <div className="bg-blue-100 flex gap-3 p-3 rounded">
                        <img src={assets.totalBookingIcon} alt='Total Bookings' className="h-9" />

                        <div>
                            <h5 className="text-blue-500 font-semibold">Total Bookings</h5>
                            <p>{dashboardDummyData.totalBookings}</p>
                        </div>
                    </div>
                    
                    <div className="bg-blue-100 flex gap-3 p-3 rounded">
                        <img src={assets.totalRevenueIcon} alt='Total Revenue' className="h-9" />

                        <div>
                            <h5 className="text-blue-500 font-semibold">Total Revenue</h5>
                            <p>${dashboardDummyData.totalRevenue}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <Heading heading="Recent Bookings" />

                    <table className="w-full text-left my-5">
                        <thead className="border-2 border-blue-200 bg-blue-100">
                            <tr>
                                <th className="p-3 font-semibold">Username</th>
                                <th className="p-3 font-semibold">Room</th>
                                <th className="p-3 font-semibold">Total Amount</th>
                                <th className="p-3 font-semibold">Payment Status</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </OwnerContainer>
        </section>
    );
}

export default OwnerDashboard;