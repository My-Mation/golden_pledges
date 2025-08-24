// Recommendation Component for Stall View Page
// This component handles the UI and interaction for displaying recommendations

class RecommendationComponent {
    constructor() {
        this.recommendationSystem = new RecommendationSystem();
        this.currentStallId = null;
    }

    // Initialize the recommendation component
    init(stallId) {
        if (!stallId) {
            console.warn('RecommendationComponent: No stallId provided');
            return;
        }
        this.currentStallId = stallId;
        this.createRecommendationSection();
        this.loadRecommendations();
    }

    // Create the recommendation section in the DOM
    createRecommendationSection() {
        const stallDetails = document.getElementById('stall-details');
        if (!stallDetails) return;

        // Create recommendation container
        const recommendationContainer = document.createElement('div');
        recommendationContainer.id = 'recommendations-container';
        recommendationContainer.className = 'recommendations-section';
        
        // Add styles
        recommendationContainer.style.cssText = `
            margin-top: 2em;
            padding: 1.5em;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        `;

        // Create header
        const header = document.createElement('h3');
        header.textContent = 'You might also be interested in...';
        header.style.cssText = `
            color: #2c3e50;
            margin-bottom: 1em;
            font-size: 1.4em;
            text-align: center;
            border-bottom: 2px solid #3498db;
            padding-bottom: 0.5em;
        `;

        // Create recommendations grid
        const recommendationsGrid = document.createElement('div');
        recommendationsGrid.id = 'recommendations-grid';
        recommendationsGrid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1em;
            margin-top: 1em;
        `;

        // Create loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'recommendations-loading';
        loadingDiv.innerHTML = `
            <div style="text-align: center; padding: 2em;">
                <div style="display: inline-block; width: 20px; height: 20px; border: 3px solid #f3f3f3; border-top: 3px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="margin-top: 1em; color: #666;">Finding recommendations...</p>
            </div>
        `;

        // Add keyframe animation for loading spinner
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        // Assemble the component
        recommendationContainer.appendChild(header);
        recommendationContainer.appendChild(loadingDiv);
        recommendationContainer.appendChild(recommendationsGrid);

        // Add to the page
        stallDetails.appendChild(recommendationContainer);
    }

    // Load and display recommendations
    loadRecommendations() {
        try {
            const recommendations = this.recommendationSystem.getRecommendations(this.currentStallId, 6);
            this.displayRecommendations(recommendations);
        } catch (error) {
            console.error('Error loading recommendations:', error);
            this.displayError('Failed to load recommendations. Please try again.');
        }
    }

    // Display recommendations in the UI
    displayRecommendations(recommendations) {
        const loadingDiv = document.getElementById('recommendations-loading');
        const grid = document.getElementById('recommendations-grid');

        if (loadingDiv) {
            loadingDiv.style.display = 'none';
        }

        if (recommendations.length === 0) {
            grid.innerHTML = `
                <div style="text-align: center; padding: 2em; color: #666;">
                    <p>No recommendations available at the moment.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = '';

        recommendations.forEach(rec => {
            const card = this.createRecommendationCard(rec);
            grid.appendChild(card);
        });
    }

    // Create a recommendation card
    createRecommendationCard(recommendation) {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.style.cssText = `
            background: white;
            border-radius: 8px;
            padding: 1em;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            cursor: pointer;
            border-left: 4px solid #3498db;
        `;

        // Hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });

        // Click to navigate
        card.addEventListener('click', () => {
            window.location.href = `view.html?id=${recommendation.id}`;
        });

        // Get category color
        const categoryColor = this.getCategoryColor(recommendation.category);

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5em;">
                <h4 style="margin: 0; color: #2c3e50; font-size: 1.1em; line-height: 1.3;">
                    ${recommendation.name}
                </h4>
                <span style="
                    background: ${categoryColor};
                    color: white;
                    padding: 0.2em 0.6em;
                    border-radius: 12px;
                    font-size: 0.8em;
                    font-weight: bold;
                ">
                    ${recommendation.category.toUpperCase()}
                </span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5em;">
                <span style="
                    background: #ecf0f1;
                    color: #34495e;
                    padding: 0.2em 0.6em;
                    border-radius: 8px;
                    font-size: 0.8em;
                    font-weight: bold;
                ">
                    Block ${recommendation.block}
                </span>
                <span style="
                    color: #7f8c8d;
                    font-size: 0.8em;
                    font-style: italic;
                ">
                    ${recommendation.reason}
                </span>
            </div>
        `;

        return card;
    }

    // Get color for category
    getCategoryColor(category) {
        const colors = {
            'defence': '#e74c3c',
            'agriculture': '#27ae60',
            'energy': '#f39c12',
            'science': '#3498db',
            'environment': '#16a085',
            'tourism': '#9b59b6',
            'transport': '#e67e22',
            'education': '#2980b9',
            'finance': '#8e44ad',
            'technology': '#1abc9c',
            'standards': '#95a5a6',
            'textile': '#d35400',
            'handicrafts': '#c0392b',
            'health': '#e91e63'
        };
        return colors[category] || '#95a5a6';
    }

    // Show recommendation reason tooltip
    showRecommendationReason(reason) {
        // Create a simple tooltip
        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
            position: fixed;
            background: #2c3e50;
            color: white;
            padding: 0.5em 1em;
            border-radius: 4px;
            font-size: 0.9em;
            z-index: 1000;
            pointer-events: none;
            max-width: 200px;
        `;
        tooltip.textContent = reason;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip near cursor
        document.addEventListener('mousemove', (e) => {
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY - 30 + 'px';
        });
        
        // Remove tooltip after 3 seconds
        setTimeout(() => {
            document.body.removeChild(tooltip);
        }, 3000);
    }

    // Display error message
    displayError(message) {
        const grid = document.getElementById('recommendations-grid');
        if (grid) {
            grid.innerHTML = `
                <div style="text-align: center; padding: 2em; color: #e74c3c;">
                    <p>⚠️ ${message}</p>
                </div>
            `;
        }
    }

    // Refresh recommendations (useful for dynamic updates)
    refreshRecommendations() {
        if (this.currentStallId) {
            this.loadRecommendations();
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RecommendationComponent;
} 