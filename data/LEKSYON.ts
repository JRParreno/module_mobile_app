export default function LEKSYON() {
    // kindly match the quarter_pk in QUARTER.ts file
    return [
        {
            "pk": "5229268592",
            "quarter_pk": "7113874452",
            "lesson": require('../assets/pdf/lesson/quarter1/leksyon_1.pdf'),
            "path": "pdf/lesson/quarter1/leksyon_1.pdf"
        },
        {
            "pk": "3528709724",
            "quarter_pk": "0214811335",
            "lesson": require('../assets/pdf/lesson/quarter2/leksyon_2.pdf'),
            "path": "pdf/lesson/quarter2/leksyon_2.pdf"
        },
        {
            "pk": "0094358195",
            "quarter_pk": "2098067388",
            "lesson": require('../assets/pdf/lesson/quarter3/leksyon_3.pdf'),
            "path": "pdf/lesson/quarter3/leksyon_3.pdf"
        },
        {
            "pk": "7917604240",
            "quarter_pk": "9767689146",
            "lesson": require('../assets/pdf/lesson/quarter4/leksyon_4.pdf'),
            "path": "pdf/lesson/quarter4/leksyon_4.pdf"
        },
    ];
}