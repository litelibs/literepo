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

describe("getFromRoot", () => {
  it("root path", () => {
    const filePath = "/";
    const root = new File("/", [], null, filePath);

    assert.deepEqual(File.getFromRoot(root, filePath), root);
  });

  it("single level path", () => {
    const filePath = "/something.txt";
    const file1 = new File("something.txt", [], null, filePath);
    const root = new File("/", [file1], null, "/");
    root.children[file1.name] = file1;

    assert.equal(File.getFromRoot(root, filePath), file1);
  });
  it("big root and three level path", () => {
    const filePath = "/this/file/isit.txt";
    const file3 = new File("isit.txt", [], null, filePath);
    const file2 = new File("file", [file3], null, "/this/file");
    const file1 = new File("this", [file2], null, "/this");
    const root = new File("/", [file1], null, "/");
    root.children[file1.name] = file1;
    file1.children[file2.name] = file2;
    file2.children[file3.name] = file3;

    assert.deepEqual(File.getFromRoot(root, filePath), file3);
  });
});
