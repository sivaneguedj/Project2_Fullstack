const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')

const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-buttons')
const h1Element = document.querySelector('h1')
const h2Element = document.querySelector('h2')
const timerElement = document.getElementById('timer')
const scoreElement = document.getElementById('score-value');

let score = 0; // Initialize score

let shuffledQuestions, currentQuestionIndex, timer

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    timerElement.classList.add('initial-style');
    startButton.classList.add('hide')
    h2Element.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    score = 0;
    updateScore();
}

function setNextQuestion() {
    timerElement.classList.remove('initial-style');
    timerElement.classList.add('question-style');
    resetState()
    resetBackgroundColor()
    startTimer()
    findImg(currentQuestionIndex)
    document.getElementById('answer-image').classList.add('hide');
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    h1Element.classList.add('h1_question')
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    });
}

function resetBackgroundColor() {
    document.body.classList.remove('correct');
    document.body.classList.remove('wrong');
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function findImg(i) {
    const correctAnswerImg= shuffledQuestions[i].image
    document.getElementById('answer-image').src = correctAnswerImg;
}

function startTimer() {
    timerElement.innerText = '30';
    timer = setInterval(() => {
        const timerValue = parseInt(timerElement.innerText)
        if (timerValue > 0) {
            timerElement.innerText = (timerValue - 1).toString()
        } else {
            clearInterval(timer)
            selectAnswer() // Automatically select an answer when time runs out
        }
    }, 1000)
}

function resetTimer() {
    clearInterval(timer);
    timerElement.innerText = '';
}

function selectAnswer(e) {
    clearInterval(timer)
    const selectedButton = e ? e.target : null
    const correct = selectedButton ? selectedButton.dataset.correct : false
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    timerElement.classList.remove('question-style');
    timerElement.classList.add('hide');

    // Set the image source based on the correct answer
    findImg(currentQuestionIndex)
    document.getElementById('answer-image').classList.remove('hide');      

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
    if (correct) {
        score++; // Increment score for correct answer
        updateScore(); // Update score display
    }  
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function updateScore() {
    scoreElement.textContent = score;
}

const questions = [
    {
        question: 'Though they sound happy, what animal\'s "laugh" is a reaction to being threatened?',
        answers: [
            {text: 'hyena', correct: true},
            {text: 'ox', correct: false},
            {text: 'woodpecker', correct: false},
            {text: 'baboon', correct: false}
        ],
        image: "/IMG/hyena.jpeg"
    },
    {
        question: 'Capable of exceeding 186 miles per hour, what is the fastest creature in the animal kingdom?',
        answers: [
            {text: 'black marlin', correct: false},
            {text: 'peregrine falcon', correct: true},
            {text: 'horsefly', correct: false},
            {text: 'cheetah', correct: false}
        ],
        image: '/IMG/peregrine_falcon.jpeg'
    },
    {
        question: 'Known for its intelligence, which dog breed has been found capable of understanding more than a thousand words?',
        answers: [
            {text: 'Cocker Spaniel', correct: false},
            {text: 'French Bulldog', correct: false},
            {text: 'Border Collie', correct: true},
            {text: 'Dachshund', correct: false}
        ],
        image: '/IMG/Border_Collie.jpeg'
    },
    {
        question: 'Which animal species can live in extremes of both heat and cold, from −20 °F to 120 °F?',
        answers: [
            {text: 'polar bear', correct: false},
            {text: 'chuckwalla iguanas', correct: false},
            {text: 'Bactrian camel', correct: true},
            {text: 'emperor penguin', correct: false}
        ],
        image: '/IMG/Bactrian_camel.jpeg'
    },
    {
        question: 'The tiniest animal with a backbone is a what?',
        answers: [
            {text: 'lizard', correct: false},
            {text: 'bird', correct: false},
            {text: 'fish', correct: false},
            {text: 'frog', correct: true}
        ],
        image: '/IMG/frog.jpeg'
    },
    {
        question: 'Growing up to 59 feet (18 meters) long, which is the world’s largest living fish?',
        answers: [
            {text: 'manta ray', correct: false},
            {text: 'whale shark', correct: true},
            {text: 'sailfish', correct: false},
            {text: 'marlin', correct: false}
        ],
        image: '/IMG/whale_shark.jpeg'
    },
    {
        question: 'Which of these “fish” is actually a fish?',
        answers: [
            {text: 'swordfish', correct: true},
            {text: 'starfish', correct: false},
            {text: 'crayfish', correct: false},
            {text: 'jellyfish', correct: false}
        ],
        image: '/IMG/swordfish.jpeg'
    },
    {
        question: 'The largest “town” home to what animal was an underground colony measuring 25,000 square miles, found in Texas?',
        answers: [
            {text: 'meerkat', correct: false},
            {text: 'capybara', correct: false},
            {text: 'beaver', correct: false},
            {text: 'prairie dog', correct: true}
        ],
        image: '/IMG/prairie_dog.jpeg'
    },
    {
        question: 'An individual animal of which type was found to be at least 272 years old, suggesting that its type includes the world’s longest-living vertebrate?',
        answers: [
            {text: 'Indian elephant', correct: false},
            {text: 'Greenland shark', correct: true},
            {text: 'Galapagos tortoise', correct: false},
            {text: 'Japanese Wagyu cattle', correct: false}
        ],
        image: '/IMG/Greenland_shark.jpeg'
    },
    {
        question: 'What gives flamingos their pink color?',
        answers: [
            {text: 'eating shrimp', correct: true},
            {text: 'dominant genes', correct: false},
            {text: 'mud captured in feathers', correct: false},
            {text: 'reaction to sunlight', correct: false}
        ],
        image: '/IMG/eating_shrimp.jpeg'
    },
]
