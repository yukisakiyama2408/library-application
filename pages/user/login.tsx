import { Auth0Client } from "@auth0/auth0-spa-js";

const auth0 = new Auth0Client({
    domain: 'YOUR_DOMAIN',
    clientId: 'YOUR_CLIENT_ID'
  });
  
//   function (user, context, callback) {
//     const namespace = "https://hasura.io/jwt/claims";
//     context.accessToken[namespace] =
//       {
//         'x-hasura-default-role': 'user',
//         // do some custom logic to decide allowed roles
//         'x-hasura-allowed-roles': ['user'],
//         'x-hasura-user-id': user.user_id
//       };
//     callback(null, user, context);
//   }

