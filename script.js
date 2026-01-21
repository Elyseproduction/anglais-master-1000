const words = [
    // --- NATURE & ANIMAUX ---
    { en: "Lion", fr: "Lion", cat: "Animaux", img: "🦁" },
    { en: "Elephant", fr: "Éléphant", cat: "Animaux", img: "🐘" },
    { en: "Bird", fr: "Oiseau", cat: "Animaux", img: "🐦" },
    { en: "Sun", fr: "Soleil", cat: "Nature", img: "☀️" },
    { en: "Moon", fr: "Lune", cat: "Nature", img: "🌙" },
    { en: "Tree", fr: "Arbre", cat: "Nature", img: "🌳" },
    
    // --- MAISON & OBJETS ---
    { en: "Computer", fr: "Ordinateur", cat: "Objets", img: "💻" },
    { en: "House", fr: "Maison", cat: "Maison", img: "🏠" },
    { en: "Car", fr: "Voiture", cat: "Maison", img: "🚗" },
    { en: "Phone", fr: "Téléphone", cat: "Objets", img: "📱" },
    { en: "Watch", fr: "Montre", cat: "Objets", img: "⌚" },

    // --- VERBES ET ACTIONS ---
    { en: "To Run", fr: "Courir", cat: "Verbes", img: "🏃" },
    { en: "To Eat", fr: "Manger", cat: "Verbes", img: "🍕" },
    { en: "To Sleep", fr: "Dormir", cat: "Verbes", img: "😴" },
    { en: "To Think", fr: "Penser", cat: "Verbes", img: "🤔" },
    { en: "To Work", fr: "Travailler", cat: "Verbes", img: "💼" },

    // --- VOYAGE & BUSINESS ---
    { en: "Money", fr: "Argent", cat: "Business", img: "💵" },
    { en: "Flight", fr: "Vol", cat: "Voyage", img: "✈️" },
    { en: "Map", fr: "Carte", cat: "Voyage", img: "🗺️" },
    { en: "Passport", fr: "Passeport", cat: "Voyage", img: "🛂" }
    
    // Ajoutez vos centaines de mots ici sur le même modèle
];

function init() {
    document.getElementById('word-count').innerText = words.length;
    const nav = document.getElementById('categoryNav');
    const categories = [...new Set(words.map(w => w.cat))];

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'btn-cat';
        btn.innerText = cat;
        btn.onclick = (e) => {
            document.querySelectorAll('.btn-cat').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterByCat(cat);
        };
        nav.appendChild(btn);
    });

    displayWords(words);
}

function displayWords(list) {
    const grid = document.getElementById('dictionary-grid');
    grid.innerHTML = '';
    list.forEach(item => {
        const card = document.createElement('div');
        card.className = 'word-card';
        card.innerHTML = `
            <span class="word-img">${item.img}</span>
            <span class="en">${item.en}</span>
            <span class="fr">${item.fr}</span>
        `;
        card.onclick = () => speak(item.en);
        grid.appendChild(card);
    });
}

function filterByCat(cat) {
    if(cat === 'All') {
        displayWords(words);
    } else {
        displayWords(words.filter(w => w.cat === cat));
    }
}

function search() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = words.filter(w => 
        w.en.toLowerCase().includes(query) || 
        w.fr.toLowerCase().includes(query)
    );
    displayWords(filtered);
}

function speak(text) {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-US';
    window.speechSynthesis.speak(msg);
}

window.onload = init;