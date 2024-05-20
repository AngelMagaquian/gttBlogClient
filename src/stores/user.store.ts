import create from 'zustand'

//Cargo el estado desde sessionStorage
const getUserFromSessionStorage = (): UserStateProps | undefined => {
  try {
    const userState = sessionStorage.getItem('userStore')
    if (userState === null) {
      return undefined
    }
    return JSON.parse(userState)
  } catch (error) {
    return undefined
  }
}

//Guardo el estado en sessionStorage
const saveStateToSessionStorage = (state: UserStateProps) => {
  try {
    const userState = JSON.stringify(state)
    sessionStorage.setItem('userStore', userState)
  } catch (error) {
    console.error('Error saving state to sessionStorage:', error)
  }
}

const useUserStore = create<UserStateProps>((set, get) => ({
  ...(getUserFromSessionStorage() || {
    user: null,
    isLoggedIn: false,
  }),
  setUser: (user) => {
    //actualizo el state y lo guardo en sessionStorage
    set({ user, isLoggedIn: true })
    saveStateToSessionStorage(get())
  },
  logOut: () => {
    // logout limpiando el store y el sessionStorage
    sessionStorage.removeItem('userStore')
    set({ user: null, isLoggedIn: false })
  },
}))

export default useUserStore
