import { headerKeyPath } from "@/middleware";
import fs, { access } from "fs";
import { readFile } from "fs/promises";
import git from "isomorphic-git";
import { headers } from "next/headers";
import { Box } from "../components/Box";
import { Content } from "../components/Content";
import { TopNav } from "../components/TopNav";
import { getStartPath } from "../urlUtils";

const getFileContent = (filePath: string): Promise<string> => {
  return new Promise(async (resolve) => {
    access(filePath, fs.constants.R_OK, async (error) => {
      let fileStat: fs.Stats;
      let fileObj: Buffer;

      if (error) return resolve("invalid path '" + filePath + "'");

      fileStat = fs.lstatSync(filePath);

      if (!fileStat.isFile()) return resolve("");

      fileObj = await readFile(filePath);

      resolve(fileObj.toString());
    });
  });
};

export default async function App() {
  const headersList = headers();
  const startPath = getStartPath(headersList.get(headerKeyPath) || "");
  const fileContent = await getFileContent(startPath);

  return (
    <Box css={{ maxW: "100%" }}>
      <TopNav />
      <Content
        filePaths={await git.listFiles({ fs, dir: "." })}
        startPath={startPath}
        fileContent={fileContent}
      />
    </Box>
  );
}
