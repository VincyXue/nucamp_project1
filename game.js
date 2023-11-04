const directory = [
    {
        question: "Which country hosted the 2018 FIFA World Cup?",
        answers: ["Brazil", "Germany", "Russia"],
        correctAnswer: "Russia"
    },
    {
        question: "In soccer, how many players are on the field for each team during a regulation match?",
        answers: ["8", "11", "10"],
        correctAnswer: "11"
    },
    {
        question: "What is the term for a situation in which one player scores three goals in a single game?",
        answers: ["Hat-trick", "Touchdown", "Slam dunk"],
        correctAnswer: "Hat-trick"
    },
    {
        question: "Which country won the 2020 UEFA European Championship (Euro 2020), which was held in 2021 due to the COVID-19 pandemic?",
        answers: ["Italy", "France", "Portugal"],
        correctAnswer: "Italy"
    },
    {
        question: "In which year did the United States host the FIFA World Cup for the first time?",
        answers: ["1986", "1994", "2002"],
        correctAnswer: "1994"
    },
];

let startButton = document.querySelector('#start');
let questionPage = document.querySelector('#questionPage');
let question = document.querySelector('#question');
let questionCount = document.querySelector('#questionCount');


startButton.addEventListener('click', function(){
    let count = 1, i=0, correct = 0, totalQuestion = directory.length;

    //set up time count
    let timeLeft = document.querySelector('#timeLeft');
    let totalTime = 5; //set total time
    let timerInterval;

    function updateTimer() {
        if (totalTime >= 0) {
            timeLeft.textContent = totalTime + 's';
            totalTime--;
        }
        else {
            clearInterval(timerInterval);
            if (count<totalQuestion){
                count ++, i++;
                displayQuestion(count, i);
                startTimer();
            }
            else {
                rePlay();
            }
        }
    }

    function startTimer() {
        clearInterval(timerInterval); // Clear the previous interval
        totalTime = 5; //set total time
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000); // Start a new interval
    }

    function rePlay(){
        //game end message;
        questionPage.innerHTML = '';
        let congratPage = document.createElement('p');
        congratPage.innerHTML = `You got ${correct} out of ${totalQuestion}`;
        questionPage.appendChild(congratPage);

        //reset game;
        let rePlayButton = document.createElement('button');
        rePlayButton.innerHTML = 'Click me to replay';
        rePlayButton.classList.add('rePlayButton');
        questionPage.appendChild(rePlayButton);
        rePlayButton.addEventListener('click', function(){
            location.reload();
            startButton.style.display = 'block';
            questionPage.style.display = 'none';
        })
    }

    // game start
    startButton.style.display = "none";
    displayQuestion(count, i);
    startTimer();

    //answer checking
    submitButton.addEventListener('click', function(){
        let selectedAns = document.querySelector('input[name="answer"]:checked');
        let userAnswer = selectedAns.value;
        let correctAnswer = directory[i].correctAnswer;


        if (count < totalQuestion && userAnswer === correctAnswer){
            count ++, i++, correct++;
            displayQuestion(count, i);
            startTimer();
        }
        else if(count!==totalQuestion && userAnswer !==correctAnswer) {
            selectedAns.checked = false;
            count++, i++;
            displayQuestion(count, i);
            startTimer();
        }
        else if (count === totalQuestion){
            if (userAnswer === correctAnswer) correct++;
            rePlay();
        }
    })
})


//adding question and selection elements to pageQuestion
function displayQuestion(count, i) {
    let totalQuestion = directory.length;
    question.innerText = count + '. ' + directory[i].question;

    let listElement = document.querySelector('#questionSelection');

    listElement.innerHTML = '';

    directory[i].answers.forEach((ele) => {
        let listItem = document.createElement('li');
        listItem.style.listStyleType = 'none';
        listItem.innerText = ele;
        listItem.id = "selections";

        let radioButton = document.createElement('input');
        radioButton.setAttribute('type', 'radio');
        radioButton.setAttribute('name', 'answer');
        radioButton.setAttribute('value', ele);
        radioButton.style.float = 'left';

        listItem.appendChild(radioButton);

        listElement.appendChild(listItem);
    })

    questionCount.innerText = `${count} of ${totalQuestion}`;
    questionPage.style.display = "block";
}
