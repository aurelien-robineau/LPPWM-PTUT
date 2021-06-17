export const getDayOnlyFromDate = (date: Date): string => {
	return date.toISOString().split('T')[0]
}

export const addDaysToDate = (date: Date, numberOfDays: number): Date => {
	return new Date(date.getTime() + 24 * numberOfDays * 3600 * 1000)
}

export const removeTimeFromDate = (date: Date): Date => {
	return new Date(getDayOnlyFromDate(date))
}

export const getNumberOfDaysBetweenDates = (date1: Date, date2: Date): number => {
	date1 = removeTimeFromDate(date1)
	date2 = removeTimeFromDate(date2)
	return Math.abs(date1.getTime() - date2.getTime()) / (1000 * 3600 * 24)
}

export const getFirstDateOfTheDateWeek = (date: Date): Date => {
    const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)
    return new Date(date.setDate(diff))
}

export const getDateWeekBounds = (date: Date): { start: Date, end: Date } => {
	const start = getFirstDateOfTheDateWeek(date)
	return {
		start: removeTimeFromDate(start),
		end: removeTimeFromDate(addDaysToDate(start, 6))
	}
}

export const getDateMonthBounds = (date: Date): { start: Date, end: Date } => {
	const startDate = new Date(date)
	startDate.setDate(1)

	const endDate = new Date(date)
	endDate.setMonth(date.getMonth() + 1)
	endDate.setDate(0)

	return {
		start: removeTimeFromDate(startDate),
		end: removeTimeFromDate(endDate)
	}
}
