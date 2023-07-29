import { Link } from "@nextui-org/react";
import { File } from "../file";
import { pathPrefix } from "../middleware";

type Props = {
  file: File;
  isLinkDisabled?: boolean;
  text?: string;
};

export const FileLink = ({
  file,
  isLinkDisabled,
  text,
}: Props): JSX.Element => {
  const isDir = Object.keys(file.children).length > 0;
  const innerText = text ? text : file.name;

  return isLinkDisabled ? (
    <Link css={{ color: "Black", cursor: "default" }}>{innerText}</Link>
  ) : (
    <Link
      css={{ color: isDir ? "Blue" : "Black", cursor: "pointer" }}
      href={"/" + pathPrefix + "/" + file.filePath}
    >
      {innerText}
    </Link>
  );
};
