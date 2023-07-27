import assert from "assert";
import { File } from "../../src/file";

describe("constructFromPaths with toDict (complex test cases)", function () {
  it("empty input", function () {
    assert.deepEqual(File.constructFromPaths([]).toDict(), {});
  });

  it("one name", function () {
    assert.deepEqual(File.constructFromPaths(["thisfile"]).toDict(), {
      thisfile: {},
    });
  });

  it("multi level multi dir", function () {
    assert.deepEqual(
      File.constructFromPaths([
        ".filea.txt",
        "thisfile/here/and/there.js",
        "thisfile/here/and/orthere.js",
        "thisfile/here/nadaelse.java",
        "thisfile/here/gotcha.java",
        "onefile.yaml",
        "twofile.config",
        "randomdir/with/files.txt",
        "randomdir/onlyone",
        "thisfile/wowzers.json",
        "thisfile/here/and/another/thing.something",
      ]).toDict(),
      {
        ".filea.txt": {},
        randomdir: {
          with: {
            "files.txt": {},
          },
          onlyone: {},
        },
        thisfile: {
          here: {
            and: {
              another: {
                "thing.something": {},
              },
              "there.js": {},
              "orthere.js": {},
            },
            "nadaelse.java": {},
            "gotcha.java": {},
          },
          "wowzers.json": {},
        },
        "onefile.yaml": {},
        "twofile.config": {},
      },
    );
  });
});
