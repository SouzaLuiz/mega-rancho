import Product from '../models/Product'
import paginationCreate from './helpers/paginationCreate'
import productManager from './helpers/productManager'

class PagesController {
  async products (req, res) {
    const currentPage = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 15)

    const skip = (currentPage - 1) * limit

    const [totalProducts, products] = await Promise.all([
      Product.countDocuments(),
      Product.find().limit(limit).skip(skip)
    ])

    const totalPages = Math.ceil(totalProducts / limit)

    const pagination = paginationCreate(currentPage, totalPages)

    if (!totalProducts) {
      return res.render('products', { productsEmpty: true })
    }

    return res.render('products', {
      products: products.map(productManager.toClean),
      totalPages,
      currentPage,
      pagination
    })
  }

  async shoopingCart (req, res) {
    const { products_cart } = req.cookies

    const productsId = products_cart ? JSON.parse(products_cart) : []

    if (!productsId.length) {
      return res.render('shooping-cart', { cartEmpty: true })
    }

    const products = await Product
      .find({ _id: { $in: productsId } })

    return res.render('shooping-cart', {
      products: products.map(productManager.toClean)
    })
  }

  async checkout (req, res) {
    return res.render('checkout')
  }

  async orderResult (req, res) {
    return res.render('order-result')
  }

  async newProduct (_, res) {
    return res.render('new-product')
  }

  async editProduct (req, res) {
    const { id } = req.params
    const product = await Product.findById(id)

    return res.render('edit-product', { product })
  }
}

export default new PagesController()
