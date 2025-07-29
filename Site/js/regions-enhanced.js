/**
 * ==========================================
 * SCRIPT POUR LA PAGE RÉGIONS POKÉMON
 * ==========================================
 */

// Configuration globale
const REGIONS_CONFIG = {
    scrollDuration: 800,
    animationDelay: 100,
    statCounterSpeed: 2000
};

// Données des régions
const REGIONS_DATA = {
    kanto: {
        id: 'kanto',
        name: 'Kanto',
        generation: 'Génération I',
        pokemon: 151,
        routes: 25,
        villes: 11,
        arenes: 8,
        color: '#FF4444'
    },
    johto: {
        id: 'johto',
        name: 'Johto',
        generation: 'Génération II',
        pokemon: 100,
        routes: 46,
        villes: 14,
        arenes: 8,
        color: '#FFD700'
    },
    hoenn: {
        id: 'hoenn',
        name: 'Hoenn',
        generation: 'Génération III',
        pokemon: 135,
        routes: 34,
        villes: 16,
        arenes: 8,
        color: '#0066CC'
    },
    sinnoh: {
        id: 'sinnoh',
        name: 'Sinnoh',
        generation: 'Génération IV',
        pokemon: 107,
        routes: 30,
        villes: 15,
        arenes: 8,
        color: '#999999'
    },
    unys: {
        id: 'unys',
        name: 'Unys',
        generation: 'Génération V',
        pokemon: 156,
        routes: 23,
        villes: 18,
        arenes: 8,
        color: '#666666'
    },
    paldea: {
        id: 'paldea',
        name: 'Paldea',
        generation: 'Génération IX',
        pokemon: 103,
        routes: 15,
        villes: 12,
        arenes: 8,
        color: '#9933CC'
    }
};

/**
 * ==========================================
 * INITIALISATION DE LA PAGE
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌍 Initialisation de la page Régions');
    
    initializeRegionsPage();
    setupSmoothScrolling();
    setupNavigationButtons();
    animateStatsCounters();
    setupIntersectionObserver();
    addParticleEffects();
    
    console.log('✅ Page Régions initialisée avec succès');
});

/**
 * Initialise tous les composants de la page
 */
function initializeRegionsPage() {
    // Mise en place de l'état initial
    highlightCurrentRegion();
    
    // Ajout des événements de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Préchargement des images
    preloadRegionImages();
}

/**
 * ==========================================
 * NAVIGATION ET SCROLL
 * ==========================================
 */

/**
 * Configure le scroll fluide vers les sections
 */
function setupSmoothScrolling() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-region');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Animation du bouton
                animateNavButton(this);
                
                // Scroll vers la section
                smoothScrollTo(targetElement);
                
                // Mise à jour de l'URL
                updateURL(targetId);
            }
        });
    });
}

/**
 * Scroll fluide vers un élément
 */
function smoothScrollTo(element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Animation des boutons de navigation
 */
function animateNavButton(button) {
    // Supprime l'état actif de tous les boutons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Active le bouton cliqué
    button.classList.add('active');
    
    // Effet de clic
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

/**
 * Gestion du scroll de la page
 */
function handleScroll() {
    const sections = document.querySelectorAll('.region-section');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });
    
    // Mise à jour des boutons de navigation
    navButtons.forEach(button => {
        const targetRegion = button.getAttribute('data-region');
        if (targetRegion === currentSection) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

/**
 * Met en surbrillance la région actuelle
 */
function highlightCurrentRegion() {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        const targetButton = document.querySelector(`[data-region="${hash}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        }
    } else {
        // Active le premier bouton par défaut
        const firstButton = document.querySelector('.nav-btn');
        if (firstButton) {
            firstButton.classList.add('active');
        }
    }
}

/**
 * Met à jour l'URL avec l'ancre
 */
function updateURL(regionId) {
    history.pushState(null, null, `#${regionId}`);
}

/**
 * ==========================================
 * ANIMATIONS DES STATISTIQUES
 * ==========================================
 */

/**
 * Anime les compteurs de statistiques
 */
function animateStatsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const targetValue = parseInt(stat.textContent);
        animateCounter(stat, 0, targetValue, REGIONS_CONFIG.statCounterSpeed);
    });
}

/**
 * Anime un compteur individuel
 */
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Fonction d'easing
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end; // Assure la valeur finale exacte
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * ==========================================
 * INTERSECTION OBSERVER
 * ==========================================
 */

/**
 * Configure l'observateur d'intersection pour les animations
 */
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateRegionCard(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer toutes les cartes de région
    const regionCards = document.querySelectorAll('.region-card');
    regionCards.forEach(card => {
        observer.observe(card);
    });
}

/**
 * Anime l'apparition d'une carte de région
 */
function animateRegionCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    // Animation avec un délai
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, REGIONS_CONFIG.animationDelay);
    
    // Anime les éléments internes
    animateCardContent(card);
}

/**
 * Anime le contenu d'une carte
 */
function animateCardContent(card) {
    const stats = card.querySelectorAll('.stat-number');
    const legendaryItems = card.querySelectorAll('.legendary-item');
    
    // Anime les statistiques
    stats.forEach((stat, index) => {
        setTimeout(() => {
            const value = parseInt(stat.dataset.value || stat.textContent);
            animateCounter(stat, 0, value, 1500);
        }, index * 200);
    });
    
    // Anime les Pokémon légendaires
    legendaryItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.4s ease-out';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 50);
        }, 1000 + (index * 100));
    });
}

/**
 * ==========================================
 * EFFETS VISUELS AVANCÉS
 * ==========================================
 */

/**
 * Ajoute des effets de particules
 */
function addParticleEffects() {
    const regionHeaders = document.querySelectorAll('.region-header');
    
    regionHeaders.forEach(header => {
        createParticlesForRegion(header);
    });
}

/**
 * Crée des particules pour une région
 */
function createParticlesForRegion(header) {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'region-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 2;
    `;
    
    // Crée plusieurs particules
    for (let i = 0; i < 15; i++) {
        createParticle(particleContainer, i);
    }
    
    header.appendChild(particleContainer);
}

/**
 * Crée une particule individuelle
 */
function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'region-particle';
    
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * 100;
    const duration = Math.random() * 10 + 15;
    const delay = index * 0.5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 215, 0, 0.6);
        border-radius: 50%;
        left: ${startX}%;
        top: 100%;
        animation: floatUp ${duration}s linear infinite;
        animation-delay: ${delay}s;
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
    `;
    
    container.appendChild(particle);
}

/**
 * ==========================================
 * UTILITAIRES
 * ==========================================
 */

/**
 * Précharge les images des régions
 */
function preloadRegionImages() {
    const images = [
        'images/kanto-region.jpg',
        'images/johto-region.jpg',
        'images/hoenn-region.jpg',
        'images/sinnoh-region.jpg',
        'images/unys-region.jpg',
        'images/paldea-region.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

/**
 * Configuration des boutons de navigation
 */
function setupNavigationButtons() {
    const buttons = document.querySelectorAll('.nav-btn');
    
    buttons.forEach(button => {
        // Effet de hover amélioré
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
}

/**
 * ==========================================
 * STYLES DYNAMIQUES
 * ==========================================
 */

// Ajoute les styles CSS pour les animations
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        from {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .nav-btn.active {
        background: linear-gradient(145deg, rgba(255, 215, 0, 0.2), rgba(65, 90, 119, 0.4));
        border-color: rgba(255, 215, 0, 0.4);
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(255, 215, 0, 0.2);
    }
    
    .region-card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .legendary-item {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .stat {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
`;
document.head.appendChild(style);

/**
 * ==========================================
 * GESTION DES ERREURS
 * ==========================================
 */

window.addEventListener('error', function(e) {
    console.error('Erreur dans la page Régions:', e.error);
});

// Export pour utilisation externe si nécessaire
window.RegionsPage = {
    scrollTo: smoothScrollTo,
    animateCounter: animateCounter,
    data: REGIONS_DATA
};
