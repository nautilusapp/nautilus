import { SNode } from '../App.d';

export const getHorizontalPosition = (node: SNode, width: number) => {
  return (node.column / (node.rowLength + 1)) * width - 15;
};

export const getVerticalPosition = (
  node: SNode,
  treeDepth: number,
  height: number,
) => {
  return (height / treeDepth) * node.row;
};
