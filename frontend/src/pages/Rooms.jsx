import { useState } from 'react';
// import { roomsDummyData } from '../assets/assets';
import { Container, Heading, RoomCard } from '../components';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const roomType = ['Single Bed', 'Double Bed', 'Luxury Room', 'Family Suite'];

const priceRange = ['$0 to $500', '$500 to $1000', '$1000 to $2000', '$2000 to $3000'];

const sortBy = ['Price Low to High', 'Price High to Low', 'Newest First'];

const CheckBox = ({ label, onChange }) => {
    return (
        <label className='text-sm flex gap-2'>
            <input type="checkbox" name={label} value={label} onChange={() => onChange(value => [...value, label.toLowerCase()])} />
            {label}
        </label>
    );
}

const Radio = ({ label }) => {
    return (
        <label className='text-sm flex gap-2'>
            <input type='radio' name='sortBy' value={label} />
            {label}
        </label>
    );
}

function Rooms() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { search } = useLocation();
    const [typeFilter, setTypeFilter] = useState([]);

    useEffect(() => {
        const getAllRooms = async () => {
            try {
                setIsLoading(true);
                if(search){
                    const queries = search?.split('&');
                    const destination = queries[0]?.split('=')[1] || '';
                    const guests = queries[1]?.split('=')[1] || '';
                    const checkIn = queries[2]?.split('=')[1] || '';
                    const checkOut = queries[3]?.split('=')[1] || '';

                    const { data } = await axios.get(`/api/v1/rooms?destination=${destination}&guests=${guests}&checkIn=${checkIn}&checkOut=${checkOut}`);

                    if (data.success) {
                        setHotels(data.hotels);
                        setIsLoading(false);
                    }
                }else{
                    const { data } = await axios.get(`/api/v1/rooms`);

                    if (data.success) {
                        setHotels(data.hotels);
                        setIsLoading(false);
                    }
                }
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message);
            }
        }
        getAllRooms();
    }, [])

    useEffect(() => {        
        if(hotels.length > 0 && typeFilter.length > 0){
            setHotels(prevHotels => prevHotels.filter(prevHotel => typeFilter.includes(prevHotel.room.type)))
        }
    }, [typeFilter])

    // const handleTypeFilter = () => {
        
    // }

    return (
        <>
            {
                hotels
                    ?
                    (
                        <Container className='mt-24 lg:mt-32 flex flex-col lg:flex-row justify-between items-start lg:gap-8'>
                            <section className="lg:w-9/12 xl:w-8/12 order-2 lg:order-1">
                                <Heading heading="Hotel Rooms" subHeading="Take advantage of our limited-time offer and special packages to enhance your stay and create unforgettable memories." />

                                <div>
                                    {
                                        hotels.map(hotel => (
                                            <RoomCard hotel={hotel} key={hotel.room._id} />
                                        ))
                                    }
                                </div>
                            </section>

                            <section className="w-full lg:w-3/12 border border-gray-300 rounded flex flex-col items-start order-1 mb-5 lg:order-2">
                                <div className='uppercase flex w-full justify-between items-center px-6 py-3 border-b border-b-gray-300'>
                                    <h5 className='text-lg'>Filters</h5>
                                    <p className='text-gray-600 text-sm'>Clear</p>
                                    <p className='lg:hidden text-sm text-gray-600' onClick={() => setIsFilterOpen(!isFilterOpen)}>{isFilterOpen ? 'Hide' : 'Show'}</p>
                                </div>

                                <div className={`py-3 w-full lg:flex lg:flex-col lg:items-start ${!isFilterOpen ? 'hidden' : 'sm:flex sm:justify-around sm:items-center'}`}>
                                    {/* Room Type filters */}
                                    <div className='px-6 py-3'>
                                        <p className='text-lg py-3'>Popular Filters</p>
                                        <div className='flex flex-col'>
                                            {
                                                roomType.map(room => (
                                                    <CheckBox key={room} label={room} onChange={setTypeFilter} />
                                                ))
                                            }
                                        </div>
                                    </div>

                                    {/* Price Range filters */}
                                    <div className='px-6'>
                                        <p className='text-lg py-3'>Price Range</p>
                                        <div className='flex flex-col'>
                                            {
                                                priceRange.map(price => (
                                                    <CheckBox key={price} label={price} />
                                                ))
                                            }
                                        </div>
                                    </div>

                                    {/* Sort By filters */}
                                    <div className='px-6'>
                                        <p className='text-lg py-3'>Sort By</p>
                                        <div className='flex flex-col'>
                                            {
                                                sortBy.map(sort => (
                                                    <Radio key={sort} label={sort} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Container>
                    )
                    :
                    isLoading
                        ?
                        (
                            <div className="min-h-screen w-full flex justify-center items-center mt-24 lg:mt-32">
                                <span className="h-12 w-12 border-4 border-blue-300 rounded-full border-b-blue-600 animate-spin"></span>
                            </div>
                        )
                        :
                        (
                            <div className="min-h-screen w-full flex justify-center items-center mt-24 lg:mt-32 -translate-y-16">
                                <h2 className="text-2xl font-semibold">No Room Found</h2>
                            </div>
                        )
            }
        </>
    );
}

export default Rooms;