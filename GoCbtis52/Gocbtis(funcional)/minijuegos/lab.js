// 4. Lab Clínico (Memorama)
window.labGame = function(area, diff) {
    if (window.checkGameOver('active-game-area')) return;

    let basePairs = diff === 'facil' ? 2 : (diff === 'medio' ? 3 : 4);
    let pairs = basePairs + (window.GameScore.round - 1); // incrementa dificultad en c/ronda
    
    let items = ['🔬','🧪','💉','🧫','💊','🩸','🧑‍⚕️','🩻'].slice(0, pairs);
    let deck = [...items, ...items].sort(() => Math.random() - 0.5);
    
    area.innerHTML = `
        <div class="game-content-card">
            <img src="assets/lab_img.png" class="game-specialty-img" alt="Laboratorio">
            <h3>Ensayo Clínico (${diff})</h3>
            <p>Encuentra todos los pares para aprobar la prueba.</p>
            <div class="memo-grid" style="grid-template-columns: repeat(${Math.ceil(deck.length/3)}, 1fr);">
                ${deck.map((emoji) => `<div class="memo-card" data-val="${emoji}" onclick="flipCard(this, '${diff}')">?</div>`).join('')}
            </div>
            <div id="game-feedback" class="game-feedback"></div>
        </div>
    `;

    window.memState = { first: null, matched: 0, total: deck.length };
};

window.flipCard = function(el, diff) {
    const feedbackArea = document.getElementById('game-feedback');
    if (!feedbackArea) return;

    if(el.classList.contains('revealed') || el.classList.contains('matched') || document.querySelectorAll('.revealed:not(.matched)').length >= 2) return;
    
    el.textContent = el.getAttribute('data-val');
    el.classList.add('revealed');
    
    if(!window.memState.first) { window.memState.first = el; return; }
    
    if(window.memState.first.getAttribute('data-val') === el.getAttribute('data-val')) {
        window.memState.first.classList.add('matched');
        el.classList.add('matched');
        window.memState.first = null; 
        window.memState.matched += 2;
        
        if(window.memState.matched === window.memState.total) {
            feedbackArea.textContent = "¡Ensayo Clínico Exitoso!";
            feedbackArea.className = 'game-feedback success-bounce';
            
            window.GameScore.correct++;
            window.GameScore.round++;
            window.updateScoreboard();
            setTimeout(() => {
                const a = document.getElementById('active-game-area');
                if(a) window.labGame(a, diff);
            }, 1200);
        }
    } else {
        feedbackArea.textContent = "Error de Muestra. Restando puntos...";
        feedbackArea.className = 'game-feedback error-shake';
        window.GameScore.incorrect++;
        window.updateScoreboard();
        
        let currentFirst = window.memState.first;
        let currentEl = el;
        window.memState.first = null;
        
        setTimeout(() => {
            if(document.body.contains(currentFirst)) { currentFirst.textContent = '?'; currentFirst.classList.remove('revealed'); }
            if(document.body.contains(currentEl)) { currentEl.textContent = '?'; currentEl.classList.remove('revealed'); }
            if(document.getElementById('game-feedback')) document.getElementById('game-feedback').textContent = "";
        }, 1000);
    }
};
