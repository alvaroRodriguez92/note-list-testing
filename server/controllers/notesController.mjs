import mysqlController from '../mysql/mysqlController.mjs'

const notesController = {}

// Controlador para conseguir las notes

notesController.getNotes = async function (req, res) {
  const { userID } = req.params
  try {
    const result = await mysqlController.getNotes(userID)
    res.status(200).send(result)
  } catch (e) {
    throw new Error(e)
  }
}

// Controlador para añadir notes

notesController.addNotes = async function (req, res) {
  try {
    const { nota, userID } = req.body

    if (!nota || !userID) {
      return res
        .status(404)
        .send('Error al recibir la nota o el ID del usuario')
    }

    const result = await mysqlController.addNotes(nota, userID)
    if (result) {
      const newNotes = await mysqlController.getNotes(userID)
      res.status(200).send(newNotes)
    }
  } catch (e) {
    throw new Error(e)
  }
}

// Updatear note

notesController.updateNote = async function (req, res) {
  try {
    const { noteID } = req.params
    const { userID, newNote } = req.body
    if (!noteID || !newNote) return res.status(400).send('Error al recibir la id de la nota o la nota updateada')

    const result = await mysqlController.updateNote(newNote, noteID)
    if (result) {
      const newNoteList = await mysqlController.getNotes(userID)
      return res.status(200).send(newNoteList)
    }
  } catch (e) {
    throw new Error(e)
  }
}

// Eliminar una note

notesController.deleteNote = async function (req, res) {
  try {
    const { id } = req.params
    const { userID } = req.body
    if (!id || !userID) {
      res.status(404).send('Error al recibir id o id del usuario')
    }

    const result = await mysqlController.deleteNote(id)
    if (result) {
      const newNotes = await mysqlController.getNotes(userID)
      res.status(200).send(newNotes)
    }
  } catch (e) {
    throw new Error(e)
  }
}

export default notesController
