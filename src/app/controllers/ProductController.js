import Product from '../models/Product'
import StorageService from '../services/StorageService'
import { centsForNumber } from './helpers/money'

class ProductController {
  async store (req, res) {
    const { filename, path } = req.file
    const { name } = req.body
    const price = centsForNumber(req.body.price)

    const { imageId, imageUrl } = await StorageService.save(path, filename)

    await Product.create({ name, price, imageId, imageUrl })

    return res.redirect('/admin/products')
  }

  async update (req, res) {
    const { id } = req.params
    const { name } = req.body
    const price = centsForNumber(req.body.price)

    const productInfo = { name, price }

    if (req.file) {
      const { filename, path } = req.file

      const product = await Product.findById(id)

      StorageService.delete(product.imageId)

      const { imageId, imageUrl } = await StorageService.save(path, filename)

      Object.assign(productInfo, { imageId, imageUrl })
    }

    await Product.findByIdAndUpdate(id, productInfo)
    return res.redirect('/admin-dashboard')
  }

  async destroy (req, res) {
    const { id } = req.params

    const product = await Product.findByIdAndDelete(id)

    StorageService.delete(product.imageId)

    return res.redirect('/admin-dashboard')
  }
}

export default new ProductController()
