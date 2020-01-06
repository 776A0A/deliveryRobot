// 转换数据结构
export function buildGraph (arr) {
  const graph = Object.create(null);

  function convertToGraph (from, to) {
    graph[from] = graph[from] || [];
    graph[from].push(to)
    return true;
  }

  arr.map(item => item.split('-'))
    .forEach(([from, to]) => convertToGraph(from, to) && convertToGraph(to, from))

  return graph;
}