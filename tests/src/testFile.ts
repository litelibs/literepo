import assert from "assert";
import { File } from "../../src/file";

const deepCopy = (file: File): File => JSON.parse(JSON.stringify(file));

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
    const filePath = "something.txt";
    const file1 = new File("something.txt", [], null, filePath);
    const root = new File("/", [file1], null, "/");
    root.children[file1.name] = file1;

    assert.equal(File.getFromRoot(root, filePath), file1);
  });
  it("big root and three level path", () => {
    const filePath = "this/file/isit.txt";
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

describe("toFilePath", () => {
  it("root dir", () => {
    const currFile = new File("/", [], null, "/");
    assert.deepEqual(currFile.toFilePath(), [currFile]);
  });

  it("one level", () => {
    const parent1 = new File("/", [], null, "/");
    const currFile = new File("this", [], parent1, "/this");
    assert.deepEqual(currFile.toFilePath(), [parent1, currFile]);
  });

  it("multi level", () => {
    const random = new File("random", [], null, "invalid/path");

    const parent3 = new File("/", [], null, "/");
    const parent2 = new File("something", [], parent3, "/something");
    const parent1 = new File("that", [], parent2, "/something/that");
    const currFile = new File("/", [], parent1, "/something/that/works.txt");
    currFile.children[random.name] = deepCopy(random);
    parent1.children[currFile.name] = currFile;
    parent1.children[random.name] = deepCopy(random);
    parent2.children[parent1.name] = parent1;
    parent2.children[random.name] = deepCopy(random);
    parent3.children[parent2.name] = parent2;
    parent3.children[random.name] = deepCopy(random);

    assert.deepEqual(currFile.toFilePath(), [
      parent3,
      parent2,
      parent1,
      currFile,
    ]);
  });
});

describe("isValidPath", () => {
  describe("valid", () => {
    it("root path", () => {
      const root = new File("/", [], null, "/");
      assert.equal(File.isValidPath(root, "/"), true);
    });

    it("one level", () => {
      const root = new File("/", [], null, "/");
      const childL1 = new File("thisone", [], root, "thisone");
      root.children[childL1.name] = childL1;

      assert.equal(File.isValidPath(root, "thisone"), true);
    });

    it("multi level", () => {
      const root = new File("/", [], null, "/");
      const childL1 = new File("thisone", [], root, "thisone");
      const childL2 = new File("another", [], childL1, "thisone/another");
      const childL3 = new File(
        "last.one",
        [],
        childL2,
        "thisone/another/last.one",
      );
      root.children[childL1.name] = childL1;
      childL1.children[childL2.name] = childL2;
      childL2.children[childL3.name] = childL3;

      assert.equal(File.isValidPath(root, "thisone/another/last.one"), true);
    });
  });
  describe("invalid", () => {
    it("root path", () => {
      const root = new File("/", [], null, "/");
      assert.equal(File.isValidPath(root, "something"), false);
    });

    it("one level", () => {
      const root = new File("/", [], null, "/");
      const childL1 = new File("thisone", [], root, "thisone");
      root.children[childL1.name] = childL1;

      assert.equal(File.isValidPath(root, "random"), false);
    });

    it("multi level", () => {
      const root = new File("/", [], null, "/");
      const childL1 = new File("thisone", [], root, "thisone");
      const childL2 = new File("another", [], childL1, "thisone/another");
      const childL3 = new File(
        "last.one",
        [],
        childL2,
        "thisone/another/last.one",
      );
      root.children[childL1.name] = childL1;
      childL1.children[childL2.name] = childL2;
      childL2.children[childL3.name] = childL3;

      assert.equal(File.isValidPath(root, "thisone/nope/last.one"), false);
    });
  });
});
