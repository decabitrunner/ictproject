const startButton = document.getElementById('start-btn')
startButton.addEventListener('click', start)
const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

const questions = []
let shuffledQuestions, currentQuestion



for (let i = 0; i<=10; i++){
    let a = Math.floor((Math.random()*12)+1)
    let b = Math.floor((Math.random()*12)+1)
    let ans = a*b
    questions.push({
        question: String(a + ' x ' + b),
        answers: [
            {text: String(ans), correct: true},
            {text: String(Math.floor((Math.random()*144)+1)), correct: false},
            {text: String(Math.floor((Math.random()*144)+1)), correct: false},
            {text: String(Math.floor((Math.random()*144)+1)), correct: false}
                ]
    }) 
    
}

console.log(questions)



function start() {
    resetstate()
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(()=>Math.random()-0.5)
    currentQuestion = 0
    questionContainer.classList.remove('hide')
    setNext()
}


function setNext(){
    displayQuestion(shuffledQuestions[currentQuestion])

}

function displayQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')

        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAns)
        answerButtons.appendChild(button)
    })

}

function selectAns(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtons.children).forEach(button=>{
        setStatusClass(button, button.dataset.correct)
    })
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
    }else{
        element.classList.add('correct')
    }
}


function resetstate(){
    nextButton.classList.add('hide')
    while (answerButtons.firstElementChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
