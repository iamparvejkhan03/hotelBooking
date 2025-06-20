import { Hero, Heading, Container, HotelCard, OfferCard, TestimonialCard, Input, TrustedBy } from "../components";
import {roomsDummyData, exclusiveOffers, testimonials} from '../assets/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { useForm } from "react-hook-form";

function Home(){
    const {register, handleSubmit} = useForm();

    const subscriptionFormHandler = (data) => {
        console.log(data);
    }
    return (
        <>
            <Hero />

            <TrustedBy />

            <section className="bg-blue-100">
                <Container>
                    <Heading heading="Featured Destination" subHeading="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgotable experience." />

                    <Swiper 
                        modules={[Navigation, Autoplay]}
                        spaceBetween={50}
                        slidesPerView={4}
                        navigation
                        pagination={{ clickable: true }}
                        className="mt-5"
                        autoplay={{delay: 3000}}
                        breakpoints={{
                            0: {slidesPerView:1},
                            799: {slidesPerView:2},
                            1099: {slidesPerView:3},
                            1299: {slidesPerView:4},
                        }}
                        >
                        {
                            roomsDummyData.map(room => (
                                <SwiperSlide>
                                    <HotelCard key={room._id} room={room} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </Container>
            </section>

            <section>
                <Container>
                    <Heading heading="Exclusive Offers" subHeading="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgetable memories." />
                    
                    <Swiper 
                        className="flex flex-col sm:flex-row md:gap-12 my-5"
                        modules={[Autoplay, Pagination]}
                        spaceBetween={50}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{delay: 3000}}
                        breakpoints={{
                            0: {slidesPerView:1},
                            799: {slidesPerView:2},
                            1099: {slidesPerView:3},
                        }}
                    >
                        {
                            exclusiveOffers.map(offer => (
                                <SwiperSlide key={offer._id}>
                                    <OfferCard offer={offer} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </Container>
            </section>

            <section className="bg-blue-100">
                <Container>
                    <Heading heading="What Our Guests Say" subHeading="Discover why discerning travelers choose QuickStay for their luxury accomodations around the world." />

                    <Swiper 
                        className="flex flex-col sm:flex-row md:gap-12 my-5"
                        modules={[Autoplay, Pagination]}
                        spaceBetween={50}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        // autoplay={{delay: 3000}}
                        breakpoints={{
                            0: {slidesPerView:1},
                            799: {slidesPerView:2},
                            1099: {slidesPerView:3},
                        }}
                    >
                        {
                            testimonials.map(testimonial => (
                                <SwiperSlide key={testimonial.id}>
                                    <TestimonialCard testimonial={testimonial} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </Container>
            </section>

            <section className="text-white text-center">
                <Container>
                    <div className="bg-blue-950 rounded-xl p-5 md:py-8 lg:py-10 xl:py-12 my-5 shadow-xl">
                        <h2 className="text-xl sm:text-2xl">Stay Inspired</h2>
                        <p className="text-sm text-gray-300">Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration.</p>

                        <form onSubmit={handleSubmit(subscriptionFormHandler)} className="flex flex-col sm:flex-row sm:justify-center sm:gap-2 my-3">
                            <Input type="email" placeholder="Enter your email..." className="py-2 text-white" {...register('email', {required:true})} />
                            <Input type="submit" value="Subscribe" className="bg-black text-white py-2 px-5 rounded-md border-none" />
                        </form>

                        <p className="text-xs font-extralight">By subscribing, you agree to our Privacy Policy and consent to receice updates.</p>
                    </div>
                </Container>
            </section>
        </>
    );
}

export default Home;