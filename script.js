function sendName() {
    const inputValue = document.getElementById("name").value;
    localStorage.setItem("username", inputValue);
    window.location.href = "game.html";
}
const nm = localStorage.getItem("username");
document.addEventListener('DOMContentLoaded', function () {
    const displayName = document.getElementById("displayName");
    displayName.innerText = nm;
    const choices = Array.from(document.getElementsByClassName("choice-text"));
    console.log(choices);
    let questions = [{
        question: "Inside which HTML element we put the JavaScript ?",
        choices:["<scrpit>","<javascript>","<js>","<scripting>"],
        answer: "<script>"
    },
    {
        question: "What is the correct syntax for referring to an external script?",
        choices: ["<script href='xx.js'>","<script name='xx.js>'","<script src='xx.js'>","<script file='xx.js'"],
        answer: "<script src='xx.js'>"
    },
    {
        question: "How do you write Hello World in alert box?",
        choices: ["msgBox('Hello World')","alertBox('Hello World')","msg('Hello World')","alert('Hello World')"],
        answer: "alert('Hello World')"
    }
    ]
    const score = 0;
    const correct = 4;
    const wrong = -1;

    const question = document.getElementById("question");
    let currentQuestionIndex = 0;
    const choiceElement = document.querySelector(".choice-container");
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");
    function displayQuestion() {
        const currentquestion = questions[currentQuestionIndex];
        question.innerText = currentquestion.question;
        choiceElement.innerHTML = "";
        currentquestion.choices.forEach((choice,index) => {
            const choiceButton = document.createElement("button");
            choiceButton.textContent = choice;
            choiceElement.appendChild(choiceButton);
        })
    }
    prev.addEventListener('click', () => {
        if (currentQuestionIndex > 0){
            currentQuestionIndex--;
            displayQuestion();
        }
    })
    next.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1){
            currentQuestionIndex++;
            displayQuestion();
        }
    })
    displayQuestion();
})
