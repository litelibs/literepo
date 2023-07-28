import React from "react";
import fs from "fs";
import git from "isomorphic-git";
import { TopNav } from "../components/TopNav";
import { Content } from "../components/Content";
import { Box } from "../components/Box";
import { headers } from "next/headers";
import { headerKeyPath, pathPrefix } from "@/middleware";

export default async function App() {
  const headersList = headers();
  const directPath = headersList.get(headerKeyPath);
  const removePrefix = (pathStr: string): string =>
    pathStr.slice(0, pathPrefix.length + 2) === `/${pathPrefix}/`
      ? pathStr.slice(pathPrefix.length + 1)
      : pathPrefix;

  return (
    <Box css={{ maxW: "100%" }}>
      <TopNav />
      <Content
        filePaths={await git.listFiles({ fs, dir: "." })}
        directPath={directPath === null ? null : removePrefix(directPath)}
      />
    </Box>
  );
}
