export default class Activity {
  pk: string;
  leksyon_pk: string;
  title: string;
  direction: string;
  story?: any;
  video?: any;
  image?: any;


  constructor(
    pk: string,
    leksyon_pk: string,
    title: string,
    direction: string,
    story?: any,
    video?: any,
    image?: any,
  ) {
    this.pk = pk
    this.leksyon_pk = leksyon_pk
    this.title = title
    this.direction = direction
    this.story = story
    this.video = video
    this.image = image
  }


}