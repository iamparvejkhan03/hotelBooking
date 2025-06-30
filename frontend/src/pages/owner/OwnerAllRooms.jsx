import { useEffect, useState } from "react";
// import { roomsDummyData } from "../../assets/assets";
import { OwnerContainer, Heading, OwnerSidebar } from "../../components";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";

function OwnerAllRooms(){
    const accessToken = useSelector(state => state.user.user.accessToken);

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchUserRooms = async () => {
            try {
                const { data } = await axios.get('/api/v1/rooms/user', {headers: {Authorization: `Bearer ${accessToken}`}});

                if(data.success){
                    setRooms(data.rooms);
                    toast.success('Rooms fetched');
                }
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message);
            }
        }

        fetchUserRooms();
    }, [])

    const toggleRoomAvailability = async (isAvailable, id) => {
        try {
            const { data } = await axios.put('/api/v1/rooms/availability', {isAvailable, id}, {headers: {Authorization: `Bearer ${accessToken}`}});

            if(data){
                setRooms(rooms => {
                    return rooms.map(room => {
                        if(room._id === data.room._id){
                            room.isAvailable = data.room.isAvailable;
                        }
                        return room;
                    })
                });
                toast.success(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <section className="flex min-h-[70vh]">
            <OwnerSidebar />

            <OwnerContainer>
                <div className="max-w-full">
                    <Heading heading="Room Listings" subHeading="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users." />
                </div>

                {/* All Rooms table */}
                <div className="my-10">
                    <Heading heading="All Rooms" />

                    {
                        rooms
                        ?
                        (
                            <div className="overflow-x-auto">
                        <table className="w-full text-left my-5">
                            <thead className="border-2 border-blue-100 bg-blue-100">
                                <tr>
                                    <th className="p-1 sm:p-2 md:p-3 break-all font-normal md:font-semibold">Room Type</th>
                                    <th className="p-1 sm:p-2 md:p-3 break-all font-normal md:font-semibold">Price/night</th>
                                    <th className="p-1 sm:p-2 md:p-3 break-all font-normal md:font-semibold">Action</th>
                                </tr>
                            </thead>
                            <style>
                                {
                                    `
                                        table tr:nth-child(even){
                                            background-color:#DBEAFE;
                                        }
                                    `
                                }
                            </style>
                            <tbody>
                                {
                                    rooms.map(room => (
                                        <tr key={room._id} className="border-2 border-blue-100">
                                            <td className="p-1 sm:p-2 md:p-3 break-all font-normal">{room.type}</td>
                                            <td className="p-1 sm:p-2 md:p-3 break-all font-normal">${room.price}</td>
                                            <td className="p-1 sm:p-2 md:p-3 break-all font-normal">
                                                <label className="relative cursor-pointer">
                                                    <input type="checkbox" onChange={(e) => toggleRoomAvailability(e.target.checked, room._id)} checked={room.isAvailable} className="sr-only peer" />

                                                    <div className="w-12 h-7 peer-checked:bg-blue-600 bg-blue-200 border border-blue-200 rounded-full transition-colors duration-200"></div>

                                                    <span className="h-5 w-5 bg-white rounded-full absolute top-1/2 -translate-y-1/2 peer-checked:translate-x-full mx-1 transition duration-200"></span>
                                                </label>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                        )
                        :
                        (
                            <div>
                                <span>one</span>
                            </div>
                        )
                    }
                </div>
            </OwnerContainer>
        </section>
    );
}

export default OwnerAllRooms;