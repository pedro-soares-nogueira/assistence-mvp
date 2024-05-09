import "server-only";

import { Client } from "@notionhq/client";
import React from "react";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const fetchDataBase = React.cache(() => {
  return notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });
});
