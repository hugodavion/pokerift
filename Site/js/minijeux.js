// --- Quiz Génération ---
const genquiz = {
  current: null,
  generations: [
    {num: 1, name: 'Gén 1 (Kanto)', range: [1, 151]},
    {num: 2, name: 'Gén 2 (Johto)', range: [152, 251]},
    {num: 3, name: 'Gén 3 (Hoenn)', range: [252, 386]},
    {num: 4, name: 'Gén 4 (Sinnoh)', range: [387, 493]},
    {num: 5, name: 'Gén 5 (Unys)', range: [494, 649]},
    {num: 6, name: 'Gén 6 (Kalos)', range: [650, 721]},
    {num: 7, name: 'Gén 7 (Alola)', range: [722, 809]},
    {num: 8, name: 'Gén 8 (Galar)', range: [810, 898]}
  ],
  async newGame() {
    // Prend un Pokémon aléatoire de la Pokédex national (1-898)
    const id = Math.floor(Math.random() * 898) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    this.current = data;
    document.getElementById('genquiz-sprite').src = data.sprites.front_default;
    document.getElementById('genquiz-feedback').textContent = '';
    // Génère 4 choix dont la bonne génération
    const correctGen = this.generations.find(g => id >= g.range[0] && id <= g.range[1]);
    let choices = [correctGen];
    while (choices.length < 4) {
      const g = this.generations[Math.floor(Math.random() * this.generations.length)];
      if (!choices.some(c => c.num === g.num)) choices.push(g);
    }
    shuffle(choices);
    // Affiche les boutons
    const container = document.getElementById('genquiz-choices');
    container.innerHTML = '';
    choices.forEach(gen => {
      const btn = document.createElement('button');
      btn.textContent = gen.name;
      btn.className = 'qcm-btn';
      btn.onclick = () => this.checkAnswer(gen.num);
      container.appendChild(btn);
    });
  },
  checkAnswer(num) {
    const id = this.current.id;
    const correctGen = this.generations.find(g => id >= g.range[0] && id <= g.range[1]);
    if (num === correctGen.num) {
      document.getElementById('genquiz-feedback').textContent = 'Bonne réponse !';
      setTimeout(() => this.newGame(), 1800);
    } else {
      document.getElementById('genquiz-feedback').textContent = `Raté ! C'était ${correctGen.name}`;
      setTimeout(() => this.newGame(), 2200);
    }
  }
};
// --- Jeu Memory Pokémon ---
const memory = {
  board: null,
  feedback: null,
  restartBtn: null,
  cards: [],
  flipped: [],
  matched: 0,
  lock: false,
  totalPairs: 6,
  async newGame() {
    this.board = document.getElementById('memory-board');
    this.feedback = document.getElementById('memory-feedback');
    this.restartBtn = document.getElementById('memory-restart');
    this.cards = [];
    this.flipped = [];
    this.matched = 0;
    this.lock = false;
    this.feedback.textContent = '';
    this.restartBtn.style.display = 'none';
    this.board.innerHTML = '';
    // Récupère 6 Pokémon aléatoires (12 cartes)
    const ids = [];
    while (ids.length < this.totalPairs) {
      const id = Math.floor(Math.random() * 898) + 1;
      if (!ids.includes(id)) ids.push(id);
    }
    const pokemons = await Promise.all(ids.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json())));
    // Crée les cartes (2 de chaque)
    let cards = [];
    pokemons.forEach(p => {
      cards.push({ id: p.id, name: p.name, img: p.sprites.front_default });
      cards.push({ id: p.id, name: p.name, img: p.sprites.front_default });
    });
    shuffle(cards);
    // Affiche les cartes
    cards.forEach((card, idx) => {
      const div = document.createElement('div');
      div.className = 'memory-card';
      div.dataset.id = card.id;
      div.dataset.idx = idx;
      div.innerHTML = `
        <div class="memory-card-inner">
          <div class="memory-card-front"></div>
          <div class="memory-card-back"><img src="${card.img}" alt="${card.name}" loading="lazy"></div>
        </div>`;
      div.onclick = () => this.flip(div, card);
      this.board.appendChild(div);
    });
    this.cards = cards;
  },
  flip(div, card) {
    if (this.lock || div.classList.contains('flipped') || div.classList.contains('matched')) return;
    div.classList.add('flipped');
    this.flipped.push({div, card});
    if (this.flipped.length === 2) {
      this.lock = true;
      setTimeout(() => this.checkMatch(), 800);
    }
  },
  checkMatch() {
    const [a, b] = this.flipped;
    if (a.card.id === b.card.id && a.div !== b.div) {
      a.div.classList.add('matched');
      b.div.classList.add('matched');
      this.matched++;
      if (this.matched === this.totalPairs) {
        this.feedback.textContent = 'Bravo ! Toutes les paires trouvées !';
        this.restartBtn.style.display = '';
      }
    } else {
      a.div.classList.remove('flipped');
      b.div.classList.remove('flipped');
    }
    this.flipped = [];
    this.lock = false;
  }
};
// minijeux.js - Mini-jeux Pokémon utilisant la PokéAPI

// --- Utilitaires QCM ---
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// --- Qui est-ce ? (QCM) ---
const whoisthat = {
  current: null,
  choices: [],
  async newGame() {
    const id = Math.floor(Math.random() * 898) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    this.current = data;
    document.getElementById('whoisthat-sprite').src = data.sprites.front_default;
    document.getElementById('whoisthat-sprite').style.filter = 'brightness(0) grayscale(1)';
    document.getElementById('whoisthat-feedback').textContent = '';
    // Générer 3 leurres + la bonne réponse
    const correctName = data.name;
    const promises = [];
    while (this.choices.length < 3) {
      const fakeId = Math.floor(Math.random() * 898) + 1;
      if (fakeId !== id && !this.choices.includes(fakeId)) {
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${fakeId}`));
        this.choices.push(fakeId);
      }
    }
    const results = await Promise.all(promises);
    const fakes = await Promise.all(results.map(r => r.json()));
    const options = [correctName, ...fakes.map(f => f.name)];
    shuffle(options);
    // Afficher les boutons QCM
    const container = document.getElementById('whoisthat-choices');
    container.innerHTML = '';
    options.forEach(name => {
      const btn = document.createElement('button');
      btn.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      btn.onclick = () => this.checkAnswer(name);
      btn.className = 'qcm-btn';
      container.appendChild(btn);
    });
    this.choices = [];
  },
  checkAnswer(name) {
    if (!this.current) return;
    const correct = this.current.name;
    if (name === correct) {
      document.getElementById('whoisthat-sprite').style.filter = 'none';
      document.getElementById('whoisthat-feedback').textContent = `Bravo ! C'était ${correct.charAt(0).toUpperCase() + correct.slice(1)} !`;
      setTimeout(() => {
        document.getElementById('whoisthat-sprite').style.filter = 'brightness(0) grayscale(1)';
        this.newGame();
      }, 2000);
    } else {
      document.getElementById('whoisthat-feedback').textContent = 'Non, essaye encore !';
    }
  }
};

// --- Quiz des Types (QCM) ---
const typequiz = {
  current: null,
  allTypes: [
    'normal','feu','eau','plante','électrik','glace','combat','poison','sol','vol','psy','insecte','roche','spectre','dragon','ténèbres','acier','fée'
  ],
  async newGame() {
    const id = Math.floor(Math.random() * 898) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    this.current = data;
    document.getElementById('typequiz-sprite').src = data.sprites.front_default;
    document.getElementById('typequiz-pokemon').textContent = `Quel(s) type(s) pour : ${data.name.charAt(0).toUpperCase() + data.name.slice(1)} ?`;
    document.getElementById('typequiz-feedback').textContent = '';
    // Générer les choix QCM (4 boutons, 1 bonne réponse, 3 leurres)
    const correctTypes = data.types.map(t => t.type.name.toLowerCase());
    let fakeTypes = [];
    while (fakeTypes.length < 3) {
      const fake = shuffle(this.allTypes).slice(0, correctTypes.length);
      if (!fakeTypes.some(arr => arr.join() === fake.join()) && fake.join() !== correctTypes.join()) {
        fakeTypes.push(fake);
      }
    }
    const options = [correctTypes, ...fakeTypes];
    shuffle(options);
    // Afficher les boutons QCM
    const container = document.getElementById('typequiz-choices');
    container.innerHTML = '';
    options.forEach(typesArr => {
      const label = typesArr.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(' / ');
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.onclick = () => this.checkAnswer(typesArr);
      btn.className = 'qcm-btn';
      container.appendChild(btn);
    });
  },
  checkAnswer(typesArr) {
    if (!this.current) return;
    const correctTypes = this.current.types.map(t => t.type.name.toLowerCase()).sort();
    const userTypes = typesArr.slice().sort();
    if (JSON.stringify(correctTypes) === JSON.stringify(userTypes)) {
      document.getElementById('typequiz-feedback').textContent = 'Bonne réponse !';
      setTimeout(() => this.newGame(), 2000);
    } else {
      document.getElementById('typequiz-feedback').textContent = `Raté ! Réponse : ${correctTypes.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(' / ')}`;
      setTimeout(() => this.newGame(), 2500);
    }
  }
};

// --- Initialisation ---
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('whoisthat-game')) {
    whoisthat.newGame();
  }
  if (document.getElementById('typequiz-game')) {
    typequiz.newGame();
  }
  if (document.getElementById('memory-game')) {
    memory.newGame();
    document.getElementById('memory-restart').onclick = () => memory.newGame();
  }
  if (document.getElementById('genquiz-game')) {
    genquiz.newGame();
  }
});
