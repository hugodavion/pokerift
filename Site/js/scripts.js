// PokeRift - Scripts principaux avec intégration PokeAPI
// Constantes pour l'API
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/';

// Classe utilitaire pour PokeAPI
class PokeAPIService {
    static async fetchPokemon(idOrName) {
        try {
            // Convertir en string au cas où ce serait un nombre
            const query = String(idOrName).toLowerCase();
            const response = await fetch(`${POKEAPI_BASE_URL}pokemon/${query}`);
            if (!response.ok) throw new Error('Pokémon non trouvé');
            return await response.json();
        } catch (error) {
            console.error('Erreur lors de la récupération du Pokémon:', error);
            return null;
        }
    }

    static async fetchRandomPokemon() {
        const randomId = Math.floor(Math.random() * 1010) + 1; // Gen 1-9
        return await this.fetchPokemon(randomId);
    }

    static async fetchPokemonSpecies(id) {
        try {
            const response = await fetch(`${POKEAPI_BASE_URL}pokemon-species/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Erreur species:', error);
            return null;
        }
    }

    static getOfficialArtwork(pokemon) {
        try {
            return pokemon.sprites?.other?.['official-artwork']?.front_default || 
                   pokemon.sprites?.front_default ||
                   'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'; // Pikachu par défaut
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'artwork:', error);
            return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
        }
    }

    static formatPokemonName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    static getTypeColor(type) {
        const typeColors = {
            normal: '#A8A878', fighting: '#C03028', flying: '#A890F0',
            poison: '#A040A0', ground: '#E0C068', rock: '#B8A038',
            bug: '#A8B820', ghost: '#705898', steel: '#B8B8D0',
            fire: '#F08030', water: '#6890F0', grass: '#78C850',
            electric: '#F8D030', psychic: '#F85888', ice: '#98D8D8',
            dragon: '#7038F8', dark: '#705848', fairy: '#EE99AC'
        };
        return typeColors[type] || '#68A090';
    }
}

// Pokémon du jour
class PokemonOfTheDay {
    constructor() {
        this.init();
    }

    async init() {
        const container = document.getElementById('pokemon-of-day');
        if (!container) return;

        // Afficher un loader pendant le chargement
        container.innerHTML = `
            <div class="loading">
                <div class="pokeball-loading">*</div>
                <p>Chargement du Pokémon du jour...</p>
            </div>
        `;

        try {
            const pokemon = await PokeAPIService.fetchRandomPokemon();
            if (pokemon) {
                this.displayPokemon(pokemon);
            } else {
                this.displayError(container);
            }
        } catch (error) {
            console.error('Erreur lors du chargement du Pokémon du jour:', error);
            this.displayError(container);
        }
    }

    displayError(container) {
        container.innerHTML = `
            <div class="error">
                <p>Impossible de charger le Pokémon du jour</p>
                <button onclick="location.reload()" class="retry-btn">Réessayer</button>
            </div>
        `;
    }

    displayPokemon(pokemon) {
        const container = document.getElementById('pokemon-of-day');
        if (!container) return;

        const artwork = PokeAPIService.getOfficialArtwork(pokemon);
        const types = pokemon.types.map(t => t.type.name).join(', ');
        
        container.innerHTML = `
            <div class="pokemon-card" onclick="pokemonModal.showPokemonModal(${JSON.stringify(pokemon).replace(/"/g, '&quot;')})">
                <img src="${artwork}" alt="${pokemon.name}" class="pokemon-image">
                <div class="pokemon-info">
                    <h3>${PokeAPIService.formatPokemonName(pokemon.name)}</h3>
                    <p class="pokemon-number">#${pokemon.id.toString().padStart(3, '0')}</p>
                    <div class="pokemon-types">
                        ${pokemon.types.map(type => 
                            `<span class="type-badge" style="background-color: ${PokeAPIService.getTypeColor(type.type.name)}">${type.type.name}</span>`
                        ).join('')}
                    </div>
                    <p class="pokemon-stats">Taille: ${pokemon.height/10}m | Poids: ${pokemon.weight/10}kg</p>
                </div>
            </div>
        `;
    }
}

// Recherche de Pokémon
class PokemonSearch {
    constructor() {
        this.setupSearch();
    }

    setupSearch() {
        const searchInput = document.getElementById('pokemon-search');
        const searchBtn = document.getElementById('search-btn');
        
        if (searchInput && searchBtn) {
            searchBtn.addEventListener('click', () => this.searchPokemon());
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.searchPokemon();
            });
        }
    }

    async searchPokemon() {
        const searchInput = document.getElementById('pokemon-search');
        const resultsContainer = document.getElementById('search-results');
        
        if (!searchInput || !resultsContainer) return;

        const query = searchInput.value.trim();
        if (!query) {
            resultsContainer.innerHTML = '<div class="error">Veuillez entrer un nom ou numéro de Pokémon</div>';
            return;
        }

        resultsContainer.innerHTML = `
            <div class="loading">
                <div class="pokeball-loading">*</div>
                <p>Recherche en cours...</p>
            </div>
        `;

        try {
            const pokemon = await PokeAPIService.fetchPokemon(query);
            
            if (pokemon) {
                this.displaySearchResult(pokemon, resultsContainer);
            } else {
                resultsContainer.innerHTML = `
                    <div class="error">
                        <p>Pokémon "${query}" non trouvé</p>
                        <p><small>Essayez avec un nom ou numéro différent</small></p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            resultsContainer.innerHTML = `
                <div class="error">
                    <p>Erreur lors de la recherche</p>
                    <button onclick="this.parentElement.parentElement.querySelector('#search-btn').click()" class="retry-btn">Réessayer</button>
                </div>
            `;
        }
    }

    displaySearchResult(pokemon, container) {
        const artwork = PokeAPIService.getOfficialArtwork(pokemon);
        
        container.innerHTML = `
            <div class="search-result-card" onclick="pokemonModal.showPokemonModal(${JSON.stringify(pokemon).replace(/"/g, '&quot;')})">
                <img src="${artwork}" alt="${pokemon.name}">
                <div class="result-info">
                    <h4>${PokeAPIService.formatPokemonName(pokemon.name)}</h4>
                    <p>#${pokemon.id.toString().padStart(3, '0')}</p>
                    <div class="result-types">
                        ${pokemon.types.map(type => 
                            `<span class="type-badge" style="background-color: ${PokeAPIService.getTypeColor(type.type.name)}">${type.type.name}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}

// Carousel amélioré
class CarouselManager {
    constructor() {
        this.currentIndex = 0;
        this.items = document.querySelectorAll('.carousel-item');
        this.setupCarousel();
    }

    setupCarousel() {
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => this.previous());
            nextBtn.addEventListener('click', () => this.next());
        }

        // Auto-carousel
        setInterval(() => this.next(), 5000);
    }

    next() {
        if (this.items.length === 0) return;
        this.items[this.currentIndex].classList.remove('active');
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.items[this.currentIndex].classList.add('active');
    }

    previous() {
        if (this.items.length === 0) return;
        this.items[this.currentIndex].classList.remove('active');
    }
}

// Gestion du modal Pokémon
class PokemonModal {
    constructor() {
        this.setupModalEventListeners();
    }

    setupModalEventListeners() {
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
            if (e.key === 'Escape') this.closeModal();
        });
    }

    async showPokemonModal(pokemon) {
        const modal = document.getElementById('pokemon-modal');
        const modalContent = document.getElementById('modal-pokemon-details');

        if (!modal || !modalContent) return;

        // Enrichir les données du Pokémon si nécessaire
        const enrichedPokemon = await this.enrichPokemonData(pokemon);

        modalContent.innerHTML = this.createModalContent(enrichedPokemon);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Charger la chaîne d'évolution après l'affichage du modal
        this.loadEvolutionChain(enrichedPokemon.id);
    }

    async enrichPokemonData(pokemon) {
        // Si les données sont déjà complètes, les retourner
        if (pokemon.stats && pokemon.abilities) {
            return {
                ...pokemon,
                generation: this.getGeneration(pokemon.id)
            };
        }

        // Sinon, charger les données complètes
        try {
            const fullPokemon = await PokeAPIService.fetchPokemon(pokemon.id);
            const species = await PokeAPIService.fetchPokemonSpecies(pokemon.id);

            return {
                id: fullPokemon.id,
                name: fullPokemon.name,
                types: fullPokemon.types.map(t => t.type.name),
                sprite: PokeAPIService.getOfficialArtwork(fullPokemon),
                height: fullPokemon.height,
                weight: fullPokemon.weight,
                stats: fullPokemon.stats.map(s => ({
                    name: s.stat.name,
                    value: s.base_stat
                })),
                abilities: fullPokemon.abilities.map(a => ({
                    name: a.ability.name,
                    isHidden: a.is_hidden
                })),
                species: species,
                generation: this.getGeneration(fullPokemon.id)
            };
        } catch (error) {
            console.error('Erreur lors de l\'enrichissement des données:', error);
            return pokemon;
        }
    }

    getGeneration(pokemonId) {
        const generationRanges = {
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

        for (const [gen, range] of Object.entries(generationRanges)) {
            if (pokemonId >= range.start && pokemonId <= range.end) {
                return parseInt(gen);
            }
        }
        return 1; // Par défaut
    }

    createModalContent(pokemon) {
        const typesBadges = pokemon.types.map(type => 
            `<span class="type-badge type-${type}" style="background-color: ${PokeAPIService.getTypeColor(type)}">${this.translateType(type)}</span>`
        ).join('');

        const abilitiesList = pokemon.abilities ? pokemon.abilities.map(ability => 
            `<div class="ability-item ${ability.isHidden ? 'hidden' : ''}">
                <strong>${PokeAPIService.formatPokemonName(ability.name)}</strong>
                ${ability.isHidden ? ' (Capacité Cachée)' : ''}
            </div>`
        ).join('') : '<div class="loading">Chargement desCapacités...</div>';

        const statsHtml = pokemon.stats ? pokemon.stats.map(stat => {
            const percentage = Math.min((stat.value / 200) * 100, 100);
            return `
                <div class="stat-bar">
                    <div class="stat-info">
                        <span class="stat-name">${this.translateStat(stat.name)}</span>
                        <span class="stat-value">${stat.value}</span>
                    </div>
                    <div class="stat-progress">
                        <div class="stat-fill" style="width: ${percentage}%; background: linear-gradient(90deg, ${PokeAPIService.getTypeColor(pokemon.types[0])}, ${pokemon.types[1] ? PokeAPIService.getTypeColor(pokemon.types[1]) : PokeAPIService.getTypeColor(pokemon.types[0])})"></div>
                    </div>
                </div>
            `;
        }).join('') : '<div class="loading">Chargement des statistiques...</div>';

        return `
            <div class="pokemon-detail-header">
                <div class="pokemon-navigation">
                    <h2>${PokeAPIService.formatPokemonName(pokemon.name)} <span style="color: rgba(255,255,255,0.7); font-size: 1.5rem;">#${pokemon.id.toString().padStart(3, '0')}</span></h2>
                </div>
            </div>
            
            <div class="pokemon-detail-content">
                <div class="left-column">
                    <div class="pokemon-artwork">
                        <img src="${pokemon.sprite}" alt="${pokemon.name}" loading="lazy">
                    </div>
                    
                    <div class="pokemon-basic-info">
                        <h3 style="text-align: center; color: #667eea; margin-bottom: 20px; font-size: 1.4rem;">Informations Générales</h3>
                        
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
                        <h3>Capacités</h3>
                        ${abilitiesList}
                    </div>
                    
                    <div class="pokemon-evolution">
                        <h3 style="text-align: center; color: #e74c3c; margin-bottom: 25px; font-size: 1.4rem;">Chaîne d'Évolution</h3>
                        <div class="evolution-chain" id="evolution-chain-${pokemon.id}">
                            <div class="evolution-loading">Chargement de la chaîne d'évolution...</div>
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
                evolutionContainer.innerHTML = '<div class="evolution-loading">Chaîne d\'évolution non disponible</div>';
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
            return '<div class="evolution-loading">Ce Pokémon n\'a pas d\'évolution</div>';
        }

        const evolutionElements = [];
        
        for (let i = 0; i < evolutionChain.length; i++) {
            const evolution = evolutionChain[i];
            const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`;
            
            evolutionElements.push(`
                <div class="evolution-pokemon" onclick="pokemonModal.openPokemonFromEvolution(${evolution.id})">
                    <img src="${sprite}" alt="${evolution.name}" loading="lazy">
                    <div class="name">${PokeAPIService.formatPokemonName(evolution.name)}</div>
                    ${evolution.minLevel ? `<div class="level">Niv. ${evolution.minLevel}</div>` : ''}
                </div>
            `);
            
            if (i < evolutionChain.length - 1) {
                evolutionElements.push('<div class="evolution-arrow">→</div>');
            }
        }
        
        return evolutionElements.join('');
    }

    async openPokemonFromEvolution(pokemonId) {
        try {
            const pokemon = await PokeAPIService.fetchPokemon(pokemonId);
            if (pokemon) {
                this.showPokemonModal(pokemon);
            }
        } catch (error) {
            console.error('Erreur lors du chargement du Pokémon:', error);
        }
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
            'special-attack': 'Attaque Spé.',
            'special-defense': 'Défense Spé.',
            speed: 'Vitesse'
        };
        return translations[stat] || stat;
    }
}

// Initialisation quand le DOM est chargé
let pokemonModal;

document.addEventListener('DOMContentLoaded', () => {
    new PokemonSearch();
    new CarouselManager();
    pokemonModal = new PokemonModal();
    
    // Activer le premier élément du carousel
    const firstCarouselItem = document.querySelector('.carousel-item');
    if (firstCarouselItem) {
        firstCarouselItem.classList.add('active');
    }
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

// Fermer le menu mobile quand on clique à l'extérieur
document.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (sidebar && toggle && sidebar.classList.contains('mobile-open')) {
        if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
            sidebar.classList.remove('mobile-open');
            toggle.classList.remove('active');
        }
    }
});
