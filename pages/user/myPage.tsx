import { gql, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";

const GET_USER = gql`
  query getUser($authId: String!) {
    users_table(where: { authId: { _eq: $authId } }) {
      id
      name
      company
    }
  }
`;

const MyPage = () => {
  const { user } = useAuth0();

  const { data } = useQuery(GET_USER, {
    variables: { authId: user && user.sub },
  });

  const user_info = !data ? [] : data.users_table[0];

  return (
    <>
      <div>{user_info.name}</div>
    </>
  );
};

export default MyPage;
