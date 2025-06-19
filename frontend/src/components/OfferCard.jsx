import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function OfferCard({offer}){
    return (
        <div className={`relative text-white rounded-xl overflow-hidden`}>
            <img src={offer.image} alt="Offer Image" className="h-60 w-full" />
            <div className="absolute top-0 left-0 p-6 flex flex-col w-full">
                <p className="bg-white text-black rounded-full self-start py-1 px-2">{offer.priceOff}% off</p>

                <div className="my-3">
                    <h5 className="text-lg">{offer.title}</h5>
                    <p className="text-sm">{offer.description}</p>
                </div>

                <p className="text-gray-300 mb-2">Expires {offer.expiryDate}</p>

                <Link to="/" className="group">View Offers <FontAwesomeIcon className="group-hover:translate-x-1 align-bottom" icon={faArrowRight} /></Link>
            </div>
        </div>
    );
}

export default OfferCard;