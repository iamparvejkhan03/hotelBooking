import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";

function ScrollToTopIcon(){
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const manageScroll = () => {
            setScrolled(window.scrollY > 100);
        }
        window.addEventListener('scroll', manageScroll);

        return () => window.removeEventListener('scroll', manageScroll);
    }, [])

    const handleScroll = () => {
        window.scrollTo({top:0, behavior:'smooth'});
    }

    return (
        <>
            <div className={`bg-blue-600 py-2 px-3 rounded fixed bottom-5 right-5 flex items-center z-50 cursor-pointer text-3xl active:text-2xl ${!scrolled && 'hidden'}`} onClick={() => handleScroll()}>
                <FontAwesomeIcon icon={faArrowUp} className="text-white font-bold align-middle" />
            </div>
        </>
    );
}

export default ScrollToTopIcon;