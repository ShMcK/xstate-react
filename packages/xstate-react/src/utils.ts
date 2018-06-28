import omit from "lodash/omit"
import isEqual from "lodash/isEqual"

export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const objDiff = (o1, o2) => {
  const nonMatching = Object.keys(o1).filter(key => isEqual(o1[key], o2[key]))
  return omit(o2, nonMatching)
}
