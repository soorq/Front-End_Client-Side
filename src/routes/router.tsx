import {createBrowserRouter} from 'react-router-dom'
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Transcations, { transactionAction, transactionsLoader } from '../pages/Transcations'
import Categories, { categoriesAction, categoryLoader } from '../pages/Categories'
import Auth from '../pages/Auth'
import ProtectedRoute from '../components/ProtectedRoute'
import Profile from '../pages/Profile'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: '/transactions',
				loader: transactionsLoader,
				action: transactionAction,
				element: <ProtectedRoute><Transcations /></ProtectedRoute>
			},
			{
				path: '/categories',
				action: categoriesAction,
				loader: categoryLoader,
				element: <ProtectedRoute><Categories /></ProtectedRoute>
			},
			{
				path: 'auth',
				element: <Auth />
			},
			{
				path: '/profile',
				element: <ProtectedRoute><Profile/></ProtectedRoute>,
			}
		]
	},
])