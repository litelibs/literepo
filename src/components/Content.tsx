"use client";
import { Box } from "../components/Box";
import { FileLink } from "../components/FileLink";

const createFileLinks = (fileNames: string[]): JSX.Element => {
  const fileLinks: JSX.Element[] = [];
  for (let i = 0; i < fileNames.length; i++)
    fileLinks.push(<FileLink fileName={fileNames[i]} />);
  return <>{fileLinks}</>;
};

type Props = {
  fileNames: string[];
};

export const Content = ({ fileNames }: Props) => (
  <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
    {createFileLinks(fileNames)}
  </Box>
);
