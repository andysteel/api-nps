import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import SurveyUserRepository from "../repositories/SurveyUserRepository";

class NPSController {

    /**
     * 1 2 3 4 5 6 7 8 9 10
     * Detratores => 0 - 6
     * Passivos(não são utilizados no calculo) => 7 - 8
     * Promotores => 9 - 10
     * (numero de promotores - numero de detratores) / (numero de respondentes) * 100
     */
    async execute(request: Request, response: Response) {

        const { survey_id } = request.params

        const surveyUserRepository = getCustomRepository(SurveyUserRepository)

        const surveysUser = await surveyUserRepository.find({
            survey_id,
            value: Not(IsNull())
        })

        const detractors = surveysUser.filter(survey => survey.value >= 0 && survey.value <= 6).length

        const promoters = surveysUser.filter(survey => survey.value >= 9 && survey.value <= 10).length

        const passives = surveysUser.filter(survey => survey.value >= 7 && survey.value <= 8).length

        const totalAnswers = surveysUser.length

        const result = Number(((( promoters - detractors ) / totalAnswers) * 100).toFixed(2))

        return response.json({
            detractors,
            promoters,
            passives,
            totalAnswers,
            result
        })
    }
}

export default NPSController