import { useEffect } from "react";
import { assets, dashboardDummyData, userBookingsDummyData } from "../../assets/assets";
import { Heading, UserContainer, UserSidebar } from "../../components";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";

function UserDashboard() {
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
                <div className="max-w-4/5">
                    <Heading heading="Dashboard" subHeading="Monitor your room listings, track bookings, and analyze revenue-all in one place. Stay updated with real-time insights to ensure smooth operations." />
                </div>

                {
                    userBookings
                    &&
                    (
                        <div className="grid grid-cols-1 justify-start sm:flex flex-wrap gap-5 my-5">
                            <div className="bg-blue-100 flex flex-col text-center sm:text-left sm:flex-row gap-3 p-3 rounded">
                                <img src={assets.totalBookingIcon} alt='Total Bookings' className="h-9" />

                                <div>
                                    <h5 className="text-blue-500 font-semibold">Total Bookings</h5>
                                    <p>{userBookings.length}</p>
                                </div>
                            </div>

                            <div className="bg-blue-100 flex flex-col text-center sm:text-left sm:flex-row gap-3 p-3 rounded">
                                <img src={assets.totalRevenueIcon} alt='Total Revenue' className="h-9" />

                                <div>
                                    <h5 className="text-blue-500 font-semibold">Total Spend</h5>
                                    <p>$
                                        {
                                            userBookings.reduce((acc, val) => acc + val.amount, 0)
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </UserContainer>
        </section>
    );
}

export default UserDashboard;