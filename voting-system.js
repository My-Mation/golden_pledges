// Voting System for Exhibition Stalls
// Handles likes, votes, and real-time leaderboards

class VotingSystem {
    constructor() {
        this.votes = this.loadVotes();
        this.observers = [];
        this.init();
    }

    // Initialize the voting system
    init() {
        this.setupEventListeners();
        this.updateAllLeaderboards();
        this.startRealTimeUpdates();
    }

    // Load votes from localStorage
    loadVotes() {
        try {
            const saved = localStorage.getItem('exhibition_votes');
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('Error loading votes from localStorage:', error);
            return {};
        }
    }

    // Save votes to localStorage
    saveVotes() {
        try {
            localStorage.setItem('exhibition_votes', JSON.stringify(this.votes));
            this.notifyObservers();
        } catch (error) {
            console.error('Error saving votes to localStorage:', error);
        }
    }

    // Get vote count for a stall
    getVoteCount(stallId) {
        return this.votes[stallId] || 0;
    }

    // Vote for a stall
    vote(stallId) {
        if (!this.votes[stallId]) {
            this.votes[stallId] = 0;
        }
        this.votes[stallId]++;
        this.saveVotes();
        this.updateVoteDisplay(stallId);
        this.updateAllLeaderboards();
        
        // Add animation
        this.animateVote(stallId);
        
        return this.votes[stallId];
    }

    // Unvote for a stall
    unvote(stallId) {
        if (this.votes[stallId] && this.votes[stallId] > 0) {
            this.votes[stallId]--;
            this.saveVotes();
            this.updateVoteDisplay(stallId);
            this.updateAllLeaderboards();
        }
        return this.votes[stallId] || 0;
    }

    // Toggle vote (like/unlike)
    toggleVote(stallId) {
        const hasVoted = this.hasUserVoted(stallId);
        if (hasVoted) {
            this.removeUserVote(stallId);
            return this.unvote(stallId);
        } else {
            this.addUserVote(stallId);
            return this.vote(stallId);
        }
    }

    // Check if current user has voted for a stall
    hasUserVoted(stallId) {
        const userVotes = this.getUserVotes();
        return userVotes.includes(stallId);
    }

    // Get user's votes
    getUserVotes() {
        try {
            const saved = localStorage.getItem('user_votes');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading user votes from localStorage:', error);
            return [];
        }
    }

    // Add user vote
    addUserVote(stallId) {
        try {
            const userVotes = this.getUserVotes();
            if (!userVotes.includes(stallId)) {
                userVotes.push(stallId);
                localStorage.setItem('user_votes', JSON.stringify(userVotes));
            }
        } catch (error) {
            console.error('Error adding user vote:', error);
        }
    }

    // Remove user vote
    removeUserVote(stallId) {
        try {
            const userVotes = this.getUserVotes();
            const index = userVotes.indexOf(stallId);
            if (index > -1) {
                userVotes.splice(index, 1);
                localStorage.setItem('user_votes', JSON.stringify(userVotes));
            }
        } catch (error) {
            console.error('Error removing user vote:', error);
        }
    }

    // Get top stalls by votes
    getTopStalls(limit = 10, category = null) {
        let stalls = Object.entries(this.votes)
            .map(([stallId, votes]) => ({ stallId, votes }))
            .filter(item => item.votes > 0);

        if (category) {
            stalls = stalls.filter(item => {
                const stallData = this.getStallData(item.stallId);
                return stallData && stallData.category === category;
            });
        }

        return stalls
            .sort((a, b) => b.votes - a.votes)
            .slice(0, limit)
            .map((item, index) => ({
                ...item,
                rank: index + 1,
                stallData: this.getStallData(item.stallId)
            }));
    }

    // Get stall data from the global stallData object
    getStallData(stallId) {
        // Try to get from recommendation system first
        if (typeof stallData !== 'undefined' && stallData[stallId]) {
            return stallData[stallId];
        }
        // Fallback to view.html stalls object
        if (typeof stalls !== 'undefined' && stalls[stallId]) {
            return {
                name: stalls[stallId].name,
                category: this.getCategoryFromStallId(stallId),
                block: this.getBlockFromStallId(stallId)
            };
        }
        return null;
    }

    // Helper method to get category from stall ID
    getCategoryFromStallId(stallId) {
        const categoryMap = {
            // Block A - Defence
            'metal-steel': 'defence', 'armoured': 'defence', 'drdo': 'defence', 'hal': 'defence',
            'troop-comforts': 'defence', 'india-optel': 'defence', 'aweil': 'defence',
            'indian-air-force': 'defence', 'indian-navy': 'defence', 'indian-army': 'defence',
            'gliders-india': 'defence', 'munitions-india': 'defence', 'mazagon-doc': 'defence',
            
            // Block B - Agriculture
            'cmfri': 'agriculture', 'dept-agri-wb': 'agriculture', 'directorate-ext': 'agriculture',
            'nbfgr': 'agriculture', 'icar-icar-kolkata': 'agriculture', 'cife': 'agriculture',
            'dkma': 'agriculture', 'apeda': 'agriculture',
            
            // Block C - General & PSU
            'ntpc': 'energy', 'gsi': 'science', 'wb-ngrba': 'environment', 'neepcl': 'energy',
            'nhpc': 'energy', 'bis': 'standards', 'cgwb': 'environment', 'tripura-tourism': 'tourism',
            'eastern-railway': 'transport', 'adamas-univ': 'education', 'rbi': 'finance',
            'negd': 'technology', 'sister-nivedita-univ': 'education',
            
            // Block D - Science
            'bose-institute': 'science', 'iiser-kolkata': 'science', 'saha-institute': 'science',
            'dae': 'science', 'bric-dna': 'science', 'bric-dbt': 'science', 'nibmg': 'science',
            'science-model': 'education', 'csir': 'science', 'moes': 'science',
            'survey-india': 'science', 'anusandhan-nrf': 'science',
            
            // Block G - Textile
            'national-jute-board': 'textile', 'blooming-rose': 'textile', 'jute-baggy': 'textile',
            'victor-jute': 'textile', 'tania-sarkar': 'textile', 'jute-hind': 'textile',
            'umita-jute': 'textile', 'handlooms-goi': 'textile',
            
            // Block H - Health
            'icmr': 'health', 'icmr-nirbi': 'health', 'nhm-wb': 'health', 'univ-burdwan': 'education'
        };
        
        // Add handicrafts
        for (let i = 1; i <= 16; i++) {
            categoryMap[`handicrafts-goi-${i}`] = 'handicrafts';
        }
        
        return categoryMap[stallId] || 'unknown';
    }

    // Helper method to get block from stall ID
    getBlockFromStallId(stallId) {
        const blockMap = {
            // Block A
            'metal-steel': 'A', 'armoured': 'A', 'drdo': 'A', 'hal': 'A', 'troop-comforts': 'A',
            'india-optel': 'A', 'aweil': 'A', 'indian-air-force': 'A', 'indian-navy': 'A',
            'indian-army': 'A', 'gliders-india': 'A', 'munitions-india': 'A', 'mazagon-doc': 'A',
            
            // Block B
            'cmfri': 'B', 'dept-agri-wb': 'B', 'directorate-ext': 'B', 'nbfgr': 'B',
            'icar-icar-kolkata': 'B', 'cife': 'B', 'dkma': 'B', 'apeda': 'B',
            
            // Block C
            'ntpc': 'C', 'gsi': 'C', 'wb-ngrba': 'C', 'neepcl': 'C', 'nhpc': 'C', 'bis': 'C',
            'cgwb': 'C', 'tripura-tourism': 'C', 'eastern-railway': 'C', 'adamas-univ': 'C',
            'rbi': 'C', 'negd': 'C', 'sister-nivedita-univ': 'C',
            
            // Block D
            'bose-institute': 'D', 'iiser-kolkata': 'D', 'saha-institute': 'D', 'dae': 'D',
            'bric-dna': 'D', 'bric-dbt': 'D', 'nibmg': 'D', 'science-model': 'D', 'csir': 'D',
            'moes': 'D', 'survey-india': 'D', 'anusandhan-nrf': 'D',
            
            // Block G
            'national-jute-board': 'G', 'blooming-rose': 'G', 'jute-baggy': 'G', 'victor-jute': 'G',
            'tania-sarkar': 'G', 'jute-hind': 'G', 'umita-jute': 'G', 'handlooms-goi': 'G',
            
            // Block H
            'icmr': 'H', 'icmr-nirbi': 'H', 'nhm-wb': 'H', 'univ-burdwan': 'H'
        };
        
        // Add handicrafts
        for (let i = 1; i <= 16; i++) {
            blockMap[`handicrafts-goi-${i}`] = 'G';
        }
        
        return blockMap[stallId] || 'Unknown';
    }

    // Setup event listeners
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.like-btn')) {
                const button = e.target.closest('.like-btn');
                const stallId = button.dataset.stallId;
                if (stallId) {
                    this.handleVoteClick(button, stallId);
                }
            }
        });
    }

    // Handle vote button click
    handleVoteClick(button, stallId) {
        const hasVoted = this.hasUserVoted(stallId);
        const newVoteCount = this.toggleVote(stallId);
        
        // Update button state
        if (this.hasUserVoted(stallId)) {
            button.classList.add('liked');
            button.querySelector('.like-icon').textContent = '❤️';
        } else {
            button.classList.remove('liked');
            button.querySelector('.like-icon').textContent = '🤍';
        }
        
        // Update vote count
        const countElement = button.querySelector('.like-count');
        if (countElement) {
            countElement.textContent = newVoteCount;
        }
    }

    // Update vote display for a specific stall
    updateVoteDisplay(stallId) {
        try {
            const buttons = document.querySelectorAll(`[data-stall-id="${stallId}"]`);
            const voteCount = this.getVoteCount(stallId);
            const hasVoted = this.hasUserVoted(stallId);

            buttons.forEach(button => {
                if (!button) return;
                
                const countElement = button.querySelector('.like-count');
                const iconElement = button.querySelector('.like-icon');
                
                if (countElement) {
                    countElement.textContent = voteCount;
                }
                
                if (iconElement) {
                    iconElement.textContent = hasVoted ? '❤️' : '🤍';
                }
                
                if (hasVoted) {
                    button.classList.add('liked');
                } else {
                    button.classList.remove('liked');
                }
            });
        } catch (error) {
            console.error('Error updating vote display:', error);
        }
    }

    // Create vote button HTML
    createVoteButton(stallId) {
        const voteCount = this.getVoteCount(stallId);
        const hasVoted = this.hasUserVoted(stallId);
        
        return `
            <button class="like-btn ${hasVoted ? 'liked' : ''}" data-stall-id="${stallId}">
                <span class="like-icon">${hasVoted ? '❤️' : '🤍'}</span>
                <span class="like-count">${voteCount}</span>
            </button>
        `;
    }

    // Update all leaderboards on the page
    updateAllLeaderboards() {
        this.updateLeaderboard('overall');
        this.updateLeaderboard('defence');
        this.updateLeaderboard('agriculture');
        this.updateLeaderboard('science');
        this.updateLeaderboard('energy');
        this.updateLeaderboard('textile');
        this.updateLeaderboard('health');
    }

    // Update specific leaderboard
    updateLeaderboard(category) {
        const container = document.getElementById(`leaderboard-${category}`);
        if (!container) return;

        const topStalls = category === 'overall' 
            ? this.getTopStalls(10)
            : this.getTopStalls(10, category);

        container.innerHTML = this.createLeaderboardHTML(topStalls, category);
    }

    // Create leaderboard HTML
    createLeaderboardHTML(stalls, category) {
        if (stalls.length === 0) {
            return `
                <div class="leaderboard-item">
                    <div class="leaderboard-info">
                        <div class="leaderboard-name">No votes yet</div>
                        <div class="leaderboard-category">Be the first to vote!</div>
                    </div>
                </div>
            `;
        }

        return stalls.map(stall => `
            <div class="leaderboard-item">
                <div class="leaderboard-rank ${stall.rank <= 3 ? `top-${stall.rank}` : ''}">
                    ${stall.rank}
                </div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${stall.stallData ? stall.stallData.name : stall.stallId}</div>
                    <div class="leaderboard-category">${stall.stallData ? stall.stallData.category : 'Unknown'}</div>
                </div>
                <div class="leaderboard-votes">
                    ${stall.votes} ${stall.votes === 1 ? 'vote' : 'votes'}
                </div>
            </div>
        `).join('');
    }

    // Animate vote
    animateVote(stallId) {
        const buttons = document.querySelectorAll(`[data-stall-id="${stallId}"]`);
        buttons.forEach(button => {
            button.classList.add('animate-bounce');
            setTimeout(() => {
                button.classList.remove('animate-bounce');
            }, 1000);
        });
    }

    // Observer pattern for real-time updates
    addObserver(callback) {
        this.observers.push(callback);
    }

    removeObserver(callback) {
        const index = this.observers.indexOf(callback);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers() {
        this.observers.forEach(callback => callback(this.votes));
    }

    // Start real-time updates
    startRealTimeUpdates() {
        setInterval(() => {
            this.updateAllLeaderboards();
        }, 5000); // Update every 5 seconds
    }

    // Get voting statistics
    getVotingStats() {
        const totalVotes = Object.values(this.votes).reduce((sum, count) => sum + count, 0);
        const totalStalls = Object.keys(this.votes).length;
        const mostVoted = this.getTopStalls(1)[0];
        
        return {
            totalVotes,
            totalStalls,
            mostVoted: mostVoted ? {
                stallId: mostVoted.stallId,
                votes: mostVoted.votes,
                name: mostVoted.stallData ? mostVoted.stallData.name : mostVoted.stallId
            } : null
        };
    }

    // Export voting data
    exportVotingData() {
        return {
            votes: this.votes,
            stats: this.getVotingStats(),
            timestamp: new Date().toISOString()
        };
    }

    // Reset all votes (admin function)
    resetVotes() {
        this.votes = {};
        localStorage.removeItem('exhibition_votes');
        localStorage.removeItem('user_votes');
        this.updateAllLeaderboards();
        this.notifyObservers();
    }
}

// Initialize voting system
let votingSystem;

document.addEventListener('DOMContentLoaded', () => {
    votingSystem = new VotingSystem();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VotingSystem;
} 