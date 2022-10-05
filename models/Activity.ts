export default class Activity {
    pk: string;
    lesson_pk: string;
    title: string;
    direction: string;
    story: any;
    path: string;


  constructor(
    pk: string, 
    lesson_pk: string, 
    title: string, 
    direction: string, 
    story: any, 
    path: string
) {
    this.pk = pk
    this.lesson_pk = lesson_pk
    this.title = title
    this.direction = direction
    this.story = story
    this.path = path
  }
  

}