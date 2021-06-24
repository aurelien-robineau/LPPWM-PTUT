/**
 * Get the date without the time.
 * @param date The date we want the day only.
 * @returns The date without time as a string.
 */
export const getDayOnlyFromDate = (date: Date): string => {
	return date.toISOString().split('T')[0]
}

/**
 * Add days to a date.
 * @param date The date we want to add days to.
 * @param numberOfDays The number of days to add.
 * @returns A new date with the number of days added.
 */
export const addDaysToDate = (date: Date, numberOfDays: number): Date => {
	return new Date(date.getTime() + 24 * numberOfDays * 3600 * 1000)
}

/**
 * Remove days from a date.
 * @param date The date we want to remove days from.
 * @param numberOfDays The number of days to remove.
 * @returns A new date with the number of days removed.
 */
export const removeDaysFromDate = (date: Date, numberOfDays: number): Date => {
	return new Date(date.getTime() - 24 * numberOfDays * 3600 * 1000)
}

/**
 * Remove the time from a date.
 * @param date The date we want to remove the time from.
 * @returns A new date with time at 0.
 */
export const removeTimeFromDate = (date: Date): Date => {
	return new Date(getDayOnlyFromDate(date))
}

/**
 * Get the number of days between to dates.
 * @param date1 The first date.
 * @param date2 The second date.
 * @returns The number of days between the dates, including the first date.
 */
export const getNumberOfDaysBetweenDates = (date1: Date, date2: Date): number => {
	date1 = removeTimeFromDate(date1)
	date2 = removeTimeFromDate(date2)
	return Math.abs(date1.getTime() - date2.getTime()) / (1000 * 3600 * 24)
}

/**
 * Get the first date of a week.
 * @param date A date of the week we want the first day of.
 * @returns The first date of the week containing the date.
 */
export const getFirstDateOfTheDateWeek = (date: Date): Date => {
	date = new Date(getDayOnlyFromDate(date))
    const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)
    return new Date(date.setDate(diff))
}

/**
 * Get the week bounds of a date.
 * @param date A date of the week we want the bounds for.
 * @returns The first and last date of the week.
 */
export const getDateWeekBounds = (date: Date): { start: Date, end: Date } => {
	const start = getFirstDateOfTheDateWeek(date)
	return {
		start: removeTimeFromDate(start),
		end: removeTimeFromDate(addDaysToDate(start, 6))
	}
}

/**
 * Get the month bounds of a date.
 * @param date A date of the month we want the bounds for.
 * @returns The first and last date of the month.
 */
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
