document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect user input
    let username = document.getElementById('username').value;

    // Validate if username is already taken (simulate checking)
    if (localStorage.getItem(username)) {
        alert('Username already exists. Please choose another username.');
        return;
    }

    // Save username to localStorage to prevent reuse
    localStorage.setItem(username, true);

    // Prepare an array to store answers
    let answers = [];

    // Loop through each question and collect answers
    for (let i = 1; i <= 10; i++) {
        let answer = document.getElementById(`question${i}`).value;
        answers.push(answer);
    }

    // Construct result message
    let resultMessage = `
        <h2>Quiz Results for ${username}</h2>
        <ol>
            <li><strong>What is your name?</strong> ${answers[0]}</li>
            <li><strong>What do you like to do in your free time?</strong> ${answers[1]}</li>
            <li><strong>What is your favorite food?</strong> ${answers[2]}</li>
            <li><strong>What are your hobbies?</strong> ${answers[3]}</li>
            <li><strong>Where do you live?</strong> ${answers[4]}</li>
            <li><strong>Where do you usually go on weekends?</strong> ${answers[5]}</li>
            <li><strong>When do you wake up every morning?</strong> ${answers[6]}</li>
            <li><strong>When do you have dinner?</strong> ${answers[7]}</li>
            <li><strong>How do you travel to work/school?</strong> ${answers[8]}</li>
            <li><strong>How often do you exercise?</strong> ${answers[9]}</li>
        </ol>
    `;

    // Display result
    let resultContainer = document.getElementById('result');
    resultContainer.innerHTML = resultMessage;

    // Save answers to localStorage
    let allResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    let quizResult = { username: username, answers: answers };
    allResults.push(quizResult);
    localStorage.setItem('quizResults', JSON.stringify(allResults));

    // Optionally, clear the form after submission
    document.getElementById('quizForm').reset();
});

// Load previous quiz results from localStorage on page load
window.onload = function() {
    let allResults = JSON.parse(localStorage.getItem('quizResults')) || [];

    let resultHistory = document.getElementById('result-history');
    if (resultHistory) {
        let historyMessage = '<h2>Previous Quiz Results:</h2>';
        allResults.forEach(result => {
            historyMessage += `
                <div>
                    <p><strong>Username:</strong> ${result.username}</p>
                    <ol>
                        <li><strong>What is your name?</strong> ${result.answers[0]}</li>
                        <li><strong>What do you like to do in your free time?</strong> ${result.answers[1]}</li>
                        <li><strong>What is your favorite food?</strong> ${result.answers[2]}</li>
                        <li><strong>What are your hobbies?</strong> ${result.answers[3]}</li>
                        <li><strong>Where do you live?</strong> ${result.answers[4]}</li>
                        <li><strong>Where do you usually go on weekends?</strong> ${result.answers[5]}</li>
                        <li><strong>When do you wake up every morning?</strong> ${result.answers[6]}</li>
                        <li><strong>When do you have dinner?</strong> ${result.answers[7]}</li>
                        <li><strong>How do you travel to work/school?</strong> ${result.answers[8]}</li>
                        <li><strong>How often do you exercise?</strong> ${result.answers[9]}</li>
                    </ol>
                </div>
            `;
        });
        resultHistory.innerHTML = historyMessage;
    }
};
