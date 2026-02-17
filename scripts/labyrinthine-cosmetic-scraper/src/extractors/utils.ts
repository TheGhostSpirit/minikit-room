export const debugTree = (rootElement: Element): void => {
  const print = (e: Element, depth: number) => {
    const indentSize = '  ';
    const indent = indentSize.repeat(depth);
    console.log(indent + e.tagName);

    const children = [...e.children];
    children.forEach(c => print(c, depth + 1));
  };
  print(rootElement, 0);
};
