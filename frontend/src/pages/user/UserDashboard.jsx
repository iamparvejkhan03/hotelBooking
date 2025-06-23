import { assets, dashboardDummyData, userBookingsDummyData } from "../../assets/assets";
import { Heading, UserContainer, UserSidebar } from "../../components";

function UserDashboard(){
    return (
        <section className="flex min-h-[70vh]">
            <UserSidebar />

            <UserContainer>
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
                            <h5 className="text-blue-500 font-semibold">Total Spend</h5>
                            <p>${dashboardDummyData.totalRevenue}</p>
                        </div>
                    </div>
                </div>
            </UserContainer>
        </section>
    );
}

export default UserDashboard;