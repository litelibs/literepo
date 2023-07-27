"use client";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Box } from "../components/Box";
import { FileLink } from "../components/FileLink";
import { File } from "../file";

const createFileLinks = (
  files: File[],
  setCurrFile: Dispatch<SetStateAction<File>>,
): JSX.Element => {
  const fileLinks: JSX.Element[] = [];
  for (let i = 0; i < files.length; i++)
    fileLinks.push(<FileLink file={files[i]} setCurrFile={setCurrFile} />);
  return <>{fileLinks}</>;
};

type Props = {
  filePaths: string[];
};

export const Content = ({ filePaths }: Props) => {
  const rootDir = File.constructFromPaths(filePaths);
  const [currFile, setCurrFile] = useState(rootDir);

  useEffect(() => {
    // the replaceState func is randomly appending instead of replacing (presetting to '/' is a patch)
    window.history.replaceState(null, "", "/");
    window.history.replaceState(null, "", "path" + currFile.filePath);
  }, [currFile]);

  return (
    <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
      <FileLink
        file={currFile.parent || new File("/", [], null, "/")}
        setCurrFile={setCurrFile}
      />
      {createFileLinks(Object.values(currFile.children), setCurrFile)}
    </Box>
  );
};
