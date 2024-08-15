export const getTokens = () => {
  if (typeof window !== "undefined") {
    // Check if window is available
    const accessToken = window.localStorage.getItem("accessToken")
    const refreshToken = window.localStorage.getItem("refreshToken")

    return {
      accessToken,
      refreshToken,
    }
  }

  return {
    accessToken: null,
    refreshToken: null,
  }
}
