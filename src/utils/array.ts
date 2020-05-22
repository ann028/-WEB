export function arrayToTree(list: object[], props = {id: 'id', pid: 'pid', children: 'children'}) {
  // console.log('toTree___list', list)
  const tree: object[] = [];
  const map: any = {};

  const listLength = list.length;
  for (let i = 0; i < listLength; i++) {
    const node: any = list[i];
    const nodeId: any = node[props.id];
    map[nodeId] = node;
  }
  // console.log('toTree__list__11', list)
  for (let i = 0; i < listLength; i++) {
    const node: any = list[i];
    // console.log(node, props)
    const nodePid: any = node[props.pid];
    const parentNode: any = map[nodePid];
    if (parentNode) {
      parentNode[props.children] = parentNode[props.children] || [];
      parentNode[props.children].push(node)
    } else {
      // console.log('toTree__list__11', node)
      tree.push(node)
    }
  }
  return tree
}
