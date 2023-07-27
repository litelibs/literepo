import React from "react";
import { TopNav } from "../components/TopNav";
import { Content } from "../components/Content";
import { Box } from "../components/Box";
import fs from "fs";
import git from "isomorphic-git";
import { headers } from "next/headers";

export default async function App() {
  const headersList = headers();
  //const url = new URL(
  //  headersList.get("referer") || process.env.NEXT_PUBLIC_SITE_URL || "",
  //);

  return (
    <Box css={{ maxW: "100%" }}>
      <TopNav />
      <Content
        //pathInit={url.pathname}
        filePaths={await git.listFiles({ fs, dir: "." })}
      />
    </Box>
  );
}
