// Recommendation System for Exhibition Stalls
// This system provides personalized recommendations based on stall categories and keywords

// Stall data with categories and keywords
const stallData = {
    // Block A - Defence & Military
    "metal-steel": {
        name: "Metal & Steel Factory, Ishapore, GOI",
        category: "defence",
        keywords: ["steel", "metal", "manufacturing", "defence", "military", "weapons", "ammunition"],
        block: "A"
    },
    "armoured": {
        name: "Armoured Vehicles Nigam Limited, GOI",
        category: "defence",
        keywords: ["armoured", "vehicles", "tanks", "defence", "military", "combat", "protection"],
        block: "A"
    },
    "drdo": {
        name: "Defence Research & Development Organisation, GOI",
        category: "defence",
        keywords: ["research", "development", "missiles", "drones", "radar", "technology", "innovation", "defence"],
        block: "A"
    },
    "hal": {
        name: "Hindustan Aeronautics Limited, GOI",
        category: "defence",
        keywords: ["aerospace", "aircraft", "helicopters", "aviation", "defence", "military", "engineering"],
        block: "A"
    },
    "troop-comforts": {
        name: "Troop Comforts Limited, GOI",
        category: "defence",
        keywords: ["uniforms", "gear", "comfort", "soldiers", "defence", "military", "equipment"],
        block: "A"
    },
    "india-optel": {
        name: "India Optel Limited, GOI",
        category: "defence",
        keywords: ["optical", "electronics", "night vision", "surveillance", "defence", "technology"],
        block: "A"
    },
    "aweil": {
        name: "Advanced Weapons and Equipment India Limited, GOI",
        category: "defence",
        keywords: ["weapons", "artillery", "rifles", "defence", "military", "combat", "equipment"],
        block: "A"
    },
    "indian-air-force": {
        name: "Indian Air Force, GOI",
        category: "defence",
        keywords: ["air force", "aviation", "fighter jets", "defence", "military", "aircraft"],
        block: "A"
    },
    "indian-navy": {
        name: "Indian Navy, GOI",
        category: "defence",
        keywords: ["navy", "maritime", "ships", "submarines", "defence", "military", "naval"],
        block: "A"
    },
    "indian-army": {
        name: "Indian Army, GOI",
        category: "defence",
        keywords: ["army", "land forces", "defence", "military", "combat", "infantry"],
        block: "A"
    },
    "gliders-india": {
        name: "Gliders India Limited, GOI",
        category: "defence",
        keywords: ["parachutes", "aerial", "safety", "defence", "military", "equipment"],
        block: "A"
    },
    "munitions-india": {
        name: "Munitions India Limited, GOI",
        category: "defence",
        keywords: ["ammunition", "explosives", "defence", "military", "combat", "weapons"],
        block: "A"
    },
    "mazagon-doc": {
        name: "Mazagon Dock Shipbuilders Limited, GOI",
        category: "defence",
        keywords: ["shipbuilding", "warships", "submarines", "maritime", "defence", "military"],
        block: "A"
    },

    // Block B - Agriculture & Fisheries
    "cmfri": {
        name: "ICAR - Central Marine Fisheries Research Institute, Kochi",
        category: "agriculture",
        keywords: ["fisheries", "marine", "research", "aquaculture", "agriculture", "sustainability"],
        block: "B"
    },
    "dept-agri-wb": {
        name: "Department of Agriculture, Govt. of West Bengal",
        category: "agriculture",
        keywords: ["agriculture", "farming", "food security", "technology", "sustainability"],
        block: "B"
    },
    "directorate-ext": {
        name: "Directorate of Extension, GOI",
        category: "agriculture",
        keywords: ["extension", "agriculture", "research", "farmers", "technology", "education"],
        block: "B"
    },
    "nbfgr": {
        name: "ICAR - National Bureau of Fish Genetics Resources, GOI",
        category: "agriculture",
        keywords: ["fish genetics", "aquaculture", "research", "agriculture", "conservation"],
        block: "B"
    },
    "icar-icar-kolkata": {
        name: "Indian Council of Agricultural Research, GOI, ICAR Application Technology Research Institute, Kolkata",
        category: "agriculture",
        keywords: ["agriculture", "research", "technology", "mechanization", "innovation"],
        block: "B"
    },
    "cife": {
        name: "ICAR - Central Institute of Fisheries Education, GOI",
        category: "agriculture",
        keywords: ["fisheries", "education", "aquaculture", "research", "agriculture"],
        block: "B"
    },
    "dkma": {
        name: "ICAR - Directorate of Knowledge Management in Agriculture, GOI",
        category: "agriculture",
        keywords: ["knowledge management", "agriculture", "research", "information", "education"],
        block: "B"
    },
    "apeda": {
        name: "Agricultural and Processed Food Products Export Development Authority, GOI",
        category: "agriculture",
        keywords: ["agriculture", "food processing", "export", "trade", "food products"],
        block: "B"
    },

    // Block C - General & PSU
    "ntpc": {
        name: "NTPC Limited, GOI",
        category: "energy",
        keywords: ["power", "energy", "electricity", "thermal", "renewable", "sustainability"],
        block: "C"
    },
    "gsi": {
        name: "Geological Survey of India, GOI",
        category: "science",
        keywords: ["geology", "minerals", "survey", "research", "earth sciences", "exploration"],
        block: "C"
    },
    "wb-ngrba": {
        name: "West Bengal NGRBA Program Management Group",
        category: "environment",
        keywords: ["river", "conservation", "environment", "water", "sustainability", "pollution"],
        block: "C"
    },
    "neepcl": {
        name: "North Eastern Electric Power Corporation Limited, GOI",
        category: "energy",
        keywords: ["power", "energy", "hydro", "electricity", "northeast", "sustainability"],
        block: "C"
    },
    "nhpc": {
        name: "NHPC, GOI",
        category: "energy",
        keywords: ["hydropower", "energy", "electricity", "renewable", "sustainability"],
        block: "C"
    },
    "bis": {
        name: "Bureau of Indian Standards, GOI",
        category: "standards",
        keywords: ["standards", "certification", "quality", "testing", "safety"],
        block: "C"
    },
    "cgwb": {
        name: "Central Ground Water Board, GOI",
        category: "environment",
        keywords: ["groundwater", "water", "environment", "conservation", "sustainability"],
        block: "C"
    },
    "tripura-tourism": {
        name: "Tripura Tourism",
        category: "tourism",
        keywords: ["tourism", "culture", "heritage", "travel", "northeast", "eco-tourism"],
        block: "C"
    },
    "eastern-railway": {
        name: "Eastern Railway, GOI",
        category: "transport",
        keywords: ["railway", "transport", "connectivity", "infrastructure", "passenger", "freight"],
        block: "C"
    },
    "adamas-univ": {
        name: "Adamas University",
        category: "education",
        keywords: ["education", "university", "research", "higher education", "multidisciplinary"],
        block: "C"
    },
    "rbi": {
        name: "Reserve Bank of India",
        category: "finance",
        keywords: ["banking", "finance", "monetary policy", "currency", "economic", "regulation"],
        block: "C"
    },
    "negd": {
        name: "National e-Governance Division, GOI",
        category: "technology",
        keywords: ["e-governance", "digital", "technology", "government", "transparency", "services"],
        block: "C"
    },
    "sister-nivedita-univ": {
        name: "Sister Nivedita University",
        category: "education",
        keywords: ["education", "university", "research", "higher education", "multidisciplinary"],
        block: "C"
    },

    // Block D - Science & Technology
    "bose-institute": {
        name: "Bose Institute, Department of Science and Technology, GOI",
        category: "science",
        keywords: ["research", "physics", "chemistry", "biology", "science", "innovation"],
        block: "D"
    },
    "iiser-kolkata": {
        name: "Indian Institute of Science Education and Research, Kolkata, GOI",
        category: "science",
        keywords: ["science", "education", "research", "physics", "chemistry", "biology", "mathematics"],
        block: "D"
    },
    "saha-institute": {
        name: "Saha Institute of Nuclear Physics, Department of Atomic Energy, GOI",
        category: "science",
        keywords: ["nuclear physics", "particle physics", "research", "science", "atomic energy"],
        block: "D"
    },
    "dae": {
        name: "Department of Atomic Energy, GOI",
        category: "science",
        keywords: ["atomic energy", "nuclear", "research", "science", "energy", "technology"],
        block: "D"
    },
    "bric-dna": {
        name: "Bric-Centre for DNA Fingerprinting & Diagnostics, GOI",
        category: "science",
        keywords: ["dna", "genomics", "biotechnology", "research", "science", "diagnostics"],
        block: "D"
    },
    "bric-dbt": {
        name: "BRIC, DBT",
        category: "science",
        keywords: ["biotechnology", "research", "innovation", "science", "healthcare", "agriculture"],
        block: "D"
    },
    "nibmg": {
        name: "Department of Biotechnology, GOI (NIBMG)",
        category: "science",
        keywords: ["biotechnology", "genomics", "research", "science", "healthcare", "precision medicine"],
        block: "D"
    },
    "science-model": {
        name: "Science Model Competition",
        category: "education",
        keywords: ["science", "education", "models", "innovation", "students", "research"],
        block: "D"
    },
    "csir": {
        name: "Council of Scientific and Industrial Research, GOI",
        category: "science",
        keywords: ["research", "science", "innovation", "technology", "industrial", "pharmaceuticals"],
        block: "D"
    },
    "moes": {
        name: "Ministry of Earth Sciences, GOI",
        category: "science",
        keywords: ["earth sciences", "climate", "weather", "ocean", "research", "science"],
        block: "D"
    },
    "survey-india": {
        name: "Survey of India, GOI",
        category: "science",
        keywords: ["survey", "mapping", "cartography", "geospatial", "science", "infrastructure"],
        block: "D"
    },
    "anusandhan-nrf": {
        name: "Anusandhan National Research Foundation",
        category: "science",
        keywords: ["research", "science", "technology", "innovation", "funding", "education"],
        block: "D"
    },

    // Block G - Textile & Handicrafts
    "national-jute-board": {
        name: "National Jute Board, GOI",
        category: "textile",
        keywords: ["jute", "textile", "eco-friendly", "sustainable", "handicrafts", "artisans"],
        block: "G"
    },
    "blooming-rose": {
        name: "BLOOMING ROSE, North 24 Parganas",
        category: "textile",
        keywords: ["jute", "eco-friendly", "handicrafts", "sustainable", "artisans", "textile"],
        block: "G"
    },
    "jute-baggy": {
        name: "JUTE BAGGY ENTERPRISE, Hooghly",
        category: "textile",
        keywords: ["jute", "bags", "handicrafts", "eco-friendly", "sustainable", "textile"],
        block: "G"
    },
    "victor-jute": {
        name: "VICTOR JUTE PRODUCTS, North 24 Parganas",
        category: "textile",
        keywords: ["jute", "handicrafts", "eco-friendly", "sustainable", "textile", "crafts"],
        block: "G"
    },
    "tania-sarkar": {
        name: "TANIA SARKAR, North 24 Parganas",
        category: "textile",
        keywords: ["jute", "handicrafts", "artisans", "crafts", "textile", "traditional"],
        block: "G"
    },
    "jute-hind": {
        name: "JUTE HIND, Kolkata",
        category: "textile",
        keywords: ["jute", "handicrafts", "eco-friendly", "sustainable", "textile", "heritage"],
        block: "G"
    },
    "umita-jute": {
        name: "UMITA JUTE CENTRE, Hooghly",
        category: "textile",
        keywords: ["jute", "handicrafts", "artisans", "rural", "textile", "traditional"],
        block: "G"
    },
    "handlooms-goi": {
        name: "HANDLOOMS, GOI",
        category: "textile",
        keywords: ["handlooms", "textile", "traditional", "artisans", "crafts"],
        block: "G"
    },

    // Block H - Health & Medical
    "icmr": {
        name: "Indian Council of Medical Research, GOI",
        category: "health",
        keywords: ["medical research", "healthcare", "biomedical", "public health", "innovation"],
        block: "H"
    },
    "icmr-nirbi": {
        name: "ICMR-NIRBI, GOI",
        category: "health",
        keywords: ["medical research", "biologicals", "immunology", "vaccines", "healthcare"],
        block: "H"
    },
    "nhm-wb": {
        name: "National Health Mission, Govt. of West Bengal",
        category: "health",
        keywords: ["healthcare", "public health", "rural health", "maternal health", "medical"],
        block: "H"
    },
    "univ-burdwan": {
        name: "The University of Burdwan",
        category: "education",
        keywords: ["education", "university", "medical sciences", "research", "higher education"],
        block: "H"
    }
};

// Add handicrafts stalls
for (let i = 1; i <= 16; i++) {
    stallData[`handicrafts-goi-${i}`] = {
        name: `HANDICRAFTS, GOI-${i}`,
        category: "handicrafts",
        keywords: ["handicrafts", "traditional", "artisans", "crafts", "cultural", "heritage"],
        block: "G"
    };
}

// Recommendation System Class
class RecommendationSystem {
    constructor() {
        this.stallData = stallData;
    }

    // Get recommendations based on stall ID
    getRecommendations(stallId, maxRecommendations = 6) {
        try {
            const currentStall = this.stallData[stallId];
            if (!currentStall) {
                console.warn(`No stall data found for ID: ${stallId}`);
                return [];
            }

        const recommendations = [];
        const currentKeywords = currentStall.keywords;
        const currentCategory = currentStall.category;
        const currentBlock = currentStall.block;

        // Calculate similarity scores for all other stalls
        const scores = [];
        for (const [id, stall] of Object.entries(this.stallData)) {
            if (id === stallId) continue; // Skip current stall

            let score = 0;
            
            // Category match (highest weight)
            if (stall.category === currentCategory) {
                score += 10;
            }
            
            // Block match (medium weight)
            if (stall.block === currentBlock) {
                score += 5;
            }
            
            // Keyword matches (variable weight based on importance)
            const keywordMatches = this.getKeywordMatches(currentKeywords, stall.keywords);
            score += keywordMatches * 3;
            
            // Name similarity (low weight)
            const nameSimilarity = this.getNameSimilarity(currentStall.name, stall.name);
            score += nameSimilarity * 1;

            scores.push({ id, stall, score });
        }

        // Sort by score (highest first) and return top recommendations
        scores.sort((a, b) => b.score - a.score);
        
        return scores.slice(0, maxRecommendations).map(item => ({
            id: item.id,
            name: item.stall.name,
            category: item.stall.category,
            block: item.stall.block,
            score: item.score,
            reason: this.getRecommendationReason(currentStall, item.stall, item.score)
        }));
        } catch (error) {
            console.error('Error getting recommendations:', error);
            return [];
        }
    }

    // Get keyword matches between two sets of keywords
    getKeywordMatches(keywords1, keywords2) {
        try {
            if (!Array.isArray(keywords1) || !Array.isArray(keywords2)) {
                return 0;
            }
            
            const set1 = new Set(keywords1.map(k => k.toLowerCase()));
            const set2 = new Set(keywords2.map(k => k.toLowerCase()));
            
            let matches = 0;
            for (const keyword of set1) {
                if (set2.has(keyword)) {
                    matches++;
                }
            }
            return matches;
        } catch (error) {
            console.error('Error matching keywords:', error);
            return 0;
        }
    }

    // Calculate name similarity
    getNameSimilarity(name1, name2) {
        try {
            if (!name1 || !name2) {
                return 0;
            }
            
            const words1 = name1.toLowerCase().split(/\s+/);
            const words2 = name2.toLowerCase().split(/\s+/);
            
            if (words1.length === 0 || words2.length === 0) {
                return 0;
            }
            
            let commonWords = 0;
            for (const word of words1) {
                if (words2.includes(word)) {
                    commonWords++;
                }
            }
            return commonWords / Math.max(words1.length, words2.length);
        } catch (error) {
            console.error('Error calculating name similarity:', error);
            return 0;
        }
    }

    // Get recommendation reason
    getRecommendationReason(currentStall, recommendedStall, score) {
        const reasons = [];
        
        if (recommendedStall.category === currentStall.category) {
            reasons.push("Same category");
        }
        
        if (recommendedStall.block === currentStall.block) {
            reasons.push("Same block");
        }
        
        const keywordMatches = this.getKeywordMatches(currentStall.keywords, recommendedStall.keywords);
        if (keywordMatches > 0) {
            reasons.push(`${keywordMatches} keyword matches`);
        }
        
        return reasons.join(", ");
    }

    // Get recommendations by category
    getRecommendationsByCategory(category, excludeId = null, maxRecommendations = 6) {
        const categoryStalls = Object.entries(this.stallData)
            .filter(([id, stall]) => stall.category === category && id !== excludeId)
            .map(([id, stall]) => ({
                id,
                name: stall.name,
                category: stall.category,
                block: stall.block,
                reason: `Same category: ${category}`
            }));
        
        return categoryStalls.slice(0, maxRecommendations);
    }

    // Get recommendations by keywords
    getRecommendationsByKeywords(keywords, excludeId = null, maxRecommendations = 6) {
        const scores = [];
        const keywordSet = new Set(keywords.map(k => k.toLowerCase()));
        
        for (const [id, stall] of Object.entries(this.stallData)) {
            if (id === excludeId) continue;
            
            const matches = this.getKeywordMatches(Array.from(keywordSet), stall.keywords);
            if (matches > 0) {
                scores.push({
                    id,
                    name: stall.name,
                    category: stall.category,
                    block: stall.block,
                    score: matches,
                    reason: `${matches} keyword matches`
                });
            }
        }
        
        scores.sort((a, b) => b.score - a.score);
        return scores.slice(0, maxRecommendations);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RecommendationSystem, stallData };
} 