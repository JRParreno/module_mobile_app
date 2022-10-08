export default class Translation {
    pk: string;
    word: string;
    translation: string;
    description: string;

  constructor(
    pk: string, 
    word: string, 
    translation: string, 
    description: string
) {
    this.pk = pk
    this.word = word
    this.translation = translation
    this.description = description
  }

}