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

type Props = {
  filePaths: string[];
};

export const Content = ({ filePaths }: Props) => {
  const rootDir = File.constructFromPaths(filePaths);
  return (
    <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
      {createFileLinks(Object.values(rootDir.children))}
    </Box>
  );
};
