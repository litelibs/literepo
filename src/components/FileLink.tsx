import { Dispatch, SetStateAction } from "react";
import { Link } from "@nextui-org/react";
import { File } from "../file";

type Props = {
  file: File;
  setCurrFile: Dispatch<SetStateAction<File>>;
  isLinkDisabled?: boolean;
};

export const FileLink = ({
  file,
  setCurrFile,
  isLinkDisabled,
}: Props): JSX.Element => {
  const isDir = Object.keys(file.children).length > 0;

  return isLinkDisabled ? (
    <Link css={{ color: "Black", cursor: "default" }}>{file.name}</Link>
  ) : (
    <Link
      onClick={() => setCurrFile(file)}
      css={{ color: isDir ? "Blue" : "Black", cursor: "pointer" }}
    >
      {file.name}
    </Link>
  );
};
