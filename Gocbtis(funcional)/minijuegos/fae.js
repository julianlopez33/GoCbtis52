// 6. FAE (Drag and drop clasificatorio interactivo)
window.faeGame = function(area, diff) {
    if (window.checkGameOver('active-game-area')) return;

    const sequence = {
        facil: [
            { name: "Panel Solar", tipo: "renovable" }, 
            { name: "Plástico Petróleo", tipo: "no" }, 
            { name: "Turbina Eólica", tipo: "renovable" }
        ],
        medio: [
            { name: "Planta Geotérmica", tipo: "renovable" }, 
            { name: "Gas Natural", tipo: "no" }, 
            { name: "Biomasa Bosque", tipo: "renovable" },
            { name: "Biodiesel Vegetal", tipo: "renovable" },
            { name: "Gas Licuado (GLP)", tipo: "no" }
        ],
        dificil: [
            { name: "Termoeléctrica Carbón", tipo: "no" }, 
            { name: "Uranio (Nuclear)", tipo: "no" }, 
            { name: "Presa Hidroeléctrica", tipo: "renovable" },
            { name: "Marea Motriz", tipo: "renovable" },
            { name: "Aceite de Motor usado", tipo: "no" },
            { name: "Hidrógeno Verde", tipo: "renovable" },
            { name: "Queroseno Avión", tipo: "no" },
            { name: "Pila de Litio", tipo: "no" },
            { name: "Caldera de Leña", tipo: "renovable" },
            { name: "Fracking Gas", tipo: "no" }
        ]
    };

    let current = sequence[diff][window.GameScore.round - 1];

    let zones = [
        `<div class="drop-zone" data-type="renovable" style="border-color: #28a745; cursor:pointer;" onclick="checkFae('renovable', '${current.tipo}', '${diff}')">
            <h4 style="color:#28a745;">Energía Renovable</h4>
        </div>`,
        `<div class="drop-zone" data-type="no" style="border-color: #dc3545; cursor:pointer;" onclick="checkFae('no', '${current.tipo}', '${diff}')">
            <h4 style="color:#dc3545;">No Renovable (Fósil)</h4>
        </div>`
    ].sort(() => Math.random() - 0.5);

    area.innerHTML = `
        <div class="game-content-card">
            <img src="assets/fae_img.png" class="game-specialty-img" alt="FAE">
            <h3>Inspector Ambiental (${diff})</h3>
            <p style="font-size:1.2rem; margin:1rem;">Haz clic en la Categoría para: <br><strong style="font-size:1.5rem; color:var(--color-guinda);">${current.name}</strong></p>
            
            <div class="drop-zones">
                ${zones.join('')}
            </div>
            <div id="game-feedback" class="game-feedback"></div>
        </div>
    `;
};

window.checkFae = function(selected, correct, diff) {
    const feedback = document.getElementById('game-feedback');
    const zones = document.querySelectorAll('.drop-zone');
    if (!feedback) return;

    zones.forEach(z => z.style.pointerEvents = 'none'); // Bloquear clicks repetidos

    if(selected === correct) {
        feedback.textContent = '¡Bien clasificado!';
        feedback.className = 'game-feedback success-bounce';
        zones.forEach(z => {
             if(z.getAttribute('data-type') === selected) {
                 z.style.background = '#28a745';
                 z.querySelector('h4').style.color = 'white';
             }
        });
        window.GameScore.correct++;
    } else {
        feedback.textContent = 'Clasificación errónea.';
        feedback.className = 'game-feedback error-shake';
        zones.forEach(z => {
             if(z.getAttribute('data-type') === correct) {
                 z.style.background = '#28a745'; // Correct one in green
                 z.querySelector('h4').style.color = 'white';
             } else {
                 z.style.background = '#dc3545'; // Wrong one in red
                 z.querySelector('h4').style.color = 'white';
             }
        });
        window.GameScore.incorrect++;
    }

    window.GameScore.round++;
    window.updateScoreboard();

    setTimeout(() => {
        const area = document.getElementById('active-game-area');
        if(area) window.faeGame(area, diff);
    }, 1200);
};
