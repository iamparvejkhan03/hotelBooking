import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useId } from "react";

const Input = forwardRef(function Input({label, labelIcon, type="text", className="", list="", ...props}, ref){
    const id = useId();
    {/* flex flex-col w-full sm:w-5/12 lg:w-3/12 xl:w-1/6 sm:mx-2 */}
    return (
        <div className="text-gray-600 grid grid-cols-1 my-1">
            {label && <label htmlFor={id}>{labelIcon && <FontAwesomeIcon icon={labelIcon} />} {label}</label>}
            <input type={type} list={list} id={id} className={`text-black border-2 border-blue-100 py-1 px-2 focus-within:outline-2 focus-within:outline-blue-200 rounded my-1 ${className}`} ref={ref} {...props} />
        </div>
    );
})

export default Input;