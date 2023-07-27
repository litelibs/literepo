type NameMap = {
  [key: string]: File;
}

export class File {
  name: string;
  children: NameMap;
  parent: File | null;

  constructor(name: string, children: File[],  parent: File | null) {
    this.name = name;
    this.parent = parent;
    this.children = {};

    if (children === null) return

    for (let i = 0; i<children.length; i++)
      this.children[children[i].name] = new File(
        children[i].name,
        Object.values(children[i].children),
        this,
      )
  }

  static constructFromPath(root: File, filePath: string): File {
    let pathSections: string[] = filePath.split("/");
    let curr = root;

    for (let i=0; i<pathSections.length; i++) {
      let currName = pathSections[0];

      if (!(currName in curr.children))
        curr.children[pathSections[0]] = new File(currName, [], curr);

      for (let j=0; j<pathSections.length; j++) {
      }
    }
  }
}
