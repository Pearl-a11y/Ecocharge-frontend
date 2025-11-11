// main.js - Core functionality for EcoCharge

// Initialize app when page loads
window.addEventListener('load', function() {
    console.log('EcoCharge app loaded successfully');
    loadUserProgress();
});

// Navigation function
function navigateToPage(page) {
    window.location.href = page;
}

// Start Learning button - navigate to features page
const startBtn = document.getElementById('startBtn');
if (startBtn) {
    startBtn.addEventListener('click', function() {
        console.log('Navigating to features page');
        navigateToPage('features.html');
    });
}

// Login button - placeholder for future functionality
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.addEventListener('click', function() {
        alert('Login feature coming soon!');
    });
}

// Load user progress from sessionStorage
function loadUserProgress() {
    const savedProgress = sessionStorage.getItem('userProgress');
    
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        console.log('Loaded progress:', progress);
        return progress;
    } else {
        // Initialize new user progress
        const newProgress = {
            completedQuizzes: 0,
            completedChallenges: 0,
            watchedVideos: 0,
            totalPoints: 0,
            unlockedBadges: []
        };
        sessionStorage.setItem('userProgress', JSON.stringify(newProgress));
        console.log('Initialized new progress');
        return newProgress;
    }
}

// Save user progress
// Save user progress to sessionStorage
function saveUserProgress(progress) {
    try {
        sessionStorage.setItem('userProgress', JSON.stringify(progress));
        console.log('Progress saved successfully');
    } catch (error) {
        console.error('Error saving progress:', error);
    }
}

// Update user progress after activity completion
function updateUserProgress(type, points = 0) {
    const progress = loadUserProgress();
    
    switch(type) {
        case 'quiz':
            progress.completedQuizzes++;
            progress.totalPoints += points;
            break;
        case 'challenge':
            progress.completedChallenges++;
            progress.totalPoints += points;
            break;
        case 'video':
            progress.watchedVideos++;
            break;
    }
    
    saveUserProgress(progress);
    checkBadgeUnlock(progress);
}

// Check if user unlocked any badges
function checkBadgeUnlock(progress) {
    const badges = [
        { id: 'quiz-master', name: 'Quiz Master', requirement: 5, type: 'quiz' },
        { id: 'eco-warrior', name: 'Eco Warrior', requirement: 3, type: 'challenge' },
        { id: 'green-pioneer', name: 'Green Pioneer', requirement: 100, type: 'points' }
    ];
    
    badges.forEach(badge => {
        if (!progress.unlockedBadges.includes(badge.id)) {
            let unlocked = false;
            
            if (badge.type === 'quiz' && progress.completedQuizzes >= badge.requirement) {
                unlocked = true;
            } else if (badge.type === 'challenge' && progress.completedChallenges >= badge.requirement) {
                unlocked = true;
            } else if (badge.type === 'points' && progress.totalPoints >= badge.requirement) {
                unlocked = true;
            }
            
            if (unlocked) {
                progress.unlockedBadges.push(badge.id);
                saveUserProgress(progress);
                showBadgeNotification(badge.name);
            }
        }
    });
}

// Show badge unlock notification
function showBadgeNotification(badgeName) {
    alert(`🎉 Congratulations! You unlocked: ${badgeName}`);
}
