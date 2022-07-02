import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { getAllUsers, User } from "../lib/db";

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await getAllUsers();
  return {
    props: {
      users,
    },
  };
};

interface PostProps {
  users: User[];
}

const Home = ({ users }: PostProps) => {

  useEffect(() => {
    console.log(users)
  }, [users])

  const post = async () => {
    await fetch("/api/user", {
      method: "POST",
      //body: JSON.stringify(description),
    });
  };

  return (
    <div className="h-screen bg-gray-500">
      {users.map(user=> (
        <div key={user.id}>
          <h1> {user.name} </h1>
        </div>
      ))}
    </div>
  );
};

export default Home;
