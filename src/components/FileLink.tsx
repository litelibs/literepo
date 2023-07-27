import { Link } from "@nextui-org/react";
import { File } from "../file";

type Props = {
  file: File;
};

export const FileLink = ({ file }: Props) => {
  const isDir = Object.keys(file.children).length > 0;

  return (
    <>
      <Link
        css={{ color: isDir ? "Blue" : "Black" }}
        href={`${window.location.pathname}${file.name}`}
      >
        {`${file.name}${isDir ? "/" : ""}`}
      </Link>
      <br />
    </>
  );
};
