import React from "react";
import { TopNav } from "../components/TopNav";
import { Content } from "../components/Content";
import { Box } from "../components/Box";
import fs from "fs";
import git from "isomorphic-git";

export default async function App() {
  return (
    <Box css={{ maxW: "100%" }}>
      <TopNav />
      <Content filePaths={await git.listFiles({ fs, dir: "." })} />
    </Box>
  );
}
