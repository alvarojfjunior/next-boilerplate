import { GetServerSideProps } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { getAllUsers, User } from "../lib/db";
import styles from '../styles/Home.module.css'

interface PostProps {
  users: User[];
}

type FormValues = {
  name: String
  email: String
  password: String
}

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await getAllUsers();
  return {
    props: {
      users,
    },
  };
};

const Home = ({ users }: PostProps) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async data => {
    console.log(data);

    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log(res)

    if (res.status === 200) toast("Pronto", {type: "success"});
    else toast(`Hove um problema`, {type: "error"});

  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Nome"  {...register("name")} />
        <input type="email" placeholder="Email" {...register("email")} />
        <input type="password" placeholder="Senha" {...register("password")} />
        <input type="submit" />
      </form>

      {users.map(user => (
        <div key={user.id}>
          <h1> {user.id}, {user.name}, {user.email}, {user.password} </h1>
        </div>
      ))}


    </div>
  );
};

export default Home;
