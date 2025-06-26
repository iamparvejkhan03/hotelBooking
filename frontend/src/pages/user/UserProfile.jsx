import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContainer, UserSidebar, Heading, Input } from "../../components";
import { faCamera, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleIsUserLoggedIn, toggleShowUserAuthForm, updateUser } from "../../features/forms/UserAuthSlice.js";
import toast from "react-hot-toast";

function UserProfile() {
    const user = useSelector(state => state.user.user);

    const { register, handleSubmit, getValues, setValue, watch } = useForm({
        defaultValues: {
            fullName: user.fullName || '',
            email: user.email || '',
            phone: user.phone || '',
            password: '',
            image: user.image || ''
        }
    });

    const dispatch = (useDispatch());

    const handleUpdateProfile = async (profileData) => {
        console.log(profileData);
        try {
            const { data } = await axios.put('/api/v1/users/update', {fullName:profileData.fullName, email:profileData.email, phone:profileData.phone, password:profileData.password, image:profileData.image}, {headers:{Authorization: `Bearer ${user.accessToken}`}});

            if(data){
                console.log(data);
                const accessToken = data.data.accessToken;
                dispatch(toggleIsUserLoggedIn(true));
                dispatch(toggleShowUserAuthForm(false));
                dispatch(updateUser({...data.data.user, accessToken}));
                toast.success(data.message);
            }
        } catch (error) {
            console.error(error.message);
            toast.error(error.response.data.message);
        }
    }

    const image = watch('image');

    return (
        <section className="flex min-h-[70vh]">
            <UserSidebar />

            <UserContainer>
                {
                    user
                        ?
                        <section className="my-auto">

                            <Heading heading="My Profile" subHeading="Easily manage edit and manage your profile from here and share whatever you like. This data is safe and secure with us." />

                            <div className="flex gap-4 mt-16">
                                <div
                                    className="w-full lg:w-4/5 xl:w-3/5 shadow-[-5px_-5px_20px_rgba(0,0,0,0.1),5px_5px_20px_rgba(0,0,0,0.1)] p-4 rounded-xl h-fit relative">
                                    <div>
                                        <form onSubmit={handleSubmit(handleUpdateProfile)}>
                                            {/* <!-- Profile Image --> */}
                                            <div className="absolute top-0 left-1/2 -translate-1/2 rounded-full overflow-hidden h-24 w-24 border-2 border-blue-200">
                                                <label className="w-full h-full relative group">
                                                    {/* <Input name="image" type="file" hidden onChange={(e) => setValue('image', e.target.files[0])} /> */}

                                                    <input type="file" name="image" hidden onChange={(e) => setValue('image', e.target.files[0])} />

                                                    <img src={image instanceof File ? URL.createObjectURL(image) : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} alt="user image" className="w-full h-full object-cover cursor-pointer peer" />

                                                    <div className="absolute top-1/2 left-1/2 -translate-1/2 h-full w-full bg-gray-800/40 group-hover:flex items-center justify-center hidden cursor-pointer">
                                                        <div>
                                                            <FontAwesomeIcon icon={faCamera} className="text-white text-lg" />
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-2 mt-14">
                                                <div className="w-full">
                                                    <Input type="text" placeholder="Your full name" label="Full Name" {...register('fullName')} />
                                                </div>
                                                <div className="w-full">
                                                    <Input type="email" placeholder="Your e-mail" label="Email" {...register('email')} />
                                                </div>
                                                <div className="w-full">
                                                    <Input type="tel" placeholder="Your contact no." label="Phone" {...register('phone')} />
                                                </div>
                                                <div className="w-full">
                                                    <Input type="password" placeholder="Your password" label="Password" {...register('password')} />
                                                </div>
                                            </div>
                                            <div className="w-full rounded bg-blue-500 mt-4 text-white text">
                                                <button type="submit" className="w-full p-2 cursor-pointer">
                                                    <FontAwesomeIcon icon={faUserEdit} />
                                                    <span className="mx-2">Update Profile</span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                        :
                        ''
                }
            </UserContainer>
        </section>
    );
}

export default UserProfile;