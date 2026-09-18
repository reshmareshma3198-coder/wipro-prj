/* =====================================================
   LOGIN SYSTEM
===================================================== */

function loginUser() {

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value.trim();

    const message =
        document.getElementById("loginMessage");


    if (username === "" || password === "") {

        message.innerText =
            "⚠️ Please enter username and password.";

        message.style.color = "red";

        return;
    }


    /*
       Demo Login

       Username: student
       Password: 1234
    */

    if (username === "student" && password === "1234") {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        localStorage.setItem(
            "studentName",
            username
        );


        message.innerText =
            "✅ Login successful!";

        message.style.color =
            "green";


        setTimeout(function () {

            window.location.href =
                "index.html";

        }, 700);

    }

    else {

        message.innerText =
            "❌ Invalid username or password.";

        message.style.color =
            "red";
    }
}



/* =====================================================
   CHECK LOGIN
===================================================== */

function checkLogin() {

    const loggedIn =
        localStorage.getItem("loggedIn");


    if (loggedIn !== "true") {

        window.location.href =
            "login.html";

        return;
    }


    const username =
        localStorage.getItem("studentName")
        || "Student";


    const display =
        document.getElementById(
            "displayUsername"
        );


    const welcome =
        document.getElementById(
            "welcomeName"
        );


    if (display) {
        display.innerText =
            username;
    }


    if (welcome) {
        welcome.innerText =
            username;
    }


    loadTasks();
    loadQuiz();
}



/* =====================================================
   LOGOUT
===================================================== */

function logoutUser() {

    localStorage.removeItem(
        "loggedIn"
    );

    localStorage.removeItem(
        "studentName"
    );

    window.location.href =
        "login.html";
}



/* =====================================================
   NAVIGATION
===================================================== */

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(
            ".section"
        );


    sections.forEach(function(section) {

        section.classList.remove(
            "active-section"
        );

    });


    const selected =
        document.getElementById(
            sectionId
        );


    if (selected) {

        selected.classList.add(
            "active-section"
        );

    }


    const buttons =
        document.querySelectorAll(
            ".nav-btn"
        );


    buttons.forEach(function(button) {

        button.classList.remove(
            "active"
        );

    });


    event.currentTarget.classList.add(
        "active"
    );
}



/* =====================================================
   DARK MODE
===================================================== */

function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    const darkMode =
        document.body.classList.contains(
            "dark"
        );


    localStorage.setItem(
        "darkMode",
        darkMode
    );

}



/* LOAD DARK MODE */

if (
    localStorage.getItem(
        "darkMode"
    ) === "true"
) {

    document.body.classList.add(
        "dark"
    );

}



/* =====================================================
   APTITUDE QUIZ
===================================================== */

const questions = [

    {
        question:
            "What is 20% of 250?",

        options: [
            "40",
            "50",
            "60",
            "70"
        ],

        answer: 1
    },


    {
        question:
            "If 5 + 5 × 2 = ?",

        options: [
            "20",
            "15",
            "10",
            "25"
        ],

        answer: 1
    },


    {
        question:
            "What is the square of 12?",

        options: [
            "124",
            "144",
            "154",
            "164"
        ],

        answer: 1
    },


    {
        question:
            "A train travels 60 km in 1 hour. How far will it travel in 3 hours?",

        options: [
            "120 km",
            "150 km",
            "180 km",
            "200 km"
        ],

        answer: 2
    },


    {
        question:
            "What is 25% of 400?",

        options: [
            "50",
            "75",
            "100",
            "125"
        ],

        answer: 2
    },


    {
        question:
            "Which number comes next: 2, 4, 6, 8, ?",

        options: [
            "9",
            "10",
            "11",
            "12"
        ],

        answer: 1
    },


    {
        question:
            "If a pen costs ₹10, what is the cost of 5 pens?",

        options: [
            "₹40",
            "₹45",
            "₹50",
            "₹55"
        ],

        answer: 2
    },


    {
        question:
            "What is the average of 10 and 20?",

        options: [
            "10",
            "15",
            "20",
            "25"
        ],

        answer: 1
    },


    {
        question:
            "100 ÷ 5 = ?",

        options: [
            "10",
            "15",
            "20",
            "25"
        ],

        answer: 2
    },


    {
        question:
            "What is 15 × 4?",

        options: [
            "50",
            "60",
            "70",
            "80"
        ],

        answer: 1
    }

];


let currentQuestion = 0;

let score = 0;

let selectedAnswers =
    Array(
        questions.length
    ).fill(null);



/* LOAD QUIZ */

function loadQuiz() {

    const questionElement =
        document.getElementById(
            "question"
        );


    if (!questionElement) {
        return;
    }


    const question =
        questions[
            currentQuestion
        ];


    document.getElementById(
        "questionNumber"
    ).innerText =
        `Question ${currentQuestion + 1} / ${questions.length}`;


    document.getElementById(
        "question"
    ).innerText =
        question.question;


    document.getElementById(
        "score"
    ).innerText =
        score;


    const options =
        document.getElementById(
            "options"
        );


    options.innerHTML = "";


    question.options.forEach(
        function(option, index) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "option";


            div.innerText =
                option;


            if (
                selectedAnswers[
                    currentQuestion
                ] === index
            ) {

                div.classList.add(
                    "selected"
                );

            }


            div.onclick =
                function() {

                    selectAnswer(index);

                };


            options.appendChild(
                div
            );

        }
    );


    document.getElementById(
        "quizProgress"
    ).style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    document.getElementById(
        "quizResult"
    ).innerText = "";


    document.getElementById(
        "prevBtn"
    ).disabled =
        currentQuestion === 0;

}



/* SELECT ANSWER */

function selectAnswer(index) {

    selectedAnswers[
        currentQuestion
    ] = index;


    const correctAnswer =
        questions[
            currentQuestion
        ].answer;


    score = 0;


    selectedAnswers.forEach(
        function(answer, i) {

            if (
                answer ===
                questions[i].answer
            ) {

                score++;

            }

        }
    );


    document.getElementById(
        "score"
    ).innerText =
        score;


    loadQuiz();


    localStorage.setItem(
        "quizAnswers",
        JSON.stringify(
            selectedAnswers
        )
    );

}



/* NEXT */

function nextQuestion() {

    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        loadQuiz();

    }

    else {

        showFinalResult();

    }

}



/* PREVIOUS */

function previousQuestion() {

    if (
        currentQuestion > 0
    ) {

        currentQuestion--;

        loadQuiz();

    }

}



/* FINAL RESULT */

function showFinalResult() {

    document.querySelector(
        ".quiz-content"
    ).style.display =
        "none";


    document.querySelector(
        ".quiz-buttons"
    ).style.display =
        "none";


    document.querySelector(
        ".quiz-header"
    ).style.display =
        "none";


    document.querySelector(
        ".quiz-progress"
    ).style.display =
        "none";


    const final =
        document.getElementById(
            "finalResult"
        );


    final.style.display =
        "block";


    document.getElementById(
        "finalScore"
    ).innerText =
        `${score} / ${questions.length}`;


    const percentage =
        (score /
            questions.length) *
        100;


    document.getElementById(
        "percentage"
    ).innerText =
        `You scored ${percentage}%`;

}



/* RESTART */

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    selectedAnswers =
        Array(
            questions.length
        ).fill(null);


    document.querySelector(
        ".quiz-content"
    ).style.display =
        "block";


    document.querySelector(
        ".quiz-buttons"
    ).style.display =
        "flex";


    document.querySelector(
        ".quiz-header"
    ).style.display =
        "flex";


    document.querySelector(
        ".quiz-progress"
    ).style.display =
        "block";


    document.getElementById(
        "finalResult"
    ).style.display =
        "none";


    localStorage.removeItem(
        "quizAnswers"
    );


    loadQuiz();

}



/* LOAD SAVED QUIZ */

function loadSavedQuiz() {

    const saved =
        localStorage.getItem(
            "quizAnswers"
        );


    if (saved) {

        selectedAnswers =
            JSON.parse(saved);


        score = 0;


        selectedAnswers.forEach(
            function(answer, i) {

                if (
                    answer ===
                    questions[i].answer
                ) {

                    score++;

                }

            }
        );

    }

}



/* =====================================================
   CODING
===================================================== */

let currentLanguage =
    "Java";


const codingData = {

    Java: {

        title:
            "☕ Java Coding Problem",

        question:
            'Write a Java program to print "Hello World".',

        code:
`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`

    },


    Python: {

        title:
            "🐍 Python Coding Problem",

        question:
            'Write a Python program to print "Hello World".',

        code:
`print("Hello World")`

    },


    JavaScript: {

        title:
            "🟨 JavaScript Coding Problem",

        question:
            'Write JavaScript code to print "Hello World".',

        code:
`console.log("Hello World");`

    },


    SQL: {

        title:
            "🗄️ SQL Coding Problem",

        question:
            "Write an SQL query to display all employees.",

        code:
`SELECT * FROM employees;`

    }

};



function selectLanguage(language) {

    currentLanguage =
        language;


    document.getElementById(
        "currentLanguage"
    ).innerText =
        language === "Java"
            ? "☕ Java"
            : language === "Python"
                ? "🐍 Python"
                : language === "JavaScript"
                    ? "🟨 JavaScript"
                    : "🗄️ SQL";


    document.getElementById(
        "codingTitle"
    ).innerText =
        codingData[
            language
        ].title;


    document.getElementById(
        "codingQuestion"
    ).innerText =
        codingData[
            language
        ].question;


    document.getElementById(
        "codeEditor"
    ).value =
        codingData[
            language
        ].code;


    document.getElementById(
        "codingOutput"
    ).innerText =
        'Click "Run Code" to execute your program...';

}



/* RUN CODING */

function runCoding() {

    const code =
        document.getElementById(
            "codeEditor"
        ).value;


    const output =
        document.getElementById(
            "codingOutput"
        );


    if (code.trim() === "") {

        output.innerText =
            "⚠️ Please write some code.";

        return;
    }


    if (
        currentLanguage ===
        "JavaScript"
    ) {

        try {

            let result;

            const oldLog =
                console.log;


            console.log =
                function(value) {

                    result =
                        value;

                };


            result =
                eval(code);


            console.log =
                oldLog;


            output.innerText =
                result !== undefined
                    ? result
                    : "Code executed successfully!";

        }

        catch(error) {

            output.innerText =
                "❌ Error: " +
                error.message;

        }

    }


    else if (
        currentLanguage ===
        "Python"
    ) {

        output.innerText =
            "Hello World\n\n" +
            "Python code submitted successfully.\n" +
            "(Browser demo execution)";

    }


    else if (
        currentLanguage ===
        "Java"
    ) {

        output.innerText =
            "Hello World\n\n" +
            "Java code submitted successfully.\n" +
            "(Browser demo execution)";

    }


    else if (
        currentLanguage ===
        "SQL"
    ) {

        output.innerText =
            "Query executed successfully.\n\n" +
            "Sample Result:\n" +
            "Employee records displayed.";

    }

}



/* CLEAR CODING */

function clearCoding() {

    document.getElementById(
        "codeEditor"
    ).value = "";


    document.getElementById(
        "codingOutput"
    ).innerText =
        'Click "Run Code" to execute your program...';

}



/* =====================================================
   GD TIMER
===================================================== */

let timerInterval;

let timeLeft = 60;


function startTimer() {

    clearInterval(
        timerInterval
    );


    timeLeft = 60;


    updateTimer();


    timerInterval =
        setInterval(
            function() {

                timeLeft--;

                updateTimer();


                if (
                    timeLeft <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );

                    alert(
                        "⏰ Time's up! GD practice completed."
                    );

                }

            },
            1000
        );

}



function updateTimer() {

    const minutes =
        Math.floor(
            timeLeft / 60
        );


    const seconds =
        timeLeft % 60;


    document.getElementById(
        "timer"
    ).innerText =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}



/* =====================================================
   TODO LIST
===================================================== */

let tasks =
    JSON.parse(
        localStorage.getItem(
            "tasks"
        )
    ) || [];



function addTask() {

    const input =
        document.getElementById(
            "taskInput"
        );


    const text =
        input.value.trim();


    if (text === "") {

        alert(
            "Please enter a task."
        );

        return;
    }


    tasks.push(text);


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    input.value = "";


    loadTasks();

}



function taskEnter(event) {

    if (
        event.key ===
        "Enter"
    ) {

        addTask();

    }

}



function loadTasks() {

    const list =
        document.getElementById(
            "taskList"
        );


    if (!list) {
        return;
    }


    list.innerHTML = "";


    tasks.forEach(
        function(task, index) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "todo-item";


            div.innerHTML = `

                <span>
                    ${task}
                </span>

                <button
                    onclick="deleteTask(${index})"
                >
                    Delete
                </button>

            `;


            list.appendChild(
                div
            );

        }
    );

}



function deleteTask(index) {

    tasks.splice(
        index,
        1
    );


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    loadTasks();

}



function clearTasks() {

    tasks = [];


    localStorage.removeItem(
        "tasks"
    );


    loadTasks();

}



/* =====================================================
   DASHBOARD PROGRESS
===================================================== */

function updateDashboard() {

    const checkboxes =
        document.querySelectorAll(
            ".task input"
        );


    let completed = 0;


    checkboxes.forEach(
        function(box) {

            if (box.checked) {

                completed++;

            }

        }
    );


    const percentage =
        Math.round(
            (
                completed /
                checkboxes.length
            ) * 100
        );


    document.getElementById(
        "overallProgress"
    ).innerText =
        percentage + "%";

}



/* =====================================================
   ENTER KEY LOGIN
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            document.getElementById(
                "loginUsername"
            )
        ) {

            loginUser();

        }

    }
);


/* INITIAL QUIZ LOAD */

loadSavedQuiz();