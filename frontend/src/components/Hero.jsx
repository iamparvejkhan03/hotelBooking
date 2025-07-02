import { useForm } from "react-hook-form";
import {Container, Input} from "./";
import { faLocationDot, faUser, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function Hero(){
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            destination: "",
            checkIn:"",
            checkOut:"",
            guests:""
        }
    });

    const navigate = useNavigate();

    const handleSearchForm = (data) => {
        try {
            if(data){
                navigate(`/rooms?destination=${data.destination}&guests=${data.guests}&checkin=${data.checkIn}&checkout=${data.checkOut}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section style={{backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4)), url('${assets.heroImg}')`}} className={`min-h-screen max-w-screen py-24 flex items-center bg-center bg-no-repeat bg-cover`}>
            <Container>
                <div className="text-white">
                    <p className="bg-blue-400 text-sm sm:text-base rounded-full inline-block py-1 px-5">Book Smart. Stay Instantly</p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold my-3 md:my-4 break-normal">Find Your Ideal Stay, Instantly</h1>
                    <p className="md:text-lg">Discover a curated collection of exclusive hotels and resorts. Your perfect escape begins here.</p>
                </div>

                <datalist id="cities">
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Banglore">Banglore</option>
                    <option value="Kolkata">Kolkata</option>
                </datalist>

                <form onSubmit={handleSubmit(handleSearchForm)} className="my-5">
                    <div className="bg-white p-6 rounded-md grid md:grid-cols-2 md:gap-2 lg:grid-cols-5 lg:gap-5 items-end sm:w-xl lg:w-4xl xl:w-5xl">
                        <Input type="text" list="cities" label="Destination" labelIcon={faLocationDot} placeholder="Type here" {...register('destination', {required:true})}  />

                        <Input type="number" label="No. of Guests" labelIcon={faUser} placeholder="0" {...register('guests', {required:true})} />

                        <Input type="date" label="Check-In" labelIcon={faCalendar} {...register('checkIn', {required:true})} />

                        <Input type="date" label="Check-Out" labelIcon={faCalendar} {...register('checkOut', {required:true})} />

                        <Input type="submit" value="Search" className="bg-black text-white rounded-md px-4 py-2 cursor-pointer" />

                        {(errors.destination || errors.checkIn || errors.checkOut || errors.guests) && <p className="text-sm text-red-500 mx-2">All fields are required.</p>}
                    </div>
                </form>
            </Container>
        </section>
    );
}

export default Hero;