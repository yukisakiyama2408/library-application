import { useSession, signIn, signOut } from "next-auth/react";

const LoginBtn = () => {
  //   const { data: session } = useSession();
  //   if (session) {
  //     return (
  //       <>
  //         {" "}
  //         Signed in as {session.user && session.user.email} <br />{" "}
  //         <button onClick={() => signOut()}>Sign out</button>{" "}
  //       </>
  //     );
  //   }
  return (
    <>
      aa
      {/* {" "}
      Not signed in <br /> <button onClick={() => signIn()}>
        Sign in
      </button>{" "} */}
    </>
  );
};

export default LoginBtn;
