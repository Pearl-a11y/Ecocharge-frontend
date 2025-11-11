// quiz.js - Quiz logic for EcoCharge

// Sample quiz data structure
const quizData = [
    {
        id: 'sustainability-smarts',
        title: 'Sustainability Smarts',
        questions: [
            {
                question: 'Which energy source is renewable?',
                options: ['Coal', 'Solar', 'Natural Gas', 'Oil'],
                correctAnswer: 'Solar'
            },
            {
                question: 'What percentage of Earth\'s water is fresh water?',
                options: ['3%', '10%', '25%', '50%'],
                correctAnswer: '3%'
            },
            {
                question: 'Which gas is most responsible for global warming?',
                options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
                correctAnswer: 'Carbon Dioxide'
            }
        ]
    },
    {
        id: 'eco-warriors',
        title: 'Eco Warriors Quiz',
        questions: [
            {
                question: 'What does the term "carbon footprint" mean?',
                options: ['Size of your shoes', 'Amount of CO2 emissions', 'Number of trees planted', 'Distance traveled'],
                correctAnswer: 'Amount of CO2 emissions'
            },
            {
                question: 'Which material takes the longest to decompose?',
                options: ['Paper', 'Plastic', 'Food waste', 'Glass'],
                correctAnswer: 'Glass'
            }
        ]
    }
];

let currentQuiz = null;
let currentQuestionIndex = 0;
let userScore = 0;
let selectedAnswer = null;

// Start quiz function
function startQuiz(quizId) {
    // Find quiz by ID
    currentQuiz = quizData.find(quiz => quiz.id === quizId);
    
    // Error handling: Check if quiz exists
    if (!currentQuiz) {
        console.error('Quiz not found:', quizId);
        alert('Sorry, this quiz is not available yet.');
        return;
    }
    
    // Reset quiz state
    currentQuestionIndex = 0;
    userScore = 0;
    selectedAnswer = null;
    
    // Hide quiz grid and show quiz display
    const quizGrid = document.querySelector('.quiz-grid');
    const quizDisplay = document.getElementById('quizDisplay');
    
    if (quizGrid) quizGrid.style.display = 'none';
    if (quizDisplay) quizDisplay.style.display = 'block';
    
    // Display first question
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    const questionContainer = document.getElementById('questionContainer');
    
    if (!questionContainer) {
        console.error('Question container not found');
        return;
    }
    
    // Clear previous content
    questionContainer.innerHTML = '';
    
    // Create question text
    const questionText = document.createElement('p');
    questionText.className = 'question-text';
    questionText.textContent = `Question ${currentQuestionIndex + 1}: ${question.question}`;
    questionContainer.appendChild(questionText);
    
    // Create answer buttons container
    const answersContainer = document.createElement('div');
    answersContainer.className = 'answers-container';
    
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(option, button));
        answersContainer.appendChild(button);
    });
    
    questionContainer.appendChild(answersContainer);
    
    // Add submit button
    const submitBtn = document.createElement('button');
    submitBtn.id = 'submitAnswer';
    submitBtn.className = 'submit-btn';
    submitBtn.textContent = 'Submit Answer';
    submitBtn.disabled = true;
    submitBtn.addEventListener('click', submitAnswer);
    questionContainer.appendChild(submitBtn);
}

// Handle answer selection
function selectAnswer(answer, button) {
    selectedAnswer = answer;
    
    // Remove previous selection
    const allButtons = document.querySelectorAll('.answer-btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Highlight selected button
    button.classList.add('selected');
    
    // Enable submit button
    document.getElementById('submitAnswer').disabled = false;
}

// Submit answer and check if correct
function submitAnswer() {
    if (!selectedAnswer) {
        alert('Please select an answer');
        return;
    }
    
    const question = currentQuiz.questions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');
    
    // Check if answer is correct
    if (selectedAnswer === question.correctAnswer) {
        userScore += 10;
        showFeedback('✓ Correct!', 'success');
    } else {
        showFeedback(`✗ Incorrect. The correct answer is: ${question.correctAnswer}`, 'error');
    }
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        selectedAnswer = null;
        
        if (currentQuestionIndex < currentQuiz.questions.length) {
            displayQuestion();
            feedback.style.display = 'none';
        } else {
            endQuiz();
        }
    }, 2000);
}

// Show feedback message
function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    if (!feedback) return;
    
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
    feedback.style.display = 'block';
}

// End quiz and show results
function endQuiz() {
    const totalQuestions = currentQuiz.questions.length;
    const maxScore = totalQuestions * 10;
    const percentage = Math.round((userScore / maxScore) * 100);
    
    // Display results
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = `
        <div class="quiz-results">
            <h2>Quiz Complete!</h2>
            <p class="score">Score: ${userScore} / ${maxScore}</p>
            <p class="percentage">Percentage: ${percentage}%</p>
            <p class="result-message">${getResultMessage(percentage)}</p>
            <button onclick="returnToQuizzes()" class="return-btn">Back to Quizzes</button>
        </div>
    `;
    
    // Hide feedback
    const feedback = document.getElementById('feedback');
    if (feedback) feedback.style.display = 'none';
    
    // Update user progress
    if (typeof updateUserProgress === 'function') {
        updateUserProgress('quiz', userScore);
    }
}

// Get result message based on percentage
function getResultMessage(percentage) {
    if (percentage >= 90) return '🌟 Excellent! You\'re an eco-champion!';
    if (percentage >= 70) return '👍 Great job! Keep learning!';
    if (percentage >= 50) return '📚 Good effort! Review and try again!';
    return '💪 Keep trying! Every step counts!';
}

// Return to quizzes page
function returnToQuizzes() {
    const quizGrid = document.querySelector('.quiz-grid');
    const quizDisplay = document.getElementById('quizDisplay');
    
    if (quizGrid) quizGrid.style.display = 'grid';
    if (quizDisplay) quizDisplay.style.display = 'none';
}
