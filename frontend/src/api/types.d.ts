export interface DataTracker {
	period: string,
	graphs: (string | number)[]
}

export interface ResUrl {
	data: { url?: string }
}