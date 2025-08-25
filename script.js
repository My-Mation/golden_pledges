document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    if (!searchBar) return;

    const stallCards = document.querySelectorAll('.stall-card');

    // ✅ Add link button dynamically to each stall card
    stallCards.forEach(card => {
        const stallId = card.dataset.id;
        if (!card.querySelector('.stall-link-btn')) { 
            const btn = document.createElement('button');
            btn.textContent = "View Stall";
            btn.classList.add('stall-link-btn');
            btn.addEventListener('click', () => {
                window.location.href = `view.html?id=${stallId}`;
            });
            card.appendChild(btn);
        }
    });

    // Build lookup table
    const stallLookup = {};
    stallCards.forEach(card => {
        const nameLower = card.dataset.name.toLowerCase();
        const words = nameLower.split(/[\s,&]+/);
        words.forEach(word => {
            if (!stallLookup[word]) stallLookup[word] = [];
            stallLookup[word].push(card.dataset.id);
        });
    });

    // Filter cards while typing
    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase().trim();
        stallCards.forEach(card => {
            const name = card.dataset.name.toLowerCase();
            card.style.display = name.includes(query) ? 'block' : 'none';
        });
    });

    // Press Enter to redirect
    searchBar.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const query = searchBar.value.toLowerCase().trim();
            let foundIds = [];

            const queryWords = query.split(/[\s,&]+/);
            queryWords.forEach(q => {
                if (stallLookup[q]) {
                    foundIds = foundIds.concat(stallLookup[q]);
                }
            });

            if (foundIds.length > 0) {
                window.location.href = `view.html?id=${foundIds[0]}`;
            } else {
                alert("Stall not found.");
            }
        }
    });
});
