import { FC } from "react"
import { Form } from "react-router-dom"

interface ICategoryModal {
	type: "post" | "patch"
	id?: number
	setVisibleModel: (visible: boolean) => void
}

const CategoryModal: FC<ICategoryModal> = ({ ...props }) => {
	const { type, id, setVisibleModel } = props
	return (
		<div className='fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center'>
			<Form
				className='grid gap-2 w-[300px] p-5 rounded-md bg-navy'
				action='/categories'
				method={type}
				onSubmit={() => setVisibleModel(false)}
			>
				<label htmlFor='title'>
					<small>Category Title</small>
					<input
						className='input w-full bg-slate-600/50'
						type='text'
						name='title'
						placeholder='Title...'
						required
					/>
					<input type='hidden' name='id' value={id} />
				</label>
				<div className='flex items-center gap-2'>
					<button className='btn btn-green' type='submit'>
						{type === "patch" ? "Save" : "Create"}
					</button>
					<button
						className='btn btn-red'
						onClick={() => setVisibleModel(false)}
					>
						Close
					</button>
				</div>
			</Form>
		</div>
	)
}

export default CategoryModal
