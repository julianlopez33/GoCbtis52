// 3. Ofimática
window.ofiGame = function(area, diff) {
    if (window.checkGameOver('active-game-area')) return;
    
    let phrases = {
        facil: ["Hola mundo.", "El sol brilla hoy.", "Me gusta la escuela."],
        medio: [
            "La ofimática agiliza el trabajo diario.", 
            "Los procesadores de texto son útiles.", 
            "Guarda tu documento siempre.",
            "Las hojas de cálculo automatizan cálculos complejos.",
            "La organización es la clave del éxito administrativo."
        ],
        dificil: [
            "El veloz murciélago hindú comía feliz kiwi.",
            "La cigüeña tocaba el saxofón de paja.",
            "Quiere la boca exhausta vid y fugaz jamón.",
            "Existen diversos sistemas operativos para computadoras.",
            "La seguridad de la información es vital en la red.",
            "El procesamiento de datos requiere precisión y rapidez.",
            "Las macros simplifican tareas repetitivas en Excel.",
            "Un buen diseño de diapositivas mejora la comunicación.",
            "La base de datos almacena información estructurada.",
            "El trabajo colaborativo en la nube es tendencia mundial."
        ]
    };
    
    let ph = phrases[diff][window.GameScore.round - 1];
    
    area.innerHTML = `
        <div class="game-content-card">
            <img src="assets/ofi_img.png" class="game-specialty-img" alt="Ofimática">
            <h3>Prueba WPM (${diff})</h3>
            <p>Escribe idénticamente la frase de abajo:</p>
            <h4 id="ofi-phrase" style="margin: 1.5rem; color: var(--color-guinda); user-select:none;">${ph}</h4>
            <input type="text" id="typing-input" class="typing-test-input" placeholder="Comienza a escribir..." autocomplete="off" spellcheck="false">
            <div id="game-feedback" class="game-feedback"></div>
        </div>
    `;

    const input = document.getElementById('typing-input');
    const feedback = document.getElementById('game-feedback');
    let startTime = 0;

    input.addEventListener('input', () => {
        if (!document.getElementById('game-feedback')) return; 
        if(startTime === 0) startTime = Date.now();
        const typed = input.value;
        if(typed === ph) {
            input.disabled = true;
            input.style.borderColor = '#28a745';
            feedback.innerHTML = `¡Completado! Pasando a la siguiente oración...`;
            feedback.className = 'game-feedback success-bounce';
            
            window.GameScore.correct++; // Tecla perfecta de oración
            window.GameScore.round++;
            window.updateScoreboard();
            setTimeout(() => window.ofiGame(area, diff), 1200);
        } else if (ph.startsWith(typed)) {
            feedback.textContent = 'Vas bien...';
            feedback.className = 'game-feedback';
            input.style.borderColor = 'var(--color-blue)';
        } else {
            feedback.textContent = 'Llevas un error ortográfico.';
            feedback.className = 'game-feedback error-shake';
            input.style.borderColor = '#dc3545';
        }
    });
};
