// Personnages Pokémon - JavaScript

// Base de données des personnages
const charactersData = [
    // Protagonistes principaux
    {
        id: 1,
        name: "Sacha Ketchum",
        category: "protagonists",
        region: "kanto",
        description: "Le héros principal de l'anime Pokémon, un dresseur déterminé de Bourg Palette qui rêve de devenir un Maître Pokémon.",
        pokemon: ["Pikachu", "Charizard", "Greninja", "Lucario"],
        image: "images/placeholder-character.png",
        achievements: ["Champion de la Ligue Alola", "Vainqueur du Championnat du Monde"],
        firstAppearance: "Saison 1 - Épisode 1"
    },
    {
        id: 2,
        name: "Red",
        category: "protagonists", 
        region: "kanto",
        description: "Le protagoniste silencieux des jeux Pokémon Rouge/Bleu/Jaune, devenu une légende.",
        pokemon: ["Charizard", "Pikachu", "Venusaur", "Blastoise", "Snorlax", "Lapras"],
        image: "images/placeholder-character.png",
        achievements: ["Champion de Kanto", "Maître du Mont Argenté"],
        firstAppearance: "Pokémon Rouge et Bleu"
    },
    {
        id: 3,
        name: "Ondine",
        category: "gym-leaders",
        region: "kanto", 
        description: "Champion d'Arène d'Azuria, spécialisée dans les Pokémon de type Eau. Également compagne de voyage de Sacha.",
        pokemon: ["Starmie", "Goldeen", "Psyduck", "Politoed"],
        image: "images/placeholder-character.png",
        achievements: ["Champion d'Arène d'Azuria", "Princesse Sirène"],
        firstAppearance: "Saison 1 - Épisode 1"
    },
    {
        id: 4,
        name: "Pierre",
        category: "gym-leaders",
        region: "kanto",
        description: "L'ancien Champion d'Arène d'Argenta, éleveur Pokémon expert et compagnon de Sacha.",
        pokemon: ["Onix", "Crobat", "Forretress", "Steelix"],
        image: "images/placeholder-character.png", 
        achievements: ["Champion d'Arène d'Argenta", "Éleveur Pokémon Expert"],
        firstAppearance: "Saison 1 - Épisode 5"
    },
    {
        id: 5,
        name: "Régis",
        category: "rivals",
        region: "kanto",
        description: "Le rival de Sacha depuis Bourg Palette, petit-fils du Professeur Chen.",
        pokemon: ["Umbreon", "Blastoise", "Arcanine", "Machamp"],
        image: "images/placeholder-character.png",
        achievements: ["Chercheur Pokémon", "Top 32 Ligue Indigo"],
        firstAppearance: "Saison 1 - Épisode 1"
    },
    {
        id: 6,
        name: "Team Rocket (Jessie & James)",
        category: "team-rocket",
        region: "kanto",
        description: "Le duo emblématique de la Team Rocket qui poursuit sans relâche Pikachu.",
        pokemon: ["Arbok", "Weezing", "Wobbuffet", "Meowth"],
        image: "images/placeholder-character.png",
        achievements: ["Agents de la Team Rocket", "Spécialistes en évasion"],
        firstAppearance: "Saison 1 - Épisode 2"
    },
    {
        id: 7,
        name: "Professeur Chen",
        category: "professors",
        region: "kanto",
        description: "Le Professeur Pokémon de Bourg Palette, spécialiste des relations entre humains et Pokémon.",
        pokemon: ["Nombreux Pokémon de recherche"],
        image: "images/placeholder-character.png",
        achievements: ["Professeur Pokémon renommé", "Inventeur du Pokédex"],
        firstAppearance: "Saison 1 - Épisode 1"
    },
    {
        id: 8,
        name: "Flora", 
        category: "protagonists",
        region: "hoenn",
        description: "Coordinatrice Pokémon de Hoenn, experte en Concours Pokémon.",
        pokemon: ["Blaziken", "Beautifly", "Skitty", "Bulbasaur"],
        image: "images/placeholder-character.png",
        achievements: ["Top Coordinatrice", "Finaliste Grand Festival"],
        firstAppearance: "Saison 6 - Advanced Generation"
    },
    {
        id: 9,
        name: "Aurore",
        category: "protagonists", 
        region: "sinnoh",
        description: "Coordinatrice Pokémon de Sinnoh, compagne de Sacha dans la région.",
        pokemon: ["Piplup", "Pachirisu", "Buneary", "Togekiss"],
        image: "images/placeholder-character.png",
        achievements: ["Coordinatrice talentueuse", "Finaliste Grand Festival Sinnoh"],
        firstAppearance: "Saison 10 - Diamond & Pearl"
    },
    {
        id: 10,
        name: "Cynthia",
        category: "champions",
        region: "sinnoh", 
        description: "Maître de la Ligue Pokémon de Sinnoh, l'une des dresseuses les plus puissantes.",
        pokemon: ["Garchomp", "Spiritomb", "Milotic", "Lucario", "Togekiss", "Roserade"],
        image: "images/placeholder-character.png",
        achievements: ["Maître de Sinnoh", "Archéologue", "Championne du monde"],
        firstAppearance: "Diamond & Pearl"
    },
    {
        id: 11,
        name: "N",
        category: "rivals",
        region: "unova",
        description: "Mystérieux dresseur d'Unova capable de comprendre les Pokémon, ancien Roi de la Team Plasma.",
        pokemon: ["Reshiram", "Zekrom", "Zoroark", "Carracosta"],
        image: "images/placeholder-character.png",
        achievements: ["Ancien Roi Team Plasma", "Libérateur de Pokémon"],
        firstAppearance: "Pokémon Noir et Blanc"
    },
    {
        id: 12,
        name: "Iris",
        category: "champions",
        region: "unova",
        description: "Maître de la Ligue d'Unova, spécialisée dans les Pokémon de type Dragon.",
        pokemon: ["Haxorus", "Dragonite", "Excadrill", "Lapras"],
        image: "images/placeholder-character.png",
        achievements: ["Maître d'Unova", "Experte en Dragons", "Championne du Monde"],
        firstAppearance: "Saison 14 - Black & White"
    },
    {
        id: 13,
        name: "Serena",
        category: "protagonists",
        region: "kalos",
        description: "Dresseuse de Kalos passionnée par les performances Pokémon et amie d'enfance de Sacha.",
        pokemon: ["Delcatty", "Pancham", "Braixen", "Sylveon"],
        image: "images/placeholder-character.png",
        achievements: ["Reine de Kalos", "Performeuse Pokémon"],
        firstAppearance: "Saison 17 - XY"
    },
    {
        id: 14,
        name: "Clem",
        category: "gym-leaders",
        region: "kalos",
        description: "Jeune inventeur et Champion d'Arène de Illumina City, spécialiste des types Électrik.",
        pokemon: ["Heliolisk", "Chespin", "Luxray", "Emolga"],
        image: "images/placeholder-character.png",
        achievements: ["Champion d'Arène d'Illumina City", "Inventeur prodige"],
        firstAppearance: "Saison 17 - XY"
    },
    {
        id: 15,
        name: "Eureka",
        category: "companions",
        region: "kalos",
        description: "Petite sœur de Clem, pleine d'énergie et passionnée par les Pokémon mignons.",
        pokemon: ["Dedenne", "Goodra"],
        image: "images/placeholder-character.png",
        achievements: ["Experte en Pokémon mignons", "Future dresseuse"],
        firstAppearance: "Saison 17 - XY"
    },
    {
        id: 16,
        name: "Champion Dianthéa",
        category: "champions",
        region: "kalos",
        description: "Maître de la Ligue de Kalos, également actrice et star de cinéma.",
        pokemon: ["Gardevoir", "Goodra", "Aurorus", "Gourgeist", "Tyrantrum", "Hawlucha"],
        image: "images/placeholder-character.png",
        achievements: ["Maître de Kalos", "Actrice célèbre", "Star de cinéma"],
        firstAppearance: "Pokémon X et Y"
    },
    {
        id: 17,
        name: "Lilie",
        category: "protagonists",
        region: "alola",
        description: "Étudiante de l'École Pokémon d'Alola, timide mais courageuse.",
        pokemon: ["Vulpix d'Alola", "Clefairy"],
        image: "images/placeholder-character.png",
        achievements: ["Étudiante brillante", "Protectrice de Cosmog"],
        firstAppearance: "Saison 20 - Sun & Moon"
    },
    {
        id: 18,
        name: "Kiawe",
        category: "gym-leaders",
        region: "alola",
        description: "Captain des Épreuves d'Alola, spécialisé dans les types Feu.",
        pokemon: ["Marowak d'Alola", "Turtonator", "Charizard"],
        image: "images/placeholder-character.png",
        achievements: ["Captain d'Alola", "Maître du Feu"],
        firstAppearance: "Saison 20 - Sun & Moon"
    },
    {
        id: 19,
        name: "Néphie", 
        category: "gym-leaders",
        region: "alola",
        description: "Captain des Épreuves d'Alola, spécialisée dans les types Eau.",
        pokemon: ["Wishiwashi", "Lapras", "Primarina"],
        image: "images/placeholder-character.png",
        achievements: ["Captain d'Alola", "Experte des océans"],
        firstAppearance: "Saison 20 - Sun & Moon"
    },
    {
        id: 20,
        name: "Barbara",
        category: "gym-leaders",
        region: "alola",
        description: "Captain des Épreuves d'Alola, spécialisée dans les types Plante.",
        pokemon: ["Steenee", "Comfey", "Tsareena"],
        image: "images/placeholder-character.png",
        achievements: ["Captain d'Alola", "Chef cuisinière"],
        firstAppearance: "Saison 20 - Sun & Moon"
    },
    {
        id: 21,
        name: "Chrys",
        category: "gym-leaders",
        region: "alola",
        description: "Captain des Épreuves d'Alola, spécialisé dans les types Électrik.",
        pokemon: ["Charjabug", "Vikavolt", "Togedemaru"],
        image: "images/placeholder-character.png",
        achievements: ["Captain d'Alola", "Expert en technologie"],
        firstAppearance: "Saison 20 - Sun & Moon"
    },
    {
        id: 22,
        name: "Giovanni",
        category: "team-rocket",
        region: "kanto",
        description: "Le chef suprême de la Team Rocket, également Champion d'Arène de Viridian City.",
        pokemon: ["Persian", "Nidoking", "Rhydon", "Mewtwo"],
        image: "images/placeholder-character.png",
        achievements: ["Boss de la Team Rocket", "Champion d'Arène de Viridian"],
        firstAppearance: "Pokémon Rouge et Bleu"
    },
    {
        id: 23,
        name: "Lance",
        category: "elite-four",
        region: "kanto",
        description: "Membre du Conseil des 4 de Kanto et Johto, maître des Dragons.",
        pokemon: ["Dragonite", "Charizard", "Aerodactyl", "Gyarados"],
        image: "images/placeholder-character.png",
        achievements: ["Champion du Conseil des 4", "Maître des Dragons"],
        firstAppearance: "Pokémon Rouge et Bleu"
    },
    {
        id: 24,
        name: "Steven Stone",
        category: "champions",
        region: "hoenn",
        description: "Ancien Maître de la Ligue de Hoenn, collectionneur de pierres rares.",
        pokemon: ["Metagross", "Skarmory", "Aggron", "Cradily", "Armaldo", "Claydol"],
        image: "images/placeholder-character.png",
        achievements: ["Ancien Maître de Hoenn", "Collectionneur de pierres"],
        firstAppearance: "Pokémon Rubis et Saphir"
    },
    {
        id: 25,
        name: "Wallace",
        category: "champions",
        region: "hoenn",
        description: "Maître de la Ligue de Hoenn, artiste des Concours Pokémon.",
        pokemon: ["Milotic", "Gyarados", "Tentacruel", "Ludicolo", "Whiscash", "Seaking"],
        image: "images/placeholder-character.png",
        achievements: ["Maître de Hoenn", "Champion des Concours", "Artiste Pokémon"],
        firstAppearance: "Pokémon Émeraude"
    },
    {
        id: 26,
        name: "Léon",
        category: "champions",
        region: "galar",
        description: "Invaincu Maître de la Ligue de Galar, frère de Tarak.",
        pokemon: ["Charizard", "Aegislash", "Dragapult", "Haxorus", "Seismitoad", "Rillaboom"],
        image: "images/placeholder-character.png",
        achievements: ["Maître invaincu de Galar", "Champion du monde"],
        firstAppearance: "Pokémon Épée et Bouclier"
    },
    {
        id: 27,
        name: "Tarak",
        category: "rivals",
        region: "galar",
        description: "Rival ambitieux de Galar, frère du Champion Léon.",
        pokemon: ["Inteleon", "Corviknight", "Dubwool", "Hatterene"],
        image: "images/placeholder-character.png",
        achievements: ["Assistant du Professeur", "Dresseur prometteur"],
        firstAppearance: "Pokémon Épée et Bouclier"
    },
    {
        id: 28,
        name: "Marnie",
        category: "rivals",
        region: "galar",
        description: "Dresseuse de Galar spécialisée dans les types Ténèbres.",
        pokemon: ["Grimmsnarl", "Liepard", "Scrafty", "Toxapex"],
        image: "images/placeholder-character.png",
        achievements: ["Leader de la Team Yell", "Champion d'Arène de Spikemuth"],
        firstAppearance: "Pokémon Épée et Bouclier"
    },
    {
        id: 29,
        name: "Professeur Magnolia",
        category: "professors",
        region: "galar",
        description: "Professeure Pokémon de Galar, spécialiste du phénomène Dynamax.",
        pokemon: ["Pokémon de recherche variés"],
        image: "images/placeholder-character.png",
        achievements: ["Découvreuse du Dynamax", "Professeure renommée"],
        firstAppearance: "Pokémon Épée et Bouclier"
    },
    {
        id: 30,
        name: "Nemona",
        category: "rivals",
        region: "paldea",
        description: "Présidente du conseil étudiant de l'Académie de Paldea, championne passionnée.",
        pokemon: ["Lycanroc", "Goodra de Paldea", "Altaria", "Pawmot"],
        image: "images/placeholder-character.png",
        achievements: ["Présidente du conseil étudiant", "Championne de Paldea"],
        firstAppearance: "Pokémon Écarlate et Violet"
    }
];

// Variables globales
let filteredCharacters = [...charactersData];
let currentCharacter = null;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    renderCharacters();
    setupEventListeners();
});

// Configuration des événements
function setupEventListeners() {
    const categoryFilter = document.getElementById('categoryFilter');
    const regionFilter = document.getElementById('regionFilter');
    const searchInput = document.getElementById('searchInput');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterCharacters);
    }
    
    if (regionFilter) {
        regionFilter.addEventListener('change', filterCharacters);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterCharacters);
    }

    // Fermer modal en cliquant en dehors
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('characterModal');
        if (event.target === modal) {
            closeCharacterModal();
        }
    });
}

// Filtrage des personnages
function filterCharacters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const regionFilter = document.getElementById('regionFilter');
    const searchInput = document.getElementById('searchInput');
    
    const category = categoryFilter ? categoryFilter.value : 'all';
    const region = regionFilter ? regionFilter.value : 'all';
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    filteredCharacters = charactersData.filter(character => {
        const matchesCategory = category === 'all' || character.category === category;
        const matchesRegion = region === 'all' || character.region === region;
        const matchesSearch = character.name.toLowerCase().includes(searchTerm) ||
                            character.description.toLowerCase().includes(searchTerm);
        
        return matchesCategory && matchesRegion && matchesSearch;
    });

    renderCharacters();
}

// Rendu des personnages
function renderCharacters() {
    const grid = document.getElementById('charactersGrid');
    if (!grid) return;

    if (filteredCharacters.length === 0) {
        grid.innerHTML = '<div class="no-results">Aucun personnage trouvé</div>';
        return;
    }

    grid.innerHTML = filteredCharacters.map(character => `
        <div class="character-card" onclick="showCharacterDetails(${character.id})">
            <div class="character-image">
                <img src="${character.image}" alt="${character.name}" 
                     onerror="this.src='images/placeholder-character.png'">
            </div>
            <div class="character-info">
                <h3>${character.name}</h3>
                <div class="character-category">${getCategoryName(character.category)}</div>
                <div class="character-region">${getRegionName(character.region)}</div>
                <p class="character-description">${character.description.substring(0, 100)}...</p>
                <div class="character-pokemon">
                    <strong>Pokémon emblématiques:</strong>
                    <span>${character.pokemon.slice(0, 3).join(', ')}${character.pokemon.length > 3 ? '...' : ''}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Affichage des détails d'un personnage
function showCharacterDetails(id) {
    currentCharacter = charactersData.find(character => character.id === id);
    if (!currentCharacter) return;

    const modal = document.getElementById('characterModal');
    const details = document.getElementById('characterDetails');
    
    if (!modal || !details) return;

    details.innerHTML = `
        <div class="character-details">
            <div class="character-header">
                <img src="${currentCharacter.image}" alt="${currentCharacter.name}" 
                     onerror="this.src='images/placeholder-character.png'">
                <div class="character-title">
                    <h2>${currentCharacter.name}</h2>
                    <div class="character-badges">
                        <span class="badge category-badge">${getCategoryName(currentCharacter.category)}</span>
                        <span class="badge region-badge">${getRegionName(currentCharacter.region)}</span>
                    </div>
                </div>
            </div>
            
            <div class="character-content">
                <div class="character-description">
                    <h3>Description</h3>
                    <p>${currentCharacter.description}</p>
                </div>
                
                <div class="character-pokemon-list">
                    <h3>Pokémon</h3>
                    <div class="pokemon-grid">
                        ${currentCharacter.pokemon.map(pokemon => `
                            <div class="pokemon-item">${pokemon}</div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="character-achievements">
                    <h3>Réalisations</h3>
                    <ul>
                        ${currentCharacter.achievements.map(achievement => `
                            <li>${achievement}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="character-meta">
                    <h3>Informations</h3>
                    <p><strong>Première apparition:</strong> ${currentCharacter.firstAppearance}</p>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fermeture du modal
function closeCharacterModal() {
    const modal = document.getElementById('characterModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Utilitaires
function getCategoryName(category) {
    const categories = {
        'protagonists': 'Protagoniste',
        'rivals': 'Rival',
        'gym-leaders': 'Champion d\'Arène',
        'elite-four': 'Conseil des 4',
        'champions': 'Maître',
        'team-rocket': 'Team Rocket',
        'professors': 'Professeur',
        'companions': 'Compagnon'
    };
    return categories[category] || category;
}

function getRegionName(region) {
    const regions = {
        'kanto': 'Kanto',
        'johto': 'Johto', 
        'hoenn': 'Hoenn',
        'sinnoh': 'Sinnoh',
        'unova': 'Unova',
        'kalos': 'Kalos',
        'alola': 'Alola',
        'galar': 'Galar',
        'paldea': 'Paldea'
    };
    return regions[region] || region;
}

// Gestion des erreurs d'images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'images/placeholder-character.png';
    }
}, true);
