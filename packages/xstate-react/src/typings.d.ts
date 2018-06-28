export type Config = {
  name: string
  config: any
  actions: (params: any) => any
  activities: (params: any) => any
}
