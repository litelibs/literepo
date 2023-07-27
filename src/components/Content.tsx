"use client";
import { Text, Spacer } from "@nextui-org/react";
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
    <Text h2>Lorem ipsum dolor sit amet</Text>
    <Text size="$lg">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Purus gravida quis
      blandit turpis. Augue neque gravida in fermentum et sollicitudin ac orci.
      Et sollicitudin ac orci phasellus egestas. Elementum tempus egestas sed
      sed risus pretium quam vulputate. Interdum velit euismod in pellentesque
      massa placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text h2>Lorem ipsum dolor sit amet</Text>
    <Text size="$lg">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Purus gravida quis
      blandit turpis. Augue neque gravida in fermentum et sollicitudin ac orci.
      Et sollicitudin ac orci phasellus egestas. Elementum tempus egestas sed
      sed risus pretium quam vulputate. Interdum velit euismod in pellentesque
      massa placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text h2>Lorem ipsum dolor sit amet</Text>
    <Text size="$lg">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Purus gravida quis
      blandit turpis. Augue neque gravida in fermentum et sollicitudin ac orci.
      Et sollicitudin ac orci phasellus egestas. Elementum tempus egestas sed
      sed risus pretium quam vulputate. Interdum velit euismod in pellentesque
      massa placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text h2>Lorem ipsum dolor sit amet</Text>
    <Text size="$lg">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Purus gravida quis
      blandit turpis. Augue neque gravida in fermentum et sollicitudin ac orci.
      Et sollicitudin ac orci phasellus egestas. Elementum tempus egestas sed
      sed risus pretium quam vulputate. Interdum velit euismod in pellentesque
      massa placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text h2>Lorem ipsum dolor sit amet</Text>
    <Text size="$lg">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Purus gravida quis
      blandit turpis. Augue neque gravida in fermentum et sollicitudin ac orci.
      Et sollicitudin ac orci phasellus egestas. Elementum tempus egestas sed
      sed risus pretium quam vulputate. Interdum velit euismod in pellentesque
      massa placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text h2>Lorem ipsum dolor sit amet</Text>
    <Text size="$lg">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Purus gravida quis
      blandit turpis. Augue neque gravida in fermentum et sollicitudin ac orci.
      Et sollicitudin ac orci phasellus egestas. Elementum tempus egestas sed
      sed risus pretium quam vulputate. Interdum velit euismod in pellentesque
      massa placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text h2>Lorem ipsum dolor sit amet</Text>
    <Text size="$lg">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Purus gravida quis
      blandit turpis. Augue neque gravida in fermentum et sollicitudin ac orci.
      Et sollicitudin ac orci phasellus egestas. Elementum tempus egestas sed
      sed risus pretium quam vulputate. Interdum velit euismod in pellentesque
      massa placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text h2>Lorem ipsum dolor sit amet</Text>
    <Text size="$lg">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Purus gravida quis
      blandit turpis. Augue neque gravida in fermentum et sollicitudin ac orci.
      Et sollicitudin ac orci phasellus egestas. Elementum tempus egestas sed
      sed risus pretium quam vulputate. Interdum velit euismod in pellentesque
      massa placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text h2>Lorem ipsum dolor sit amet</Text>
    <Text size="$lg">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Purus gravida quis
      blandit turpis. Augue neque gravida in fermentum et sollicitudin ac orci.
      Et sollicitudin ac orci phasellus egestas. Elementum tempus egestas sed
      sed risus pretium quam vulputate. Interdum velit euismod in pellentesque
      massa placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text h2>Lorem ipsum dolor sit amet</Text>
    <Text size="$lg">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Purus gravida quis
      blandit turpis. Augue neque gravida in fermentum et sollicitudin ac orci.
      Et sollicitudin ac orci phasellus egestas. Elementum tempus egestas sed
      sed risus pretium quam vulputate. Interdum velit euismod in pellentesque
      massa placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text h2>Lorem ipsum dolor sit amet</Text>
    <Text size="$lg">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Purus gravida quis
      blandit turpis. Augue neque gravida in fermentum et sollicitudin ac orci.
      Et sollicitudin ac orci phasellus egestas. Elementum tempus egestas sed
      sed risus pretium quam vulputate. Interdum velit euismod in pellentesque
      massa placerat duis ultricies.
    </Text>
    <Spacer y={1} />
    <Text h2>Lorem ipsum dolor sit amet</Text>
    <Text size="$lg">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Purus gravida quis
      blandit turpis. Augue neque gravida in fermentum et sollicitudin ac orci.
      Et sollicitudin ac orci phasellus egestas. Elementum tempus egestas sed
      sed risus pretium quam vulputate. Interdum velit euismod in pellentesque
      massa placerat duis ultricies.
    </Text>
    <Spacer y={1} />
  </Box>
);
