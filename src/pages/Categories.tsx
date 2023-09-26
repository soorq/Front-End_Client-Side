import { FC, useState } from "react"
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { Form, useLoaderData } from "react-router-dom"
import CategoryModal from "../components/CategoryModal"
import { instance } from "../api/axios.api"
import { ICategory } from "../types/type"

// eslint-disable-next-line react-refresh/only-export-components
export const categoriesAction = async ({ request }: any) => {
	switch (request.method) {
		case "POST": {
			const formData = await request.formData()
			const title = {
				title: formData.get("title"),
			}
			await instance.post("/categories", title)
			return null
		}

		case "PATCH": {
			const formData = await request.formData()
			const category = {
				id: formData.get("id"),
				title: formData.get("title"),
			}
			await instance.patch(`/categories/category/${category.id}`, category)
			return null
		}

		case "DELETE": {
			const formData = await request.formData()
			const categoryId = formData.get("id")
			await instance.delete(`/categories/category/${categoryId}`)
			return null
		}
	}
}

// eslint-disable-next-line react-refresh/only-export-components
export const categoryLoader = async () => {
	const { data } = await instance.get<ICategory>("/categories")
	return data
}

const Categories: FC = () => {
	const categories = useLoaderData() as ICategory[]
	const [visibleModel, setVisibleModel] = useState<boolean>(false)
	const [categoryId, setCategoryId] = useState<number>(0)
	const [isEdit, setIsEdit] = useState<boolean>(false)

	return (
		<>
			<div className='mt-10 p-4 rounded-md bg-slate-800'>
				<h1>Your category list: </h1>
				<div className='flex mt-2 gap-2 items-center flex-wrap'>
					{categories.map((e, i) => (
						<div
							className='group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative'
							key={i}
						>
							<p>{e.title}</p>
							<div className='absolute px-3 left-0 top-0 bottom-0 right-0 hidden rounded-lg bg-black/90 items-center justify-between group-hover:flex'>
								<button
									onClick={() => {
										setCategoryId(e.id)
										setVisibleModel(true)
										setIsEdit(true)
									}}
								>
									<AiFillEdit />
								</button>
								<Form className='flex' method='delete' action='/categories'>
									<input type='hidden' name='id' value={e.id} />
									<button type='submit'>
										<AiFillCloseCircle />
									</button>
								</Form>
							</div>
						</div>
					))}
				</div>
				{/* Add Category */}
				<button
					onClick={() => setVisibleModel(true)}
					className='max-w-fit flex items-center gap-2 text-white/50 mt-5 hover:text-white'
				>
					<FaPlus />
					<span>Create a new category</span>
				</button>
			</div>

			{visibleModel && (
				<CategoryModal type='post' setVisibleModel={setVisibleModel} />
			)}

			{visibleModel && isEdit && (
				<CategoryModal
					type='patch'
					id={categoryId}
					setVisibleModel={setVisibleModel}
				/>
			)}
		</>
	)
}

export default Categories
