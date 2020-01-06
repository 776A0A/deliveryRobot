import { buildGraph } from './utils.js'

// 原始数据
const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Post Office",
  "Marketplace-Town Hall",
  "Marketplace-Farm",
  "Marketplace-Shop", "Shop-Town Hall"
];

// 将当前村庄能够到达的地点进行映射
export const roadGraph = buildGraph(roads);

// 一条能够到达所有村庄的路线
export const mailRoute = [
  "Alice's House", "Cabin", "Alice's House",
  "Bob's House", "Town Hall", "Daria's House",
  "Ernie's House", "Grete's House", "Shop",
  "Grete's House", "Farm", "Marketplace",
  "Post Office"
];