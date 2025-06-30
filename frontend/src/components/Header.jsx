import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import {Container, UserMenuIcon} from "./";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowUserAuthForm } from "../features/forms/UserAuthSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faHotel } from "@fortawesome/free-solid-svg-icons";
import { toggleShowHotelRegForm } from "../features/forms/HotelRegSlice";

const navLinks = [
    {name:'Home', link:'/'},
    {name:'Rooms', link:'/rooms'},
    {name:'About', link:'/about'},
    {name:'Contact', link:'/contact'},
];

function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);  
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector(state => state.user.isUserLoggedIn);
    const isHotelOwner = useSelector(state => state.user.isHotelOwner);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        }

        setIsScrolled(pathname !== '/');

        pathname === '/' && window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname])

    return (
        <header className={`bg-transparent fixed top-0 w-full ${isScrolled && 'bg-white drop-shadow-md drop-shadow-gray-500'} z-30`}>
            <Container className="flex justify-between items-center">
                <Link to="/" className="z-50">
                    <img src={assets.logo} alt="logo" className={`h-10 lg:h-12 transition-all duration-400 ${(isMenuOpen || isScrolled) && 'invert '}`} />
                </Link>

                {/* Navlinks for larger screens */}
                <nav className="hidden lg:block">
                    <ul className="flex">
                        {
                            navLinks.map(link => (
                                <li key={link.name} className="relative mx-5 py-1"><NavLink className={({isActive}) => `${isActive && 'text-blue-400 after:bg-blue-400'} ${!isScrolled && !isActive ?'text-white after:bg-white' : 'text-black after:bg-black'} after:w-0 after:rounded after:h-0.5 after:absolute after:bottom-0 after:left-0 after:content-[""] hover:after:w-full after:transition-all after:duration-150`} to={link.link}>{link.name}</NavLink></li>
                            ))
                        }
                    </ul>
                </nav>

                {/* Navlinks for smaller screens */}
                <nav onClick={() => setIsMenuOpen(false)} className={`lg:hidden bg-white absolute top-0 left-0 min-h-screen w-0 transition-all duration-200 overflow-hidden text-center flex items-center justify-center ${isMenuOpen && 'w-full'} z-40`}>
                    <ul className="">
                        {
                            navLinks.map(link => (
                                <li key={link.name} className="relative mx-5 py-2"><NavLink className={({isActive}) => `${isActive ? 'text-blue-400 after:bg-blue-400' : 'text-black after:bg-black'} after:w-0 after:rounded after:h-0.5 after:absolute after:bottom-0 after:left-0 after:content-[""] hover:after:w-full after:transition-all after:duration-150`} to={link.link}>{link.name}</NavLink></li>
                            ))
                        }
                        {
                            isUserLoggedIn
                            &&
                            <li className="relative mx-5">
                                {
                                    isHotelOwner
                                    ?
                                    <button onClick={() => navigate('/owner/dashboard')} className="flex items-center gap-2 text-white bg-blue-500 border border-blue-500 px-5 py-2 rounded-full cursor-pointer my-4 hover:bg-blue-600">
                                        <FontAwesomeIcon icon={faHotel} />
                                        <span>
                                            Hotel
                                        </span>
                                    </button>
                                    :
                                    <button onClick={() => dispatch(toggleShowHotelRegForm(true))} className="flex items-center gap-2 text-white bg-blue-500 border border-blue-500 px-5 py-2 rounded-full cursor-pointer my-4 hover:bg-blue-600">
                                        <FontAwesomeIcon icon={faHotel} />
                                        <span>
                                            Add Hotel
                                        </span>
                                    </button>
                                }
                            </li>
                        }
                        <li>
                            {
                                !isUserLoggedIn 
                                ? 
                                <button className="inline text-white bg-black border border-black px-5 py-2 rounded-full cursor-pointer my-4 hover:bg-black/80" onClick={() => dispatch(toggleShowUserAuthForm(true))}>Login</button> 
                                : 
                                <div>
                                    <Link to="/user/dashboard" className="flex items-center gap-2 text-white bg-black border border-black px-5 py-2 rounded-full cursor-pointer my- hover:bg-black/80">
                                        <FontAwesomeIcon icon={faDashboard} />
                                        <span>
                                            Dashboard
                                        </span>
                                    </Link>
                                </div>
                            }
                        </li>
                    </ul>
                </nav>

                <div className="hidden lg:flex lg:items-center gap-8">
                    <img src={assets.searchIcon} className={`h-8 ${isScrolled && 'invert'}`} alt="search icon" />

                    <div className="w-full">
                        {
                            isUserLoggedIn
                            &&
                            (
                                isHotelOwner
                                ?
                                <button onClick={() => navigate('/owner/dashboard')} className="flex items-center gap-2 text-white bg-blue-500 border border-blue-500 px-5 py-2 rounded-full cursor-pointer hover:bg-blue-600">
                                    <FontAwesomeIcon icon={faHotel} />
                                    <span>
                                        Hotel
                                    </span>
                                </button>
                                :
                                <button onClick={() => dispatch(toggleShowHotelRegForm(true))} className="flex items-center gap-2 text-white bg-blue-500 border border-blue-500 px-5 py-2 rounded-full cursor-pointer hover:bg-blue-600">
                                    <FontAwesomeIcon icon={faHotel} />
                                    <span>
                                        Add Hotel
                                    </span>
                                </button>
                            )
                        }
                    </div>

                    {
                        !isUserLoggedIn
                        ?
                        <button className="inline text-white bg-black border border-black px-8 py-2 rounded-full cursor-pointer hover:bg-black/80" onClick={() => dispatch(toggleShowUserAuthForm(true))}>Login</button>
                        :
                        <div className="flex gap-8 items-center w-full"> 
                            <Link to="/user/dashboard" className="flex items-center gap-2 text-white bg-black border border-black px-5 py-2 rounded-full cursor-pointer hover:bg-black/80">
                                <FontAwesomeIcon icon={faDashboard} />
                                <span>
                                    Dashboard
                                </span>
                            </Link>
                            <UserMenuIcon />
                        </div>
                    }
                </div>

                <div className="lg:hidden z-50 flex items-center gap-5">
                    {
                        isUserLoggedIn
                        &&
                        <UserMenuIcon />
                    }
                    {
                        isMenuOpen ? (<img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.closeIcon} alt="menu icon" className={`h-5 cursor-pointer invert-25 z-50 ${isScrolled}`} />) : (<img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="menu icon" className={`h-5 cursor-pointer ${isScrolled && 'invert'}`} />)
                    }
                </div>
            </Container>
        </header>
    );
}

export default Header;