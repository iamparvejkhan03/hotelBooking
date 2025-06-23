import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets } from "../assets/assets";
import {Input} from "./";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

function HotelRegForm(){
    const {register, handleSubmit} = useForm({
        defaultValues: {
            name:'',
            phone:'',
            address:'',
            city:'select',
        }
    });

    const hotelRegisterHandler = (data) => {
        console.log(data);
    }

    return (
        <section className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-50 flex items-center justify-center">
            <div className="sm:w-3/5 md:w-4/5 lg:w-1/2 min-h-[70vh] grid md:grid-cols-2 items-center bg-white rounded-xl overflow-hidden relative drop-shadow-xl drop-shadow-blue-300">
                <div className="h-full w-full">
                    <img src={assets.regImage} alt="registeration image" className="hidden md:block object-cover min-h-full min-w-full" />
                </div>
                <form onSubmit={handleSubmit(hotelRegisterHandler)} className="p-10">
                    <h3 className="text-xl font-semibold text-center">Register Your Hotel</h3>

                    <Input type="text" label="Hotel Name" placeholder="Type here" className="focus:outline-2 focus:outline-blue-300" {...register('name', {required:true})} />

                    <Input type="tel" label="Phone" placeholder="Type here" className="focus:outline-2 focus:outline-blue-300" {...register('phone', {required:true})} />

                    <Input type="text" label="Address" placeholder="Type here" className="focus:outline-2 focus:outline-blue-300" {...register('address', {required:true})} />

                    <div>
                        <label className="text-gray-600">City</label>
                        <select className="text-black border-2 border-gray-200 py-1.5 px-2 rounded my-1 w-full focus:outline-2 focus:outline-blue-300" {...register('city', {required:true})}>
                            <option value="select">Select City</option>
                            <option value="delhi">Delhi</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="chennai">Chennai</option>
                            <option value="banglore">Banglore</option>
                            <option value="kolkata">Kolkata</option>
                        </select>
                    </div>

                    <button type="submit" className="text-white bg-blue-500 py-2 px-6 rounded cursor-pointer my-2">Register</button>
                </form>
                <FontAwesomeIcon icon={faClose} className="absolute right-5 top-5 text-gray-600 cursor-pointer" />
            </div>
        </section>
    );
}

export default HotelRegForm;