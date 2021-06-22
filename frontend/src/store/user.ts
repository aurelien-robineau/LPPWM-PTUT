

import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
	name: "user",
	initialState: {},
	reducers: {
		connectUser: (_state, action) => {
			return { ...action.payload }
		},
		logoutUser: () => {
			return {}
		}
	},
})

export const { connectUser, logoutUser } = userSlice.actions
export const librarySelector = (state: { users: any }) => state.users
export default userSlice.reducer