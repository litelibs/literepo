"use client";
import { Button, Link, Navbar, NextUIProvider, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const TopNav = (): JSX.Element => {
  const [isSsr, setIsSsr] = useState(true);

  useEffect(() => setIsSsr(false), []);

  if (isSsr) return <></>;

  return (
    <NextUIProvider>
      <Navbar maxWidth={"fluid"} disableBlur isBordered variant={"sticky"}>
        <Navbar.Brand>
          {/*<AcmeLogo />*/}
          <Text
            css={{ paddingLeft: "12px" }}
            size={"x-large"}
            weight={"extrabold"}
            color="inherit"
            hideIn="xs"
          >
            literepo
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link isActive href="#">
            Customers
          </Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </NextUIProvider>
  );
};
