export const formDate = (dateString: string): string => {
	const date = new Date(dateString)

	return date.toLocaleDateString("us-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})
}
