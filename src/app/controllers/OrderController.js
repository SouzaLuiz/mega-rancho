import Chat from '../models/Chat'
import Product from '../models/Product'
import formatMessage from './helpers/formatMessage'
import telegram from '../services/telegram'

class OrderController {
  async store (req, res) {
    const { name, addres, complement, telephone, products_list } = req.body

    const clientInfo = { name, addres, complement, telephone }
    const productsCart = JSON.parse(products_list)

    const productsIds = productsCart.map(item => item.id)

    try {
      const [chat] = await Chat.find()

      const products = await Product.find()
        .where('_id')
        .in(productsIds)
        .select('_id price name')

      const productsWithQuantity = products.map(item => {
        const [productQuantity] = productsCart.filter(product => product.id === item.id)

        return {
          ...productQuantity,
          name: item.name,
          price: item.price
        }
      })

      const message = formatMessage(clientInfo, productsWithQuantity)

      telegram.sendMessage(chat.chatId, message)

      // Mostrar que deu tudo certo
      return res.status(200).send()
    } catch (error) {
      // Mostrar tela de error
      return res.status(400).send(error)
    }
  }
}

export default new OrderController()