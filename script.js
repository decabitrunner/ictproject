const startButton = document.getElementById('start-btn')
startButton.addEventListener('click', start)
const questionContainer = document.getElementById('question-container')
const scoreElement = document.getElementById('score')
const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const scoreButton = document.getElementById('score-btn')
scoreButton.addEventListener('click', showScore)
const nextButton = document.getElementById('next-btn')
nextButton.addEventListener('click', ()=> {
    setNext()
    currentQuestion++
})


let questions = []
let shuffledQuestions, currentQuestion, score

let correctAudio = new Audio('/sfx/correct.wav')
let wrongAudio = new Audio('/sfx/wrong.wav')


function makeQuestions(){
    questions = []
    score = 0
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
}





function start() {
    shuffledQuestions = []
    makeQuestions()
    resetstate()
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(()=>Math.random()-0.5)
    currentQuestion = 0
    questionContainer.classList.remove('hide')
    setNext()
}


function setNext(){
    resetstate()
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
    if(correct){
        correctAudio.play()
        score++
    }else{
        wrongAudio.play()
    }
    
    if (shuffledQuestions.length>currentQuestion+1){
        nextButton.classList.remove('hide')
        
    }else{
        
        scoreButton.classList.remove('hide')
        
        
    }

    
}

function showScore(){
    clearStatusClass(document.body)
    
    questionContainer.classList.add('hide')
    scoreElement.innerText = 'Score: '+score + '/'+shuffledQuestions.length
    scoreElement.classList.remove('hide')
    scoreButton.classList.add('hide')
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
   
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
        
    }else{
        element.classList.add('wrong')
        
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
 

function resetstate(){
    
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    scoreButton.classList.add('hide')
    scoreElement.classList.add('hide')
    questionContainer.classList.remove('hide')
    while (answerButtons.firstElementChild){
        
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
