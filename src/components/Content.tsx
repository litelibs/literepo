"use client";
import { NextUIProvider } from "@nextui-org/react";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Box } from "../components/Box";
import { FileLink } from "../components/FileLink";
import { File } from "../file";
import { pathPrefix } from "@/middleware";

const createFileLinks = (
  files: File[],
  setCurrFile: Dispatch<SetStateAction<File>>,
): JSX.Element => {
  const fileLinks: JSX.Element[] = [];
  for (let i = 0; i < files.length; i++)
    fileLinks.push(
      <div key={i}>
        <FileLink file={files[i]} setCurrFile={setCurrFile} />
      </div>,
    );
  return <>{fileLinks}</>;
};

type Props = {
  filePaths: string[];
  directPath: string | null;
};

export const Content = ({ filePaths, directPath }: Props) => {
  const [isSsr, setIsSsr] = useState(true);
  const rootDir = File.constructFromPaths(filePaths);
  const [currFile, setCurrFile] = useState(
    directPath === null ? rootDir : File.getFromRoot(rootDir, directPath),
  );

  useEffect(() => setIsSsr(false), []);

  useEffect(() => {
    // the replaceState func is randomly appending instead of replacing (presetting to '/' is a patch)
    window.history.replaceState(null, "", "/");
    window.history.replaceState(null, "", pathPrefix + currFile.filePath);
  }, [currFile]);

  if (isSsr) return <></>;

  return (
    <NextUIProvider>
      <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
        <FileLink
          file={currFile.parent || new File("", [], null, "")}
          setCurrFile={setCurrFile}
        />
        {createFileLinks(Object.values(currFile.children), setCurrFile)}
      </Box>
    </NextUIProvider>
  );
};
