import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity('users')
class User {

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

    @PrimaryColumn()
    readonly id: string

    @Column()
    name: string

    @Column()
    email: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date
}

export default User