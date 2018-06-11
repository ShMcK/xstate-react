export type Config = {
  name: string
  machine: any
  initialData: any
  actions: (params: any) => any
  activities: (params: any) => any
}
