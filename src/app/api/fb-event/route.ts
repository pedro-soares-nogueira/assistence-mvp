import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const fb_pixel_id = "356841944149440";
const fb_access_token =
  "EAAFamyfZAE7cBO9noAItNPefU2fRW73bYMDYaovcmCqfGDFk1LYP97l6Soig2k6Gsa31ylR7OZByW7tiZCQlx9gfRP6s0NCltsYODuotVgPjlnzFpbGvKYFYT6ZBZCDDLdqF689Q2XfwdHhvT1wwmcsWXzPiXJpW5eaS39aYx5UjCEbTg47PsQoM6BUIedxzQ7AZDZD";

const url = `https://graph.facebook.com/v16.0/${fb_pixel_id}/events?access_token=${fb_access_token}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const userData = req.body;

      if (!userData.event_name) {
        res.status(400).json({ error: "event_name is required" });
        return;
      }

      const event_name = userData.event_name;
      const client_user_agent = userData.client_user_agent || "";
      const client_ip_address = userData.client_ip_address || "";
      const event_time = Math.round(Date.now() / 1000);

      const hashData = (data: string) =>
        data ? crypto.createHash("sha256").update(data).digest("hex") : "";

      const name = hashData(userData.name);
      const email = hashData(userData.email);
      const whatsapp = hashData(userData.whatsapp);
      const country = hashData(userData.country);
      const uf = hashData(userData.uf);
      const city = hashData(userData.city);
      const cep = hashData(userData.cep);
      const currency = userData.currency || "";

      const fbc = userData.fbc || "";
      const fbp = userData.fbp || "";
      const event_id = userData.event_id || "";

      const user_data = {
        fn: name,
        em: email,
        ph: whatsapp,
        country: country,
        st: uf,
        ct: city,
        zp: cep,
        client_user_agent: client_user_agent,
        client_ip_address: client_ip_address,
        fbc: fbc,
        fbp: fbp,
      };

      const data = {
        event_name: event_name,
        event_time: event_time,
        event_id: event_id,
        user_data: user_data,
        action_source: "website",
        currency: currency,
        value: 0.0,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [data] }),
      });

      if (!response.ok) {
        res
          .status(response.status)
          .json({ error: "Error sending data to Facebook" });
        return;
      }

      const responseData = await response.json();
      res.status(200).json(responseData);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
