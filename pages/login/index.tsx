import { GetServerSideProps } from "next";
import { getAllUsers, User } from "../../lib/db";
import { useForm, SubmitHandler } from "react-hook-form";


type FormValues = {
    email: String
    password: String
}

const Home = () => {
    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async data => {
        console.log(data);

        const res = await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify(data),
        });

        console.log(res.status)
    }

    return (
        <div className="h-screen bg-gray-500">
            <h1> Login </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" {...register("email")} />
                <input type="password" {...register("password")} />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Home;
