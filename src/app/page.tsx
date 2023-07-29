import { headerKeyPath } from "@/middleware";
import fs, { access } from "fs";
import { readFile } from "fs/promises";
import git from "isomorphic-git";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Box } from "../components/Box";
import { Content } from "../components/Content";
import { TopNav } from "../components/TopNav";
import { File } from "../file";
import { getStartPath } from "../urlUtils";

const getFileContent = (filePath: string): Promise<string> => {
  return new Promise((resolve) => {
    access(filePath, fs.constants.R_OK, async (error) => {
      let fileStat: fs.Stats;
      let fileObj: Buffer;

      if (error) return resolve("");

      fileStat = fs.lstatSync(filePath);

      if (!fileStat.isFile()) return resolve("");

      fileObj = await readFile(filePath);

      resolve(fileObj.toString());
    });
  });
};

export default async function App() {
  let fileContent: string;
  const headersList = headers();
  const startPath = getStartPath(headersList.get(headerKeyPath) || "");
  const filePaths = await git.listFiles({ fs, dir: "." });
  const rootDir = File.constructFromPaths(filePaths);

  if (!File.isValidPath(rootDir, startPath)) notFound();

  fileContent = await getFileContent(startPath);

  return (
    <Box css={{ maxW: "100%" }}>
      <TopNav />
      <Content
        filePaths={filePaths}
        startPath={startPath}
        fileContent={fileContent}
      />
    </Box>
  );
}
