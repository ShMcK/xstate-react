export type Config = {
  name: string
  machine: any
  actions: (params: any) => any
  activities: (params: any) => any
}
