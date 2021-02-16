import { Router } from 'express'

const routes = Router()

import ProductController from '../app/controllers/admin/ProductController'

routes.get('/products', ProductController.index)

export default routes
