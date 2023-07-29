import { headerKeyPath } from "@/middleware";
import fs from "fs";
import git from "isomorphic-git";
import { headers } from "next/headers";
import { Box } from "../components/Box";
import { Content } from "../components/Content";
import { TopNav } from "../components/TopNav";
import { getStartPath } from "../urlUtils";

export default async function App() {
  const headersList = headers();
  const startPath = getStartPath(headersList.get(headerKeyPath) || "");

  return (
    <Box css={{ maxW: "100%" }}>
      <TopNav />
      <Content
        filePaths={await git.listFiles({ fs, dir: "." })}
        startPath={startPath}
      />
    </Box>
  );
}
