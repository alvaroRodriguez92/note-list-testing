import mysqlController from '../mysql/mysqlController.mjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const userController = {}

userController.getUsers = async function (req, res) {
  try {
    const result = await mysqlController.getUsers()
    res.status(200).send(result)
  } catch (e) {
    throw new Error(e)
  }
}

userController.addUser = async function (req, res) {
  const { username, password } = req.body
  if (!username || !password) { return res.status(404).send('Error al recibir username o password') }
  try {
    const result = await mysqlController.addUser(username, password)
    if (result === 'ER_DUP_ENTRY') {
      res.status(400).send('Nombre de usuario duplicado')
    } else {
      res.status(200).send('Usuario añadido correctamente')
    }
  } catch (e) {
    throw new Error(e)
  }
}

userController.login = async function (req, res) {
  const { username, password } = req.body
  if (!username || !password) { return res.status(404).send('Error al recibir username o password') }
  try {
    const result = await mysqlController.login(username, password)
    if (result) {
      const user = await mysqlController.getUser(username)
      if (!user[0]) {
        res.status(404).send('Nombre de usuario no encontrado')
      } else {
        const userID = user[0].userID
        const token = jwt.sign({ username, password }, process.env.SECRET_KEY)
        res.status(200).send({ userID, token })
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}

export default userController
