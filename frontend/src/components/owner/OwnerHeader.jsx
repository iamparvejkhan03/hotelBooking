import { assets } from "../../assets/assets";

function OwnerHeader(){
    return (
        <header className="flex w-full py-4 px-10 justify-between border-b border-b-blue-100">
            <img src={assets.logo} alt="logo" className="h-12 invert" />
            <button>Dashboard</button>
        </header>
    );
}

export default OwnerHeader;