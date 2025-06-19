function Heading({heading, subHeading}){
    return (
        <div>
            <h2 className="text-xl sm:text-2xl">{heading}</h2>
            {subHeading && <p className="text-gray-600">{subHeading}</p>}
        </div>
    );
}

export default Heading;