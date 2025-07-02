import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { assets, facilityIcons } from "../assets/assets";
import { Link } from "react-router-dom";

function RoomCard({hotel}){
    // console.log(room);
    return (
        <Link to={`/room/${hotel.room._id}`} className="flex flex-col md:flex-row gap-5 md:gap-10 py-6 md:py-8 lg:py-10 border-b-2 border-b-gray-300 w-full">
            <img src={hotel.room.images[0]} alt="roomImg" className="md:h-64 md:min-w-1/2 md:max-w-1/2 object-cover rounded-lg" />
            <div className="flex flex-col justify-around">
                <h5 className="text-lg lg:text-xl">{hotel.name}</h5>

                <p className="text-gray-600 text-sm md:text-base"><FontAwesomeIcon icon={faLocationDot} /> {hotel.address}, {hotel.city}</p>

                <p className="flex my-2 items-center">
                    {
                        Array(5).fill('').map((_, i) => (
                            5 > i ? <img src={assets.starIconFilled} alt="star" key={i} className="h-4" /> : <img src={assets.starIconOutlined} alt="no-star" key={i} className="h-4" />
                        ))
                    }
                    <span className="mx-2">185+ reviews</span>
                </p>

                <div className="flex text-sm gap-2 flex-wrap my-3">
                    {
                        hotel.room.amenities.map((amenity, i) => (
                            <span key={amenity} className="flex gap-2 rounded-md bg-blue-100 p-2">
                                <img className="h-4" src={facilityIcons[amenity]} alt={amenity} />
                                <p>{amenity}</p>
                            </span>
                        ))
                    }
                </div>

                <p className="font-semibold">${hotel.room.price}/day</p>
            </div>
        </Link>
    );
}

export default RoomCard;