export default function ACTIVITY() {
    // kindly match the quarter_pk in QUARTER.ts file
    return [
        {
            "pk": "1234566",
            "lesson_pk": "5229268592",
            "title": "Gigibun #1",
            "direction": "Direksyon: Mag anap ning makabasa nikading istorya saymu. Mag rungog ning maray ta may mga unga ka na sisimbagan.",
            "story": require('../assets/pdf/lesson/quarter1/activity_1.pdf'),
            "path": "pdf/lesson/quarter1/activity_1.pdf",
        },
        {
            "pk": "7393613815",
            "lesson_pk": "3528709724",
            "title": "Gigibun #2",
            "direction": " Isurat kan mga paborito mong:",
            "story": null,
            "path": null,
        },
        {
            "pk": "6654321",
            "lesson_pk": "0094358195",
            "title": "Gigibun #3",
            "direction": " Isurat ning tama sa linya kan mga inayat na impormasyon manungud sasadiri mo.",
            "story": require('../assets/pdf/lesson/quarter3/activity_3.pdf'),
            "path": "pdf/lesson/quarter3/activity_3.pdf",
        },
        {
            "pk": "0564312581",
            "lesson_pk": "7917604240",
            "title": "Gigibun #1",
            "direction": " Isurat kan mga paborito mong:",
            "story": require('../assets/pdf/lesson/quarter4/activity_4.pdf'),
            "path": "pdf/lesson/quarter4/activity_4.pdf",
        },
    ];
}