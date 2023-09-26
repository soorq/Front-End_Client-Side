import { FC } from 'react'
import { useAuth } from '../hooks/useAuth'
import protectImg from '../assets/png-transparent-lock-icon.png'

interface Props{ 
	children: JSX.Element
}

const ProtectedRoute:FC<Props> = ({ children }) => {
	const isAuth = useAuth()
  return (
	<>{isAuth ? children : (
		<div className='flex flex-col justify-center items-center mt-20 gap-20'>
			<h1 className='text-2xl'>To view this page must be logged in</h1>
			<img className='w-1/2 bg-blend-color-burn' src={protectImg} alt="error" />
		</div> 
	)}</>
  )
}

export default ProtectedRoute