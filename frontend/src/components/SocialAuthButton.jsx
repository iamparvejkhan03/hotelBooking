import { Link } from "react-router-dom";

function SocialAuthButton({icon, name, className, link}) {
    return (
        <Link to={link} className={`w-full py-2 rounded cursor-pointer my-2 font-light block text-center ${className}`} type="submit">
            <img src={icon} alt="google logo" className="h-5 inline mx-2 align-middle" />
            <span className="align-middle">{name}</span>
        </Link>
    );
}

export default SocialAuthButton;