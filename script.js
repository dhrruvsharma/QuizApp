
function sendName() {
    const inputValue = document.getElementById("name").value;
    localStorage.setItem("retain_username", inputValue);
    window.location.href = "game.html";
}
const nm = localStorage.getItem("retain_username");
document.addEventListener('DOMContentLoaded', function () {
    const displayName = document.getElementById("displayName");
    displayName.innerText = nm;
    window.addEventListener("beforeunload", () => {
        clearItems();
    })
    const navButtons = document.querySelector(".numberContainer");
    const choices = Array.from(document.getElementsByClassName("choice-text"));
    console.log(choices);
    let questions = [{
        question: "Inside which HTML element we put the JavaScript ?",
        choices: ["<script>", "<javascript>", "<js>", "<scripting>"],
        answer: "<script>"
    },
    {
        question: "What is the correct syntax for referring to an external script?",
        choices: ["<script href='xx.js'>", "<script name='xx.js>'", "<script src='xx.js'>", "<script file='xx.js'"],
        answer: "<script src='xx.js'>"
    },
    {
        question: "How do you write Hello World in alert box?",
        choices: ["msgBox('Hello World')", "alertBox('Hello World')", "msg('Hello World')", "alert('Hello World')"],
        answer: "alert('Hello World')"
    },
    {
        question: "What type of language is javascript?",
        choices: ["Object-Orineted", "Object Based", "Procedural", "None of the Above"],
        answer: "Object-Oriented"
    },
    {
        question: "Which of the following keyword is used to declare a variable in javascript?",
        choices: ["var", "let", "Both of the above", "None of the above"],
        answer: "Both of the above"
    },
    {
        question: "Which of the following method is used to access HTML elements in javascript?",
        choices: ["getElementbyId()", "getElementbyClassName()", "Both of the above", "None of the above"],
        answer: "Both of the above"
    },
    {
        question: "Upon encountering empty statements, what does the Javascript interpreter do?",
        choices: ["Throws an error", "Ignores the statement", "Gives a warning", "None of the above"],
        answer: "Ignores the statement"
    },
    {
        question: "How are constant variables declared in javascript?",
        choices: ["const", "var", "let", "constant"],
        answer: "const"
    },
    {
        question: "Which of the following is not javascript data type ?",
        choices: ["Null", "Undefined", "Number", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "Which of the following scoping does javascript use ?",
        choices: ["Sequential", "Segmental", "Lexical", "Literal"],
        answer: "Lexical"
    }
    ]
    const score = 0;
    const correct = 4;
    const wrong = -1;
    function clearItems() {
        for (let key in localStorage) {
            if (!key.startsWith("retain_")) {
                localStorage.removeItem(key);
            }
        }
    }
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
        currentquestion.choices.forEach((choice, index) => {
            const div = document.createElement('div');
            div.className = "choice-div";
            const choiceInput = document.createElement('input');
            choiceInput.type = "radio";
            choiceInput.name = "choice";
            choiceInput.id = `choice${index}`;
            choiceInput.value = choice;
            choiceInput.className = "choice-class";

            const storedChoice = localStorage.getItem(`selectedChoice_${currentQuestionIndex}`);

            if (storedChoice === choice) {
                choiceInput.checked = true;
            }

            const choiceLabel = document.createElement("label");
            choiceLabel.setAttribute("for", `choice${index}`);
            choiceLabel.className = "choice-label";
            choiceLabel.textContent = choice;
            choiceFieldset.append(div);
            div.append(choiceInput);
            div.append(choiceLabel);

            choiceInput.addEventListener("change", () => {
                localStorage.setItem(`selectedChoice_${currentQuestionIndex}`, choiceInput.value);
            })
        })
    }
    prev.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    })
    next.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        }
    })
    displayQuestion();
    function goToquestion(questionNumber) {
        currentQuestionIndex = questionNumber;
        displayQuestion();
    }
    navButtons.addEventListener("click", (event) => {
        if (event.target.matches("button[data-question-number]")) {
            const questionNumber = parseInt(event.target.getAttribute("data-question-number"), 10);
            goToquestion(questionNumber);
        }
    })
    for (let i = 0; i < questions.length; i++) {
        const button = document.createElement("button");
        button.textContent = `${i + 1}`;
        button.className = "number-buttons";
        button.setAttribute("data-question-number", i);
        navButtons.append(button);
    }
    function updateStyle() {
        const but = document.querySelectorAll(".number-buttons");
        but.forEach((b, index) => {
            const hasAttempted = localStorage.getItem(`selectedChoice_${index}`);
            // console.log(hasAttempted);
            const isMarked = localStorage.getItem(`reviewedQuestion_${index}`);
            if (isMarked) {
                b.style.backgroundColor = "red";
            }
            else if (hasAttempted !== null) {
                b.style.backgroundColor = "green";
            }
            else {
                b.style.backgroundColor = "#56a5eb";
            }
        })
    }
    choicesForm.addEventListener("change", () => {
        updateStyle();
    })
    function mark(questionNumber) {
        const reviewKey = `reviewedQuestion_${questionNumber}`;
        const isMarked = localStorage.getItem(reviewKey);
        if (isMarked) {
            localStorage.removeItem(reviewKey);
        }
        else {
            localStorage.setItem(reviewKey, "true");
        }
        updateStyle();
    }
    const markButton = document.getElementById("mark");
    markButton.addEventListener("click", () => {
        mark(currentQuestionIndex);
    })
    const submit = document.getElementById("submit");
    let correctAns = 0;
    let incorrectAns = 0;
    function calculateScore() {
        let scoredMarks = 0
        for (let i = 0; i < questions.length; i++) {
            const storedChoice = localStorage.getItem(`selectedChoice_${i}`);
            const correctAnswer = questions[i].answer;

            if (storedChoice === correctAnswer) {
                scoredMarks += 4;
                correctAns++;
            }
            else if (storedChoice !== null) {
                scoredMarks -= 1;
                incorrectAns++;
            }
        }
        return scoredMarks;
    }
    function displayResult() {
        const ans = calculateScore();
        hide();
        const result = document.getElementById("result");
        const resultElement = document.getElementById("resultElement");
        result.style.display = "flex";
        resultElement.innerHTML = `Your score is ${ans} points`;
    }
    submit.addEventListener("click", () => {
        displayResult();
    })
    function hide() {
        const main = document.getElementById("main");
        const buttons = document.querySelector(".buttons");
        main.style.display = "none";
        buttons.style.display = "none";
    }
    const tryAgain = document.getElementById("tryAgain");
    tryAgain.addEventListener("click", () => {
        clearItems();
        hideResult();
        resetQuestions();
        currentQuestionIndex = 0;
        displayQuestion();
    })
    function hideResult() {
        const result = document.getElementById("result");
        result.style.display = "none";
        const main = document.getElementById("main");
        const buttons = document.querySelector(".buttons");
        main.style.display = "flex";
        buttons.style.display = "flex";
    }
    function resetQuestions() {
        const choiceInputs = document.querySelectorAll(".choice-class");
        choiceInputs.forEach((choiceInput) => {
            choiceInput.checked = false;
        })
        updateStyle();
    }
})
