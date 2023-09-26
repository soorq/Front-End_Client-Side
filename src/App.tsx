/* eslint-disable react-hooks/exhaustive-deps */
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { useDispatch } from 'react-redux'
import { getTokenFromLocalStorage } from './helpers/localstorage.helper'
import { AuthService } from './services/auth.service'
import { login, logout } from './store/user/userSlice'
import { useEffect } from 'react'


function App() {
  const dispatch = useDispatch()
  const checkAuth = async () => {
    const token = getTokenFromLocalStorage()
    try{
      if(token) {
        const data = await AuthService.getProfile() 

        if(data) {
          dispatch(login(data))
        }else{
          dispatch(logout())
        }
      }
    }catch(err){
      console.log(err);
      
    }
  }

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return ( <RouterProvider router={router}/>)
}

export default App
