/* ===========================================
   LORE PAGE INTERACTIVE FUNCTIONS
   =========================================== */

// État global de la page lore
let currentMedium = 'anime';
let currentRegion = 'kanto';

// Données détaillées pour les modales et le contenu interactif
const loreData = {
    anime: {
        'ho-oh': {
            title: 'Ho-Oh, l\'Oiseau Légendaire',
            description: 'Ho-Oh est un Pokémon légendaire de type Feu et Vol. Il est considéré comme le gardien des cieux et possède le pouvoir de ressusciter les morts. Selon la légende, ceux qui aperçoivent Ho-Oh sont destinés à devenir de grands dresseurs Pokémon.',
            abilities: ['Pression', 'Régé-Force (capacité cachée)'],
            signature_move: 'Feu Sacré',
            first_appearance: 'Épisode 1 - Départ à Bourg Palette',
            trivia: [
                'Premier Pokémon légendaire aperçu dans l\'anime',
                'A créé Raikou, Entei et Suicune après l\'incendie de la Tour Ferraille',
                'Ses plumes auraient des pouvoirs de guérison'
            ]
        },
        'mew': {
            title: 'Mew, l\'Ancêtre de tous les Pokémon',
            description: 'Mew est considéré comme l\'ancêtre génétique de tous les Pokémon. Ce Pokémon mythique de type Psy est extrêmement rare et possède la capacité d\'apprendre toutes les capacités existantes.',
            abilities: ['Synchro'],
            signature_move: 'Métamorphose',
            first_appearance: 'Film Pokémon - Mewtwo contre-attaque',
            trivia: [
                'ADN utilisé pour créer Mewtwo',
                'Peut devenir invisible à volonté',
                'Ne se montre qu\'aux personnes au cœur pur'
            ]
        },
        'legendary-beasts': {
            title: 'Les Bêtes Légendaires',
            description: 'Raikou, Entei et Suicune sont nés de la résurrection par Ho-Oh de trois Pokémon ordinaires morts dans l\'incendie de la Tour Ferraille.',
            types: ['Électrik', 'Feu', 'Eau'],
            origin: 'Résurrection par Ho-Oh',
            first_appearance: 'Saison Johto',
            trivia: [
                'Créés à partir des cendres de la Tour Ferraille',
                'Parcourent le monde en quête d\'un dresseur digne',
                'Représentent les forces de la nature déchaînée'
            ]
        },
        'lugia': {
            title: 'Lugia, Gardien des Mers',
            description: 'Lugia est le leader des oiseaux légendaires et vit dans les profondeurs marines. Ses ailes peuvent provoquer des tempêtes de 40 jours.',
            abilities: ['Pression', 'Multiécaille (capacité cachée)'],
            signature_move: 'Aéroblast',
            first_appearance: 'Film Pokémon 2000',
            trivia: [
                'Commande Artikodin, Électhor et Sulfura',
                'Peut calmer les tempêtes d\'un battement d\'ailes',
                'Protecteur de l\'équilibre naturel'
            ]
        }
    },
    games: {
        'arceus': {
            title: 'Arceus, le Dieu Originel',
            description: 'Arceus est le Pokémon Créateur, né d\'un œuf dans le néant. Il a créé l\'univers entier et tous les autres Pokémon légendaires. Son corps est composé de 1000 bras qui lui permettent de façonner la réalité.',
            abilities: ['Multitype'],
            signature_move: 'Jugement',
            first_appearance: 'Pokémon Diamant et Perle',
            trivia: [
                'Créateur de Dialga, Palkia et Giratina',
                'Peut changer de type avec les Plaques',
                'Considéré comme le plus puissant de tous les Pokémon'
            ]
        },
        'creation-trio': {
            title: 'Le Trio de la Création',
            description: 'Dialga contrôle le temps, Palkia maîtrise l\'espace, et Giratina règne sur l\'antimatière depuis la Dimension Inverse.',
            members: ['Dialga', 'Palkia', 'Giratina'],
            powers: ['Temps', 'Espace', 'Antimatière'],
            first_appearance: 'Pokémon Diamant/Perle/Platine',
            trivia: [
                'Créés directement par Arceus',
                'Leurs combats menacent l\'équilibre universel',
                'Giratina fut banni pour sa violence'
            ]
        },
        'lake-trio': {
            title: 'Le Trio des Lacs',
            description: 'Crébus, Créfollet et Créhelf représentent l\'intelligence, les émotions et la volonté. Ils ont aidé à calmer Dialga et Palkia.',
            members: ['Crébus', 'Créfollet', 'Créhelf'],
            aspects: ['Sagesse', 'Émotion', 'Volonté'],
            locations: ['Lac Vérité', 'Lac Courage', 'Lac Sagesse'],
            trivia: [
                'Gardiens de l\'esprit humain et Pokémon',
                'Peuvent calmer les légendaires en furie',
                'Essentiels à l\'équilibre psychique du monde'
            ]
        },
        'unova-dragons': {
            title: 'Les Dragons d\'Unys',
            description: 'Reshiram, Zekrom et Kyurem étaient autrefois un seul dragon, séparé par le conflit entre deux héros frères.',
            members: ['Reshiram', 'Zekrom', 'Kyurem'],
            concepts: ['Vérité', 'Idéal', 'Vide'],
            origin: 'Division du Dragon Originel',
            trivia: [
                'Kyurem conserve la coquille vide du dragon originel',
                'Peuvent fusionner temporairement',
                'Leur réunification restaurerait le dragon ultime'
            ]
        }
    },
    manga: {
        'pokedex-holders': {
            title: 'Les Détenteurs de Pokédex',
            description: 'Dans le manga Pokémon Adventures, les Détenteurs de Pokédex sont des dresseurs spéciaux choisis par les professeurs Pokémon. Ils sont destinés à affronter les plus grandes menaces qui pèsent sur le monde.',
            members: ['Red', 'Blue', 'Green', 'Yellow', 'Gold', 'Silver', 'Crystal', 'Ruby', 'Sapphire', 'Emerald'],
            mission: 'Compléter le Pokédex et protéger le monde',
            first_appearance: 'Pokémon Adventures - Volume 1',
            trivia: [
                'Seuls quelques élus reçoivent un Pokédex',
                'Forment des équipes pour affronter les crises',
                'Possèdent des liens spéciaux avec leurs Pokémon'
            ]
        },
        'team-rocket-manga': {
            title: 'La Team Rocket Originelle',
            description: 'Version sombre de l\'organisation criminelle avec des expériences interdites et des conséquences durables.',
            leader: 'Giovanni',
            activities: ['Expériences sur Pokémon', 'Création de zombies Pokémon', 'Contrôle de légendaires'],
            first_appearance: 'Pokémon Adventures - Arc Kanto',
            trivia: [
                'Beaucoup plus violente que dans l\'anime',
                'Responsable de traumatismes durables',
                'Expériences avec la résurrection Pokémon'
            ]
        },
        'yellow-powers': {
            title: 'Yellow, la Guérisseuse',
            description: 'Yellow possède des pouvoirs uniques de guérison et d\'empathie avec les Pokémon, particulièrement les types Électrik.',
            abilities: ['Guérison par contact', 'Lecture d\'émotions', 'Transfert d\'énergie électrique'],
            pokemon: 'Pikachu de Red (évolution réversible)',
            first_appearance: 'Pokémon Adventures - Arc Yellow',
            trivia: [
                'Peut faire évoluer et régresser son Pikachu',
                'Liens psychiques avec les Pokémon Électrik',
                'Héritière des pouvoirs de Red'
            ]
        },
        'hoenn-orbs': {
            title: 'L\'Orbe Rouge et l\'Orbe Bleu',
            description: 'Artefacts ancestraux permettant de contrôler Kyogre et Groudon, mais corrompant leurs utilisateurs.',
            artifacts: ['Orbe Rouge (Groudon)', 'Orbe Bleu (Kyogre)'],
            corruption: 'Transforme l\'utilisateur physiquement et mentalement',
            arc: 'Ruby & Sapphire',
            trivia: [
                'Convoités par les Teams Aqua et Magma',
                'Fusion physique avec l\'utilisateur',
                'Menace de catastrophe mondiale'
            ]
        },
        'distortion-masks': {
            title: 'Les Masques de la Distorsion',
            description: 'Artifacts anciens connectant à Giratina et révélant les secrets de la création du monde.',
            function: 'Accès à la Dimension Inverse',
            revelation: 'Vérités sur les intentions d\'Arceus',
            arc: 'Platine',
            trivia: [
                'Communication directe avec Giratina',
                'Révèlent l\'histoire cachée de la création',
                'Clés de la Dimension Inverse'
            ]
        }
    },
    regions: {
        'kanto': {
            title: 'Kanto, Berceau de l\'Aventure',
            description: 'Première région explorée, riche en laboratoires secrets et légendes des oiseaux.',
            legendary_sites: ['Grotte Azurée', 'Îles Écume', 'Centrale Électrique'],
            professor: 'Professeur Chen',
            connection: 'Mont Argent vers Johto',
            trivia: [
                'Lieu de création de Mewtwo',
                'Habitats des trois oiseaux légendaires',
                'Premier laboratoire Pokémon officiel'
            ]
        },
        'johto': {
            title: 'Johto, Terre des Traditions',
            description: 'Région mystique imprégnée de spiritualité avec ses tours sacrées et les mystères des Zarbi.',
            sacred_sites: ['Tour Ferraille/Carillon', 'Tour Argentée', 'Ruines d\'Alpha'],
            mysteries: ['Alphabet Zarbi', 'Liens avec Arceus', 'Messages temporels'],
            professor: 'Professeur Orme',
            trivia: [
                'Communication avec Arceus via les Zarbi',
                'Résidence de Ho-Oh et Lugia',
                'Portails vers d\'autres dimensions'
            ]
        },
        'hoenn': {
            title: 'Hoenn, Continent d\'Équilibre',
            description: 'Région façonnée par le conflit éternel entre les titans primordiaux de la terre et de la mer.',
            titans: ['Kyogre (Océans)', 'Groudon (Continents)', 'Rayquaza (Ciel)'],
            sacred_sites: ['Pilier Céleste', 'Grotte Origine', 'Caverne Granite'],
            balance: 'Nature vs Technologie',
            trivia: [
                'Création par combat titanesque',
                'Météorites et phénomènes cosmiques',
                'Équilibre climatique fragile'
            ]
        },
        'sinnoh': {
            title: 'Sinnoh, Centre de la Création',
            description: 'Point de création de l\'univers, gardienne des plus grands secrets cosmiques et origine de toute existence.',
            creation_sites: ['Mont Couronné', 'Salle Originelle', 'Colonnes Lances'],
            cosmic_role: 'Centre de l\'univers créé par Arceus',
            professor: 'Professeur Sorbier',
            trivia: [
                'Lieu de naissance de l\'univers',
                'Convergence temps/espace/antimatière',
                'Gardiens de l\'esprit dans les lacs'
            ]
        },
        'unova': {
            title: 'Unys, Terre des Idéaux',
            description: 'Région marquée par la guerre entre deux héros et leurs dragons, symbole du conflit entre vérité et idéal.',
            ancient_war: 'Conflit entre les héros frères',
            dragons: ['Reshiram (Vérité)', 'Zekrom (Idéal)', 'Kyurem (Vide)'],
            scars: 'Château Royal d\'Unys en ruines',
            trivia: [
                'Division du Dragon Originel',
                'Cicatrices de guerre encore visibles',
                'Dualité philosophique incarnée'
            ]
        },
        'kalos': {
            title: 'Kalos, Région de la Beauté',
            description: 'Terre marquée par l\'utilisation de l\'Arme Suprême, berceau de la Méga-Évolution et de l\'équilibre vital.',
            ancient_weapon: 'Arme Suprême destructrice',
            life_death: ['Xerneas (Vie)', 'Yveltal (Destruction)', 'Zygarde (Équilibre)'],
            innovation: 'Berceau de la Méga-Évolution',
            trivia: [
                'Guerre ancienne et reconstruction',
                'Pierres-O mystérieuses',
                'Surveillance écologique de Zygarde'
            ]
        }
    }
};

// Fonction d'initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeLorePage();
});

// Initialisation de la page lore
function initializeLorePage() {
    // Afficher le médium par défaut
    showMedium('anime');
    
    // Afficher la région par défaut pour la section régions
    showRegionLore('kanto');
    
    // Ajouter des effets visuels
    initializeVisualEffects();
    
    console.log('Page Lore initialisée');
}

// Fonction pour afficher un médium spécifique
function showMedium(medium) {
    // Cacher tous les médiums
    const allMediums = document.querySelectorAll('.lore-medium');
    allMediums.forEach(med => {
        med.style.display = 'none';
    });
    
    // Afficher le médium sélectionné
    const selectedMedium = document.getElementById(`${medium}-lore`);
    if (selectedMedium) {
        selectedMedium.style.display = 'block';
        selectedMedium.style.animation = 'fadeInUp 0.6s ease-out';
    }
    
    // Mettre à jour les boutons
    updateMediumButtons(medium);
    
    // Mettre à jour l'état global
    currentMedium = medium;
    
    console.log(`Médium changé vers: ${medium}`);
}

// Mettre à jour l'état des boutons de médium
function updateMediumButtons(activeMedium) {
    const buttons = document.querySelectorAll('.medium-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.medium === activeMedium) {
            btn.classList.add('active');
        }
    });
}

// Fonction pour afficher le lore d'une région spécifique
function showRegionLore(region) {
    // Cacher toutes les régions
    const allRegions = document.querySelectorAll('.region-lore');
    allRegions.forEach(reg => {
        reg.style.display = 'none';
    });
    
    // Afficher la région sélectionnée
    const selectedRegion = document.getElementById(`${region}-lore`);
    if (selectedRegion) {
        selectedRegion.style.display = 'block';
        selectedRegion.style.animation = 'slideInRight 0.5s ease-out';
    }
    
    // Mettre à jour les boutons de région
    updateRegionButtons(region);
    
    // Mettre à jour l'état global
    currentRegion = region;
    
    console.log(`Région changée vers: ${region}`);
}

// Mettre à jour l'état des boutons de région
function updateRegionButtons(activeRegion) {
    const buttons = document.querySelectorAll('.region-nav-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.region === activeRegion) {
            btn.classList.add('active');
        }
    });
}

// Fonction pour rechercher dans le lore
function searchLore(query) {
    if (!query || query.trim() === '') {
        // Réafficher tout le contenu
        showAllLoreContent();
        return;
    }
    
    const searchTerm = query.toLowerCase().trim();
    const loreCards = document.querySelectorAll('.lore-card');
    let hasResults = false;
    
    loreCards.forEach(card => {
        const content = card.textContent.toLowerCase();
        const cardParent = card.closest('.lore-medium');
        
        if (content.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'highlightMatch 0.8s ease-out';
            hasResults = true;
            
            // Afficher le médium parent
            if (cardParent) {
                cardParent.style.display = 'block';
            }
        } else {
            card.style.display = 'none';
        }
    });
    
    // Afficher un message si aucun résultat
    if (!hasResults) {
        showNoResultsMessage();
    }
}

// Afficher tout le contenu lore
function showAllLoreContent() {
    const loreCards = document.querySelectorAll('.lore-card');
    loreCards.forEach(card => {
        card.style.display = 'block';
        card.style.animation = 'none';
    });
    
    // Réafficher le médium actuel
    showMedium(currentMedium);
    
    // Supprimer le message "aucun résultat"
    removeNoResultsMessage();
}

// Afficher un message "aucun résultat"
function showNoResultsMessage() {
    removeNoResultsMessage(); // Supprimer le précédent si il existe
    
    const container = document.querySelector('.lore-container');
    const noResultsDiv = document.createElement('div');
    noResultsDiv.className = 'no-results-message';
    noResultsDiv.innerHTML = `
        <div class="no-results-content">
            <div class="no-results-icon">Recherche</div>
            <h3>Aucun résultat trouvé</h3>
            <p>Essayez avec d'autres mots-clés ou explorez les différentes sections.</p>
        </div>
    `;
    container.appendChild(noResultsDiv);
}

// Supprimer le message "aucun résultat"
function removeNoResultsMessage() {
    const noResultsMessage = document.querySelector('.no-results-message');
    if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

// Fonction pour filtrer par type de contenu
function filterByType(type) {
    const allCards = document.querySelectorAll('.lore-card');
    
    allCards.forEach(card => {
        const badges = card.querySelectorAll('.lore-badge');
        let hasType = false;
        
        badges.forEach(badge => {
            if (badge.textContent.toLowerCase().includes(type.toLowerCase())) {
                hasType = true;
            }
        });
        
        if (type === 'all' || hasType) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Fonction pour naviguer vers une section spécifique
function navigateToSection(medium, section) {
    showMedium(medium);
    
    setTimeout(() => {
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // Effet de surbrillance temporaire
            targetSection.style.animation = 'highlightSection 2s ease-out';
        }
    }, 300);
}

// Initialiser les effets visuels
function initializeVisualEffects() {
    // Effet de parallaxe pour les runes flottantes
    initializeParallaxEffect();
    
    // Effet de hover pour les cartes lore
    initializeLoreCardHover();
    
    // Animation d'apparition progressive
    initializeScrollAnimations();
}

// Effet de parallaxe
function initializeParallaxEffect() {
    const runes = document.querySelectorAll('.floating-rune');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        runes.forEach((rune, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrollY * speed);
            rune.style.transform = `translateY(${yPos}px) rotate(${scrollY * 0.1}deg)`;
        });
    });
}

// Effet hover pour les cartes lore
function initializeLoreCardHover() {
    const loreCards = document.querySelectorAll('.lore-card');
    
    loreCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Animations au scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s ease-out';
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments animables
    const animatableElements = document.querySelectorAll('.lore-card, .timeline-item, .lore-group');
    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Fonction utilitaire pour débugger
function debugLorePage() {
    console.log('État actuel de la page Lore:');
    console.log('- Médium actuel:', currentMedium);
    console.log('- Région actuelle:', currentRegion);
    console.log('- Nombre de cartes lore visibles:', document.querySelectorAll('.lore-card:not([style*="display: none"])').length);
}

// Fonction pour exporter les données de lore (pour développement)
function exportLoreData() {
    const exportData = {
        current_state: {
            medium: currentMedium,
            region: currentRegion
        },
        visible_cards: document.querySelectorAll('.lore-card:not([style*="display: none"])').length,
        lore_data: loreData
    };
    
    console.log('Données Lore exportées:', exportData);
    return exportData;
}

// Ajout des styles CSS pour les animations
const additionalStyles = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes highlightMatch {
        0% { box-shadow: 0 0 0 rgba(251, 191, 36, 0); }
        50% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.8); }
        100% { box-shadow: 0 0 0 rgba(251, 191, 36, 0); }
    }
    
    @keyframes highlightSection {
        0% { background-color: rgba(251, 191, 36, 0); }
        25% { background-color: rgba(251, 191, 36, 0.2); }
        100% { background-color: rgba(251, 191, 36, 0); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .no-results-message {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--lore-light);
    }
    
    .no-results-content {
        max-width: 400px;
        margin: 0 auto;
    }
    
    .no-results-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        opacity: 0.6;
    }
    
    .no-results-message h3 {
        color: var(--lore-accent);
        margin-bottom: 1rem;
    }
    
    .no-results-message p {
        opacity: 0.8;
        line-height: 1.6;
    }
`;

// Injecter les styles additionnels
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ============================================
// FONCTIONS AVANCÉES POUR LA PAGE LORE
// ============================================

// Fonction pour créer des effets de particules thématiques
function createThematicParticles(medium) {
    const container = document.querySelector('.lore-container');
    if (!container) return;
    
    // Nettoyer les particules existantes
    clearExistingParticles();
    
    switch(medium) {
        case 'anime':
            createAnimeSparkles();
            break;
        case 'games':
            createGamePixels();
            break;
        case 'manga':
            createMangaEffect();
            break;
        case 'regions':
            createMapParticles();
            break;
    }
}

// Créer des étincelles pour le thème anime
function createAnimeSparkles() {
    const sparkleCount = 6;
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'anime-sparkle floating-effect';
        sparkle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #ff6b35, #ffd700);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: sparkle-float ${3 + Math.random() * 2}s linear infinite;
        `;
        document.body.appendChild(sparkle);
        
        // Auto-suppression
        setTimeout(() => sparkle.remove(), 5000);
    }
}

// Créer des pixels pour le thème jeux
function createGamePixels() {
    const pixelCount = 8;
    for (let i = 0; i < pixelCount; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'game-pixel floating-effect';
        pixel.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: #00a8cc;
            pointer-events: none;
            z-index: 100;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: pixel-drift ${4 + Math.random() * 2}s ease-in-out infinite;
        `;
        document.body.appendChild(pixel);
        
        setTimeout(() => pixel.remove(), 6000);
    }
}

// Créer des effets de manga (lignes de vitesse)
function createMangaEffect() {
    const lineCount = 5;
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'manga-line floating-effect';
        line.style.cssText = `
            position: fixed;
            width: 2px;
            height: 40px;
            background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.2), transparent);
            pointer-events: none;
            z-index: 100;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            transform: rotate(${Math.random() * 30 - 15}deg);
            animation: manga-speed ${2 + Math.random()}s linear infinite;
        `;
        document.body.appendChild(line);
        
        setTimeout(() => line.remove(), 3000);
    }
}

// Créer des particules de carte pour le thème régions
function createMapParticles() {
    const particleCount = 4;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'map-particle floating-effect';
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, var(--couleur3), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: map-float ${5 + Math.random() * 3}s ease-in-out infinite;
        `;
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 8000);
    }
}

// Nettoyer les particules existantes
function clearExistingParticles() {
    const existingParticles = document.querySelectorAll('.floating-effect');
    existingParticles.forEach(particle => particle.remove());
}

// Fonction pour créer un modal de détails
function createLoreModal(cardData) {
    // Supprimer le modal existant s'il y en a un
    const existingModal = document.querySelector('.lore-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'lore-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        backdrop-filter: blur(10px);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: modal-fade-in 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'lore-modal-content';
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #778DA9, #8FA6C3);
        border-radius: 20px;
        padding: 40px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        animation: modal-slide-up 0.4s ease;
        box-shadow: 0 25px 60px rgba(0,0,0,0.3);
    `;
    
    modalContent.innerHTML = `
        <button class="modal-close" style="
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 24px;
            color: #666;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        ">&times;</button>
        <div class="modal-header">
            <h2 style="color: var(--couleur2); margin-bottom: 20px;">${cardData.title}</h2>
            <p style="color: #666; font-size: 1.1rem; line-height: 1.6;">${cardData.description}</p>
        </div>
        <div class="modal-body">
            ${cardData.details || ''}
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Événements de fermeture
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    modalContent.querySelector('.modal-close').addEventListener('click', closeModal);
    
    // Fermeture avec Escape
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
    
    function closeModal() {
        modal.style.animation = 'modal-fade-out 0.3s ease forwards';
        setTimeout(() => modal.remove(), 300);
    }
}

// Fonction pour ajouter des interactions aux cartes
function enhanceLoreCards() {
    const loreCards = document.querySelectorAll('.lore-card');
    
    loreCards.forEach((card, index) => {
        // Effet de survol parallaxe
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
        
        // Clic pour afficher les détails
        card.addEventListener('click', () => {
            const title = card.querySelector('h4')?.textContent || 'Détails';
            const description = card.querySelector('.lore-description')?.textContent || 'Aucune description disponible.';
            
            createLoreModal({
                title: title,
                description: description,
                details: generateCardDetails(card)
            });
            
            // Effet de clic
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
}

// Générer des détails pour une carte
function generateCardDetails(card) {
    const badges = card.querySelectorAll('.lore-badge');
    let details = '';
    
    if (badges.length > 0) {
        details += '<div class="modal-badges" style="margin-top: 20px;">';
        badges.forEach(badge => {
            details += `<span style="
                background: var(--couleur3);
                color: var(--couleur2);
                padding: 6px 12px;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 600;
                margin: 4px;
                display: inline-block;
            ">${badge.textContent}</span>`;
        });
        details += '</div>';
    }
    
    return details;
}

// Fonction pour le scrolling fluide vers les sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Effet de surbrillance
        section.style.animation = 'highlight-section 2s ease-out';
    }
}

// Fonction de recherche avancée
function advancedSearch(query, filters = {}) {
    const searchTerm = query.toLowerCase().trim();
    const loreCards = document.querySelectorAll('.lore-card');
    let results = [];
    
    loreCards.forEach(card => {
        const content = card.textContent.toLowerCase();
        const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.lore-description')?.textContent.toLowerCase() || '';
        
        let matches = false;
        
        // Recherche dans le contenu
        if (content.includes(searchTerm) || title.includes(searchTerm) || description.includes(searchTerm)) {
            matches = true;
        }
        
        // Application des filtres
        if (filters.medium && !card.closest(`#${filters.medium}-lore`)) {
            matches = false;
        }
        
        if (filters.type) {
            const badges = card.querySelectorAll('.lore-badge');
            let hasType = false;
            badges.forEach(badge => {
                if (badge.textContent.toLowerCase().includes(filters.type.toLowerCase())) {
                    hasType = true;
                }
            });
            if (!hasType) matches = false;
        }
        
        if (matches) {
            results.push(card);
            card.style.display = 'block';
            
            // Effet de surbrillance pour les résultats
            card.style.animation = 'search-highlight 1s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
    
    return results;
}

// Fonction pour exporter le contenu lore en JSON
function exportLoreContent() {
    const loreContent = {};
    const mediums = ['anime', 'games', 'manga', 'regions'];
    
    mediums.forEach(medium => {
        loreContent[medium] = [];
        const mediumSection = document.getElementById(`${medium}-lore`);
        
        if (mediumSection) {
            const cards = mediumSection.querySelectorAll('.lore-card');
            cards.forEach(card => {
                const title = card.querySelector('h4')?.textContent || '';
                const summary = card.querySelector('.lore-summary')?.textContent || '';
                const description = card.querySelector('.lore-description')?.textContent || '';
                const badges = Array.from(card.querySelectorAll('.lore-badge')).map(badge => badge.textContent);
                
                loreContent[medium].push({
                    title,
                    summary,
                    description,
                    badges
                });
            });
        }
    });
    
    console.log('Contenu Lore exporté:', loreContent);
    return loreContent;
}

// Améliorer l'initialisation avec les nouvelles fonctionnalités
const originalInitialize = initializeLorePage;
initializeLorePage = function() {
    originalInitialize();
    
    // Ajouter les nouvelles fonctionnalités
    enhanceLoreCards();
    
    // Créer des particules pour le medium par défaut
    setTimeout(() => {
        createThematicParticles(currentMedium);
    }, 1000);
    
    // Mettre à jour les particules quand on change de medium
    const originalShowMedium = showMedium;
    window.showMedium = function(medium) {
        originalShowMedium(medium);
        
        // Créer des particules thématiques après un court délai
        setTimeout(() => {
            createThematicParticles(medium);
        }, 500);
    };
};

// Styles CSS additionnels pour les nouvelles fonctionnalités
const newStyles = `
    @keyframes sparkle-float {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
        50% { transform: translateY(-30px) rotate(180deg); opacity: 1; }
        100% { transform: translateY(-60px) rotate(360deg); opacity: 0; }
    }
    
    @keyframes pixel-drift {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-20px) scale(1.2); }
    }
    
    @keyframes manga-speed {
        0% { transform: translateX(-50px) rotate(var(--rotation, 0deg)); opacity: 0; }
        50% { opacity: 0.6; }
        100% { transform: translateX(50px) rotate(var(--rotation, 0deg)); opacity: 0; }
    }
    
    @keyframes map-float {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(15px, -10px) scale(1.1); }
        50% { transform: translate(-10px, -15px) scale(0.9); }
        75% { transform: translate(-15px, 10px) scale(1.05); }
    }
    
    @keyframes modal-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes modal-fade-out {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes modal-slide-up {
        from { transform: translateY(50px) scale(0.9); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
    }
    
    @keyframes search-highlight {
        0%, 100% { box-shadow: 0 0 0 rgba(255, 204, 0, 0); }
        50% { box-shadow: 0 0 25px rgba(255, 204, 0, 0.8); }
    }
    
    @keyframes highlight-section {
        0%, 100% { background-color: transparent; }
        50% { background-color: rgba(255, 204, 0, 0.1); }
    }
    
    .modal-close:hover {
        background: #ff6b6b !important;
        color: white !important;
        transform: scale(1.1) !important;
    }
    
    .lore-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .lore-card:hover {
        box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    }
`;

// Ajouter les nouveaux styles
const newStyleSheet = document.createElement('style');
newStyleSheet.textContent = newStyles;
document.head.appendChild(newStyleSheet);

console.log('Lore page enhanced with advanced features!');

// ============================================
// NOUVELLES FONCTIONS POUR LES SECTIONS ÉTENDUES
// ============================================

// Fonction pour créer des modals détaillés avec les nouvelles données
function createDetailedLoreModal(category, itemKey) {
    const itemData = loreData[category]?.[itemKey];
    if (!itemData) return;
    
    // Supprimer le modal existant
    const existingModal = document.querySelector('.lore-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'lore-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.85);
        backdrop-filter: blur(15px);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: modal-fade-in 0.4s ease;
        padding: 20px;
        box-sizing: border-box;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'lore-modal-content';
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #778DA9, #8FA6C3);
        border-radius: 25px;
        padding: 40px;
        max-width: 700px;
        max-height: 85vh;
        overflow-y: auto;
        position: relative;
        animation: modal-slide-up 0.5s ease;
        box-shadow: 0 30px 80px rgba(0,0,0,0.4);
        border: 2px solid rgba(255,215,0,0.3);
    `;
    
    // Générer le contenu détaillé selon le type
    let detailedContent = generateDetailedContent(itemData, category);
    
    modalContent.innerHTML = `
        <button class="modal-close" style="
            position: absolute;
            top: 20px;
            right: 25px;
            background: none;
            border: none;
            font-size: 28px;
            color: #666;
            cursor: pointer;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        ">&times;</button>
        
        <div class="modal-header" style="margin-bottom: 30px;">
            <h2 style="color: var(--couleur2); margin-bottom: 15px; font-size: 2.2rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                ${itemData.title}
            </h2>
            <p style="color: white; font-size: 1.1rem; line-height: 1.7; opacity: 0.95;">
                ${itemData.description}
            </p>
        </div>
        
        <div class="modal-body">
            ${detailedContent}
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Événements de fermeture
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    modalContent.querySelector('.modal-close').addEventListener('click', closeModal);
    
    // Fermeture avec Escape
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
    
    function closeModal() {
        modal.style.animation = 'modal-fade-out 0.3s ease forwards';
        setTimeout(() => modal.remove(), 300);
    }
}

// Générer le contenu détaillé selon la catégorie
function generateDetailedContent(itemData, category) {
    let content = '';
    
    // Section des capacités/propriétés spéciales
    if (itemData.abilities || itemData.powers || itemData.aspects) {
        content += `
            <div style="margin-bottom: 25px; padding: 20px; background: rgba(255,215,0,0.1); border-radius: 15px; border-left: 4px solid var(--couleur2);">
                <h4 style="color: var(--couleur2); margin-bottom: 15px; font-size: 1.3rem;">
                    ${category === 'anime' ? 'Capacités Spéciales' : 
                      category === 'games' ? 'Pouvoirs Cosmiques' : 
                      category === 'manga' ? 'Compétences Uniques' : 'Propriétés Mystiques'}
                </h4>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${(itemData.abilities || itemData.powers || itemData.aspects || []).map(ability => 
                        `<span style="background: linear-gradient(135deg, var(--couleur3), #5a7194); color: white; padding: 8px 15px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">${ability}</span>`
                    ).join('')}
                </div>
            </div>
        `;
    }
    
    // Section des membres/éléments
    if (itemData.members || itemData.artifacts || itemData.types) {
        const elements = itemData.members || itemData.artifacts || itemData.types;
        content += `
            <div style="margin-bottom: 25px; padding: 20px; background: rgba(119,141,169,0.3); border-radius: 15px;">
                <h4 style="color: var(--couleur2); margin-bottom: 15px; font-size: 1.3rem;">
                    ${itemData.members ? 'Membres' : itemData.artifacts ? 'Artefacts' : 'Types'}
                </h4>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${elements.map(element => 
                        `<li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: white; font-weight: 500;">• ${element}</li>`
                    ).join('')}
                </ul>
            </div>
        `;
    }
    
    // Section localisation/première apparition
    if (itemData.first_appearance || itemData.arc || itemData.locations) {
        const location = itemData.first_appearance || itemData.arc || (itemData.locations ? itemData.locations.join(', ') : '');
        content += `
            <div style="margin-bottom: 25px; padding: 20px; background: rgba(65,90,119,0.3); border-radius: 15px;">
                <h4 style="color: var(--couleur2); margin-bottom: 10px; font-size: 1.2rem;">
                    ${itemData.first_appearance ? 'Première Apparition' : 
                      itemData.arc ? 'Arc Narratif' : 'Localisations'}
                </h4>
                <p style="color: white; margin: 0; font-style: italic; font-size: 1rem;">${location}</p>
            </div>
        `;
    }
    
    // Section trivia/faits intéressants
    if (itemData.trivia && itemData.trivia.length > 0) {
        content += `
            <div style="margin-bottom: 20px; padding: 20px; background: rgba(255,215,0,0.05); border-radius: 15px; border: 1px solid rgba(255,215,0,0.2);">
                <h4 style="color: var(--couleur2); margin-bottom: 15px; font-size: 1.3rem;">Faits Intéressants</h4>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${itemData.trivia.map(fact => 
                        `<li style="padding: 10px 0; color: white; line-height: 1.6; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <span style="color: var(--couleur2); margin-right: 8px;">▸</span>${fact}
                         </li>`
                    ).join('')}
                </ul>
            </div>
        `;
    }
    
    // Section spéciale selon la catégorie
    if (category === 'games' && itemData.signature_move) {
        content += `
            <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(65,90,119,0.2)); border-radius: 15px;">
                <h4 style="color: var(--couleur2); margin-bottom: 10px;">Attaque Signature</h4>
                <p style="color: white; font-size: 1.2rem; font-weight: 600; margin: 0;">${itemData.signature_move}</p>
            </div>
        `;
    }
    
    return content;
}

// Fonction pour améliorer l'interaction avec les cartes existantes
function enhanceExistingLoreCards() {
    const loreCards = document.querySelectorAll('.lore-card');
    
    loreCards.forEach((card, index) => {
        // Ajouter un effet de parallaxe 3D amélioré
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
        
        // Améliorer l'interaction de clic
        card.addEventListener('click', (e) => {
            // Identifier la catégorie et l'élément
            const mediumSection = card.closest('.lore-medium');
            let category = 'anime'; // par défaut
            
            if (mediumSection) {
                if (mediumSection.id === 'games-lore') category = 'games';
                else if (mediumSection.id === 'manga-lore') category = 'manga';
                else if (mediumSection.id === 'regions-lore') category = 'regions';
            }
            
            // Générer une clé basée sur le titre
            const title = card.querySelector('h4')?.textContent || '';
            const itemKey = generateItemKey(title);
            
            // Créer le modal détaillé si les données existent
            if (loreData[category] && loreData[category][itemKey]) {
                createDetailedLoreModal(category, itemKey);
            } else {
                // Fallback vers l'ancien modal
                const description = card.querySelector('.lore-description')?.textContent || 'Aucune description disponible.';
                createLoreModal({
                    title: title,
                    description: description,
                    details: generateCardDetails(card)
                });
            }
            
            // Effet de clic amélioré
            card.style.transform = 'perspective(1000px) scale(0.95) translateZ(-10px)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
}

// Générer une clé d'identification pour les données
function generateItemKey(title) {
    return title.toLowerCase()
        .replace(/[éèêë]/g, 'e')
        .replace(/[àâä]/g, 'a')
        .replace(/[îï]/g, 'i')
        .replace(/[ôö]/g, 'o')
        .replace(/[ùûü]/g, 'u')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

// Fonction pour créer des animations de transition entre médiums
function createMediumTransitionEffect(newMedium) {
    // Créer des particules thématiques pendant la transition
    const particleCount = 12;
    const container = document.querySelector('.lore-container');
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--lore-secondary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1500;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: transition-particle 2s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        // Auto-suppression
        setTimeout(() => particle.remove(), 2000);
    }
    
    // Mettre à jour le titre avec animation
    setTimeout(() => {
        const titles = {
            anime: 'Univers de l\'Anime Pokémon',
            games: 'Mythologie des Jeux Pokémon',
            manga: 'Univers des Manga Pokémon',
            regions: 'Mythologie des Régions'
        };
        
        const sectionTitle = document.querySelector(`#${newMedium}-lore h2`);
        if (sectionTitle) {
            sectionTitle.style.animation = 'title-glow 1s ease-out';
            setTimeout(() => {
                sectionTitle.style.animation = '';
            }, 1000);
        }
    }, 300);
}

// Améliorer la fonction showMedium existante
const originalShowMedium = window.showMedium;
window.showMedium = function(medium) {
    // Appeler la fonction originale
    if (originalShowMedium) {
        originalShowMedium(medium);
    } else {
        // Implémentation de base si la fonction n'existe pas
        document.querySelectorAll('.lore-medium').forEach(med => {
            med.style.display = 'none';
        });
        
        const selectedMedium = document.getElementById(`${medium}-lore`);
        if (selectedMedium) {
            selectedMedium.style.display = 'block';
            selectedMedium.style.animation = 'fadeInUp 0.6s ease-out';
        }
        
        updateMediumButtons(medium);
        currentMedium = medium;
    }
    
    // Ajouter les effets de transition
    createMediumTransitionEffect(medium);
    
    // Créer des particules thématiques
    setTimeout(() => {
        createThematicParticles(medium);
    }, 500);
    
    // Améliorer les cartes après changement de medium
    setTimeout(() => {
        enhanceExistingLoreCards();
    }, 700);
};

// Fonction pour ajouter des effets de scroll révélateurs
function initializeScrollRevealEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                // Ajouter un délai progressif pour les cartes dans la même grille
                const cards = entry.target.parentElement?.querySelectorAll('.lore-card');
                if (cards) {
                    Array.from(cards).forEach((card, index) => {
                        if (card === entry.target) {
                            card.style.transitionDelay = `${index * 0.1}s`;
                        }
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observer toutes les cartes lore
    document.querySelectorAll('.lore-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        revealObserver.observe(card);
    });
}

// Styles CSS additionnels pour les nouvelles animations
const enhancedStyles = `
    @keyframes transition-particle {
        0% { 
            transform: scale(0) rotate(0deg); 
            opacity: 1; 
        }
        50% { 
            transform: scale(1.5) rotate(180deg); 
            opacity: 0.8; 
        }
        100% { 
            transform: scale(0) rotate(360deg); 
            opacity: 0; 
        }
    }
    
    @keyframes title-glow {
        0%, 100% { 
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1); 
        }
        50% { 
            text-shadow: 
                0 0 20px rgba(255,215,0,0.8),
                0 0 40px rgba(255,215,0,0.6),
                2px 2px 4px rgba(0,0,0,0.3); 
        }
    }
    
    .lore-card {
        transform-style: preserve-3d;
        will-change: transform;
    }
    
    .lore-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
            rgba(255,215,0,0) 0%, 
            rgba(255,215,0,0.1) 50%, 
            rgba(255,215,0,0) 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        border-radius: 25px;
    }
    
    .lore-card:hover::after {
        opacity: 1;
    }
    
    .modal-close:hover {
        background: rgba(255,107,107,0.2) !important;
        color: #ff6b6b !important;
        transform: scale(1.2) rotate(90deg) !important;
    }
    
    /* Amélioration responsive pour les modals */
    @media (max-width: 768px) {
        .lore-modal-content {
            margin: 20px !important;
            padding: 30px !important;
            max-height: 90vh !important;
        }
    }
    
    @media (max-width: 480px) {
        .lore-modal-content {
            margin: 10px !important;
            padding: 20px !important;
            border-radius: 20px !important;
        }
    }
`;

// Injecter les styles améliorés
const enhancedStyleSheet = document.createElement('style');
enhancedStyleSheet.textContent = enhancedStyles;
document.head.appendChild(enhancedStyleSheet);

// Initialisation améliorée lors du chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Attendre un court délai pour que tout soit chargé
    setTimeout(() => {
        enhanceExistingLoreCards();
        initializeScrollRevealEffects();
    }, 500);
});

console.log('Lore page fully enhanced with advanced interactive features!');
