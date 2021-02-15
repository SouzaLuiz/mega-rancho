import { Request, Response } from 'express'

class ProductControler {
	index (request: Request, response: Response) {



		return response.render('pages/admin/products/index')
	}
}

export default new ProductControler()
