import { headerKeyPath, pathPrefix } from "@/middleware";
import fs from "fs";
import git from "isomorphic-git";
import { headers } from "next/headers";
import { Box } from "../components/Box";
import { Content } from "../components/Content";
import { TopNav } from "../components/TopNav";

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
