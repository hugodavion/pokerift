// PokeRift - Pokédex Interactif JavaScript
// Gestion complète du Pokédex avec recherche, filtres et détails

class PokedexManager {
    constructor() {
        this.pokemonList = [];
        this.filteredPokemon = [];
        this.currentPokemon = null;
        this.isLoading = false;
        this.generationRanges = {
            1: { start: 1, end: 151 },
            2: { start: 152, end: 251 },
            3: { start: 252, end: 386 },
            4: { start: 387, end: 493 },
            5: { start: 494, end: 649 },
            6: { start: 650, end: 721 },
            7: { start: 722, end: 809 },
            8: { start: 810, end: 905 },
            9: { start: 906, end: 1010 }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialPokemon();
    }

    setupEventListeners() {
        // Recherche
        const searchInput = document.getElementById('pokedex-search');
        const searchBtn = document.getElementById('search-pokemon-btn');
        const randomBtn = document.getElementById('random-pokemon-btn');

        if (searchInput) {
            searchInput.addEventListener('input', this.debounce(() => this.handleSearch(), 300));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleSearch();
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.handleSearch());
        }

        if (randomBtn) {
            randomBtn.addEventListener('click', () => this.showRandomPokemon());
        }

        // Filtres
        const generationFilter = document.getElementById('generation-filter');
        const typeFilter = document.getElementById('type-filter');
        const clearFiltersBtn = document.getElementById('clear-filters-btn');

        if (generationFilter) {
            generationFilter.addEventListener('change', () => this.applyFilters());
        }

        if (typeFilter) {
            typeFilter.addEventListener('change', () => this.applyFilters());
        }

        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => this.clearFilters());
        }

        // Modal
        const modal = document.getElementById('pokemon-modal');
        const closeModal = document.querySelector('.close-modal');

        if (closeModal) {
            closeModal.addEventListener('click', () => this.closeModal());
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal();
            });
        }

        // Échapper pour fermer le modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            } else if (e.key === 'ArrowLeft' && this.currentPokemon) {
                // Flèche gauche - Pokémon précédent
                this.navigatePokemon(this.currentPokemon.id - 1);
            } else if (e.key === 'ArrowRight' && this.currentPokemon) {
                // Flèche droite - Pokémon suivant
                this.navigatePokemon(this.currentPokemon.id + 1);
            }
        });
    }

    async loadInitialPokemon() {
        try {
            this.showLoading();
            // Charger les premiers Pokémon (Gen 1) pour commencer
            await this.loadPokemonBatch(1, 151);
            this.applyFilters();
            this.hideLoading();
            
            // Charger les autres générations en arrière-plan
            this.loadRemainingPokemon();
        } catch (error) {
            console.error('Erreur lors du chargement initial:', error);
            this.showError('Erreur lors du chargement des Pokémon');
        }
    }

    async loadRemainingPokemon() {
        try {
            // Charger les générations 2-9 progressivement
            for (let gen = 2; gen <= 9; gen++) {
                const range = this.generationRanges[gen];
                await this.loadPokemonBatch(range.start, range.end);
                // Mettre à jour l'affichage si des filtres sont actifs
                if (this.shouldUpdateDisplay()) {
                    this.applyFilters();
                }
            }
        } catch (error) {
            console.error('Erreur lors du chargement complémentaire:', error);
        }
    }

    shouldUpdateDisplay() {
        const generationFilter = document.getElementById('generation-filter');
        const typeFilter = document.getElementById('type-filter');
        return generationFilter?.value || typeFilter?.value;
    }

    async loadPokemonBatch(start, end) {
        const promises = [];
        
        for (let i = start; i <= end; i++) {
            promises.push(this.fetchPokemonData(i));
        }

        const results = await Promise.all(promises);
        const validPokemon = results.filter(pokemon => pokemon !== null);
        
        this.pokemonList.push(...validPokemon);
        this.pokemonList.sort((a, b) => a.id - b.id);
    }

    async fetchPokemonData(id) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const pokemon = await response.json();

            return {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types.map(t => t.type.name),
                sprite: pokemon.sprites.other['official-artwork']?.front_default || 
                       pokemon.sprites.front_default,
                height: pokemon.height,
                weight: pokemon.weight,
                stats: pokemon.stats.map(s => ({
                    name: s.stat.name,
                    value: s.base_stat
                })),
                abilities: pokemon.abilities.map(a => ({
                    name: a.ability.name,
                    isHidden: a.is_hidden
                })),
                generation: this.getGeneration(pokemon.id)
            };
        } catch (error) {
            console.error(`Erreur pour le Pokémon ${id}:`, error);
            return null;
        }
    }

    getGeneration(pokemonId) {
        for (const [gen, range] of Object.entries(this.generationRanges)) {
            if (pokemonId >= range.start && pokemonId <= range.end) {
                return parseInt(gen);
            }
        }
        return 1;
    }

    handleSearch() {
        const searchInput = document.getElementById('pokedex-search');
        if (!searchInput) return;

        const query = searchInput.value.trim().toLowerCase();
        
        if (query === '') {
            this.applyFilters();
            return;
        }

        this.filteredPokemon = this.pokemonList.filter(pokemon => {
            const nameMatch = pokemon.name.toLowerCase().includes(query);
            const idMatch = pokemon.id.toString() === query;
            return nameMatch || idMatch;
        });

        this.displayPokemon();
    }

    async showRandomPokemon() {
        if (this.pokemonList.length === 0) return;
        
        const randomPokemon = this.pokemonList[Math.floor(Math.random() * this.pokemonList.length)];
        this.showPokemonModal(randomPokemon);
    }

    applyFilters() {
        const generationFilter = document.getElementById('generation-filter');
        const typeFilter = document.getElementById('type-filter');

        let filtered = [...this.pokemonList];

        if (generationFilter && generationFilter.value) {
            const selectedGen = parseInt(generationFilter.value);
            const range = this.generationRanges[selectedGen];
            if (range) {
                filtered = filtered.filter(pokemon => 
                    pokemon.id >= range.start && pokemon.id <= range.end
                );
            }
        }

        if (typeFilter && typeFilter.value) {
            const selectedType = typeFilter.value;
            filtered = filtered.filter(pokemon => 
                pokemon.types.includes(selectedType)
            );
        }

        this.filteredPokemon = filtered;
        this.displayPokemon();
    }

    clearFilters() {
        const generationFilter = document.getElementById('generation-filter');
        const typeFilter = document.getElementById('type-filter');
        const searchInput = document.getElementById('pokedex-search');

        if (generationFilter) generationFilter.value = '';
        if (typeFilter) typeFilter.value = '';
        if (searchInput) searchInput.value = '';

        this.filteredPokemon = [...this.pokemonList];
        this.displayPokemon();
    }

    displayPokemon() {
        const grid = document.getElementById('pokemon-grid');
        if (!grid) return;

        if (this.filteredPokemon.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">Recherche</div>
                    <h3>Aucun Pokémon trouvé</h3>
                    <p>Essayez de modifier vos critères de recherche</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.filteredPokemon
            .slice(0, 100) // Limiter à 100 pour les performances
            .map(pokemon => this.createPokemonCard(pokemon))
            .join('');
        
        // Ajouter les event listeners pour les cartes
        this.addCardEventListeners();
    }

    addCardEventListeners() {
        const cards = document.querySelectorAll('.pokemon-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const pokemonId = parseInt(card.dataset.pokemonId);
                const pokemon = this.pokemonList.find(p => p.id === pokemonId);
                if (pokemon) {
                    this.showPokemonModal(pokemon);
                }
            });
        });
    }

    createPokemonCard(pokemon) {
        const typesBadges = pokemon.types.map(type => 
            `<span class="type-badge type-${type}">${this.translateType(type)}</span>`
        ).join('');

        return `
            <div class="pokemon-card" data-pokemon-id="${pokemon.id}">
                <div class="pokemon-number">#${pokemon.id.toString().padStart(3, '0')}</div>
                <div class="pokemon-image-container">
                    <img src="${pokemon.sprite}" alt="${pokemon.name}" class="pokemon-image" loading="lazy">
                </div>
                <h3 class="pokemon-name">${this.formatPokemonName(pokemon.name)}</h3>
                <div class="pokemon-types">${typesBadges}</div>
            </div>
        `;
    }

    showPokemonModal(pokemon) {
        this.currentPokemon = pokemon;
        const modal = document.getElementById('pokemon-modal');
        const modalContent = document.getElementById('modal-pokemon-details');

        if (!modal || !modalContent) return;

        modalContent.innerHTML = this.createModalContent(pokemon);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Charger la chaîne d'évolution après l'affichage du modal
        this.loadEvolutionChain(pokemon.id);
        
        // Ajouter les événements de swipe pour mobile
        this.addSwipeEvents(modal);
    }

    addSwipeEvents(modal) {
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;

        const handleStart = (e) => {
            startX = e.touches ? e.touches[0].clientX : e.clientX;
            startY = e.touches ? e.touches[0].clientY : e.clientY;
        };

        const handleMove = (e) => {
            if (!startX || !startY) return;
            currentX = e.touches ? e.touches[0].clientX : e.clientX;
            currentY = e.touches ? e.touches[0].clientY : e.clientY;
        };

        const handleEnd = (e) => {
            if (!startX || !startY) return;

            const diffX = currentX - startX;
            const diffY = currentY - startY;

            // Vérifier si le swipe est horizontal et suffisamment long
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe vers la droite - Pokémon précédent
                    this.navigatePokemon(this.currentPokemon.id - 1);
                } else {
                    // Swipe vers la gauche - Pokémon suivant
                    this.navigatePokemon(this.currentPokemon.id + 1);
                }
            }

            startX = 0;
            startY = 0;
            currentX = 0;
            currentY = 0;
        };

        // Ajouter les événements
        modal.addEventListener('touchstart', handleStart, { passive: true });
        modal.addEventListener('touchmove', handleMove, { passive: true });
        modal.addEventListener('touchend', handleEnd, { passive: true });

        // Support souris pour desktop
        modal.addEventListener('mousedown', handleStart);
        modal.addEventListener('mousemove', handleMove);
        modal.addEventListener('mouseup', handleEnd);
    }

    navigatePokemon(pokemonId) {
        const pokemon = this.pokemonList.find(p => p.id === pokemonId);
        if (pokemon) {
            this.showPokemonModal(pokemon);
        }
    }

    async loadEvolutionChain(pokemonId) {
        try {
            const evolutionContainer = document.getElementById(`evolution-chain-${pokemonId}`);
            if (!evolutionContainer) return;

            // Récupérer les données d'espèce pour obtenir l'URL de la chaîne d'évolution
            const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
            const speciesData = await speciesResponse.json();
            
            // Récupérer la chaîne d'évolution
            const evolutionResponse = await fetch(speciesData.evolution_chain.url);
            const evolutionData = await evolutionResponse.json();
            
            // Construire la chaîne d'évolution
            const evolutionChain = this.buildEvolutionChain(evolutionData.chain);
            
            // Afficher la chaîne d'évolution
            evolutionContainer.innerHTML = await this.renderEvolutionChain(evolutionChain);
            
        } catch (error) {
            console.error('Erreur lors du chargement de la chaîne d\'évolution:', error);
            const evolutionContainer = document.getElementById(`evolution-chain-${pokemonId}`);
            if (evolutionContainer) {
                evolutionContainer.innerHTML = '<div class="evolution-loading">❌ Chaîne d\'évolution non disponible</div>';
            }
        }
    }

    buildEvolutionChain(chain) {
        const evolutions = [];
        
        const addEvolution = (evolutionData) => {
            const pokemonId = evolutionData.species.url.split('/').slice(-2, -1)[0];
            evolutions.push({
                id: parseInt(pokemonId),
                name: evolutionData.species.name,
                minLevel: evolutionData.evolution_details.length > 0 ? evolutionData.evolution_details[0].min_level : null
            });
            
            if (evolutionData.evolves_to.length > 0) {
                evolutionData.evolves_to.forEach(evolution => addEvolution(evolution));
            }
        };
        
        addEvolution(chain);
        return evolutions;
    }

    async renderEvolutionChain(evolutionChain) {
        if (evolutionChain.length <= 1) {
            return '<div class="evolution-loading">❌ Ce Pokémon n\'a pas d\'évolution</div>';
        }

        const evolutionElements = [];
        
        for (let i = 0; i < evolutionChain.length; i++) {
            const evolution = evolutionChain[i];
            const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`;
            
            evolutionElements.push(`
                <div class="evolution-pokemon" onclick="pokedexManager.navigatePokemon(${evolution.id})">
                    <img src="${sprite}" alt="${evolution.name}" loading="lazy">
                    <div class="name">${this.formatPokemonName(evolution.name)}</div>
                    ${evolution.minLevel ? `<div class="level">Niv. ${evolution.minLevel}</div>` : ''}
                </div>
            `);
            
            if (i < evolutionChain.length - 1) {
                evolutionElements.push('<div class="evolution-arrow">→</div>');
            }
        }
        
        return evolutionElements.join('');
    }

    createModalContent(pokemon) {
        const typesBadges = pokemon.types.map(type => 
            `<span class="type-badge type-${type}">${this.translateType(type)}</span>`
        ).join('');

        const abilitiesList = pokemon.abilities.map(ability => 
            `<div class="ability-item ${ability.isHidden ? 'hidden' : ''}">
                <strong>${this.formatPokemonName(ability.name)}</strong>
                ${ability.isHidden ? ' (Capacité Cachée)' : ''}
            </div>`
        ).join('');

        const statsHtml = pokemon.stats.map(stat => {
            const percentage = Math.min((stat.value / 200) * 100, 100);
            return `
                <div class="stat-bar">
                    <div class="stat-info">
                        <span class="stat-name">${this.translateStat(stat.name)}</span>
                        <span class="stat-value">${stat.value}</span>
                    </div>
                    <div class="stat-progress">
                        <div class="stat-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }).join('');

        // Navigation entre Pokémon
        const prevPokemon = this.pokemonList.find(p => p.id === pokemon.id - 1);
        const nextPokemon = this.pokemonList.find(p => p.id === pokemon.id + 1);

        return `
            <div class="pokemon-detail-header">
                <div class="pokemon-navigation">
                    <button class="nav-btn ${!prevPokemon ? 'disabled' : ''}" 
                            onclick="pokedexManager.navigatePokemon(${pokemon.id - 1})" 
                            ${!prevPokemon ? 'disabled' : ''}>
                        ← ${prevPokemon ? this.formatPokemonName(prevPokemon.name) : 'Début'}
                    </button>
                    <h2>${this.formatPokemonName(pokemon.name)} 
                        <span style="color: rgba(255,107,53,0.7); font-size: 1.2rem;">#${pokemon.id.toString().padStart(3, '0')}</span>
                    </h2>
                    <button class="nav-btn ${!nextPokemon ? 'disabled' : ''}" 
                            onclick="pokedexManager.navigatePokemon(${pokemon.id + 1})" 
                            ${!nextPokemon ? 'disabled' : ''}>
                        ${nextPokemon ? this.formatPokemonName(nextPokemon.name) : 'Fin'} →
                    </button>
                </div>
            </div>
            
            <div class="pokemon-detail-content">
                <div class="left-column">
                    <div class="pokemon-artwork">
                        <img src="${pokemon.sprite}" alt="${pokemon.name}" loading="lazy">
                    </div>
                    
                    <div class="pokemon-basic-info">
                        <h3 style="text-align: center; color: #FF6B35; margin-bottom: 20px; font-size: 1.4rem;">Informations Générales</h3>
                        
                        <div class="info-row">
                            <strong>Types:</strong>
                            <div class="pokemon-types">${typesBadges}</div>
                        </div>
                        
                        <div class="info-row">
                            <strong>Taille:</strong>
                            <span class="info-value">${pokemon.height / 10} m</span>
                        </div>
                        
                        <div class="info-row">
                            <strong>Poids:</strong>
                            <span class="info-value">${pokemon.weight / 10} kg</span>
                        </div>
                        
                        <div class="info-row">
                            <strong>Génération:</strong>
                            <span class="info-value">${pokemon.generation}</span>
                        </div>
                    </div>
                </div>
                
                <div class="right-column">
                    <div class="pokemon-abilities">
                        <h3 style="text-align: center; color: #00A8CC; margin-bottom: 20px; font-size: 1.4rem;">Capacités</h3>
                        ${abilitiesList}
                    </div>
                    
                    <div class="pokemon-evolution">
                        <h3 style="text-align: center; color: #7BB026; margin-bottom: 25px; font-size: 1.4rem;">Chaîne d'Évolution</h3>
                        <div class="evolution-chain" id="evolution-chain-${pokemon.id}">
                            <div class="evolution-loading">⏳ Chargement de la chaîne d'évolution...</div>
                        </div>
                    </div>
                    
                    <div class="pokemon-stats">
                        <h3 style="text-align: center; color: #764ba2; margin-bottom: 25px; font-size: 1.4rem;">Statistiques de Base</h3>
                        <div class="stats-horizontal">
                            ${statsHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    closeModal() {
        const modal = document.getElementById('pokemon-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    showLoading() {
        const grid = document.getElementById('pokemon-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="loading-pokemon">
                    <div class="loading-spinner"></div>
                    <p>Chargement du Pokédex...</p>
                </div>
            `;
        }
    }

    hideLoading() {
        // La fonction displayPokemon() remplacera automatiquement le contenu de chargement
    }

    showError(message) {
        const grid = document.getElementById('pokemon-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="error-message">
                    <h3>Erreur</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="retry-btn">Réessayer</button>
                </div>
            `;
        }
    }

    formatPokemonName(name) {
        return name.split('-').map(part => 
            part.charAt(0).toUpperCase() + part.slice(1)
        ).join('-');
    }

    translateType(type) {
        const translations = {
            normal: 'Normal',
            fire: 'Feu',
            water: 'Eau',
            electric: 'Électrik',
            grass: 'Plante',
            ice: 'Glace',
            fighting: 'Combat',
            poison: 'Poison',
            ground: 'Sol',
            flying: 'Vol',
            psychic: 'Psy',
            bug: 'Insecte',
            rock: 'Roche',
            ghost: 'Spectre',
            dragon: 'Dragon',
            dark: 'Ténèbres',
            steel: 'Acier',
            fairy: 'Fée'
        };
        return translations[type] || type;
    }

    translateStat(stat) {
        const translations = {
            hp: 'PV',
            attack: 'Attaque',
            defense: 'Défense',
            'special-attack': 'Att. Spé.',
            'special-defense': 'Déf. Spé.',
            speed: 'Vitesse'
        };
        return translations[stat] || stat;
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialisation du Pokédex
let pokedexManager;

document.addEventListener('DOMContentLoaded', () => {
    pokedexManager = new PokedexManager();
});

// Fonction pour le menu mobile
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (sidebar && toggle) {
        sidebar.classList.toggle('mobile-open');
        toggle.classList.toggle('active');
    }
}
