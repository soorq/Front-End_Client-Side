import { FC, useEffect, useState } from "react"
// import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from "react-router-dom"
import { IResponseTranscationLoader, ITransaction } from "../types/type"
import { FaTrash } from "react-icons/fa"
import { formDate } from "../helpers/date.helper"
import { formToUsd } from "../helpers/currency.helper"
import { instance } from "../api/axios.api"
import ReactPaginate from "react-paginate"

interface ITransactionLimit {
	limit: 5
}

const TransactionTable: FC<ITransactionLimit> = ({ limit }) => {
	const { transaction } = useLoaderData() as IResponseTranscationLoader

	const [data, setData] = useState<ITransaction[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(0)

	const fetchTransaction = async (page: number) => {
		const response = await instance.get(
			`/transactions/pagination?page=${page}&${limit}`
		)
		setData(response.data)
		setTotalPages(Math.ceil(transaction.length / limit))
	}

	const handlePageChange = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1)
	}

	useEffect(() => {
		fetchTransaction(currentPage)
	}, [currentPage, fetchTransaction, transaction])

	return (
		<>
			<ReactPaginate
				className='flex gap-3 justify-end mt-4 items-center'
				activeClassName='bg-blue-600 rounded-md'
				pageLinkClassName='text-white text-xs py-1 px-2 rounded-sm'
				previousClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
				nextClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
				disabledClassName='text-white/50 cursor-not-allowed'
				disabledLinkClassName='text-slate-600 cursor-not-allowed'
				pageCount={totalPages}
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				onPageChange={handlePageChange}
			/>
			<div className='bg-slate-800 px-4 py-3 mt-4 rounded-md'>
				<table className='w-full'>
					<thead>
						<tr>
							<td className='font-bold'>№</td>
							<td className='font-bold'>Title</td>
							<td className='font-bold'>Amount($)</td>
							<td className='font-bold'>Category</td>
							<td className='font-bold'>Date</td>
							<td className='font-bold text-right'>Action</td>
						</tr>
					</thead>
					<tbody>
						{data?.map((el, i) => (
							<tr key={i}>
								<td>{i + 1}</td>
								<td>{el.title}</td>
								<td
									className={
										el.type === "income" ? "text-green-500" : "text-red-500"
									}
								>
									{el.type === "income"
										? `+ ${formToUsd.format(el.amount)}`
										: `- ${formToUsd.format(el.amount)}`}
								</td>
								<td>{el.category?.title || "Other"}</td>
								<td>{formDate(el.createdAt)}</td>
								<td>
									<Form method='DELETE' action='/transcations'>
										<input type='hidden' name='id' value={el.id} />
										<button className='btn hover:btn-red ml-auto'>
											<FaTrash />
										</button>
									</Form>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default TransactionTable
