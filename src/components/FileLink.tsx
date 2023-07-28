import { Dispatch, SetStateAction } from "react";
import { Link } from "@nextui-org/react";
import { File } from "../file";

type Props = {
  file: File;
  setCurrFile: Dispatch<SetStateAction<File>>;
};

export const FileLink = ({ file, setCurrFile }: Props) => {
  const isDir = Object.keys(file.children).length > 0;

  return (
    <>
      <Link
        onClick={() => setCurrFile(file)}
        css={{ color: isDir ? "Blue" : "Black", cursor: "pointer" }}
      >
        {file.name}
      </Link>
      <br />
    </>
  );
};
