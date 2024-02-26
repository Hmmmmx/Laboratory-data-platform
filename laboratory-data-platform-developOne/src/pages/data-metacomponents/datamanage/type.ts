export interface GetDeviceParams {
  statement: string,
  types: number,
  limit: number, // 每页数据限制参数
  offset: number, // 数据偏移量参数
}

// export interface AddDeviceData {
//   ip: string,
//   port: number,
// }[]

// export interface DeleteDeviceData {
//   ip: string,
//   port: number,
// }
