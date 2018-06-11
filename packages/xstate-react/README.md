# React XState

Package for using xState with React.

### Features

A checklist of supported and planned features:

- [x] Provider/Consumer from Context API
- [x] onEntry, onExit
- [x] actions
- [x] nested state charts
- [x] parallel state charts
- [x] data
- [ ] activities

### Setup

Install npm package

```
npm i xstate-react
```

### Usage

```js
export default reactXState({
  name: "trafficLight",
  machine: Machine({ ...config })
  actions: ({ dispatch, transition, data }) => ({ ...actions })
})
```
