import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div>
        {isAuthenticated ? (
          <button onClick={handleLogout}>ログアウト</button>
        ) : (
          <button onClick={loginWithRedirect}>ログイン</button>
        )}
      </div>
    </>
  );
};

export default Login;
