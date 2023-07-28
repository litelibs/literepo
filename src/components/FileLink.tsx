import { Link } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { File } from "../file";

type Props = {
  file: File;
  setCurrFile: Dispatch<SetStateAction<File>>;
  isLinkDisabled?: boolean;
  text?: string;
};

export const FileLink = ({
  file,
  setCurrFile,
  isLinkDisabled,
  text,
}: Props): JSX.Element => {
  const isDir = Object.keys(file.children).length > 0;
  const innerText = text ? text : file.name;

  return isLinkDisabled ? (
    <Link css={{ color: "Black", cursor: "default" }}>{innerText}</Link>
  ) : (
    <Link
      onClick={() => setCurrFile(file)}
      css={{ color: isDir ? "Blue" : "Black", cursor: "pointer" }}
    >
      {innerText}
    </Link>
  );
};
