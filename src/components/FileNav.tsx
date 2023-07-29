import { JSX } from "react";
import { File } from "../file";
import { FileLink } from "./FileLink";

const createFilesList = (files: File[], currFile: File): JSX.Element => {
  const fileLinks: JSX.Element[] = [];
  const repoName = "usagef";

  for (let i = 0; i < files.length; i++)
    fileLinks.push(
      <span key={i}>
        {i > 0 && <span style={{ padding: "0 6px" }}>/</span>}
        <FileLink
          file={files[i]}
          isLinkDisabled={files[i] === currFile}
          text={i === 0 ? repoName : files[i].name}
        />
      </span>,
    );

  return <>{fileLinks}</>;
};

type Props = {
  files: File[];
  currFile: File;
};

export const FileNav = ({ files, currFile }: Props): JSX.Element => {
  return createFilesList(files, currFile);
};
