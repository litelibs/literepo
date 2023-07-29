import { pathPrefix } from "./middleware";
export { pathPrefix };

export const getStartPath = (urlPathname: string): string => {
  let startIndex = 0;
  let indexed: string;
  const stripped = urlPathname.replace(pathPrefix, "");

  while (stripped[startIndex] === "/") startIndex++;

  indexed = stripped.slice(startIndex);

  return indexed.length <= 0 ? "/" : indexed;
};
