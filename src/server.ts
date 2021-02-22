import express, { Request, Response} from 'express'

const app = express()

app.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Hello World!'
    })
})

app.post('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Os dados foram salvos com sucesso !'
    })
})

app.listen(3333, () => console.log('Server is running'))