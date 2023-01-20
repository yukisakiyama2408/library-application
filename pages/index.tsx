import type { NextPage } from "next";
import { useAuth0 } from "@auth0/auth0-react";
import BookSearch from "./book/search/bookSearch";
import Login from "./user/login";

const Home: NextPage = () => {
  const { isAuthenticated } = useAuth0();
  return <>{isAuthenticated ? <BookSearch /> : <Login />}</>;
};

export default Home;
