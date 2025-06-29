import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { UserMenuIcon } from "../";

function UserHeader(){
    return (
        <header className="flex w-full py-4 px-10 justify-between border-b border-b-blue-100">
            <Link to="/" className="w-full">
                <img src={assets.logo} alt="logo" className="h-9 md:h-10 lg:h-14 invert" />
            </Link>
            
            <UserMenuIcon />
        </header>
    );
}

export default UserHeader;