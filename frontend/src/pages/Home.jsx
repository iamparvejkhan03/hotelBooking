import { Hero, Heading, Container, HotelCard, OfferCard, TestimonialCard, Input, TrustedBy } from "../components";
import { roomsDummyData, exclusiveOffers, testimonials } from '../assets/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Home() {
    const { register, handleSubmit } = useForm();

    const subscriptionFormHandler = (data) => {
        console.log(data);
    }

    const [rooms, setRooms] = useState(null);

    useEffect(() => {
        const getAllRooms = async () => {
            try {
                const { data } = await axios.get('/api/v1/rooms');

                if (data.success) {
                    setRooms(data.rooms);
                }
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message);
            }
        }
        getAllRooms();
    }, [])
    return (
        <>
            <Hero />

            <TrustedBy />

            {
                (rooms && rooms.length > 0)
                &&
                (
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
                                autoplay={{ delay: 3000 }}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    799: { slidesPerView: 2 },
                                    1099: { slidesPerView: 3 },
                                    1299: { slidesPerView: 4 },
                                }}
                            >
                                {
                                    rooms.slice(0, 10).map((room) => (
                                        <SwiperSlide>
                                            <HotelCard key={room._id} room={room} />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </Container>
                    </section>
                )
            }

            <section>
                <Container>
                    <Heading heading="Exclusive Offers" subHeading="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgetable memories." />

                    <Swiper
                        className="flex flex-col sm:flex-row md:gap-12 mt-5"
                        modules={[Autoplay, Pagination]}
                        spaceBetween={50}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            799: { slidesPerView: 2 },
                            1099: { slidesPerView: 3 },
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

            {/* What sets us apart from the others section */}
            <section >
                <Container>
                    <div className="container mx-auto mb-5 text-gray-600">
                        <div className="flex flex-col w-full mb-5 text-black">
                            <Heading heading="What sets us apart from others" />
                        </div>
                        <div className="flex flex-wrap -m-4">
                            <div className="p-4 md:w-1/3">
                                <div className="flex rounded-lg h-full bg-blue-100 p-8 flex-col">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-300 text-white flex-shrink-0">
                                            🏨
                                        </div>
                                        <h2 className="text-black text-lg title-font font-medium">Instant Booking</h2>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="leading-relaxed text-base">Get real-time availability and confirm your stay in seconds — no waiting, no hassle.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 md:w-1/3">
                                <div className="flex rounded-lg h-full bg-blue-100 p-8 flex-col">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-300 text-white flex-shrink-0">
                                            💼
                                        </div>
                                        <h2 className="text-black text-lg title-font font-medium">Verified Stays</h2>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="leading-relaxed text-base">Choose from trusted hotels and resorts, carefully vetted for quality, safety, and service.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 md:w-1/3">
                                <div className="flex rounded-lg h-full bg-blue-100 p-8 flex-col">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-300 text-white flex-shrink-0">
                                            🌍
                                        </div>
                                        <h2 className="text-black text-lg title-font font-medium">Wide Selection</h2>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="leading-relaxed text-base">From luxury resorts to budget stays — explore accommodations in top destinations worldwide.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                            0: { slidesPerView: 1 },
                            799: { slidesPerView: 2 },
                            1099: { slidesPerView: 3 },
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
                            <Input type="email" placeholder="Enter your email..." className="py-2 text-white" {...register('email', { required: true })} />
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