export const addDaysToDate = (date: Date, numberOfDays: number): Date => {
	return new Date(date.getTime() + 24 * numberOfDays * 3600 * 1000)
}

export const getDayOnlyFromDate = (date: Date) => {
	return date.toISOString().split('T')[0]
}