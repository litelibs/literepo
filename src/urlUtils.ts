import { pathPrefix } from "./middleware";
export { pathPrefix };

export const getStartPath = (urlPathname: string): string => {
  const stripped = urlPathname.replace(pathPrefix, "");
  if (stripped.length <= 1) return "/";
  return stripped.slice(1);
};
