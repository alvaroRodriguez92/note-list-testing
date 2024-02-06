import express from 'express'
import userController from '../controllers/userController.mjs'

const userRoutes = express.Router()

userRoutes.get('/', userController.getUsers)
userRoutes.post('/', userController.addUser)
userRoutes.post('/login', userController.login)

export default userRoutes
