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
        choices:["<script>","<javascript>","<js>","<scripting>"],
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
    },
    {
        question: "What type of language is javascript?",
        choices: ["Object-Orineted","Object Based","Procedural","None of the Above"];
        answer: "Object-Orinted"
    },
    ]
    const score = 0;
    const correct = 4;
    const wrong = -1;

    const question = document.getElementById("question");
    let currentQuestionIndex = 0;
    const choiceElement = document.querySelector(".choice-container");
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");
    const choicesForm = document.getElementById("choices-form");
    const choiceFieldset = document.getElementById("choice-fieldset");
    function displayQuestion() {
        const currentquestion = questions[currentQuestionIndex];
        question.innerText = currentquestion.question;
        choiceFieldset.innerHTML = "";
        currentquestion.choices.forEach((choice,index) => {
            const div = document.createElement('div');
            div.className = "choice-div";
            const choiceInput = document.createElement('input');
            choiceInput.type = "radio";
            choiceInput.name = "choice";
            choiceInput.id = `choice${index}`;
            choiceInput.value = choice;
            choiceInput.className = "choice-class";

            const storedChoice = localStorage.getItem(`selectedChoice_${currentQuestionIndex}`);
            
            if (storedChoice === choice){
                choiceInput.checked = true;
            }

            const choiceLabel = document.createElement("label");
            choiceLabel.setAttribute("for",`choice${index}`);
            choiceLabel.className = "choice-label";
            choiceLabel.textContent = choice;
            choiceFieldset.append(div);
            div.append(choiceInput);
            div.append(choiceLabel);

            choiceInput.addEventListener("change" , () => {
                localStorage.setItem(`selectedChoice_${currentQuestionIndex}`,choiceInput.value);
            })
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
