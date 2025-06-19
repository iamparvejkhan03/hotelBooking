import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { assets } from "../assets/assets";

FontAwesomeIcon

function TestimonialCard({testimonial}){
    return (
        <div className="bg-white p-5 rounded-lg">
            <div className="flex gap-5">
                <img src={testimonial.image} alt="Testimonial Image" className="h-12 w-12 rounded-full" />
                <div>
                    <h6>{testimonial.name}</h6>
                    <p className="text-gray-600">{testimonial.address}</p>
                </div>
            </div>
            <p className="my-2 flex">
                {
                    Array(5).fill("").map((_, i) => (
                        testimonial.rating > i ? <img key={i} src={assets.starIconFilled} /> : <img key={i} src={assets.starIconOutlined} />
                    ))
                }
            </p>
            <p className="text-gray-600">{testimonial.review}</p>
        </div>
    );
}

export default TestimonialCard;