import { pathOr, pluck } from "ramda"

export const getErrorMsg = (error: Error): string => {
  const errors = pathOr([], ["response", "errors"], error)
  return pluck("message", errors).join(", ") || "Something went wrong"
}

export const getErrorCode = (error: Error): string => {
  const errors = pathOr([], ["response", "errors"], error)
  return pluck("code", errors).join(", ") || "Something went wrong"
}
