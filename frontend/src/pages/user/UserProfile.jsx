import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContainer, UserSidebar, Heading, Input, DeleteModalDialogue } from "../../components";
import { faCamera, faTrashCan, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleIsUserLoggedIn, toggleShowUserAuthForm, updateUser } from "../../features/forms/UserAuthSlice.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UserProfile() {
    const user = useSelector(state => state.user.user);

    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            fullName: user.fullName || '',
            email: user.email || '',
            phone: user.phone || '',
            password: '',
            image: user.image || ''
        }
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdateProfile = async (profileData) => {
        try {
            const formData = new FormData();
            formData.append('fullName', profileData.fullName);
            formData.append('email', profileData.email);
            formData.append('phone', profileData.phone);
            formData.append('password', profileData.password);
            
            if(profileData.image[0] instanceof File){
                formData.append('image', profileData.image[0]);
            }

            const { data } = await axios.put('/api/v1/users/update', formData, {headers:{Authorization: `Bearer ${user.accessToken}`, 'Content-Type':'multipart/form-data'}});

            if(data){
                console.log(data.data);
                const accessToken = data.data.accessToken;
                dispatch(toggleIsUserLoggedIn(true));
                dispatch(updateUser({...data.data.user, accessToken}));
                toast.success(data.message);
            }
        } catch (error) {
            console.error(error.message);
            toast.error(error.response.data.message);
        }
    }

    const handleDeleteProfile = async () => {
        try {
            const { data } = await axios.delete('/api/v1/users/delete', {headers: {Authorization: `Bearer ${user.accessToken}`}});

            if(data.success){
                dispatch(toggleIsUserLoggedIn(false));
                dispatch(updateUser({}));
                toast.success(data.message);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }

    const image = watch('image');
    const [showDeleteModal, setShowDeleteModel] = useState(false);

    return (
        <section className="flex min-h-[70vh]">
            {
                showDeleteModal && (
                <div className="top-0 left-0 right-0 bottom-0 bg-black/70 z-50 flex items-center justify-center fixed">
                    <DeleteModalDialogue popToHide={setShowDeleteModel} funcToRun={handleDeleteProfile} />
                </div>)
            }

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
                                        <form onSubmit={handleSubmit(handleUpdateProfile)} encType="multipart/form-data">
                                            {/* <!-- Profile Image --> */}
                                            <div className="absolute top-0 left-1/2 -translate-1/2 rounded-full overflow-hidden h-24 w-24 border-2 border-blue-200">
                                                <label className="w-full h-full relative group">
                                                    <input type="file" {...register('image')} hidden />

                                                    <img src={image?.[0] instanceof File ? URL.createObjectURL(image[0]) : image ? image : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} alt="user image" className="w-full h-full object-cover cursor-pointer peer" />

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

                                        <div className="w-full rounded bg-red-500 mt-4 text-white text">
                                            <button onClick={() => {setShowDeleteModel(true)}} className="w-full p-2 cursor-pointer">
                                                <FontAwesomeIcon icon={faTrashCan} />
                                                <span className="mx-2">Delete Profile</span>
                                            </button>
                                        </div>
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