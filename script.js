const javascriptQuiz = [
    {
        question: "1. What is the output of: `typeof null`?",
        options: ["'object'", "'null'", "'undefined'", "'boolean'"],
        correctAnswer: "'object'"
    },
    {
        question: "2. Which method is used to add an element at the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: "push()"
    },
    {
        question: "3. What will `2 + '2'` evaluate to in JavaScript?",
        options: ["'22'", "4", "NaN", "undefined"],
        correctAnswer: "'22'"
    },
    {
        question: "4. Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Character", "Undefined"],
        correctAnswer: "Character"
    },
    {
        question: "5. How do you write a comment in JavaScript?",
        options: ["<!-- comment -->", "// comment", "/* comment */", "** comment **"],
        correctAnswer: "// comment"
    },
    {
        question: "6. Which keyword is used to declare a constant in JavaScript?",
        options: ["const", "let", "var", "static"],
        correctAnswer: "const"
    },
    {
        question: "7. What is the result of `[] + []` in JavaScript?",
        options: ["''", "0", "undefined", "[]"],
        correctAnswer: "''"
    },
    {
        question: "8. Which operator is used to assign a value to a variable?",
        options: ["==", "=", "===", "=>"],
        correctAnswer: "="
    },
    {
        question: "9. Which built-in method removes the last element from an array?",
        options: ["push()", "pop()", "shift()", "splice()"],
        correctAnswer: "pop()"
    },
    {
        question: "10. What does `isNaN('hello')` return?",
        options: ["true", "false", "undefined", "NaN"],
        correctAnswer: "true"
    },
    {
        question: "11. Which symbol is used for single line comments in JavaScript?",
        options: ["//", "/*", "#", "<!-- -->"],
        correctAnswer: "//"
    },
    {
        question: "12. Which function is used to parse a string to an integer?",
        options: ["parseInt()", "parseFloat()", "Number()", "String()"],
        correctAnswer: "parseInt()"
    },
    {
        question: "13. What does the '===' operator do?",
        options: [
            "Compares both value and type",
            "Assigns a value",
            "Compares only value",
            "Checks if defined"
        ],
        correctAnswer: "Compares both value and type"
    },
    {
        question: "14. Which of the following is a falsy value in JavaScript?",
        options: ["0", "'0'", "[]", "{}"],
        correctAnswer: "0"
    },
    {
        question: "15. What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Model",
            "Document Oriented Module",
            "Desktop Object Management"
        ],
        correctAnswer: "Document Object Model"
    },
    {
        question: "16. How can you write 'Hello World' in an alert box?",
        options: [
            "msg('Hello World');",
            "alertBox('Hello World');",
            "alert('Hello World');",
            "msgBox('Hello World');"
        ],
        correctAnswer: "alert('Hello World');"
    },
    {
        question: "17. Which built-in method returns the length of a string?",
        options: ["size()", "length()", "index()", "length"],
        correctAnswer: "length"
    },
    {
        question: "18. Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "float", "string"],
        correctAnswer: "var"
    },
    {
        question: "19. Which method converts JSON data to a JavaScript object?",
        options: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "convertJSON()"],
        correctAnswer: "JSON.parse()"
    },
    {
        question: "20. What is the correct syntax for a function in JavaScript?",
        options: [
            "function = myFunc()",
            "function myFunc()",
            "def myFunc()",
            "func: myFunc()"
        ],
        correctAnswer: "function myFunc()"
    }
];

let currentQuestion = 0;
let score = 0;
let totalTime = 100;
let globalTimerInterval;

const quesEl = document.getElementById("ques");
const optionEl = document.getElementById("option");
const scoreEl = document.getElementById("left");
const timerEl = document.getElementById("right");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const resetBtn = document.getElementById("resetBtn");
let userAnswers = new Array(javascriptQuiz.length).fill(null);



function showQuestion(index) {
    const q = javascriptQuiz[index];
    quesEl.innerHTML = q.question;
    optionEl.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option-btn");
        if (userAnswers[index]) {
            btn.disabled = true;

            if (option === javascriptQuiz[index].correctAnswer) {
                btn.classList.add("correct");
            }
            if (option === userAnswers[index] && option !== q.correctAnswer) {
                btn.classList.add("wrong");
            }
        }

        btn.onclick = () => checkAnswer(option, q.correctAnswer);
        optionEl.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    userAnswers[currentQuestion] = selected;
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.classList.add("correct");
        } else if (btn.textContent === selected && selected !== correct) {
            btn.classList.add("wrong");
        }
    });

    if (selected === correct) {
        score++;
        scoreEl.innerHTML = `Score : ${score}`;
    }

    setTimeout(nextQuestion, 1000);
}


function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < javascriptQuiz.length) {
        showQuestion(currentQuestion);
    } else {
        endQuiz("Quiz Completed!");
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function resetQuiz() {
    score = 0;
    currentQuestion = 0;
    totalTime = 100;
    scoreEl.innerHTML = "Score : 0";
    userAnswers = new Array(javascriptQuiz.length).fill(null);
    nextBtn.disabled = false;
    prevBtn.disabled = false;
    clearInterval(globalTimerInterval);
    startGlobalTimer();
    showQuestion(currentQuestion);
}

function endQuiz(message) {
    const feedback = getFeedback(score);
    clearInterval(globalTimerInterval);
    quesEl.innerHTML = `<div class="message-box">  ${message} </div>`;
    optionEl.innerHTML = `<div class="score-box"> Your Score = ${score}/20 </div>  <div class="score-box">${feedback}</div>`;
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
}

function startGlobalTimer() {
    timerEl.innerHTML = `Timer : ${totalTime}`;
    globalTimerInterval = setInterval(() => {
        totalTime--;
        timerEl.innerHTML = `Timer : ${totalTime}`;
        if (totalTime <= 0) {
            endQuiz("Time's up! Quiz Over.");
        }
    }, 1000);
}
function getFeedback(score) {
    if (score >= 17) return "Excellent!";
    if (score >= 13) return "Good job!";
    if (score >= 9) return "Keep practicing!";
    return "Try again for a better score!";
}



nextBtn.onclick = nextQuestion;
prevBtn.onclick = prevQuestion;
resetBtn.onclick = resetQuiz;


showQuestion(currentQuestion);
startGlobalTimer();       