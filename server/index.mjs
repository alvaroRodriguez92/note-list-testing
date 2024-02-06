import express from 'express'
import userRoutes from './routes/userRoutes.mjs'
import notesRoutes from './routes/notesRoutes.mjs'
import morgan from 'morgan'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/users', userRoutes)
app.use('/notes', notesRoutes)

app.listen(3001, () => {
  console.log('Server listening in 3001')
})

export default app
