// lazy
"use client"; // yep
// too lazy

import React from "react";
import { TopNav } from "../components/TopNav";
import { Content } from "../components/Content";
import { Box } from "../components/Box";

export default function App() {
  return (
    <Box css={{ maxW: "100%" }}>
      <TopNav />
      <Content />
    </Box>
  );
}
