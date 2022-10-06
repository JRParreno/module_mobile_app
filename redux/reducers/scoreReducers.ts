import { IScoreActions } from "../types/score";
import { initialScoreState } from "../states/scoreState";
import { ADD_SCORE_GAME, ADD_SCORE_QUIZ } from "../types/types";
import Score from "../../models/Score";

export const scoreReducer = (state = initialScoreState, action: IScoreActions) => {
    switch (action.type) {
        case ADD_SCORE_GAME:
            state.score.games.push(action.payload);
            return {
               ...state
            };
        case ADD_SCORE_QUIZ:
            state.score.quizzes.push(action.payload);
            return {
                ...state
            };
        default:
            return state;
    }
}