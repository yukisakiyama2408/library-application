import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Box, Grid } from "@mui/material";

const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="login_btn">
        {isAuthenticated ? (
          <Button onClick={handleLogout} variant="contained">
            ログアウト
          </Button>
        ) : (
          <Button onClick={loginWithRedirect} variant="contained">
            ログイン
          </Button>
        )}
      </div>
    </>
  );
};

export default Login;
