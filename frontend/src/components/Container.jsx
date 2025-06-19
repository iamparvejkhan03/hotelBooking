function Container({children, className=""}){
    return (
        <div className={`px-5 py-5 md:px-16 md:py-6 lg:px-24 xl:px-32 ${className}`}>
            {children}
        </div>
    );
}

export default Container;