// Social Media Feed System
// Displays live social media posts with event hashtag

class SocialFeed {
    constructor() {
        this.hashtag = '#KolkataSciCulture25';
        this.posts = [];
        this.isLoading = false;
        this.init();
    }

    // Initialize the social feed
    init() {
        try {
            this.loadMockPosts(); // For demo purposes
            this.setupFeed();
            this.startAutoRefresh();
        } catch (error) {
            console.error('Error initializing social feed:', error);
        }
    }

    // Load mock posts for demonstration
    loadMockPosts() {
        this.posts = [
            {
                id: 1,
                platform: 'instagram',
                username: 'science_lover',
                avatar: '🧬',
                content: 'Amazing robotics demonstration at the DRDO stall! The future is here! 🤖 #KolkataSciCulture25',
                image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
                likes: 45,
                comments: 12,
                timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
                verified: true
            },
            {
                id: 2,
                platform: 'twitter',
                username: 'tech_enthusiast',
                avatar: '⚡',
                content: 'Just witnessed the HAL aircraft display. Incredible engineering! The Indian Air Force stall is a must-visit. #KolkataSciCulture25 #Aviation',
                image: null,
                likes: 23,
                comments: 8,
                timestamp: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
                verified: false
            },
            {
                id: 3,
                platform: 'instagram',
                username: 'art_craft_kolkata',
                avatar: '🎨',
                content: 'Beautiful jute handicrafts at the Victor Jute Products stall. Supporting local artisans! #KolkataSciCulture25 #Handicrafts #LocalArt',
                image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
                likes: 67,
                comments: 15,
                timestamp: new Date(Date.now() - 18 * 60 * 1000), // 18 minutes ago
                verified: true
            },
            {
                id: 4,
                platform: 'twitter',
                username: 'agriculture_fan',
                avatar: '🌾',
                content: 'The ICAR fisheries research presentation was eye-opening! Learning about sustainable aquaculture practices. #KolkataSciCulture25 #Agriculture #Sustainability',
                image: null,
                likes: 34,
                comments: 6,
                timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
                verified: false
            },
            {
                id: 5,
                platform: 'instagram',
                username: 'health_innovator',
                avatar: '🏥',
                content: 'Fascinating medical research at ICMR stall. The future of healthcare is bright! #KolkataSciCulture25 #Healthcare #Innovation',
                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
                likes: 89,
                comments: 22,
                timestamp: new Date(Date.now() - 32 * 60 * 1000), // 32 minutes ago
                verified: true
            },
            {
                id: 6,
                platform: 'twitter',
                username: 'energy_expert',
                avatar: '⚡',
                content: 'NTPC\'s renewable energy initiatives are impressive! Clean energy is the way forward. #KolkataSciCulture25 #RenewableEnergy #Sustainability',
                image: null,
                likes: 56,
                comments: 9,
                timestamp: new Date(Date.now() - 40 * 60 * 1000), // 40 minutes ago
                verified: true
            },
            {
                id: 7,
                platform: 'instagram',
                username: 'student_scientist',
                avatar: '🔬',
                content: 'The Bose Institute stall is mind-blowing! Quantum physics made simple. #KolkataSciCulture25 #Science #Physics #StudentLife',
                image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
                likes: 123,
                comments: 31,
                timestamp: new Date(Date.now() - 48 * 60 * 1000), // 48 minutes ago
                verified: false
            },
            {
                id: 8,
                platform: 'twitter',
                username: 'defence_analyst',
                avatar: '🛡️',
                content: 'The Indian Army stall showcases cutting-edge defense technology. Proud of our armed forces! #KolkataSciCulture25 #Defence #Technology',
                image: null,
                likes: 78,
                comments: 14,
                timestamp: new Date(Date.now() - 55 * 60 * 1000), // 55 minutes ago
                verified: true
            }
        ];
    }

    // Setup the social feed display
    setupFeed() {
        const feedContainer = document.getElementById('social-feed-content');
        if (!feedContainer) return;

        this.renderFeed(feedContainer);
    }

    // Render the social feed
    renderFeed(container) {
        if (this.isLoading) {
            container.innerHTML = this.createLoadingHTML();
            return;
        }

        if (this.posts.length === 0) {
            container.innerHTML = this.createEmptyStateHTML();
            return;
        }

        container.innerHTML = this.posts
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(post => this.createPostHTML(post))
            .join('');
    }

    // Create loading HTML
    createLoadingHTML() {
        return `
            <div class="social-post">
                <div class="social-avatar skeleton" style="width: 3rem; height: 3rem; border-radius: 50%;"></div>
                <div class="social-content" style="flex: 1;">
                    <div class="skeleton" style="height: 1rem; width: 60%; margin-bottom: 0.5rem;"></div>
                    <div class="skeleton" style="height: 0.8rem; width: 100%; margin-bottom: 0.5rem;"></div>
                    <div class="skeleton" style="height: 0.8rem; width: 80%;"></div>
                </div>
            </div>
        `;
    }

    // Create empty state HTML
    createEmptyStateHTML() {
        return `
            <div class="social-post">
                <div class="social-content" style="text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📱</div>
                    <h3 style="color: var(--gray-700); margin-bottom: 0.5rem;">No posts yet</h3>
                    <p style="color: var(--gray-500);">Be the first to share your experience using ${this.hashtag}</p>
                </div>
            </div>
        `;
    }

    // Create post HTML
    createPostHTML(post) {
        const timeAgo = this.getTimeAgo(post.timestamp);
        const platformIcon = this.getPlatformIcon(post.platform);
        
        return `
            <div class="social-post animate-fade-in">
                <div class="social-avatar">
                    ${post.avatar}
                </div>
                <div class="social-content">
                    <div class="social-header">
                        <div class="social-user-info">
                            <span class="social-username">
                                ${post.username}
                                ${post.verified ? '<span style="color: #1da1f2;">✓</span>' : ''}
                            </span>
                            <span class="social-platform">
                                ${platformIcon} ${post.platform}
                            </span>
                        </div>
                        <span class="social-time">
                            <span style="margin-right: 0.5rem;">🕒</span>
                            ${timeAgo}
                        </span>
                    </div>
                    <div class="social-text">
                        ${this.highlightHashtags(post.content)}
                    </div>
                    ${post.image ? `
                        <div class="social-image">
                            <img src="${post.image}" alt="Post image" style="
                                width: 100%;
                                max-width: 300px;
                                border-radius: var(--radius-md);
                                margin-top: 0.5rem;
                            ">
                        </div>
                    ` : ''}
                    <div class="social-meta">
                        <span class="social-likes">
                            <span style="margin-right: 0.25rem;">❤️</span>
                            ${post.likes}
                        </span>
                        <span class="social-comments">
                            <span style="margin-right: 0.25rem;">💬</span>
                            ${post.comments}
                        </span>
                        <span class="social-share">
                            <span style="margin-right: 0.25rem;">📤</span>
                            Share
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    // Highlight hashtags in content
    highlightHashtags(content) {
        try {
            if (!content || typeof content !== 'string') {
                return '';
            }
            return content.replace(/#(\w+)/g, '<span style="color: var(--primary-color); font-weight: 500;">#$1</span>');
        } catch (error) {
            console.error('Error highlighting hashtags:', error);
            return content || '';
        }
    }

    // Get platform icon
    getPlatformIcon(platform) {
        const icons = {
            instagram: '📷',
            twitter: '🐦',
            facebook: '📘',
            linkedin: '💼'
        };
        return icons[platform] || '📱';
    }

    // Get time ago string
    getTimeAgo(timestamp) {
        try {
            if (!timestamp || !(timestamp instanceof Date) || isNaN(timestamp.getTime())) {
                return 'Unknown time';
            }
            
            const now = new Date();
            const diff = now - timestamp;
            
            if (diff < 0) {
                return 'Just now';
            }
            
            const minutes = Math.floor(diff / (1000 * 60));
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));

            if (minutes < 1) return 'Just now';
            if (minutes < 60) return `${minutes}m ago`;
            if (hours < 24) return `${hours}h ago`;
            return `${days}d ago`;
        } catch (error) {
            console.error('Error calculating time ago:', error);
            return 'Unknown time';
        }
    }

    // Add new post
    addPost(post) {
        this.posts.unshift({
            ...post,
            id: Date.now(),
            timestamp: new Date()
        });
        
        // Keep only last 50 posts
        if (this.posts.length > 50) {
            this.posts = this.posts.slice(0, 50);
        }
        
        this.setupFeed();
    }

    // Simulate new posts (for demo)
    simulateNewPost() {
        const platforms = ['instagram', 'twitter'];
        const usernames = ['exhibition_goer', 'science_fan', 'tech_lover', 'art_enthusiast'];
        const avatars = ['🔬', '🎨', '⚡', '🌱', '🏥', '🛡️'];
        const contents = [
            'Amazing experience at the exhibition! The technology on display is incredible! #KolkataSciCulture25',
            'Just visited the science stalls. Mind-blowing innovations everywhere! #KolkataSciCulture25 #Innovation',
            'The cultural performances are fantastic! Great blend of science and culture. #KolkataSciCulture25 #Culture',
            'Learning so much about sustainable technology. Future looks bright! #KolkataSciCulture25 #Sustainability',
            'The interactive exhibits are engaging for all ages. Perfect family outing! #KolkataSciCulture25 #Family',
            'Proud to see Indian innovations on display. Jai Hind! #KolkataSciCulture25 #MakeInIndia'
        ];

        const newPost = {
            platform: platforms[Math.floor(Math.random() * platforms.length)],
            username: usernames[Math.floor(Math.random() * usernames.length)],
            avatar: avatars[Math.floor(Math.random() * avatars.length)],
            content: contents[Math.floor(Math.random() * contents.length)],
            image: Math.random() > 0.5 ? this.getRandomImage() : null,
            likes: Math.floor(Math.random() * 100) + 10,
            comments: Math.floor(Math.random() * 20) + 2,
            verified: Math.random() > 0.7
        };

        this.addPost(newPost);
    }

    // Get random image for demo
    getRandomImage() {
        const images = [
            'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
            'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
            'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
            'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400'
        ];
        return images[Math.floor(Math.random() * images.length)];
    }

    // Start auto refresh
    startAutoRefresh() {
        // Simulate new posts every 30 seconds
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance of new post
                this.simulateNewPost();
            }
        }, 30000);

        // Update timestamps every minute
        setInterval(() => {
            this.setupFeed();
        }, 60000);
    }

    // Filter posts by platform
    filterByPlatform(platform) {
        const feedContainer = document.getElementById('social-feed-content');
        if (!feedContainer) return;

        const filteredPosts = platform === 'all' 
            ? this.posts 
            : this.posts.filter(post => post.platform === platform);

        feedContainer.innerHTML = filteredPosts
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(post => this.createPostHTML(post))
            .join('');
    }

    // Search posts
    searchPosts(query) {
        const feedContainer = document.getElementById('social-feed-content');
        if (!feedContainer) return;

        const searchResults = this.posts.filter(post => 
            post.content.toLowerCase().includes(query.toLowerCase()) ||
            post.username.toLowerCase().includes(query.toLowerCase())
        );

        feedContainer.innerHTML = searchResults
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(post => this.createPostHTML(post))
            .join('');
    }

    // Get feed statistics
    getFeedStats() {
        const totalPosts = this.posts.length;
        const totalLikes = this.posts.reduce((sum, post) => sum + post.likes, 0);
        const totalComments = this.posts.reduce((sum, post) => sum + post.comments, 0);
        const platforms = [...new Set(this.posts.map(post => post.platform))];

        return {
            totalPosts,
            totalLikes,
            totalComments,
            platforms,
            hashtag: this.hashtag
        };
    }

    // Export feed data
    exportFeedData() {
        return {
            posts: this.posts,
            stats: this.getFeedStats(),
            timestamp: new Date().toISOString()
        };
    }
}

// Initialize social feed
let socialFeed;

document.addEventListener('DOMContentLoaded', () => {
    socialFeed = new SocialFeed();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SocialFeed;
} 