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

  constructor(name: string, children: File[], parent: File | null) {
    this.name = name;
    this.parent = parent;
    this.children = {};

    if (children === null) return;

    for (let i = 0; i < children.length; i++)
      this.children[children[i].name] = new File(
        children[i].name,
        Object.values(children[i].children),
        this,
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
        curr.children[childName] = new File(childName, [], curr);
      curr = curr.children[childName];
    }
    return File.#constructFromPaths(root, filePaths.slice(1));
  }

  static constructFromPaths(filePaths: string[]): File {
    return File.#constructFromPaths(new File("/", [], null), filePaths);
  }

  toDict(): Dict {
    let dictThis: Dict = {};
    let childrenNames: string[] = Object.keys(this.children);

    for (let i = 0; i < childrenNames.length; i++)
      dictThis[childrenNames[i]] = this.children[childrenNames[i]].toDict();

    return dictThis;
  }
}
