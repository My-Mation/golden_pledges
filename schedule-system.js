// Schedule/Itinerary System for Exhibition
// Displays daily events, demonstrations, and activities

class ScheduleSystem {
    constructor() {
        this.schedule = this.loadSchedule();
        this.currentDate = new Date();
        this.init();
    }

    // Initialize the schedule system
    init() {
        try {
            this.setupSchedule();
            this.updateCurrentTime();
            this.startTimeUpdates();
        } catch (error) {
            console.error('Error initializing schedule system:', error);
        }
    }

    // Load schedule data
    loadSchedule() {
        return {
            "2025-01-15": [
                {
                    id: 1,
                    time: "09:00",
                    title: "Exhibition Opening Ceremony",
                    location: "Main Stage",
                    description: "Official opening of the 2025 Exhibition with dignitaries and special guests",
                    category: "ceremony",
                    stallId: null,
                    duration: 60,
                    type: "event"
                },
                {
                    id: 2,
                    time: "10:00",
                    title: "DRDO Missile Technology Demo",
                    location: "Stall 3 - DRDO",
                    description: "Live demonstration of missile guidance systems and defense technology",
                    category: "defence",
                    stallId: "drdo",
                    duration: 45,
                    type: "demo"
                },
                {
                    id: 3,
                    time: "11:00",
                    title: "HAL Aircraft Display",
                    location: "Stall 4 - HAL",
                    description: "Interactive display of fighter aircraft models and aviation technology",
                    category: "defence",
                    stallId: "hal",
                    duration: 60,
                    type: "display"
                },
                {
                    id: 4,
                    time: "12:00",
                    title: "Lunch Break",
                    location: "Food Court",
                    description: "Break for lunch and networking",
                    category: "break",
                    stallId: null,
                    duration: 60,
                    type: "break"
                },
                {
                    id: 5,
                    time: "13:00",
                    title: "ICAR Fisheries Workshop",
                    location: "Stall 14 - CMFRI",
                    description: "Workshop on sustainable fisheries and aquaculture practices",
                    category: "agriculture",
                    stallId: "cmfri",
                    duration: 90,
                    type: "workshop"
                },
                {
                    id: 6,
                    time: "14:30",
                    title: "NTPC Energy Solutions",
                    location: "Stall 22 - NTPC",
                    description: "Presentation on renewable energy and sustainable power solutions",
                    category: "energy",
                    stallId: "ntpc",
                    duration: 45,
                    type: "presentation"
                },
                {
                    id: 7,
                    time: "15:15",
                    title: "Bose Institute Science Talk",
                    location: "Stall 24 - Bose Institute",
                    description: "Interactive session on quantum physics and modern research",
                    category: "science",
                    stallId: "bose-institute",
                    duration: 60,
                    type: "talk"
                },
                {
                    id: 8,
                    time: "16:15",
                    title: "Jute Craft Workshop",
                    location: "Stall 32 - Victor Jute",
                    description: "Hands-on workshop on traditional jute crafting techniques",
                    category: "textile",
                    stallId: "victor-jute",
                    duration: 75,
                    type: "workshop"
                },
                {
                    id: 9,
                    time: "17:30",
                    title: "ICMR Health Innovation",
                    location: "Stall 68 - ICMR",
                    description: "Presentation on medical research and healthcare innovations",
                    category: "health",
                    stallId: "icmr",
                    duration: 45,
                    type: "presentation"
                },
                {
                    id: 10,
                    time: "18:15",
                    title: "Cultural Performance",
                    location: "Main Stage",
                    description: "Traditional dance and music performances",
                    category: "culture",
                    stallId: null,
                    duration: 60,
                    type: "performance"
                }
            ],
            "2025-01-16": [
                {
                    id: 11,
                    time: "09:30",
                    title: "Indian Army Technology Showcase",
                    location: "Stall 10 - Indian Army",
                    description: "Display of military technology and equipment",
                    category: "defence",
                    stallId: "indian-army",
                    duration: 60,
                    type: "showcase"
                },
                {
                    id: 12,
                    time: "10:30",
                    title: "Agricultural Technology Demo",
                    location: "Stall 15 - Dept of Agriculture",
                    description: "Demonstration of modern farming techniques and equipment",
                    category: "agriculture",
                    stallId: "dept-agri-wb",
                    duration: 45,
                    type: "demo"
                },
                {
                    id: 13,
                    time: "11:15",
                    title: "Science Model Competition",
                    location: "Stall 28 - Science Model",
                    description: "Student science model presentations and judging",
                    category: "science",
                    stallId: "science-model",
                    duration: 120,
                    type: "competition"
                },
                {
                    id: 14,
                    time: "13:15",
                    title: "Lunch Break",
                    location: "Food Court",
                    description: "Break for lunch and networking",
                    category: "break",
                    stallId: null,
                    duration: 60,
                    type: "break"
                },
                {
                    id: 15,
                    time: "14:15",
                    title: "Handicrafts Exhibition",
                    location: "Stall 35-50 - Handicrafts",
                    description: "Showcase of traditional Indian handicrafts and artisans",
                    category: "handicrafts",
                    stallId: null,
                    duration: 90,
                    type: "exhibition"
                },
                {
                    id: 16,
                    time: "15:45",
                    title: "Health Mission Presentation",
                    location: "Stall 70 - NHM WB",
                    description: "Overview of healthcare initiatives and public health programs",
                    category: "health",
                    stallId: "nhm-wb",
                    duration: 45,
                    type: "presentation"
                },
                {
                    id: 17,
                    time: "16:30",
                    title: "Energy Conservation Talk",
                    location: "Stall 23 - GSI",
                    description: "Discussion on geological surveys and energy conservation",
                    category: "energy",
                    stallId: "gsi",
                    duration: 60,
                    type: "talk"
                },
                {
                    id: 18,
                    time: "17:30",
                    title: "Closing Ceremony",
                    location: "Main Stage",
                    description: "Award ceremony and closing remarks",
                    category: "ceremony",
                    stallId: null,
                    duration: 90,
                    type: "event"
                }
            ]
        };
    }

    // Setup schedule display
    setupSchedule() {
        const scheduleContainer = document.getElementById('schedule-content');
        if (!scheduleContainer) return;

        this.renderSchedule(scheduleContainer);
    }

    // Render schedule for current date
    renderSchedule(container) {
        const dateKey = this.getDateKey(this.currentDate);
        const daySchedule = this.schedule[dateKey] || [];

        if (daySchedule.length === 0) {
            container.innerHTML = this.createEmptyScheduleHTML();
            return;
        }

        // Sort by time
        const sortedSchedule = daySchedule.sort((a, b) => 
            this.timeToMinutes(a.time) - this.timeToMinutes(b.time)
        );

        container.innerHTML = sortedSchedule
            .map(event => this.createEventHTML(event))
            .join('');
    }

    // Create empty schedule HTML
    createEmptyScheduleHTML() {
        return `
            <div class="schedule-item">
                <div class="schedule-content" style="text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📅</div>
                    <h3 style="color: var(--gray-700); margin-bottom: 0.5rem;">No events scheduled</h3>
                    <p style="color: var(--gray-500);">Check back later for upcoming events</p>
                </div>
            </div>
        `;
    }

    // Create event HTML
    createEventHTML(event) {
        const isCurrent = this.isEventCurrent(event);
        const isPast = this.isEventPast(event);
        const isUpcoming = this.isEventUpcoming(event);
        
        let statusClass = '';
        if (isCurrent) statusClass = 'current-event';
        else if (isPast) statusClass = 'past-event';
        else if (isUpcoming) statusClass = 'upcoming-event';

        const typeIcon = this.getEventTypeIcon(event.type);
        const categoryColor = this.getCategoryColor(event.category);

        return `
            <div class="schedule-item ${statusClass} animate-fade-in">
                <div class="schedule-time" style="background: ${categoryColor};">
                    ${event.time}
                </div>
                <div class="schedule-content">
                    <div class="schedule-header">
                        <h4 class="schedule-title">
                            ${typeIcon} ${event.title}
                        </h4>
                        <span class="schedule-status">
                            ${this.getEventStatus(event)}
                        </span>
                    </div>
                    <div class="schedule-location">
                        📍 ${event.location}
                    </div>
                    <div class="schedule-description">
                        ${event.description}
                    </div>
                    <div class="schedule-meta">
                        <span class="schedule-duration">
                            ⏱️ ${event.duration} minutes
                        </span>
                        <span class="schedule-category">
                            ${this.getCategoryIcon(event.category)} ${event.category}
                        </span>
                        ${event.stallId ? `
                            <a href="view.html?id=${event.stallId}" class="btn btn-sm btn-primary">
                                Visit Stall
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    // Get event type icon
    getEventTypeIcon(type) {
        const icons = {
            'event': '🎉',
            'demo': '🔬',
            'display': '🖼️',
            'workshop': '🛠️',
            'presentation': '📊',
            'talk': '🎤',
            'showcase': '🎯',
            'competition': '🏆',
            'exhibition': '🎨',
            'performance': '🎭',
            'break': '☕'
        };
        return icons[type] || '📅';
    }

    // Get category icon
    getCategoryIcon(category) {
        const icons = {
            'defence': '🛡️',
            'agriculture': '🌾',
            'science': '🔬',
            'energy': '⚡',
            'textile': '🧵',
            'health': '🏥',
            'culture': '🎭',
            'ceremony': '🎉',
            'break': '☕',
            'handicrafts': '🎨'
        };
        return icons[category] || '📋';
    }

    // Get category color
    getCategoryColor(category) {
        const colors = {
            'defence': '#e74c3c',
            'agriculture': '#27ae60',
            'science': '#3498db',
            'energy': '#f39c12',
            'textile': '#d35400',
            'health': '#e91e63',
            'culture': '#9b59b6',
            'ceremony': '#8e44ad',
            'break': '#95a5a6',
            'handicrafts': '#c0392b'
        };
        return colors[category] || '#95a5a6';
    }

    // Get event status
    getEventStatus(event) {
        if (this.isEventCurrent(event)) {
            return '<span style="color: var(--success-color); font-weight: 600;">🔴 LIVE NOW</span>';
        } else if (this.isEventPast(event)) {
            return '<span style="color: var(--gray-500);">✅ Completed</span>';
        } else {
            return '<span style="color: var(--primary-color);">⏳ Upcoming</span>';
        }
    }

    // Check if event is current
    isEventCurrent(event) {
        const now = new Date();
        const eventTime = this.getEventDateTime(event);
        const eventEndTime = new Date(eventTime.getTime() + event.duration * 60000);
        
        return now >= eventTime && now <= eventEndTime;
    }

    // Check if event is past
    isEventPast(event) {
        const now = new Date();
        const eventTime = this.getEventDateTime(event);
        const eventEndTime = new Date(eventTime.getTime() + event.duration * 60000);
        
        return now > eventEndTime;
    }

    // Check if event is upcoming
    isEventUpcoming(event) {
        const now = new Date();
        const eventTime = this.getEventDateTime(event);
        
        return now < eventTime;
    }

    // Get event date time
    getEventDateTime(event) {
        try {
            const dateKey = this.getDateKey(this.currentDate);
            const [hours, minutes] = event.time.split(':');
            const eventDate = new Date(dateKey);
            
            if (isNaN(eventDate.getTime())) {
                console.warn('Invalid date for event:', event);
                return new Date();
            }
            
            eventDate.setHours(parseInt(hours) || 0, parseInt(minutes) || 0, 0, 0);
            return eventDate;
        } catch (error) {
            console.error('Error parsing event date time:', error);
            return new Date();
        }
    }

    // Convert time to minutes
    timeToMinutes(time) {
        try {
            if (!time || typeof time !== 'string') {
                return 0;
            }
            
            const [hours, minutes] = time.split(':');
            const hoursInt = parseInt(hours) || 0;
            const minutesInt = parseInt(minutes) || 0;
            
            return hoursInt * 60 + minutesInt;
        } catch (error) {
            console.error('Error converting time to minutes:', error);
            return 0;
        }
    }

    // Get date key
    getDateKey(date) {
        return date.toISOString().split('T')[0];
    }

    // Update current time
    updateCurrentTime() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = new Date().toLocaleTimeString();
        }
    }

    // Start time updates
    startTimeUpdates() {
        setInterval(() => {
            this.updateCurrentTime();
            this.setupSchedule(); // Re-render to update status
        }, 60000); // Update every minute
    }

    // Filter events by category
    filterByCategory(category) {
        const scheduleContainer = document.getElementById('schedule-content');
        if (!scheduleContainer) return;

        const dateKey = this.getDateKey(this.currentDate);
        const daySchedule = this.schedule[dateKey] || [];
        
        const filteredEvents = category === 'all' 
            ? daySchedule 
            : daySchedule.filter(event => event.category === category);

        if (filteredEvents.length === 0) {
            scheduleContainer.innerHTML = this.createEmptyScheduleHTML();
            return;
        }

        const sortedEvents = filteredEvents.sort((a, b) => 
            this.timeToMinutes(a.time) - this.timeToMinutes(b.time)
        );

        scheduleContainer.innerHTML = sortedEvents
            .map(event => this.createEventHTML(event))
            .join('');
    }

    // Get today's highlights
    getTodayHighlights() {
        const dateKey = this.getDateKey(this.currentDate);
        const daySchedule = this.schedule[dateKey] || [];
        
        return daySchedule
            .filter(event => event.type !== 'break')
            .sort((a, b) => this.timeToMinutes(a.time) - this.timeToMinutes(b.time))
            .slice(0, 5);
    }

    // Get upcoming events
    getUpcomingEvents(limit = 3) {
        const dateKey = this.getDateKey(this.currentDate);
        const daySchedule = this.schedule[dateKey] || [];
        const now = new Date();
        
        return daySchedule
            .filter(event => {
                const eventTime = this.getEventDateTime(event);
                return eventTime > now;
            })
            .sort((a, b) => this.timeToMinutes(a.time) - this.timeToMinutes(b.time))
            .slice(0, limit);
    }

    // Add new event
    addEvent(event) {
        const dateKey = this.getDateKey(this.currentDate);
        if (!this.schedule[dateKey]) {
            this.schedule[dateKey] = [];
        }
        
        event.id = Date.now();
        this.schedule[dateKey].push(event);
        this.setupSchedule();
    }

    // Get schedule statistics
    getScheduleStats() {
        const dateKey = this.getDateKey(this.currentDate);
        const daySchedule = this.schedule[dateKey] || [];
        
        const totalEvents = daySchedule.length;
        const completedEvents = daySchedule.filter(event => this.isEventPast(event)).length;
        const upcomingEvents = daySchedule.filter(event => this.isEventUpcoming(event)).length;
        const currentEvents = daySchedule.filter(event => this.isEventCurrent(event)).length;
        
        const categories = [...new Set(daySchedule.map(event => event.category))];
        
        return {
            totalEvents,
            completedEvents,
            upcomingEvents,
            currentEvents,
            categories
        };
    }

    // Export schedule data
    exportScheduleData() {
        return {
            schedule: this.schedule,
            stats: this.getScheduleStats(),
            currentDate: this.currentDate.toISOString(),
            timestamp: new Date().toISOString()
        };
    }
}

// Initialize schedule system
let scheduleSystem;

document.addEventListener('DOMContentLoaded', () => {
    scheduleSystem = new ScheduleSystem();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScheduleSystem;
} 