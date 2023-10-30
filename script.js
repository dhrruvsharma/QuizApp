function sendName() {
    const inputValue = document.getElementById("name").value;
    localStorage.setItem("retain_username", inputValue);
    window.location.href = "game.html";
}
const nm = localStorage.getItem("retain_username");
document.addEventListener('DOMContentLoaded', async function () {
    let questions = [];
    let c = [];
    let a = [];
    let q = [];
    let questionssss = [];
    const displayName = document.getElementById("displayName");
    displayName.innerText = nm;
    window.addEventListener("beforeunload", () => {
        clearItems();
    })
    await search();
    console.log(nm);
    const navButtons = document.querySelector(".numberContainer");
    const choices = Array.from(document.getElementsByClassName("choice-text"));
    console.log(choices);
    async function search() {
        url = `https://opentdb.com/api.php?amount=20&category=21&difficulty=medium&type=multiple`;
        const response = await fetch(url);
        const required = await response.json();
        q = required.results;
        for (let i = 0; i < q.length; i++) {
            questionssss[i] = q[i].question;
            c[i] = q[i].incorrect_answers;
        }
        for (let i = 0; i < q.length; i++) {
            c[i].push(q[i].correct_answer);
            a[i] = q[i].correct_answer;
        }
        for (let i = 0; i < q.length; i++) {
            questions[i] =
            {
                question: questionssss[i],
                choices: c[i],
                answer: a[i]
            }
        }
        console.log(questions);
    }
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
        question.innerText = `Q${currentQuestionIndex + 1} ` + currentquestion.question;
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
        clearInterval(TimeInterval);
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
        timeRemaining = timeLimit;
        displayQuestion();
        startTimer();
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
    const timeLimit = 300;
    let TimeInterval;
    let timeRemaining = timeLimit;
    function updateTimer() {
        const timerElement = document.querySelector("#Timer");
        timerElement.innerHTML = `${Math.floor(timeRemaining / 60)}: ${(timeRemaining % 60).toString().padStart(2, '0')}`;
        if (timeRemaining <= 0) {
            displayResult();
        }
        else {
            timeRemaining--;
        }
    }
    function startTimer() {
        TimeInterval = setInterval(updateTimer, 1000)
    }
    startTimer();
})
