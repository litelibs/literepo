type NameMap = {
  [key: string]: File;
};

type Dict = {
  [key: string]: Dict | null;
};

export class File {
  name: string;
  children: NameMap;
  parent: File | null;
  filePath: string;

  constructor(
    name: string,
    children: File[],
    parent: File | null,
    filePath: string,
  ) {
    this.name = name;
    this.parent = parent;
    this.children = {};
    this.filePath = filePath;

    if (children === null) return;

    for (let i = 0; i < children.length; i++)
      this.children[children[i].name] = new File(
        children[i].name,
        Object.values(children[i].children),
        this,
        `${this.filePath}/${children[i].name}`,
      );
  }

  static #constructFromPaths(root: File, filePaths: string[]): File {
    let pathSections: string[];
    let curr = root;

    if (filePaths.length <= 0) return curr;

    pathSections = filePaths[0].split("/");

    for (let i = 0; i < pathSections.length; i++) {
      let childName = pathSections[i];
      if (!(childName in curr.children))
        curr.children[childName] = new File(
          childName,
          [],
          curr,
          "/" + pathSections.slice(0, i + 1).join("/"),
        );
      curr = curr.children[childName];
    }
    return File.#constructFromPaths(root, filePaths.slice(1));
  }

  static constructFromPaths(filePaths: string[]): File {
    return File.#constructFromPaths(new File("/", [], null, "/"), filePaths);
  }

  static getFromRoot(root: File, filePath: string): File {
    let curr = root;
    let filePathSections: string[];

    if (filePath === "/") return root;

    filePathSections = filePath.split("/").slice(1);

    for (let i = 0; i < filePathSections.length; i++)
      curr = curr.children[filePathSections[i]];
    return curr;
  }

  static createFilePath(file: File): File[] {
    const filePath: File[] = [];
    let curr: File = file;

    if (file.parent == null) return [file];

    while (curr.parent !== null) {
      filePath.unshift(curr);
      curr = curr.parent;
    }
    filePath.unshift(curr);

    return filePath;
  }

  toDict(): Dict {
    let dictThis: Dict = {};
    let childrenNames: string[] = Object.keys(this.children);

    for (let i = 0; i < childrenNames.length; i++)
      dictThis[childrenNames[i]] = this.children[childrenNames[i]].toDict();

    return dictThis;
  }
}
