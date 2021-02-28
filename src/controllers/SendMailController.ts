import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveyRepository from "../repositories/SurveyRepository";
import SurveyUserRepository from "../repositories/SurveyUserRepository";
import UserRepository from "../repositories/UserRepository";
import MailService from "../services/MailService";
import { resolve } from 'path'
import { AppError } from "../errors/AppError";

class SendMailController {

    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body

        const userRepository = getCustomRepository(UserRepository)
        const surveyRepository = getCustomRepository(SurveyRepository)
        const surveyUserRepository = getCustomRepository(SurveyUserRepository)

        const user = await userRepository.findOne({ email })

        if(!user) {
            throw new AppError('User does not exists')
        }

        const survey = await surveyRepository.findOne({ id: survey_id })

        if(!survey) {
            throw new AppError('Survey does not exists')
        }

        const templatePath = resolve(__dirname, '../views/emails/npsMail.hbs')

        const surveyUserAlreadyExists = await surveyUserRepository.findOne({
            where: {user_id: user.id, value: null},
            relations: ['user', 'survey']
        })

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: '',
            link: process.env.URL_MAIL
        }

        if(surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id
            await MailService.send(email, survey.title, variables, templatePath)            
            return response.json(surveyUserAlreadyExists)
        }

        const surveyUser = surveyUserRepository.create({
            user_id: user.id,
            survey_id: survey.id
        })

        await surveyUserRepository.save(surveyUser)

        variables.id = surveyUser.id

        await MailService.send(email, survey.title, variables, templatePath)

        return response.status(201).json(surveyUser)
    }
}

export default SendMailController