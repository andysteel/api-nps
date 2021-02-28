import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import SurveyUserRepository from "../repositories/SurveyUserRepository";

class AnswerController {

    async execute(request: Request, response: Response) {
        //example http://localhost:3333/answers/:value = http://localhost:3333/answers/3
        const { value } = request.params
        //example http://localhost:3333/answers/:value?u=123456789456123 = http://localhost:3333/answers/3?u=123456789456123
        const { u } = request.query

        const surveyUserRepository = getCustomRepository(SurveyUserRepository)
        const surveyUser = await surveyUserRepository.findOne({
            id: u as string
        })

        if(!surveyUser) {
            throw new AppError('Survey User does not exists')
        }
        
        if(surveyUser.value !== null) {
            throw new AppError('Your score for this survey already exists')
        }

        surveyUser.value = Number(value)

        await surveyUserRepository.save(surveyUser)

        return response.json({
            success: 'Survey answered !'
        })
    }
}

export default AnswerController