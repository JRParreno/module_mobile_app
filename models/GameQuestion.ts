export class GameQuestion  {
    pk: string;
    category_pk: string;
    direction: string;
    image: any;
    questions: Array<Question>;

  constructor(
    pk: string, 
    category_pk: string, 
    direction: string, 
    image: any, 
    questions: Array<Question>
) {
    this.pk = pk
    this.category_pk = category_pk
    this.direction = direction
    this.image = image
    this.questions = questions
  }

}

export class Question {
  pk: string;
  question: string;
  choices: Array<Choice>;
  image: any; 


  constructor(pk: string, question: string, choices: Array<Choice>,     image: any, 
    ) {
    this.pk = pk
    this.question = question
    this.choices = choices
    this.image = image
  }

}

export class Choice {
    choice: string;
    image: any;
    answer: boolean;
    description: string;

  constructor(
    choice: string, 
    image: any, 
    answer: boolean, 
    description: string
) {
    this.choice = choice
    this.image = image
    this.answer = answer
    this.description = description
  }

}