import { GameScore, QuizScore } from "../../models/Score";
import { addScoreGameType, addScoreQuizType } from "../types/score";
import { ADD_SCORE_GAME, ADD_SCORE_QUIZ } from "../types/types";

export function addGameScore(answer: GameScore): addScoreGameType {
    return {
        type: ADD_SCORE_GAME,
        payload: answer
    }
}

export function addQuizScore(enumAnswer: QuizScore): addScoreQuizType {
    return {
        type: ADD_SCORE_QUIZ,
        payload: enumAnswer
    }
}
