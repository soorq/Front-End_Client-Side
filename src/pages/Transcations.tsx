import { FC } from "react"
import TransactionsForm from "../components/TransactionsForm"
import { instance } from "../api/axios.api"
import { ICategory, IResponseTranscationLoader, ITransaction } from "../types/type"
import { toast } from "react-toastify"
import TransactionTable from "../components/TransactionTable"
import { useLoaderData } from 'react-router-dom'
import { formToUsd } from '../helpers/currency.helper'
import Chart from '../components/Chart'

export const transactionsLoader = async () => {
	const category = await instance.get<ICategory[]>("/categories")
	const transaction = await instance.get<ITransaction[]>("/transactions")

	const totalIncome = await instance.get<number>('/transactions/income/find')
	const totalExpense = await instance.get<number>('/transactions/expense/find')
	console.log(totalExpense, totalIncome)
	
	const data = {
		category: category.data,
		transaction: transaction.data,
		totalIncome: totalIncome.data,
		totalExpense: totalExpense.data
	}
	return data
}

export const transactionAction = async ({ request }: any) => {
	const data = {}
	switch (request.method) {
		case "POST": {
			const formData = await request.formData()
			const newTransaction = {
				title: formData.get("title"),
				amount: +formData.get("amount"),
				category: formData.get("category"),
				type: formData.get("type"),
			}
			await instance.post("/transactions", newTransaction)
			toast.success("Transaction added")
			return null
		}

		case "DELETE": {
			const formData = await request.formData()
			const transcationId = formData.get('id')
			await instance.delete(`/transactions/transaction${transcationId}`)
			toast.success('Transcation deleted') 
			return null
		}
	}
	return data
}

const Transcations: FC = () => {
	const {totalIncome , totalExpense} = useLoaderData() as IResponseTranscationLoader
	console.log(totalIncome, totalExpense)
	
	return (
		<>
			<div className='mt-4 grid grid-cols-3 items-start gap-4'>
				<div className='col-span-2 grid'>
					<TransactionsForm />
				</div>

				<div className='rounded-md bg-slate-800 p-3'>
					<div className='grid grid-cols-2 gap-3'>
						<div>
							<p className='text-md text-center font-bold uppercase'>
								Total Income:
							</p>
							<p className='mt-2 rounded-sm bg-green-600 p-1 text-center'>
								{totalIncome ? formToUsd.format(totalIncome) : formToUsd.format(0)}
							</p>
						</div>
						<div>
							<p className='text-md text-center font-bold uppercase'>
								Total Expense:
							</p>
							<p className='mt-2 rounded-sm bg-red-500 p-1 text-center'>
								{totalExpense ? formToUsd.format(totalExpense) : formToUsd.format(0)}
							</p>
						</div>

						<Chart totalEx={totalExpense} totalIn={totalIncome}/>
					</div>
				</div>
			</div>

			<h1 className='my-5'>
				<TransactionTable limit={5}/>
			</h1>
		</>
	)
}

export default Transcations