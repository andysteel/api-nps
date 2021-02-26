import { createConnection, getConnectionOptions } from 'typeorm'

export default async () => {
    const defaultOptions = await getConnectionOptions()

    return await createConnection(
        Object.assign(defaultOptions, {
                database: process.env.NODE_ENV === 'test' 
                ? './src/database/database.test.sqlite' 
                : defaultOptions.database,
            }
        )
    )
} 

