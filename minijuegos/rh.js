// 5. Admin RH (Simulador de Barras)
window.rhGame = function(area, diff) {
    if (window.checkGameOver('active-game-area')) return;

    // Solo inicializar barras la primera ronda
    if (window.GameScore.round === 1) {
        window.rhState = { moral: 80, budget: 80 };
    }
    
    area.innerHTML = `
        <div class="game-content-card">
            <div class="game-specialty-img placeholder-img">👤 RH</div>
            <h3>Simulador Directivo (${diff})</h3>
            <div class="resource-bar-container">
                <div class="resource-label"><span>Moral del Empleado</span><span id="txt-moral">${window.rhState.moral}%</span></div>
                <div class="bar-bg"><div class="bar-fill" id="bar-moral" style="width:${window.rhState.moral}%;"></div></div>
            </div>
            <div class="resource-bar-container">
                <div class="resource-label"><span>Presupuesto</span><span id="txt-budget">${window.rhState.budget}%</span></div>
                <div class="bar-bg"><div class="bar-fill guinda" id="bar-budget" style="width:${window.rhState.budget}%;"></div></div>
            </div>
            <hr style="margin:1.5rem 0; border-top:1px solid #ccc;">
            <div id="rh-scenario-area"></div>
        </div>
    `;
    nextRhScenario(diff);
};

window.nextRhScenario = function(diff) {
    const scenarioArea = document.getElementById('rh-scenario-area');
    if (!scenarioArea) return; 

    // Revisar Bancarrota o Huelga temprana
    if(window.rhState.moral <= 0 || window.rhState.budget <= 0) {
        scenarioArea.innerHTML = `<h3 class="error-shake">¡Fracasaste! La empresa quebró o hubo huelga.</h3>`;
        window.GameScore.incorrect++;
        window.GameScore.round = 999; // Forzar fin de juego
        window.updateScoreboard();
        setTimeout(() => window.rhGame(document.getElementById('active-game-area'), diff), 2000);
        return;
    }

    const allScenarios = {
        facil: [
            { q: "Los empleados quieren café gratis.", opts: [{ t: "Poner cafetera modesta", m: 10, b: -5, ok:true }, { t: "Negarlo totalmente", m: -20, b: 0, ok:false }] },
            { q: "Falta papel de baño en los sanitarios.", opts: [{ t: "Comprar papel urgente", m: 10, b: -5, ok:true }, { t: "Decir que traigan de su casa", m: -30, b: 0, ok:false }] },
            { q: "Es el día del empleado.", opts: [{ t: "Comprar pasteles", m: 20, b: -10, ok:true }, { t: "Ignorar la fecha", m: -20, b: 0, ok:false }] }
        ],
        medio: [
            { q: "Un empleado clave pide un aumento fuerte del 50%.", opts: [{ t: "Dárselo al 100% (afecta caja)", m: 10, b: -30, ok:false }, { t: "Negociar bono por metas", m: 0, b: -5, ok:true }] },
            { q: "Se rompió el aire acondicionado en verano.", opts: [{ t: "Arreglarlo ya", m: 15, b: -15, ok:true }, { t: "Esperar a invierno", m: -40, b: 0, ok:false }] },
            { q: "Llegó tarde la quincena 1 día por culpa del banco.", opts: [{ t: "Pedir disculpas formales", m: -5, b: 0, ok:true }, { t: "Echarle la culpa a sistemas", m: -20, b: 0, ok:false }] },
            { q: "Los empleados se quejan del uniforme actual.", opts: [{ t: "Permitir ropa casual los viernes", m: 10, b: -5, ok:true }, { t: "Ignorar quejas", m: -15, b: 0, ok:false }] },
            { q: "Se necesitan nuevos escritorios ergonómicos.", opts: [{ t: "Comprar solo casos urgentes", m: 5, b: -10, ok:true }, { t: "No hay presupuesto", m: -20, b: 0, ok:false }] }
        ],
        dificil: [
            { q: "Sindicato amenaza con huelga si no reduces jornada laboral.", opts: [{ t: "Acceder y perder producción", m: 30, b: -40, ok:false }, { t: "Mesa de diálogo y negociar incentivos", m: 5, b: -10, ok:true }] },
            { q: "Cae la economía global. Ventas bajan al 50%.", opts: [{ t: "Despedir a la mitad masiva", m: -50, b: 30, ok:false }, { t: "Recortar bonos directivos y ahorrar", m: -10, b: 20, ok:true }] },
            { q: "Hackearon el servidor de la empresa.", opts: [{ t: "Pagar el rescate a los hackers", m: -20, b: -50, ok:false }, { t: "Pagar a expertos en ciberseguridad", m: 0, b: -20, ok:true }] },
            { q: "Una filtración de datos expuso salarios de todos.", opts: [{ t: "Reunión de transparencia", m: 15, b: -20, ok:true }, { t: "Negarlo todo", m: -30, b: 0, ok:false }] },
            { q: "La competencia robó a tu mejor gerente.", opts: [{ t: "Promover talento interno", m: 10, b: -10, ok:true }, { t: "No hacer nada", m: -20, b: 0, ok:false }] },
            { q: "La oficina sufrió una inundación menor.", opts: [{ t: "Home office temporal", m: 10, b: -10, ok:true }, { t: "Trabajar entre cubetas", m: -30, b: 0, ok:false }] },
            { q: "Se detectó acoso laboral en un departamento.", opts: [{ t: "Investigación y despido", m: 20, b: -5, ok:true }, { t: "Pedir que se lleven bien", m: -40, b: 0, ok:false }] },
            { q: "Empleados se sienten estancados profesionalmente.", opts: [{ t: "Becas y planes de carrera", m: 15, b: -15, ok:true }, { t: "Decirles que agradezcan empleo", m: -30, b: 0, ok:false }] },
            { q: "Abrir sucursal con presupuesto limitado.", opts: [{ t: "Bonos por metas futuras", m: -5, b: 10, ok:true }, { t: "Obligar a horas extra gratis", m: -50, b: 0, ok:false }] },
            { q: "Auditoría interna: gastos no justificados.", opts: [{ t: "Control estricto viáticos", m: -5, b: 15, ok:true }, { t: "Ignorar auditoría", m: 0, b: -20, ok:false }] }
        ]
    };

    const current = allScenarios[diff][window.GameScore.round - 1];
    let shuffledOpts = [...current.opts].sort(() => Math.random() - 0.5);
    
    let html = `<p style="font-size:1.1rem; margin-bottom:1rem;"><strong>Decisión Crítica:</strong> ${current.q}</p><div style="display:flex; flex-direction:column; gap:0.5rem;">`;
    shuffledOpts.forEach((o) => {
        html += `<button class="game-option-btn" data-correct="${o.ok}" onclick="applyRhChoice(${o.m}, ${o.b}, ${o.ok}, '${diff}', this)">${o.t}</button>`;
    });
    html += `</div>`;
    scenarioArea.innerHTML = html;
};

window.applyRhChoice = function(m, b, ok, diff, btn) {
    const scenarioArea = document.getElementById('rh-scenario-area');
    if (!scenarioArea) return;

    btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);

    window.rhState.moral = Math.max(0, Math.min(100, window.rhState.moral + m));
    window.rhState.budget = Math.max(0, Math.min(100, window.rhState.budget + b));
    
    document.getElementById('bar-moral').style.width = window.rhState.moral + '%';
    document.getElementById('txt-moral').textContent = window.rhState.moral + '%';
    document.getElementById('bar-budget').style.width = window.rhState.budget + '%';
    document.getElementById('txt-budget').textContent = window.rhState.budget + '%';
    
    if (ok) {
        btn.style.background = '#28a745'; btn.style.color = 'white';
        window.GameScore.correct++;
    } else {
        btn.style.background = '#dc3545'; btn.style.color = 'white';
        
        // Highlight correct answer in green
        if (btn.parentElement) {
            btn.parentElement.querySelectorAll('button').forEach(b => {
                if (b.getAttribute('data-correct') === 'true') {
                    b.style.background = '#28a745';
                    b.style.color = 'white';
                }
            });
        }
        
        window.GameScore.incorrect++;
    }

    window.GameScore.round++;
    window.updateScoreboard();
    
    scenarioArea.innerHTML += `<p style="margin-top:1rem; font-weight:bold;">Analizando impacto a la empresa...</p>`;
    setTimeout(() => {
        const area = document.getElementById('active-game-area');
        if(area) window.rhGame(area, diff);
    }, 1500);
};
