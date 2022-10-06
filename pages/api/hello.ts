// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  // <Data>
) {
  const query = `query {
    books {
      id
      title
      addedAt
    }
  }`
  const respose = await fetch('https://library-database.hasura.app/v1/graphql',{method:"POST",body:JSON.stringify({query})});  
  const data = await respose.json();
  res.status(200).json({ data });
}
