import assert from "assert";
import itParam from "mocha-param";
import { getStartPath, pathPrefix } from "../../src/urlUtils";

describe("getStartPath", () => {
  itParam(
    "",
    [
      ["", "/"],
      [pathPrefix, "/"],
      [pathPrefix + "/", "/"],
      [pathPrefix + "/this", "this"],
      [pathPrefix + "/something/to/try.go", "something/to/try.go"],
    ],
    (testCase: string[]) => {
      assert.equal(getStartPath(testCase[0]), testCase[1]);
    },
  );
});
