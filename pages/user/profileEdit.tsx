import { gql, useMutation, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, TextField, Container, Grid, Button } from "@mui/material";

const GET_USER_INFO = gql`
  query getUser($authId: String!) {
    users_table(where: { authId: { _eq: $authId } }) {
      name
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($authId: String!, $name: String!) {
    update_users_table(
      where: { authId: { _eq: $authId } }
      _set: { name: $name }
    ) {
      affected_rows
      returning {
        name
      }
    }
  }
`;

const ProfileEdit = () => {
  const router = useRouter();
  const { user } = useAuth0();
  console.log(user);
  const { data } = useQuery(GET_USER_INFO, {
    variables: { authId: user && user.sub },
  });
  const userInfomation = !data ? [] : data.users_table[0];
  const [name, setName] = useState(userInfomation.name);
  useEffect(() => {
    setName(userInfomation.name);
  }, [userInfomation]);
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      setName(" ");
    },
  });
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUser({
      variables: {
        authId: user && user.sub,
        name: name,
      },
    });
    router.push("/user/myPage");
  };

  return (
    <div>
      <div>
        <Container component="main" maxWidth="xs">
          <Box
            component="form"
            onSubmit={(e) => handleUpdateUser(e)}
            sx={{ mt: 1 }}
          >
            <h2>Update</h2>
            <Grid container spacing={2}>
              <Grid item xs={30}>
                <TextField
                  type="text"
                  name="name"
                  placeholder="名前"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button variant="contained" type="submit">
              更新
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default ProfileEdit;
