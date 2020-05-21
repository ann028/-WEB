export function arrayToTree(list: object[], props = {id: 'id', pid: 'pid', children: 'children'}) {
  const tree: object[] = [];
  const map: any = {};

  const listLength = list.length;
  for (let i = 0; i < listLength; i++) {
    const node: any = list[i];
    const nodeId: any = node[props.id];
    map[nodeId] = node;
  }

  for (let i = 0; i < listLength; i++) {
    const node: any = list[i];
    const nodePid: any = node[props.pid];
    const parentNode: any = map[nodePid];
    if (parentNode) {
      parentNode[props.children] = parentNode[props.children] || [];
      parentNode[props.children].push(node)
    } else {
      tree.push(node)
    }
  }

  return tree
}
