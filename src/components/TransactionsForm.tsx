import { FC, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { Form, useLoaderData } from "react-router-dom"
import { IResponseTranscationLoader } from "../types/type"
import CategoryModal from "./CategoryModal"

const TransactionsForm: FC = () => {
	const { category } = useLoaderData() as IResponseTranscationLoader
	console.log(category);
	
	const [visibleModal, setVisibleModel] = useState<boolean>(false)
	return (
		<div className='rounded-md bg-navy p-4'>
			<Form className='grid gap-2' method='post' action='/transactions'>
				<label className='grid gap-2' htmlFor='title'>
					<span>Title</span>
					<input
						type='text'
						name='title'
						placeholder='Title..'
						className='input bg-slate-600'
						required
					/>
				</label>
				<label className='grid gap-2' htmlFor='amount'>
					<span>Amount</span>
					<input
						type='number'
						name='amount'
						placeholder='Amount..'
						className='input bg-slate-600'
						required
					/>

					{category.length ? (
						<label htmlFor='category' className='grid gap-2'>
							<span>Category</span>
							<select name='category' className='input bg-slate-600'>
								{category.map((e, i) => (
									<option value={e.id} key={i}>
										{e.title}
									</option>
								))}
							</select>
						</label>
					) : (
						<h1 className='my-4 text-red-300'>
							To continue create a category first
						</h1>
					)}

					<button className='flex max-w-fit items-center gap-2 text-white/50 hover:text-white' onClick={() => setVisibleModel(true)}>
						<FaPlus />
						<span>Manage Categories: </span>
					</button>

					<div className='flex gap-4 items-center mt-4'>
						<label className='cursor-pointer flex items-center gap-2'>
							<input
								type='radio'
								name='type'
								value={"income"}
								className='form-radio text-navy'
							/>
							<span>Income</span>
						</label>
						<label className='cursor-pointer flex items-center gap-2'>
							<input
								type='radio'
								name='type'
								value={"expense"}
								className='form-radio text-navy'
							/>
							<span>Expense</span>
						</label>
					</div>
				</label>

				<button type='submit' className='btn btn-green max-w-fit mt-2'>
					Submit
				</button>
			</Form>

			{visibleModal && (
				<CategoryModal type='post' setVisibleModel={setVisibleModel} />
			)}
		</div>
	)
}

export default TransactionsForm
