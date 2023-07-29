"use client";
import { NextUIProvider } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { JSX } from "react";
import { Box } from "../components/Box";
import { FileLink } from "../components/FileLink";
import { FileNav } from "../components/FileNav";
import { File } from "../file";

const createFileLinks = (files: File[]): JSX.Element => {
  const fileLinks: JSX.Element[] = [];
  for (let i = 0; i < files.length; i++)
    fileLinks.push(
      <div key={i}>
        <FileLink file={files[i]} />
      </div>,
    );
  return <>{fileLinks}</>;
};

type Props = {
  filePaths: string[];
  startPath: string;
  fileContent: string;
};

export const Content = ({
  filePaths,
  startPath,
  fileContent,
}: Props): JSX.Element => {
  const rootDir = File.constructFromPaths(filePaths);
  const currFile = File.getFromRoot(rootDir, startPath);

  return (
    <NextUIProvider key={window?.location?.pathname}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.01 }}
        >
          <Box css={{ px: "$14", mt: "$8", "@xsMax": { px: "$10" } }}>
            <FileNav files={currFile.toFilePath()} currFile={currFile} />
            {createFileLinks(Object.values(currFile.children))}
            <br />
            {fileContent}
          </Box>
        </motion.div>
      </AnimatePresence>
    </NextUIProvider>
  );
};
