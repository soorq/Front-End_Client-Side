import { FC } from 'react'
import imgFound from '../assets/not-found.jpg'
// import imgProtected from '../assets/protected.jpg'
import { Link } from 'react-router-dom'

const ErrorPage:FC = () => {
  return (
    <div className='min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10'>
      <img src={imgFound} alt="404" className='w-80' />
      <Link to={'/'} className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600'>
        Back
      </Link>
    </div>
  )
}

export default ErrorPage