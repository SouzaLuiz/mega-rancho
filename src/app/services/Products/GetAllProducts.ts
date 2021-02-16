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

	async formatProducts (product: IProduct) {
		return {
			id: product.id,
			name: product.name,
			imageId: product.imageId,
			imageUrl: product.imageUrl,
			price: numberForMoney(product.price)
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
