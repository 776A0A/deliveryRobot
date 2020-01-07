import { VillageState } from './state.js';
import { roadGraph, mailRoute } from './data.js';

export function runRobot (state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length === 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    const action = robot(state, memory); // 随机的产生了一个目的地
    state = state.move(action.direction)
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

// 第一种方案：随机的产生一个目的地
// export function randomRobot (state) {
//   return { direction: randomPick(roadGraph[state.place]) }
// }

// 第二种方案
/**
 * 返回机器人的下一个目的地以及剩余路线
 *
 * @export
 * @param {*} state
 * @param {*} memory 用于记录剩余路线
 * @returns
 */
// export function routeRobot (state, memory) {
//   if (memory.length === 0) {
//     memory = mailRoute
//   }
//   return { direction: memory[0], memory: memory.slice(1) };
// }

/**
 * 第三种方案
 *
 * @export
 * @param {VillageState} state
 * @param {Array} routes
 * @returns
 */
export function goalOrientedRobot (state, routes) {
  const { place, parcels } = state;
  if (routes.length === 0) {
    const parcel = parcels[0]
    if (parcel.place !== place) {
      routes = findRoute(roadGraph, place, parcel.place)
    } else {
      routes = findRoute(roadGraph, place, parcel.address)
    }
  }
  return { direction: routes[0], memory: routes.slice(1) };
}

/**
 * 首先到达的地方应该首先被搜索，不能一到达一个地方就开始搜索，
 * 相当于要一层一层的搜索
 * @param {*} roadGraph 
 * @param {*} from 
 * @param {*} to 
 */
// function findRoute (roadGraph, from, to) {
//   // 一个工作列表，每一项为应该搜索的地点以及到达那里的路线
//   const work = [{ at: from, routes: [] }];
//   for (let i = 0; i < work.length; i++) {
//     const { at, routes } = work[i]
//     for (const place of roadGraph[at]) {
//       if (place === to) return routes.concat(place)
//       if (!work.some(w => w.at === place)) { // 没有一个通过测试则返回false
//         work.push({ at: place, routes: routes.concat(place) })
//       }
//     }
//   }
// }

function findRoute (roadGraph, from, to) {
  const workList = [{ at: from, routes: [] }]
  for (let i = 0; i < workList.length; i++) {
    const { at, routes } = workList[i]
    for (const place of roadGraph[at]) {
      if (place === to) {
        routes.push(place)
        console.log(`${at} to ${place} : ${routes.join(' -- ')}`);
        return routes;
      }
      if (!workList.some(w => w.at === place)) {
        workList.push({ at: place, routes: routes.concat(place) })
      }
    }
  }
}

/**
 * 产生随机的5个包裹并给与一个初始位置
 *
 * @export
 * @param {number} [parcelCount=5]
 * @returns instance of VillageState
 */
export function random (parcelCount = 5) {
  const parcels = []
  const villages = Object.keys(roadGraph);
  for (let i = 0; i < parcelCount; i++) {
    const address = randomPick(villages); // 随机的目的地
    let place;
    do {
      place = randomPick(villages)
    } while (address === place);

    parcels.push({ place, address })
  }

  return new VillageState('Post Office', parcels)
}

// 随机的取出数组中的一项
function randomPick (array) {
  return array[Math.floor(Math.random() * array.length)];
}

