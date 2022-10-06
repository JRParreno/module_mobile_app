import Score from "../../models/Score";

export interface scoreState {
    score: Score;

}

export const initialScoreState: scoreState = {
    score: {games: [], quizzes: []},
}