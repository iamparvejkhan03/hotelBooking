import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import {Container} from "./";
import { Link, NavLink, useLocation } from "react-router-dom";

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
                        <li>
                            <button className="inline text-white bg-black border border-black px-5 py-2 rounded-full cursor-pointer my-4 hover:bg-black/80">Login</button>
                        </li>
                    </ul>
                </nav>

                <div className="hidden lg:flex lg:items-center">
                    <img src={assets.searchIcon} className={`h-8 mx-10 ${isScrolled && 'invert'}`} alt="search icon" />
                    <button className="inline text-white bg-black border border-black px-8 py-2 rounded-full cursor-pointer hover:bg-black/80">Login</button>
                </div>

                <div className="lg:hidden z-50">
                    {
                        isMenuOpen ? (<img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.closeIcon} alt="menu icon" className={`h-5 invert-25 z-50 ${isScrolled}`} />) : (<img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="menu icon" className={`h-5 ${isScrolled && 'invert'}`} />)
                    }
                </div>
            </Container>
        </header>
    );
}

export default Header;