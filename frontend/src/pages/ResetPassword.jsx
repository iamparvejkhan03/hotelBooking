import { useForm } from "react-hook-form";
import { Container } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../components";
import toast from "react-hot-toast";
import axios from "axios";

function ResetPassword() {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            newPassword:''
        }
    })

    const { search } = useLocation();
    const navigate = useNavigate();

    const resetPasswordHandler = async (formData) => {
        try {
            const id = search.split("=")[1];

            const { data } = await axios.put(`/api/v1/users/reset-password?id=${id}`, {newPassword:formData.newPassword});

            if(data.success){
                toast.success(data.message);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <Container className="mt-24 lg:mt-32 flex items-center justify-center">
            <section className="w-full mx-5 sm:w-1/2 lg:w-1/3 xl:w-1/4 bg-white px-6 sm:px-8 md:px-10 py-10 rounded-md drop-shadow-xl drop-shadow-blue-300 relative flex overflow-hidden">
                <form onSubmit={handleSubmit(resetPasswordHandler)} className="w-full">
                    <h3 className="text-2xl text-center mb-3">Reset Password</h3>

                    <Input type="password" placeholder="New Password" className="focus-within:outline-2 focus-within:outline-blue-300" {...register('newPassword', { required: true })} />

                    <button className="w-full bg-blue-500 py-2 text-white rounded cursor-pointer my-2 font-light" type="submit">Reset</button>
                </form>
            </section>
        </Container>
    );
}

export default ResetPassword;