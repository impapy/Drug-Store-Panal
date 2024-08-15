import { Admin, LoginResponse, sdk, User } from "../api"
import { getTokens } from "../api/auth"
import React, { useContext, useEffect, useMemo, useReducer, useState } from "react"

export interface Auth {
  isLoggedIn: boolean | null
  viewer: Partial<Admin | User> | null
}

const defaultState: Auth = {
  isLoggedIn: null,
  viewer: null,
}

const defaultValue = {
  auth: defaultState,
  login(res: Partial<LoginResponse>) {},
  logout() {},
}

const AuthContext = React.createContext(defaultValue)
export const useAuthContext = () => useContext(AuthContext)

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize auth state based on tokens in localStorage
  const [auth, setAuth] = useState<Auth>(() => {
    const tokens = getTokens()
    const isLoggedIn = !!tokens.accessToken // Set to true if accessToken exists
    const viewer = isLoggedIn ? JSON.parse(localStorage.getItem("viewer") || "null") : null

    return { isLoggedIn, viewer }
  })

  // Login function to store tokens and user data
  const login = ({ token, user }: Partial<LoginResponse>) => {
    setAuth({ isLoggedIn: true, viewer: user as Admin | User })
    localStorage.setItem("accessToken", token!)
    localStorage.setItem("viewer", JSON.stringify(user))
  }

  // Logout function to clear tokens and user data
  const logout = () => {
    setAuth({ isLoggedIn: false, viewer: null })
    localStorage.removeItem("accessToken")
    localStorage.removeItem("viewer")
  }

  // Check authentication on initial render
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const tokens = getTokens()
        if (tokens.accessToken) {
          const { viewer } = await sdk.Viewer({}, { authorization: `Bearer ${tokens.accessToken}` })
          setAuth({ isLoggedIn: true, viewer })
          localStorage.setItem("viewer", JSON.stringify(viewer))
        } else {
          logout() // If no token is found, log the user out
        }
      } catch (error) {
        logout() // On any error, log the user out
      }
    }

    checkAuth()
  }, []) // Empty dependency array to run only on initial render

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ auth, login, logout }), [auth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
