export interface PayloadToken {
	token?: string,
	refreshToken?: string
}

export interface DecodedToken {

}

export interface UserInfos {
	createdAt: string,
	email: string,
	exp: number,
	firstname: string,
	iat: number,
	id: number,
	lastname: string,
	title: string,
	updatedAt: string
}