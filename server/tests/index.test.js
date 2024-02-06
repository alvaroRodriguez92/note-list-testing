import app from '../index'
import request from 'supertest'
import { describe, test, expect } from '@jest/globals'

// TEST TO TRY GET USERS

describe('GET / users', () => {
  test('Should response with a 200 status code', async () => {
    const response = await request(app).get('/users').send()
    expect(response.statusCode).toBe(200)
  })

  test('Should response with an array', async () => {
    const response = await request(app).get('/users').send()
    expect(response.body).toBeInstanceOf(Array)
  })
})

// TEST TO TRY LOGIN

describe('POST / users/login', () => {
  test('Should response with a 200 status code', async () => {
    const response = await request(app).post('/users/login').send({
      username: 'juaniyocr7siuu',
      password: 'juaniyopass'
    })
    expect(response.statusCode).toBe(200)
  })

  test('Should response with a login token', async () => {
    const response = await request(app).post('/users/login').send({
      username: 'juaniyocr7siuu',
      password: 'juaniyopass'
    })
    expect(response.body.token).toBeDefined()
  })
})

test('Should response with a 404 if username or password is missing', async () => {
  const response = await request(app).post('/users/login').send({})
  expect(response.statusCode).toBe(404)
})

// TEST TO TRY GET NOTES AND ADD NOTES

describe('GET && POST NOTES', () => {
  test('Should get notes', async () => {
    const response = await request(app).get('/notes/1').send()
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })
  test('Should add notes', async () => {
    const response = await request(app).post('/notes').send({ nota: 'TEST_PRUEBA', userID: '1' })
    expect(response.statusCode).toBe(200)
  })
})
