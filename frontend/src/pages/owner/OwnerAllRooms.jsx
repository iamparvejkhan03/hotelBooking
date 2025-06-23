import { useState } from "react";
import { roomsDummyData } from "../../assets/assets";
import { OwnerContainer, Heading, OwnerSidebar } from "../../components";

function OwnerAllRooms(){
    // const [isAvailable, setIsAvailable] = useState(null);

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

                    <div className="overflow-x-auto">
                        <table className="md:w-full text-left my-5">
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
                                    roomsDummyData.map(room => (
                                        <tr key={room._id} className="border-2 border-blue-100">
                                            <td className="p-1 sm:p-2 md:p-3 break-all font-normal">{room.roomType}</td>
                                            <td className="p-1 sm:p-2 md:p-3 break-all font-normal">${room.pricePerNight}</td>
                                            <td className="p-1 sm:p-2 md:p-3 break-all font-normal">
                                                <label className="relative">
                                                    <input type="checkbox" onChange={(e) => console.log(e.target.checked)} checked={room.isAvailable} className="sr-only peer" />

                                                    <div onClick={() => ``} className="w-12 h-7 peer-checked:bg-blue-600 bg-blue-200 border border-blue-200 rounded-full transition-colors duration-200"></div>

                                                    <span className="h-5 w-5 bg-white rounded-full absolute top-1/2 -translate-y-1/2 peer-checked:translate-x-full mx-1 transition duration-200"></span>
                                                </label>
                                            </td>
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

export default OwnerAllRooms;