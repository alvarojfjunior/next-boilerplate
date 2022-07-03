// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data:User = JSON.parse(req.body);
    await createUser(data);
    return res.status(200).json({ message: "Success" });
  }

  res.status(200).json({ name: "John Doe" });
}
