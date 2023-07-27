import { Link } from "@nextui-org/react";
import { File } from "../file";
import { useRouter } from "next/navigation";

type Props = {
  file: File;
  isParent?: boolean;
};

export const FileLink = ({ file, isParent }: Props) => {
  const isDir = Object.keys(file.children).length > 0;
  const router = useRouter();
  const currPath =
    window.location.pathname === "/" ? "" : window.location.pathname;

  const onPressLink = (
    pathName: string,
    fileName: string,
    isToParent: boolean,
  ) => {
    const newPath = isToParent
      ? pathName.split("/").slice(0, -1).join("/")
      : `${pathName}/${fileName}`;
    window.history.pushState(null, "", newPath);
    router.refresh();
  };

  return (
    <>
      <Link
        onPress={() => onPressLink(currPath, file.name, isParent || false)}
        css={{ color: isDir ? "Blue" : "Black", cursor: "pointer" }}
      >
        {isParent ? "../" : file.name}
      </Link>
      <br />
    </>
  );
};
