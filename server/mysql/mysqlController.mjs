import mysql from 'mysql2/promise'
import querys from './querys.mjs'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const mysqlController = {}

// Controller para recibir todos los usuarios

mysqlController.getUsers = async function getUsers () {
  let connection

  try {
    connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD
    })

    const result = await connection.execute(querys.getUsers)
    return result[0]
  } catch (e) {
    throw new Error(e)
  }
}

// Controller para recibir el id de un usuario

mysqlController.getUser = async function getUser (username) {
  let connection

  try {
    connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD
    })

    const result = await connection.execute(querys.getUser, [username])
    return result[0]
  } catch (e) {
    throw new Error(e)
  }
}

// Controller para añadir usuario

mysqlController.addUser = async function register (username, password) {
  let connection

  try {
    connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD
    })
    const result = await connection.execute(querys.addUser, [username, password])
    return result[0]
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      return e.code
    } else {
      throw new Error(e)
    }
  }
}

// Controller para recibir login

mysqlController.login = async function login (username, password) {
  let connection

  try {
    connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD
    })

    const result = await connection.execute(querys.login, [username, password])
    return result[0]
  } catch (e) {
    throw new Error(e)
  }
}

// Controller para recibir notas

mysqlController.getNotes = async function getNotes (userID) {
  let connection

  try {
    connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD
    })

    const result = await connection.execute(querys.getNotes, [userID])
    return result[0]
  } catch (e) {
    throw new Error(e)
  }
}

// Controller para añadir nota

mysqlController.addNotes = async function addNotes (nota, userID) {
  let connection

  try {
    connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD
    })

    const result = await connection.execute(querys.addNotes, [nota, userID])
    return result
  } catch (e) {
    throw new Error(e)
  }
}

// Controller para updatear note

mysqlController.updateNote = async function (newNote, id) {
  let connection
  try {
    connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD
    })

    const result = await connection.execute(querys.updateNote, [newNote, id])
    return result[0]
  } catch (e) {
    throw new Error(e)
  }
}

// Controller para eliminar note

mysqlController.deleteNote = async function deleteNote (id) {
  let connection
  try {
    connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD
    })

    const result = await connection.execute(querys.deleteNote, [id])
    return result[0]
  } catch (e) {
    throw new Error(e)
  }
}

export default mysqlController
