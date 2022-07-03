// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { createUser, getAllUsers } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    await createUser(data);
    return res.status(200).json({ message: "Success" });
  } else if (req.method === "GET") {
    const data = await getAllUsers();
    return res.status(200).json({ message: "Success", data: data });
  }

  return res.status(404).json({ message: "Not found" });
}
