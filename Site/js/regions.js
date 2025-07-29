// JavaScript pour la page Régions - PokeRift
console.log('Script regions.js chargé');

// Fonction de navigation fluide vers une région
function scrollToRegion(regionId) {
    const regionElement = document.getElementById(regionId);
    if (regionElement) {
        const headerOffset = 100;
        const elementPosition = regionElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Effet de surbrillance temporaire
        regionElement.style.border = '3px solid var(--couleur1)';
        regionElement.style.boxShadow = '0 0 30px rgba(255,204,0,0.5)';
        
        setTimeout(() => {
            regionElement.style.border = '';
            regionElement.style.boxShadow = '';
        }, 2000);
    }
}

// Fonction pour ajouter des effets d'animation au scroll
function animateOnScroll() {
    const regionCards = document.querySelectorAll('.region-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    regionCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Fonction pour ajouter des interactions aux Pokémon légendaires
function setupLegendaryInteractions() {
    const legendaryNames = document.querySelectorAll('.legendary-name');
    
    legendaryNames.forEach(name => {
        name.addEventListener('mouseenter', () => {
            name.style.transform = 'translateY(-3px) scale(1.1)';
            name.style.boxShadow = '0 8px 20px rgba(255,204,0,0.6)';
        });
        
        name.addEventListener('mouseleave', () => {
            name.style.transform = 'translateY(-2px) scale(1.05)';
            name.style.boxShadow = '0 5px 15px rgba(255,204,0,0.4)';
        });
        
        // Ajout d'un clic pour rechercher le Pokémon
        name.addEventListener('click', () => {
            const pokemonName = name.textContent.trim();
            searchPokemon(pokemonName);
        });
    });
}

// Fonction pour rechercher un Pokémon (redirige vers le Pokédex)
function searchPokemon(pokemonName) {
    // Créer une URL vers le Pokédex avec le nom du Pokémon
    const pokedexUrl = `pokedex.html?search=${encodeURIComponent(pokemonName)}`;
    
    // Afficher une notification
    showNotification(`Recherche de ${pokemonName}...`);
    
    // Rediriger après un petit délai pour l'effet visuel
    setTimeout(() => {
        window.location.href = pokedexUrl;
    }, 800);
}

// Fonction pour afficher des notifications
function showNotification(message) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--couleur1), #ffdd33);
        color: var(--couleur2);
        padding: 15px 25px;
        border-radius: 20px;
        font-weight: 600;
        box-shadow: 0 5px 20px rgba(255,204,0,0.4);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.4s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animation de sortie et suppression
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 3000);
}

// Fonction pour ajouter des effets aux badges d'arène
function setupGymBadgeEffects() {
    const gymBadges = document.querySelectorAll('.gym-badge');
    
    gymBadges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'translateY(-4px) rotate(2deg)';
            badge.style.boxShadow = '0 8px 20px rgba(176,224,230,0.6)';
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'translateY(-2px) rotate(0deg)';
            badge.style.boxShadow = '0 5px 15px rgba(176,224,230,0.4)';
        });
    });
}

// Fonction pour créer des particules flottantes en arrière-plan
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Créer des particules
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: rgba(255, 204, 0, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 10}s linear infinite;
        `;
        
        particleContainer.appendChild(particle);
    }
    
    // Ajouter l'animation CSS pour les particules
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Fonction pour améliorer l'accessibilité
function setupAccessibility() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const legendaryNames = document.querySelectorAll('.legendary-name');
    
    // Ajouter des attributs ARIA
    navButtons.forEach(button => {
        button.setAttribute('role', 'button');
        button.setAttribute('aria-label', `Aller à la région ${button.textContent}`);
        
        // Navigation au clavier
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
    
    legendaryNames.forEach(name => {
        name.setAttribute('role', 'button');
        name.setAttribute('aria-label', `Rechercher ${name.textContent}`);
        name.setAttribute('tabindex', '0');
        
        // Navigation au clavier
        name.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                name.click();
            }
        });
    });
}

// Fonction pour optimiser les performances
function optimizePerformance() {
    // Lazy loading pour les images de région futures
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Throttle pour les événements de scroll
    let scrollTimer = null;
    const handleScroll = () => {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(() => {
            // Code de scroll optimisé ici
        }, 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Fonction d'initialisation principale
function initRegionsPage() {
    console.log('Initialisation de la page régions...');
    
    // Attendre que le DOM soit complètement chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRegionsPage);
        return;
    }
    
    try {
        // Initialiser toutes les fonctionnalités
        animateOnScroll();
        setupLegendaryInteractions();
        setupGymBadgeEffects();
        setupAccessibility();
        optimizePerformance();
        
        // Effets visuels optionnels (peut être désactivé pour les performances)
        if (window.innerWidth > 768) {
            createFloatingParticles();
        }
        
        console.log('Page régions initialisée avec succès !');
        
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la page régions:', error);
    }
}

// Démarrer l'initialisation
initRegionsPage();

// Exposer les fonctions globalement pour l'utilisation dans le HTML
window.scrollToRegion = scrollToRegion;
window.searchPokemon = searchPokemon;
