import type { NextPage } from "next";
import { useAuth0 } from "@auth0/auth0-react";
import BookSearch from "./book/search/bookSearch";
import Login from "../components/login";
import { CircularProgress, Box, Container } from "@mui/material";

const Home: NextPage = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return (
      <>
        <div className="loadingCircle">
          <CircularProgress />
        </div>
      </>
    );
  }
  return <>{isAuthenticated ? <BookSearch /> : <Login />}</>;
};

export default Home;
