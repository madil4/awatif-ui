import { Node } from "../types";

export function get5thFromFirstPoint(point1: Node, point2: Node): Node {
  return point1?.map((v, i) => (4 * v + point2[i]) / 5) as Node; // from gptChat
}
