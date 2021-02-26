import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import Survey from "./Survey";
import User from "./User";

@Entity('surveys_users')
class SurveyUser {

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

    @PrimaryColumn()
    readonly id: string

    @Column()
    user_id: string

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User

    @ManyToOne(() => Survey)
    @JoinColumn({name: 'survey_id'})
    survey: Survey

    @Column()
    survey_id: string

    @Column()
    value: number

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date
}

export default SurveyUser