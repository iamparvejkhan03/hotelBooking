import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLocationDot, faStar} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function HotelCard({room}){
    return (
        <div to="" className="text-gray-600 bg-white rounded-md overflow-hidden  shadow-md">
            <Link to={`/room/${room._id}`}>
                <img src={room.images[0]} alt="roomImg" className="w-full" />
                <div className="p-5">
                    <div className="flex justify-between">
                        <div>
                            <h5 className="text-lg">{room.hotel.name}</h5>
                            <p className="text-sm w-48 truncate"><FontAwesomeIcon icon={faLocationDot} /> {room.hotel.address}</p>
                        </div>
                        <p><FontAwesomeIcon className="text-yellow-600" icon={faStar} /> 4.5</p>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                        <p><span className="text-lg text-black">${room.price}</span>/night</p>
                        <button className="border-2 border-blue-200 rounded px-3 py-1 cursor-pointer">Book Now</button>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default HotelCard;