import express from 'express'

import ProductController from './app/controllers/ProductController'
// import OrderController from './app/controllers/OrderController'
import PagesController from './app/controllers/PagesController'

import upload from './config/multer'
import sharp from './config/sharp'

const routes = express.Router()

routes.get('/', PagesController.products)
routes.get('/new-product', PagesController.newProduct)
routes.get('/shooping-cart', PagesController.shoopingCart)
routes.get('/checkout', PagesController.checkout)
routes.get('/order-result', PagesController.orderResult)
routes.get('/admin-dashboard', PagesController.adminDashboard)
routes.get('/edit-product/:id', PagesController.editProduct)

routes.post('/products', upload.single('image'), sharp.resizing, ProductController.store)
routes.put('/products/:id', upload.single('image'), sharp.resizing, ProductController.update)
routes.delete('/products/:id', ProductController.destroy)

routes.post('/order', (_, res) => {
  return res.render('order-result', { completedOrder: true })
})

export default routes
