import request from 'supertest'
import app from '../app'
import createConnection from '../database'

describe('User', () => {

    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    it('Should be able to create a new user', async () => {
        const response = await request(app).post('/users').send({
            name: 'Andy',
            email: 'andy@andy2.com'
        })

        expect(response.status).toBe(201)
    })

    it('Should not to be able to create a user', async () => {
        const response = await request(app).post('/users').send({
            name: 'Andy',
            email: 'andy@andy2.com'
        })

        expect(response.status).toBe(400)
    })

})