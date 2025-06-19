import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import {Container} from "./";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Navlinks = [
    {name:'Home', href:'/'},
    {name:'About Us', href:'/about'},
    {name:'Contact Us', href:'/contact'},
    {name:'Privacy Policy', href:'/privacy-policy'},
];

function Footer(){
    return (
        <footer className="w-full text-gray-500">
            <Container>
                <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b-2 border-gray-200 pb-10">
                    <div className="md:max-w-96">
                        <Link to="/" className="">
                            <img className="h-10 lg:h-12 invert" src={assets.logo} alt="logo" /> 
                        </Link>
                        <p className="mt-6 text-base">
                            InstaStay is your go-to platform for fast, reliable, and seamless hotel bookings. With trusted listings, and instant confirmation, InstaStay makes your travel planning stress-free.
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-4">
                            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg" alt="google play" className="h-10 w-auto border border-white rounded" />
                            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg" alt="app store" className="h-10 w-auto border border-white rounded" />
                        </div>
                    </div>
                    <div className="flex-1 flex-wrap flex items-start md:justify-end gap-6 sm:gap-8 md:gap-40">
                        <div>
                            <h2 className="font-semibold mb-5 text-black text-lg">Company</h2>
                            <ul className="text-base space-y-2">
                                {
                                    Navlinks.map(link => (
                                        <li key={link.name}><NavLink className={({isActive}) => `${isActive ? 'text-blue-500' : ''}`} to={link.href}>{link.name}</NavLink></li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div>
                            <h2 className="font-semibold mb-5 text-black text-lg">Get in touch</h2>
                            <div className="text-base space-y-2">
                                <p>+1-234-567-890</p>
                                <p className="break-all">contact@instastay.com</p>
                            </div>
                            <div className='flex flex-wrap items-center mt-4'>
                                <input type="text" className='bg-white max-w-32 lg:max-w-48 rounded-l border border-gray-300 h-9 px-3 outline-none' placeholder='Your email' />
                                <button className='flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r'>
                                    {/* Arrow icon */}
                                    <FontAwesomeIcon className="text-white" icon={faArrowRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="pt-4 text-center text-base pb-5">
                    Copyright {new Date().getFullYear()} © InstaStay. All Right Reserved.
                </p>
            </Container>
        </footer>
    );
}

export default Footer;