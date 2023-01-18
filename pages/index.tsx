import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import BookIndex from "./book/book-index";
import Login from "./user/login";

const Home: NextPage = () => {
  const { isAuthenticated } = useAuth0();
  return <>{isAuthenticated ? <BookIndex /> : <Login />}</>;
};

export default Home;
