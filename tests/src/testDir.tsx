import assert from "assert";
import { File } from "../../src/file";

describe("constructFromPaths", function () {
  it("empty input", function () {
    assert.deepEqual(File.constructFromPaths([]), new File("/"));
  });

  it("one name", function () {
    assert.deepEqual(File.constructFromPaths(["thisfile"]), new File());
  });

  it("multi level single dir", function () {
    assert.deepEqual(createFileTree(["thisfile/here/and/there"]), {
      thisfile: {
        here: {
          and: {
            there: null,
          },
        },
      },
    });
  });

  it("multi level multi dir", function () {
    assert.deepEqual(
      createFileTree([
        ".filea.txt",
        "thisfile/here/and/there.js",
        "thisfile/here/and/orhere.js",
        "thisfile/here/nadaelse.java",
        "thisfile/here/gotcha.java",
        "onefile.yaml",
        "twofile.config",
        "randomdir/with/files.txt",
        "randomdir/onlyone",
        "thisfile/wowzers.json",
        "thisfile/here/and/another/thing.something",
      ]),
      {
        ".filea": null,
        randomdir: {
          with: {
            files: null,
          },
          onlyone: null,
        },
        thisfile: {
          here: {
            and: {
              another: {
                thing: null,
              },
              there: null,
              orthere: null,
            },
            nadaelse: null,
            gotcha: null,
          },
          wowzers: null,
        },
        onefile: null,
        twofile: null,
      },
      {
        thisfile: {
          here: {
            and: {
              there: null,
              orhere: null,
            },
            nadaelse: null,
            gotcha: null,
          },
        },
      },
    );
  });
});
