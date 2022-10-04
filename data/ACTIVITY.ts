export default function ACTIVITY() {
    // kindly match the quarter_pk in QUARTER.ts file
    return [
        {
            "pk": "1234566",
            "quarter_pk": "7113874452",
            "title": "Gigibun #1",
            "direction": "Direksyon: Mag anap ning makabasa nikading istorya saymu. Mag rungog ning maray ta may mga unga ka na sisimbagan.",
            "story": require('./pdf/leksyon_1.pdf'),
        },
        {
            "pk": "7393613815",
            "quarter_pk": "7113874452",
            "title": "Gigibun #2",
            "direction": " Isurat kan mga paborito mong:",
            "story": require('./pdf/leksyon_1.pdf'),
        },
        {
            "pk": "6654321",
            "quarter_pk": "7113874452",
            "title": "Gigibun #3",
            "direction": " Isurat ning tama sa linya kan mga inayat na impormasyon manungud sasadiri mo.",
            "story": require('./pdf/leksyon_1.pdf'),
        },
        {
            "pk": "0564312581",
            "quarter_pk": "0214811335",
            "title": "Gigibun #1",
            "direction": " Isurat kan mga paborito mong:",
            "story": require('./pdf/leksyon_1.pdf'),
        },
    ];
}