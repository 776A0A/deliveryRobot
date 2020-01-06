import { VillageState } from './state.js'
import { roadGraph, mailRoute } from './data.js'


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

/**
 * 返回机器人的下一个目的地以及剩余路线
 *
 * @export
 * @param {*} state
 * @param {*} memory 用于记录剩余路线
 * @returns
 */
export function routeRobot (state, memory) {
  if (memory.length === 0) {
    memory = mailRoute
  }
  return { direction: memory[0], memory: memory.slice(1) };
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

function findRoute (place, destination) {
  
}