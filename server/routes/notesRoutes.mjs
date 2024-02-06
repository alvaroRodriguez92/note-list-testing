import express from 'express'
import notesController from '../controllers/notesController.mjs'

const notesRoutes = express.Router()

notesRoutes.get('/:userID', notesController.getNotes)
notesRoutes.post('/', notesController.addNotes)
notesRoutes.patch('/:noteID', notesController.updateNote)
notesRoutes.delete('/:id', notesController.deleteNote)

export default notesRoutes
