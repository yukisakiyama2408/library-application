// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { request, gql } from "graphql-request";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  // <Data>
) {
  const query = gql`
    {
      books_table {
        id
        title
        author
        image_url
      }
    }
  `;
  request("https://fgn-library.hasura.app/v1/graphql", query).then((data) =>
    console.log(data)
  );
  const respose = await fetch("https://fgn-library.hasura.app/v1/graphql", {
    method: "POST",
    body: JSON.stringify({ query }),
  });
  const data = await respose.json();
  res.status(200).json({ data });
}
