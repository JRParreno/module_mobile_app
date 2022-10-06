import Answer from "./Answer";
import { EnumAnswer } from "./Enumeration";

export default class Score {
    quizzes: Array<QuizScore>;
    games: Array<GameScore>;

  constructor(quizzes: Array<QuizScore>, games: Array<GameScore>) {
    this.quizzes = quizzes
    this.games = games
  }
}

export class GameScore {
  answers: Array<Answer>;
  category_pk: string;

  constructor(answers: Array<Answer>, category_pk: string) {
    this.answers = answers
    this.category_pk = category_pk
  }
}

export class QuizScore {
  enum_answers:  Array<EnumAnswer>;
  activity_pk: string;

  constructor(enum_answers: Array<EnumAnswer>, activity_pk: string) {
    this.enum_answers = enum_answers
    this.activity_pk = activity_pk
  }
}