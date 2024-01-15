let test = [{
    typeQuestion: 'SC',
    questionText: 'Когда вышла первая игра серии?',
    answers: ['1998', '2002', '1997', '2000'],
    correct: [false, false, true, false]
},
{
    typeQuestion: 'SC',
    questionText: 'На какой платформе изначально выпускались игры?',
     answers: ['PC-98', 'PlayStation', 'Linux', 'Nintendo GameBoy'],
     correct: [true, false, false, false]
},
{
    typeQuestion: 'MC',
    questionText: 'Какие герои чаще всего появляются в играх?',
    answers: ['Рейму Хакурей','Ююко Сайгёджи','Санаэ Кочия','Мариса Кирисаме','Сакуя Идзаёй',
    'Чирно'],
    correct: [true, false, false, true, true, false]
},
{
    typeQuestion: 'SN',
    questionText: 'Какой псевдоним у автора игр?',
    answers: [''],
 correct: ['ZUN']
},
{
    typeQuestion: 'SC',
    questionText: 'В каком жанре выпускаются игры?',
    answers: ['Визуальная новелла', 'RPGMaker', 'Слэшер', 'Даммаку-шутер'],
    correct: [false, false, false, true]
},
{
    typeQuestion: 'SC',
    questionText: 'Кем является главная героиня?',
    answers: ['Жрица мико', 'Ведьма', 'Ёкай', 'Обычный человек'],
    correct: [true, false, false, false]
},
{
    typeQuestion: 'MC',
    questionText: 'Что умеет главная героиня?',
    answers: ['стрелять лазерами', 'летать', 'использовать амулеты', 'взрывать врагов'],
    correct: [false, true, true, false]
},
{
    typeQuestion: 'SC',
    questionText: 'Как зовут питомца главной героини (черепаху)?',
    answers: ['Гендзи', 'Момо', 'Сакура', 'Тенсей'],
    correct: [true, false, false, false]
},
{
    typeQuestion: 'SC',
    questionText: 'Как называлась первая Windows-игра Touhou?',
    answers: ['Измерение сна', 'Восточные земли Алой дьяволицы', 'Курган цветочных отражений', 
    'Дивный восточный рассказ'],
    correct: [false, true, false, false]
},
{
    typeQuestion: 'SN',
    questionText: 'Как называется мир, в котором живёт и который защищает героиня игры?',
    answers: [''],
 correct: ['Генсокё']
},
]
function createTest(testData) {
    let element = document.getElementById('test');
    for(let i = 0; i < testData.length; i++) {
        let itemTest = document.createElement('li');
        itemTest.classList.add('question');
        itemTest.innerHTML = testData[i].questionText;
        let itemsAnswers = document.createElement('ul')
        for(let j = 0; j < testData[i].answers.length; j++) {
            let answer = document.createElement('li');
            if (testData[i].typeQuestion === "SC") {
                answer.innerHTML = `<label><input type="radio" 
                name="answer${i}">${testData[i].answers[j]}</label>`;
            } else if (testData[i].typeQuestion === "MC") {
                answer.innerHTML = `<label><input type="checkbox" 
                name="answer${i}">${testData[i].answers[j]}</label>`;
            } else if (testData[i].typeQuestion === "SN") {
                answer.innerHTML = `<label><input type="text"
                name="answer${i}">${testData[i].answers[j]}</label>`;
            }
            itemsAnswers.appendChild(answer);
        }
        itemTest.appendChild(itemsAnswers);
        element.appendChild(itemTest);
    } 
}
document.addEventListener("DOMContentLoaded", function() {
    createTest(test);
})
function checkTest(testData){
    let questions = document.getElementsByClassName('question');
    let correctQuestion = 0;
    for(let i = 0; i < questions.length; i++) {
        let answers = questions[i].getElementsByTagName('input');
        let amountCorrect = 0;
        for(let j = 0; j < answers.length; j++) {
            if (testData[i].typeQuestion == 'SC' || testData[i].typeQuestion == 'MC') {
                if (answers[j].checked == testData[i].correct[j]) {
                    amountCorrect++;
                }
            }
            else if (testData[i].typeQuestion == 'SN') {
                if (answers[j].value == testData[i].correct[j]) {
                    amountCorrect++;
                }
            } 
        }
        if(amountCorrect == answers.length) {
            correctQuestion ++;
        } else {
            questions[i].classList.add('error');
        } 
    }
    document.getElementById('result').innerHTML =
    `Верных ответов на тест - ${correctQuestion}, что составляет
    ${Math.round(correctQuestion/questions.length * 100)}%.`;
}

function clearTest(testData){
    document.getElementById('test').innerHTML = "";
    document.getElementById('result').innerHTML = "";
    createTest(testData);
   }