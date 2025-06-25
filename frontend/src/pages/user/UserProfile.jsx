import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, UserContainer, UserSidebar, Heading, Input } from "../../components";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function UserProfile(){
    const user = useSelector()
    //start here

    const {register, handleSubmit, getValues, setValue, watch} = useForm({defaultValues: {
        fullName:'',
        email:'',
        phone:'',
        password:'',
        image:''
    }});

    const handleUpdateProfile = (profileData) => {
        console.log(profileData);
    }

    const image = watch('image');

    return (
        <section className="flex min-h-[70vh]">
            <UserSidebar />

            <UserContainer>
                <section className="my-auto">

                    <Heading heading="My Profile" subHeading="Easily manage edit and manage your profile from here and share whatever you like. This data is safe and secure with us." />

                    <div className="flex gap-4 mt-16 relative">
                        <div
                            className="w-full lg:w-4/5 xl:w-3/5 shadow-[-5px_-5px_20px_rgba(0,0,0,0.1),5px_5px_20px_rgba(0,0,0,0.1)] p-4 rounded-xl h-fit">
                            <div>
                                <form onSubmit={handleSubmit(handleUpdateProfile)}>
                                    {/* <!-- Profile Image --> */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <label>
                                            <Input type="file" hidden onChange={(e) => setValue('image', e.target.files[0])} />

                                            <img src={image instanceof File ? URL.createObjectURL(image) : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} alt="user image" className="h-24 w-24 object-cover rounded-full cursor-pointer border-2 border-blue-200" />
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
            </UserContainer>
        </section>
    );
}

export default UserProfile;