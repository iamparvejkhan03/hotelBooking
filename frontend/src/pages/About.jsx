import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Heading } from "../components";
import { faBook, faHotel, faStar, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { ourTeam } from "../assets/assets";
import { faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function About() {
    return (
        <Container className="body-font mt-24 lg:mt-32">
            {/* Meet our people */}
            <section>
                <Heading heading="Meet our team" />
                <div className="grid md:grid-cols-3 gap-8 lg:gap-10 xl:gap-16 mt-5 text-center text-gray-600">
                    {
                        ourTeam.map(team => (
                            <div key={team._id} className="border border-blue-100 rounded p-10 hover:bg-blue-50">
                                <img src={team.image} alt={team.name} className="h-24 mx-auto w-24 object-cover rounded-full" />

                                <div className="py-3">
                                    <h5 className="text-black text-lg">{team.name}</h5>
                                    <p>{team.post}</p>
                                </div>

                                <p className="pb-3">{team.about}</p>

                                <div className="flex gap-3 justify-center">
                                    <Link to=""><FontAwesomeIcon className="text-xl" icon={faLinkedin} /></Link>
                                    <Link to=""><FontAwesomeIcon className="text-xl" icon={faFacebook} /></Link>
                                    <Link to=""><FontAwesomeIcon className="text-xl" icon={faX} /></Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* What we're offering section */}
            <section className="text-gray-600 body-font">
                <div className="container my-10 mx-auto">
                    <div className="mb-5 text-black">
                        <Heading heading="What we're offering you" subHeading="At InstaStay, we make finding and booking your perfect stay effortless. With our instant booking and real-time availability, you can secure top-rated hotels and resorts in just a few clicks. All listings are verified, so you can book with confidence knowing you're getting quality and safety." />
                    </div>
                    <div className="flex flex-wrap sm:mx-auto sm:mb-2 -mx-2">
                        <div className="p-2 sm:w-1/2 md:w-1/3 w-full">
                            <div className="bg-blue-100 rounded flex p-4 h-full items-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-blue-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                                <span className="title-font font-medium">Real-Time Availability</span>
                            </div>
                        </div>
                        <div className="p-2 sm:w-1/2 md:w-1/3 w-full">
                            <div className="bg-blue-100 rounded flex p-4 h-full items-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-blue-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                                <span className="title-font font-medium">Secure Payments</span>
                            </div>
                        </div>
                        <div className="p-2 sm:w-1/2 md:w-1/3 w-full">
                            <div className="bg-blue-100 rounded flex p-4 h-full items-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-blue-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                                <span className="title-font font-medium">24/7 Customer Support</span>
                            </div>
                        </div>
                        <div className="p-2 sm:w-1/2 md:w-1/3 w-full">
                            <div className="bg-blue-100 rounded flex p-4 h-full items-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-blue-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                                <span className="title-font font-medium">Easy Cancellation Policies</span>
                            </div>
                        </div>
                        <div className="p-2 sm:w-1/2 md:w-1/3 w-full">
                            <div className="bg-blue-100 rounded flex p-4 h-full items-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-blue-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                                <span className="title-font font-medium">Personalized Recommendations</span>
                            </div>
                        </div>
                        <div className="p-2 sm:w-1/2 md:w-1/3 w-full">
                            <div className="bg-blue-100 rounded flex p-4 h-full items-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-blue-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                                <span className="title-font font-medium">Wide Range of Stays</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials section */}
            <section className="my-10 text-black">
                <Heading heading="What our customers saying" />
                <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-10">
                    <div className="text-sm border border-blue-100 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">
                        <div className="flex flex-col items-center px-5 py-4 relative">
                            <img className="h-24 w-24 absolute -top-14 rounded-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="userImage1" />
                            <div className="pt-8 text-center">
                                <h1 className="text-lg font-medium text-black">Donald Jackman</h1>
                                <p className="text-black/80">Content Creator</p>
                            </div>
                        </div>
                        <p className="text-gray-500 px-6 text-center">I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.</p>
                        <div className="flex justify-center pt-4">
                            <div className="flex gap-0.5">
                                <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                                </svg>
                                <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                                </svg>
                                <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                                </svg>
                                <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                                </svg>
                                <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm border border-blue-100 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">
                        <div className="flex flex-col items-center px-5 py-4 relative">
                            <img className="h-24 w-24 absolute -top-14 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="userImage2" />
                            <div className="pt-8 text-center">
                                <h1 className="text-lg font-medium text-black">Richard Nelson</h1>
                                <p className="text-black/80">Instagram Influencer</p>
                            </div>
                        </div>
                        <p className="text-gray-500 px-6 text-center">I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.</p>
                        <div className="flex justify-center pt-4">
                            <div className="flex gap-0.5">
                                <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                                </svg>
                                <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                                </svg>
                                <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                                </svg>
                                <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                                </svg>
                                <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm border border-blue-100 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">
                        <div className="flex flex-col items-center px-5 py-4 relative">
                            <img className="h-24 w-24 absolute -top-14 rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop" alt="userImage3" />
                            <div className="pt-8 text-center" />
                            <h1 className="text-lg font-medium text-black">James Washington</h1>
                            <p className="text-black/80">Marketing Manager</p>
                        </div>
                        <p className="text-gray-500 px-6 text-center">I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.</p>
                    <div className="flex justify-center pt-4">
                        <div className="flex gap-0.5">
                            <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                            </svg>
                            <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                            </svg>
                            <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                            </svg>
                            <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                            </svg>
                            <svg width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E" />
                            </svg>
                        </div>
                    </div>
                    </div> 
                </div>
            </section>

            {/* Our stats section */}
            <section className="text-gray-600 body-font">
                <div className="container my-10 mx-auto">
                    <div className="flex flex-wrap -m-4 text-center">
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 border-blue-100 hover:bg-blue-50 px-4 py-6 rounded-lg">
                                <FontAwesomeIcon className="text-3xl text-blue-500 mb-5" icon={faBook} />
                                <h2 className="title-font font-medium text-3xl text-black">2.7M+</h2>
                                <p className="leading-relaxed">Bookings</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 border-blue-100 hover:bg-blue-50 px-4 py-6 rounded-lg">
                                <FontAwesomeIcon className="text-3xl text-blue-500 mb-5" icon={faUser} />
                                <h2 className="title-font font-medium text-3xl text-black">457K+</h2>
                                <p className="leading-relaxed">Users</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 border-blue-100 hover:bg-blue-50 px-4 py-6 rounded-lg">
                                <FontAwesomeIcon className="text-3xl text-blue-500 mb-5" icon={faStar} />
                                <h2 className="title-font font-medium text-3xl text-black">4.9</h2>
                                <p className="leading-relaxed">Average Rating</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 border-blue-100 hover:bg-blue-50 px-4 py-6 rounded-lg">
                                <FontAwesomeIcon className="text-3xl text-blue-500 mb-5" icon={faHotel} />
                                <h2 className="title-font font-medium text-3xl text-black">12.5K+</h2>
                                <p className="leading-relaxed">Hotels</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
}

export default About;