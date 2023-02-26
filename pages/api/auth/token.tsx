import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = "63a83d3066ef9970acf9faf8cb5b5992";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret, raw: true });

  res.json({ token });
}
