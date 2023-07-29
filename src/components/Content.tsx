"use client";
import { NextUIProvider } from "@nextui-org/react";
import { JSX, useEffect, useState } from "react";
import { Box } from "../components/Box";
import { FileLink } from "../components/FileLink";
import { FileNav } from "../components/FileNav";
import { File } from "../file";

const createFileLinks = (files: File[]): JSX.Element => {
  const fileLinks: JSX.Element[] = [];
  for (let i = 0; i < files.length; i++)
    fileLinks.push(
      <div key={i}>
        <FileLink file={files[i]} />
      </div>,
    );
  return <>{fileLinks}</>;
};

type Props = {
  filePaths: string[];
  startPath: string;
  fileContent: string;
};

export const Content = ({
  filePaths,
  startPath,
  fileContent,
}: Props): JSX.Element => {
  const [isSsr, setIsSsr] = useState(true);
  const rootDir = File.constructFromPaths(filePaths);
  const currFile = File.getFromRoot(rootDir, startPath);

  useEffect(() => setIsSsr(false), []);

  if (isSsr) return <></>;

  return (
    <NextUIProvider>
      <Box css={{ px: "$14", mt: "$8", "@xsMax": { px: "$10" } }}>
        <FileNav files={currFile.toFilePath()} currFile={currFile} />
        {createFileLinks(Object.values(currFile.children))}
        <br />
        {fileContent}
      </Box>
    </NextUIProvider>
  );
};
