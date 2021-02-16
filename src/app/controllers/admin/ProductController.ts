import { Request, Response } from 'express'
import GetAllProducts from '../../services/Products/GetAllProducts'

class ProductControler {
	async index (request: Request, response: Response) {
		const products = await new GetAllProducts().execute()

		return response.render('pages/admin/products/index', { products })
	}
}

export default new ProductControler()
