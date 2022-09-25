export default function QUESTIONNAIER() {
    return [
        {
            "pk": "6810921321",
            "quarter_pk": "7113874452",
            "direction": "Direction",
            "image": require('../assets/lottie/amun_selection/102960-math-concept-6.json'),
            "questions": [
                {
                    "pk": "4059845275",
                    "question": "How old are you?",
                    "image": require('../assets/lottie/amun_selection/102960-math-concept-6.json'),
                    "choices": [
                        {
                            "choice": "A",
                            "description": "I am 7 years old",
                            "answer": true
                        },
                        {
                            "choice": "B",
                            "description": "I am 8 years old",
                            "answer": false
                        },
                        {
                            "choice": "C",
                            "description": "I am 9 years old",
                            "answer": false
                        },
                        {
                            "choice": "D",
                            "description": "I am 19 years old",
                            "answer": false
                        },
                    ]
                }
            ]
        },
        {
            "pk": "6053244471",
            "title": "MAPEH",
            "path": require('../assets/lottie/amun_selection/114864-green-calculator.json')
        },
        {
            "pk": "0742273369",
            "title": "ARALING PANLIPUNAN",
            "path": require('../assets/lottie/amun_selection/114864-green-calculator.json')
        }
    ];
}