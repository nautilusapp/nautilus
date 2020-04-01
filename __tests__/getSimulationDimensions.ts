import {
  getHorizontalPosition,
  getVerticalPosition,
} from '../src/renderer/helpers/getSimulationDimensions';

// IMPORT TYPES
import { SNode } from '../src/renderer/App.d';

describe('Get Simulation Dimensions', () => {
  let node: SNode;
  let treeDepth: number;
  let width: number;
  let height: number;

  beforeEach(() => {
    node = {
      id: 1,
      name: 'test',
      ports: [],
      volumes: [],
      row: 0,
      column: 0,
      rowLength: 0,
      children: {},
    };
    width = 500;
    height = 500;
    treeDepth = 0;
  });

  describe('getHorizontalPosition()', () => {
    it('should return the horizontal position of node', () => {
      node.rowLength = 1;
      node.column = 1;
      const horizontalPosition = getHorizontalPosition(node, width);
      expect(horizontalPosition).toBe(235);
    });
  });

  describe('getVerticalPosition()', () => {
    it('should return vertical position of node with treeDepth 1, row 1', () => {
      treeDepth = 1;
      node.row = 1;
      const verticalPosition = getVerticalPosition(node, treeDepth, height);
      expect(verticalPosition).toBe(500);
    });

    it('should return vertical position of node with treeDepth 2', () => {
      treeDepth = 2;
      node.row = 1;
      let verticalPosition = getVerticalPosition(node, treeDepth, height);
      expect(verticalPosition).toBe(250);
      node.row = 2;
      verticalPosition = getVerticalPosition(node, treeDepth, height);
      expect(verticalPosition).toBe(500);
    });
  });
});
