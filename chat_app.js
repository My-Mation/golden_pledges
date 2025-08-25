document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chat-container");
    const chatOptions = document.getElementById("chat-options");
    const backBtn = document.getElementById("back-btn");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const minimizeBtn = document.getElementById("minimize-btn");
    const closeBtn = document.getElementById("close-btn");

    // ==========================
    // Replies placeholder
    // ==========================
    const replies = {
        foodAB: "Food stalls are along the road between A & B, in front of military display.",
        foodStraight:
            "Going straight from Gate 1, you'll find more food stalls along the path.",
        foodStudent:
            "Some food stalls are near the student section at the end of D.",
        shoppingAll: "You can explore Blocks G and H for all shopping stalls.",
        G: "Block G has shopping stalls.",
        H: "Block H has shopping stalls.",
        toiletCD: "Cross C & D to find toilets on the left side.",
        bioToilet:
            "Biotoilets are located in the student section at the end of D.",
        allToilets:
            "Toilets are near C & D, and biotoilets at the student section.",
        student:
            "The student section is at the end of D; it has most of the engineering exhibits and crowds.",
        parking: "Parking is behind the auditorium near the flag and Office F.",
        army: "Military cars and army displays are in front of A & B.",
        feedback: "You can provide feedback via kiosks or the online form.",
        mainMenu: "Returning to the main menu...",
        routeAud:
            "From Gate 1, go straight to reach the auditorium. On the left is Office F and nearby flag.",
        routeABCD:
            "Blocks A & B are to the right from Gate 1; behind them are C & D.",
        routeGH: "Blocks G & H are to the left from Office F after Gate 1.",
        crowdStudent:
            "The student section is usually crowded; visit early if you want more space.",
        crowdFood:
            "Food stall areas are moderately crowded, especially near A & B.",
        allStalls:
            "All stalls are spread around the blocks; food near A-B and Gate 1, shopping in G-H, student exhibits at D.",
        chooseBlock:
            "Which block do you want to see stalls from? A, B, C, D, G, or H?",
        "metal-steel":
            "Produces high-quality steel and metal components for defense and industry.",
        armoured: "Manufacturer of armored vehicles for Indian defense forces.",
        drdo: "Research organization focusing on defense technologies.",
        hal: "Hindustan Aeronautics Limited: Aerospace and aircraft manufacturing.",
        "troop-comforts": "Provides gear and comforts for military personnel.",
        "india-optel":
            "Optical and electronics solutions for defense applications.",
        aweil: "Advanced Weapons and Equipment India Limited, specializing in cutting-edge weapons.",
        "indian-air-force":
            "Indian Air Force exhibit showcasing aircraft and technologies.",
        "indian-navy": "Indian Navy exhibit with ships and naval equipment.",
        "indian-army": "Indian Army showcase with vehicles and army equipment.",
        "gliders-india":
            "Gliders India Limited: aviation and glider technology.",
        "munitions-india": "Manufacturer of ammunition and explosives.",
        "mazagon-doc": "Mazagon Dock Shipbuilders Limited: Naval shipbuilding.",
        // Block C / Engineering & Govt
        cmfri: "The Central Marine Fisheries Research Institute (CMFRI) focuses on sustainable marine fisheries development, biodiversity research, aquaculture, and climate-resilient technologies.",
        "dept-agri-wb":
            "The Department of Agriculture, West Bengal, improves agricultural productivity and ensures food security through modern farming, soil health, and sustainable practices.",
        "directorate-ext":
            "The Directorate of Extension, GOI, bridges agricultural research and farmers, promoting capacity-building programs and field demonstrations.",
        nbfgr: "The National Bureau of Fish Genetic Resources (NBFGR) conserves fish genetic diversity and develops molecular tools for aquaculture and fisheries policy.",
        "icar-icar-kolkata":
            "ICAR-ATR, Kolkata, specializes in agricultural mechanization, climate-smart farming, and technology dissemination to farmers across eastern India.",
        cife: "The Central Institute of Fisheries Education (CIFE) provides education, research, and training in fisheries science, aquaculture, and aquatic health management.",
        dkma: "The Directorate of Knowledge Management in Agriculture manages and disseminates agricultural information through journals, books, and digital resources.",
        apeda: "APEDA promotes India's agri-export sector, value-added products, quality certification, and global market access.",
        ntpc: "NTPC Limited generates thermal, hydro, solar, and renewable energy, driving sustainable practices and nationwide electrification.",
        gsi: "The Geological Survey of India conducts geological mapping, mineral resource assessment, and sustainable management of natural resources.",
        "wb-ngrba":
            "The West Bengal NGRBA Program Management Group manages river basins, pollution control, and ecosystem restoration.",
        neepcl: "NEEPCO generates hydro and thermal power in North Eastern India, focusing on natural energy potential and ecological balance.",
        nhpc: "NHPC develops large-scale hydroelectric projects, clean energy generation, and rural electrification.",
        bis: "The Bureau of Indian Standards ensures product certification, quality assurance, and consumer safety across India.",
        cgwb: "The Central Ground Water Board manages groundwater resources, conducts surveys, and develops sustainable usage strategies.",
        "tripura-tourism":
            "Tripura Tourism promotes cultural heritage, landscapes, tribal traditions, wildlife sanctuaries, and eco-tourism.",
        "eastern-railway":
            "Eastern Railway ensures passenger and freight services, rail connectivity, and regional economic support.",
        "adamas-univ":
            "Adamas University offers multidisciplinary higher education, research, and innovation programs.",
        rbi: "The Reserve Bank of India regulates monetary policy, currency issuance, banking supervision, and financial stability.",
        negd: "The National e-Governance Division leads Digital India initiatives through e-governance projects and digital public services.",
        "sister-nivedita-univ":
            "Sister Nivedita University offers programs in science, engineering, law, humanities, and media studies, emphasizing research and innovation.",

        // Block D / Science & Research
        "bose-institute":
            "Bose Institute conducts interdisciplinary scientific research in physics, chemistry, biology, and environmental sciences.",
        "iiser-kolkata":
            "IISER Kolkata provides high-quality science education and research in biology, physics, chemistry, mathematics, and earth sciences.",
        "saha-institute":
            "The Saha Institute of Nuclear Physics focuses on theoretical and experimental nuclear physics, particle physics, and biophysical sciences.",
        dae: "The Department of Atomic Energy oversees nuclear power, atomic research, and peaceful applications in health, food security, and national security.",
        "bric-dna":
            "BRIC-Centre for DNA Fingerprinting & Diagnostics provides DNA-based diagnostics, genetic fingerprinting, and biotechnology research.",
        "bric-dbt":
            "BRIC, DBT advances biotechnological innovations, collaborations, and research in healthcare, agriculture, and industrial biotech.",
        nibmg: "The National Institute of Biomedical Genomics (NIBMG) focuses on genomic research, precision medicine, and biotechnology applications.",
        "science-model":
            "The Science Model Competition showcases creative scientific models, prototypes, and student research projects.",
        csir: "The Council of Scientific and Industrial Research drives innovation in pharmaceuticals, energy, agriculture, materials, aerospace, and environmental sustainability.",
        moes: "The Ministry of Earth Sciences oversees weather, climate change, ocean sciences, seismology, and atmospheric research.",
        "survey-india":
            "The Survey of India manages cartographic data, topographical surveys, geospatial information, and infrastructure for defense and governance.",
        "anusandhan-nrf":
            "The Anusandhan National Research Foundation promotes research across science, technology, social sciences, and humanities.",

        // Block G / Textile & Handicrafts
        "national-jute-board":
            "The National Jute Board promotes, develops, and expands the jute sector, supporting eco-friendly alternatives and artisan livelihoods.",
        "blooming-rose":
            "Blooming Rose specializes in innovative and sustainable jute products for local and national markets.",
        "jute-baggy":
            "Jute Baggy Enterprise produces handmade jute bags and accessories, blending traditional craftsmanship with modern designs.",
        "victor-jute":
            "Victor Jute Products creates jute crafts, bags, and home items, promoting eco-conscious living.",
        "tania-sarkar":
            "Tania Sarkar specializes in jute handicrafts, combining traditional weaving with contemporary aesthetics.",
        "jute-hind":
            "Jute Hind focuses on eco-friendly jute bags and lifestyle products, preserving Kolkata's heritage of jute craftsmanship.",
        "umita-jute":
            "Umita Jute Centre supports rural artisans in weaving and crafting jute-based items, preserving traditional methods.",
        "handlooms-goi": "Government-supported handloom products.",
        "handicrafts-goi-1": "Government handicrafts initiative.",
        "handicrafts-goi-2": "Government handicrafts initiative.",
        "handicrafts-goi-3": "Government handicrafts initiative.",
        "handicrafts-goi-4": "Government handicrafts initiative.",
        "handicrafts-goi-5": "Government handicrafts initiative.",
        "handicrafts-goi-6": "Government handicrafts initiative.",
        "handicrafts-goi-7": "Government handicrafts initiative.",
        "handicrafts-goi-8": "Government handicrafts initiative.",
        "handicrafts-goi-9": "Government handicrafts initiative.",
        "handicrafts-goi-10": "Government handicrafts initiative.",
        "handicrafts-goi-11": "Government handicrafts initiative.",
        "handicrafts-goi-12": "Government handicrafts initiative.",
        "handicrafts-goi-13": "Government handicrafts initiative.",
        "handicrafts-goi-14": "Government handicrafts initiative.",
        "handicrafts-goi-15": "Government handicrafts initiative.",
        "handicrafts-goi-16": "Government handicrafts initiative.",

        // Block H / Health
        icmr: "The Indian Council of Medical Research is the apex body for biomedical research, public health advancement, and disease control programs.",
        "icmr-nirbi":
            "ICMR-NIRBI conducts advanced biological and immunological research, contributing to vaccine development and diagnostics.",
        "nhm-wb":
            "The National Health Mission in West Bengal strengthens health infrastructure, maternal-child health, and affordable healthcare.",
        "univ-burdwan":
            "The University of Burdwan engages in higher education and research, focusing on medical sciences, public health, and applied life sciences.",
        // user-facing stall count message
        numberofStalls: 74,
        // better prompt when user clicks 'Specific Stall'
        stall: "Which block do you want to see stalls from? A, B, C, D, G, or H?",
    };

    // ==========================
    // Main options
    // ==========================
    const mainOptions = [
        { text: "Where to eat?", key: "food" },
        { text: "Shopping areas", key: "shopping" },
        { text: "Toilet locations", key: "toilet" },
        { text: "Student section", key: "student" },
        { text: "Parking / Flag", key: "parking" },
        { text: "Military display", key: "army" },
        { text: "Exhibit map guidance", key: "map" },
        { text: "Feedback / Rating", key: "feedback" },
        { text: "Crowd tips", key: "crowd" },
        { text: "Specific Stall", key: "stall" },
    ];

    // ==========================
    // Sub-options placeholder
    // ==========================
    const subOptions = {
        food: [
            { text: "Between A & B", key: "foodAB" },
            { text: "Straight from Gate 1", key: "foodStraight" },
            { text: "Near Student Section", key: "foodStudent" },
        ],
        shopping: [
            { text: "Block G", key: "G" },
            { text: "Block H", key: "H" },
            { text: "All shopping options", key: "shoppingAll" },
        ],
        toilet: [
            { text: "Near C & D", key: "toiletCD" },
            { text: "Student Section", key: "bioToilet" },
            { text: "All toilets", key: "allToilets" },
        ],
        map: [
            { text: "Route from Gate 1 to Auditorium", key: "routeAud" },
            { text: "Route to Blocks A-D", key: "routeABCD" },
            { text: "Route to Blocks G-H", key: "routeGH" },
        ],
        crowd: [
            { text: "Student section", key: "crowdStudent" },
            { text: "Food stalls", key: "crowdFood" },
        ],
        stall: [{ text: "Choose Block", key: "chooseBlock" }],
    };

    // ==========================
    // Blocks placeholder
    // ==========================
    const blocks = {
        A: [
            {
                key: "metal-steel",
                name: "Metal & Steel Factory, Ishapore, GOI",
            },
            { key: "armoured", name: "Armoured Vehicles Nigam Limited, GOI" },
            {
                key: "drdo",
                name: "Defence Research & Development Organisation, GOI",
            },
            { key: "hal", name: "Hindustan Aeronautics Limited, GOI" },
            { key: "troop-comforts", name: "Troop Comforts Limited, GOI" },
            { key: "india-optel", name: "India Optel Limited, GOI" },
            {
                key: "aweil",
                name: "Advanced Weapons and Equipment India Limited, GOI",
            },
            { key: "indian-air-force", name: "Indian Air Force, GOI" },
            { key: "indian-navy", name: "Indian Navy, GOI" },
            { key: "indian-army", name: "Indian Army, GOI" },
            { key: "gliders-india", name: "Gliders India Limited, GOI" },
            { key: "munitions-india", name: "Munitions India Limited, GOI" },
            {
                key: "mazagon-doc",
                name: "Mazagon Dock Shipbuilders Limited, GOI",
            },
        ],
        B: [
            {
                key: "cmfri",
                name: "ICAR - Central Marine Fisheries Research Institute, Kochi",
            },
            {
                key: "dept-agri-wb",
                name: "Department of Agriculture, Govt. of West Bengal",
            },
            { key: "directorate-ext", name: "Directorate of Extension, GOI" },
            {
                key: "nbfgr",
                name: "ICAR - National Bureau of Fish Genetics Resources, GOI",
            },
            {
                key: "icar-icar-kolkata",
                name: "ICAR Application Technology Research Institute, Kolkata",
            },
            {
                key: "cife",
                name: "ICAR - Central Institute of Fisheries Education, GOI",
            },
            {
                key: "dkma",
                name: "ICAR - Directorate of Knowledge Management in Agriculture, GOI",
            },
            {
                key: "apeda",
                name: "Agricultural and Processed Food Products Export Development Authority, GOI",
            },
        ],
        C: [
            { key: "ntpc", name: "NTPC Limited, GOI" },
            { key: "gsi", name: "Geological Survey of India, GOI" },
            {
                key: "wb-ngrba",
                name: "West Bengal NGRBA Program Management Group",
            },
            {
                key: "neepcl",
                name: "North Eastern Electric Power Corporation Limited, GOI",
            },
            { key: "nhpc", name: "NHPC, GOI" },
            { key: "bis", name: "Bureau of Indian Standards, GOI" },
            { key: "cgwb", name: "Central Ground Water Board, GOI" },
            { key: "tripura-tourism", name: "Tripura Tourism" },
            { key: "eastern-railway", name: "Eastern Railway, GOI" },
            { key: "adamas-univ", name: "Adamas University" },
            { key: "rbi", name: "Reserve Bank of India" },
            { key: "negd", name: "National e-Governance Division, GOI" },
            { key: "sister-nivedita-univ", name: "Sister Nivedita University" },
        ],
        D: [
            {
                key: "bose-institute",
                name: "Bose Institute, Department of Science and Technology, GOI",
            },
            {
                key: "iiser-kolkata",
                name: "Indian Institute of Science Education and Research, Kolkata, GOI",
            },
            {
                key: "saha-institute",
                name: "Saha Institute of Nuclear Physics, Department of Atomic Energy, GOI",
            },
            { key: "dae", name: "Department of Atomic Energy, GOI" },
            {
                key: "bric-dna",
                name: "Bric-Centre for DNA Fingerprinting & Diagnostics, GOI",
            },
            { key: "bric-dbt", name: "BRIC, DBT" },
            { key: "nibmg", name: "Department of Biotechnology, GOI (NIBMG)" },
            { key: "science-model", name: "Science Model Competition" },
            {
                key: "csir",
                name: "Council of Scientific and Industrial Research, GOI",
            },
            { key: "moes", name: "Ministry of Earth Sciences, GOI" },
            { key: "survey-india", name: "Survey of India, GOI" },
            {
                key: "anusandhan-nrf",
                name: "Anusandhan National Research Foundation",
            },
        ],
        G: [
            { key: "national-jute-board", name: "National Jute Board, GOI" },
            { key: "blooming-rose", name: "BLOOMING ROSE, North 24 Parganas" },
            { key: "jute-baggy", name: "JUTE BAGGY ENTERPRISE, Hooghly" },
            {
                key: "victor-jute",
                name: "VICTOR JUTE PRODUCTS, North 24 Parganas",
            },
            { key: "tania-sarkar", name: "TANIA SARKAR, North 24 Parganas" },
            { key: "jute-hind", name: "JUTE HIND, Kolkata" },
            { key: "umita-jute", name: "UMITA JUTE CENTRE, Hooghly" },
            { key: "handlooms-goi", name: "HANDLOOMS, GOI" },
            { key: "handicrafts-goi-1", name: "HANDICRAFTS, GOI-1" },
            { key: "handicrafts-goi-2", name: "HANDICRAFTS, GOI-2" },
            { key: "handicrafts-goi-3", name: "HANDICRAFTS, GOI-3" },
            { key: "handicrafts-goi-4", name: "HANDICRAFTS, GOI-4" },
            { key: "handicrafts-goi-5", name: "HANDICRAFTS, GOI-5" },
            { key: "handicrafts-goi-6", name: "HANDICRAFTS, GOI-6" },
            { key: "handicrafts-goi-7", name: "HANDICRAFTS, GOI-7" },
            { key: "handicrafts-goi-8", name: "HANDICRAFTS, GOI-8" },
            { key: "handicrafts-goi-9", name: "HANDICRAFTS, GOI-9" },
            { key: "handicrafts-goi-10", name: "HANDICRAFTS, GOI-10" },
            { key: "handicrafts-goi-11", name: "HANDICRAFTS, GOI-11" },
            { key: "handicrafts-goi-12", name: "HANDICRAFTS, GOI-12" },
            { key: "handicrafts-goi-13", name: "HANDICRAFTS, GOI-13" },
            { key: "handicrafts-goi-14", name: "HANDICRAFTS, GOI-14" },
            { key: "handicrafts-goi-15", name: "HANDICRAFTS, GOI-15" },
            { key: "handicrafts-goi-16", name: "HANDICRAFTS, GOI-16" },
        ],
        H: [
            { key: "icmr", name: "Indian Council of Medical Research, GOI" },
            { key: "icmr-nirbi", name: "ICMR-NIRBI, GOI" },
            {
                key: "nhm-wb",
                name: "National Health Mission, Govt. of West Bengal",
            },
            { key: "univ-burdwan", name: "The University of Burdwan" },
        ],
    };

    // ==========================
    // Enhanced Helper Functions
    // ==========================

    // Remove welcome message and typing indicator
    function removeWelcomeMessage() {
        const welcomeMsg = document.querySelector(".welcome-message");
        if (welcomeMsg) {
            welcomeMsg.remove();
        }
    }

    // Add message with AI typing effect
    async function addMessage(text, sender = "bot") {
        const div = document.createElement("div");
        div.classList.add(
            "chat-message",
            sender === "bot" ? "bot-message" : "user-message"
        );

        const messageContent = document.createElement("div");
        messageContent.classList.add("message-content");

        if (sender === "bot") {
            // Show typing indicator first
            const typingIndicator = createTypingIndicator();
            div.appendChild(typingIndicator);
            chatContainer.appendChild(div);
            chatContainer.scrollTop = chatContainer.scrollHeight;

            // Simulate AI thinking time
            await new Promise((resolve) =>
                setTimeout(resolve, 800 + Math.random() * 400)
            );

            // Remove typing indicator and add actual message
            typingIndicator.remove();
            messageContent.textContent = text;
            div.appendChild(messageContent);

            // Add typing animation effect
            await typeMessage(messageContent, text);
        } else {
            messageContent.textContent = text;
            div.appendChild(messageContent);
            chatContainer.appendChild(div);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        return div;
    }

    // Create typing indicator
    function createTypingIndicator() {
        const indicator = document.createElement("div");
        indicator.className = "ai-typing-indicator";
        indicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        return indicator;
    }

    // Type message character by character
    async function typeMessage(element, text) {
        element.textContent = "";
        const words = text.split(" ");

        for (let i = 0; i < words.length; i++) {
            element.textContent += words[i];
            if (i < words.length - 1) {
                element.textContent += " ";
            }
            await new Promise((resolve) =>
                setTimeout(resolve, 50 + Math.random() * 30)
            );
        }
    }

    // Show options with animation
    function showOptions(options) {
        chatOptions.innerHTML = "";

        // Add stagger animation to buttons
        options.forEach((opt, index) => {
            const btn = document.createElement("button");
            btn.textContent = opt.text;
            btn.dataset.key = opt.key;
            btn.style.animationDelay = `${index * 0.1}s`;
            btn.classList.add("option-btn");
            btn.addEventListener("click", () => handleOption(opt.key));
            chatOptions.appendChild(btn);
        });

        if (options !== mainOptions) {
            const mainBtn = document.createElement("button");
            mainBtn.textContent = "Back to Main Menu";
            mainBtn.dataset.key = "mainMenu";
            mainBtn.classList.add("option-btn", "back-option");
            mainBtn.style.animationDelay = `${options.length * 0.1}s`;
            mainBtn.addEventListener("click", () => handleOption("mainMenu"));
            chatOptions.appendChild(mainBtn);
        }
    }

    // Show stalls with enhanced UI
    function showStalls(blockKey) {
        if (!blocks[blockKey]) return addMessage("Invalid block.", "bot");

        const options = blocks[blockKey].map((s) => ({
            text: s.name,
            key: s.key,
            isStall: true,
        }));

        // Create a more visual stall display
        chatOptions.innerHTML = "";
        chatOptions.innerHTML = `<h3 class="stall-header">Stalls in Block ${blockKey}</h3>`;

        options.forEach((opt, index) => {
            const btn = document.createElement("button");
            btn.innerHTML = `<span class="stall-name">${opt.text}</span>`;
            btn.dataset.key = opt.key;
            btn.style.animationDelay = `${index * 0.05}s`;
            btn.classList.add("option-btn", "stall-btn");
            btn.addEventListener("click", () => handleOption(opt.key));
            chatOptions.appendChild(btn);
        });

        const mainBtn = document.createElement("button");
        mainBtn.textContent = "Back to Main Menu";
        mainBtn.dataset.key = "mainMenu";
        mainBtn.classList.add("option-btn", "back-option");
        mainBtn.style.animationDelay = `${options.length * 0.05 + 0.1}s`;
        mainBtn.addEventListener("click", () => handleOption("mainMenu"));
        chatOptions.appendChild(mainBtn);
    }

    // ==========================
    // Handle option selection
    // ==========================
    async function handleOption(key) {
        // "Choose Block" clicked
        if (key === "chooseBlock") {
            await addMessage(
                "Which block do you want to see stalls from? A, B, C, D, G, or H?"
            );
            showOptions([
                { text: "Block A", key: "A" },
                { text: "Block B", key: "B" },
                { text: "Block C", key: "C" },
                { text: "Block D", key: "D" },
                { text: "Block G", key: "G" },
                { text: "Block H", key: "H" },
            ]);
            return;
        }

        // Block selection for stalls
        if (["A", "B", "C", "D", "G", "H"].includes(key)) {
            await addMessage(`Here are the stalls in Block ${key}:`);
            showStalls(key);
            return;
        }

        // Specific stall selected
        const allStalls = Object.values(blocks).flatMap((b) =>
            b.map((s) => s.key)
        );
        if (allStalls.includes(key)) {
            const stall = Object.values(blocks)
                .flatMap((b) => b)
                .find((s) => s.key === key);
            await addMessage(
                `${stall.name}: ${replies[key] || "Description not available."}`
            );
            return;
        }

        // Replies for main/sub-options
        if (key === "feedback") {
            window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSdD_It5dDtkF5lAka3NvqVQP_fDnd9cik3RnfqcRnPNX5iVqA/viewform?usp=header",
                "_blank"
            );
            await addMessage("Opening the feedback form in a new tab...");
        } else {
            await addMessage(replies[key] || "Please choose an option.");
            if (subOptions[key]) showOptions(subOptions[key]);
            if (key === "mainMenu") showOptions(mainOptions);
        }
    }

    // Handle user input
    async function handleUserInput() {
        const text = userInput.value.trim();
        if (!text) return;

        // Add user message
        await addMessage(text, "user");
        userInput.value = "";

        // Simulate AI processing
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Try to find a relevant response
        const response = findResponse(text);
        if (response) {
            await addMessage(response, "bot");
        } else {
            await addMessage(
                "I'm not sure I understand. Could you please select from the options below or rephrase your question?",
                "bot"
            );
        }

        // Show main options if not already shown
        if (!chatOptions.children.length) {
            showOptions(mainOptions);
        }
    }

    // Simple response finder for user input
    function findResponse(text) {
        const lowerText = text.toLowerCase();

        // NEW: Answer stall-count questions
        if (
            lowerText.includes("how many stalls") ||
            lowerText.includes("number of stalls") ||
            lowerText.includes("no. of stalls") ||
            /how many.*stalls/.test(lowerText) ||
            lowerText === "how many stalls?" ||
            lowerText === "how many stalls are there?"
        ) {
            return `There are ${replies.numberofStalls} stalls.`;
        }

        // Check for common keywords
        if (
            lowerText.includes("food") ||
            lowerText.includes("eat") ||
            lowerText.includes("hungry")
        ) {
            return "I can help you find food stalls! Food is available between Blocks A & B, straight from Gate 1, and near the student section. Which area would you prefer?";
        }
        if (
            lowerText.includes("toilet") ||
            lowerText.includes("bathroom") ||
            lowerText.includes("restroom")
        ) {
            return "Toilets are located near Blocks C & D, and there are biotoilets in the student section at the end of Block D. Would you like specific directions?";
        }
        if (
            lowerText.includes("parking") ||
            lowerText.includes("car") ||
            lowerText.includes("vehicle")
        ) {
            return "Parking is available behind the auditorium near the flag and Office F. It's easily accessible from Gate 1.";
        }
        if (
            lowerText.includes("shopping") ||
            lowerText.includes("buy") ||
            lowerText.includes("shop")
        ) {
            return "Shopping stalls are located in Blocks G and H. You'll find handicrafts, jute products, and more there. Which block would you like to explore?";
        }
        if (
            lowerText.includes("student") ||
            lowerText.includes("exhibit") ||
            lowerText.includes("science")
        ) {
            return "The student section is at the end of Block D. It features most of the engineering exhibits and tends to be crowded. Would you like to know more about specific stalls there?";
        }

        // If user just types "stalls" or "show stalls", guide them to choose a block
        if (
            lowerText === "stalls" ||
            lowerText.includes("show stalls") ||
            lowerText.includes("list stalls")
        ) {
            return replies.stall; // This will prompt the user to pick a block
        }

        return null;
    }

    // ==========================
    // Event Listeners
    // ==========================

    // Send button click
    sendBtn.addEventListener("click", handleUserInput);

    // Enter key in input
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleUserInput();
        }
    });

    // Header button events
    minimizeBtn.addEventListener("click", () => {
        // Add minimize functionality if needed
        console.log("Minimize clicked");
    });

    closeBtn.addEventListener("click", () => {
        if (window.opener) window.close();
        else window.location.href = "index.html";
    });

    // ==========================
    // Initialize chatbot
    // ==========================

    // Remove welcome message after a delay and show initial message
    setTimeout(async () => {
        removeWelcomeMessage();
        await addMessage(
            "Hello! I'm your AI Exhibition Assistant. How can I help you today? I can guide you to food stalls, shopping areas, toilets, and much more!",
            "bot"
        );
        showOptions(mainOptions);
    }, 2000);

    backBtn.addEventListener("click", () => {
        if (window.opener) window.close();
        else window.location.href = "index.html";
    });
});
