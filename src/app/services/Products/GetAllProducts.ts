import Product from '../../models/Product'
import { IProduct } from './IProductDTO'
import { numberForMoney } from './helpers/money'

class GetAllProducts {
	constructor () {
	}

	async execute () {
		const products = await this.getAllProducts()
		return products
	}

	async formatProducts ({ id, name, imageId, imageUrl, price }: IProduct) {
		return {
			id, name, imageId, imageUrl, price: numberForMoney(price)
		}
	}

	async createMetadata () {

	}

	async getAllProducts () {

		const [totalProducts, products] = await Promise.all([
      Product.countDocuments(),
      Product.find()
			// .limit(limit).skip(skip)
    ])

		return Promise.all(products.map(this.formatProducts))
	}
}

export default GetAllProducts
