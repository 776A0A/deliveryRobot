import { roadGraph } from './data.js'
// robot 当前位置place 未送达的包裹集合parcels
// parcel 当前位置place 目标位置address

/**
 * 村庄状态，含有村庄的位置以及村庄里含有的包裹
 *
 * @export
 * @class VillageState
 */
export class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  /**
   * 机器人将要移动到的下一个位置
   *
   * @param {String} destination
   * @returns a new instance of VillageState
   * @memberof VillageState
   */
  move (destination) {
    if (!roadGraph[this.place].includes(destination)) {
      // 如果当前位置没有通往目的地的方法
      return;
    }

    const parcels = this.parcels
      .map(p => {
        if (p.place !== this.place) return p;
        return { place: destination, address: p.address }
      })
      .filter(p => p.address !== destination);

    return new VillageState(destination, parcels)
  }
}