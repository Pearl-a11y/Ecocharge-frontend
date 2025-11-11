// progress.js - Progress tracking functionality for EcoCharge
// Update progress display on page load
window.addEventListener('load', function() {
    if (document.querySelector('.badges-page')) {
        updateProgressDisplay();
    }
});

// Update all progress elements on the page
function updateProgressDisplay() {
    // Get user progress from sessionStorage
    const progress = loadUserProgress();
    
    if (!progress) {
        console.warn('No progress data found');
        return;
    }
    
    // Update overall progress bar
    updateOverallProgress(progress);
    
    // Update stats
    updateStats(progress);
    
    // Update badge display
    updateBadgeDisplay(progress.unlockedBadges);
}

// Calculate and update overall progress
function updateOverallProgress(progress) {
    // Define totals for each category
    const totalQuizzes = 10;
    const totalChallenges = 5;
    const totalVideos = 8;
    
    // Calculate completed items
    const totalItems = totalQuizzes + totalChallenges + totalVideos;
    const completedItems = progress.completedQuizzes + progress.completedChallenges + progress.watchedVideos;
    
    // Calculate percentage
    const progressPercentage = Math.round((completedItems / totalItems) * 100);
    
    // Update progress bar
    const progressBar = document.getElementById('overallProgress');
    if (progressBar) {
        progressBar.style.width = progressPercentage + '%';
        progressBar.textContent = progressPercentage + '%';
    }
    
    console.log(`Progress updated: ${progressPercentage}%`);
}

// Update statistics display
function updateStats(progress) {
    // Update completed modules (quizzes + challenges)
    const modulesCompleted = document.getElementById('modulesCompleted');
    if (modulesCompleted) {
        const totalModules = progress.completedQuizzes + progress.completedChallenges;
        modulesCompleted.textContent = totalModules;
    }
    
    // Update points earned
    const pointsEarned = document.getElementById('pointsEarned');
    if (pointsEarned) {
        pointsEarned.textContent = progress.totalPoints.toLocaleString();
    }
}

// Update badge display based on unlocked badges
function updateBadgeDisplay(unlockedBadges) {
    const badges = document.querySelectorAll('.badge-icon');
    
    badges.forEach((badge, index) => {
        const badgeId = badge.getAttribute('data-badge-id') || `badge-${index}`;
        
        if (unlockedBadges.includes(badgeId)) {
            badge.setAttribute('data-unlocked', 'true');
            badge.style.backgroundColor = '#FFD700';
            badge.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.4)';
        } else {
            badge.setAttribute('data-unlocked', 'false');
        }
    });
}

// Calculate progress for a specific category
function calculateCategoryProgress(completed, total) {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
}

// Get progress summary (for debugging or display)
function getProgressSummary() {
    const progress = loadUserProgress();
    
    return {
        quizzes: {
            completed: progress.completedQuizzes,
            total: 10,
            percentage: calculateCategoryProgress(progress.completedQuizzes, 10)
        },
        challenges: {
            completed: progress.completedChallenges,
            total: 5,
            percentage: calculateCategoryProgress(progress.completedChallenges, 5)
        },
        videos: {
            completed: progress.watchedVideos,
            total: 8,
            percentage: calculateCategoryProgress(progress.watchedVideos, 8)
        },
        totalPoints: progress.totalPoints,
        badges: progress.unlockedBadges.length
    };
}

// Reset progress (for testing purposes)
function resetProgress() {
    const confirmed = confirm('Are you sure you want to reset all progress? This cannot be undone.');
    
    if (confirmed) {
        sessionStorage.removeItem('userProgress');
        alert('Progress has been reset!');
        window.location.reload();
    }
}
