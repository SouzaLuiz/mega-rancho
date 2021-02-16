import { Document } from 'mongoose'

export interface IProduct extends Document {
	id: string,
	name: string,
	price: number,
	imageId: string,
	imageUrl: string,
	createdAt: Date,
	updatedAt: Date,
}
