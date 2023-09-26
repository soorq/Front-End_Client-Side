export interface IUser {
	id: number
	email: string
	token: string
}

export interface IUserData {
	email: string
	password: string
}

export interface IResponseUser{
	email: string
	id: number
	password: string
	createdAt: string
	updatedAt: string
}

export interface IResponseUserData {
	token: string
	user: IResponseUser
}

export interface ICategory {
	id: number
	title: string
	createdAt: string
	updatedAt: string
	transactions?: []
}

export interface ITransaction {
	amount: number
	title: string
	createdAt: string
	updatedAt: string
	type: string
	id: number
	category: ICategory
}

export interface IResponseTranscationLoader {
	category: ICategory[]
	transaction: ITransaction[]
	totalIncome: number
	totalExpense: number
}
