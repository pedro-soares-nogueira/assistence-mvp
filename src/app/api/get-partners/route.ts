import { fetchDataBase } from "@/libs/notion-client";
import { NextApiResponse } from "next";

export async function GET(request: Request, response: NextApiResponse) {
  const data = await fetchDataBase();
  const partners = data.results;

  if (!partners) {
    throw new Error("Error to get partners");
  }

  return Response.json({ partners });
}
