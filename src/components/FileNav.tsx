import { Dispatch, SetStateAction } from "react";
import { FileLink } from "./FileLink";
import { File } from "../file";

const createFilesList = (
  files: File[],
  currFile: File,
  setCurrFile: Dispatch<SetStateAction<File>>,
): JSX.Element => {
  const fileLinks: JSX.Element[] = [];

  for (let i = 0; i < files.length; i++)
    fileLinks.push(
      <span key={i}>
        {i > 0 && <span style={{ padding: "0 6px" }}>/</span>}
        <FileLink
          file={files[i]}
          setCurrFile={setCurrFile}
          isLinkDisabled={files[i] === currFile}
        />
      </span>,
    );

  return <>{fileLinks}</>;
};

type Props = {
  files: File[];
  currFile: File;
  setCurrFile: Dispatch<SetStateAction<File>>;
};

export const FileNav = ({
  files,
  currFile,
  setCurrFile,
}: Props): JSX.Element => {
  return createFilesList(files, currFile, setCurrFile);
};
