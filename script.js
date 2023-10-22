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
        choice1: "<scrpit>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "What is the correct syntax for referring to an external script?",
        choice1: "<script href='xx.js'>",
        choice2: "<script name='xx.js>'",
        choice3: "<script src='xx.js'>",
        choice4: "<script file='xx.js'",
        answer: 3
    },
    {
        question: "How do you write Hello World in alert box?",
        choice1: "msgBox('Hello World')",
        choice2: "alertBox('Hello World')",
        choice3: "msg('Hello World')",
        choice4: "alert('Hello World')",
        answer: 4
    }
    ]
    const score = 0;
    const correct = 4;
    const wrong = -1;

    const question = document.getElementById("question");
})
