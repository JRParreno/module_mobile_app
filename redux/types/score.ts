import { GameScore, QuizScore } from "../../models/Score";

import {
    ADD_SCORE_GAME,
    ADD_SCORE_QUIZ
} from "./types";


export type addScoreGameType = {
    type: typeof ADD_SCORE_GAME,
    payload: GameScore
}

export type addScoreQuizType = {
    type: typeof ADD_SCORE_QUIZ,
    payload: QuizScore
}


export type IScoreActions =
addScoreGameType |
addScoreQuizType;