"use client";
import { Box } from "../components/Box";
import { FileLink } from "../components/FileLink";
import { File } from "../file";

const createFileLinks = (files: File[]): JSX.Element => {
  const fileLinks: JSX.Element[] = [];
  for (let i = 0; i < files.length; i++)
    fileLinks.push(<FileLink file={files[i]} />);
  return <>{fileLinks}</>;
};

const getCurrFile = (root: File, currPath: string): File => {
  let currFile = root;
  let pathSections: string[];

  if (currPath === "/") return root;

  pathSections = currPath.split("/").slice(1);
  for (let i = 0; i < pathSections.length; i++) {
    currFile = currFile.children[pathSections[i]];
  }
  return currFile;
};

type Props = {
  currPath: string;
  filePaths: string[];
};

export const Content = ({ currPath, filePaths }: Props) => {
  const rootDir = File.constructFromPaths(filePaths);
  const currFile = getCurrFile(rootDir, currPath);

  return (
    <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
      <FileLink
        file={currFile.parent || new File("./", [], null)}
        isParent={true}
      />
      {createFileLinks(Object.values(currFile.children))}
    </Box>
  );
};
