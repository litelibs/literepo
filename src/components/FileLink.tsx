import { Link } from "@nextui-org/react";

type Props = {
  fileName: string;
};

export const FileLink = ({ fileName }: Props) => {
  return (
    <>
      <Link href={`${window.location.pathname}${fileName}`}>{fileName}</Link>
      <br />
    </>
  );
};
