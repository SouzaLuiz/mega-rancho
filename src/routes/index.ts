import { Router } from 'express'

const routes = Router()

import adminRoutes from './admin.routes'

routes.use('/admin', adminRoutes)

export default routes
