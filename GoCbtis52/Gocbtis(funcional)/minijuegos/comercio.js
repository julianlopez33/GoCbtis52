// 7. Comercio (Ruta Secuencial de Logística)
window.comercioGame = function(area, diff) {
    if (window.checkGameOver('active-game-area')) return;

    const routes = {
        facil: [
            { t: "Paso 1: Puerto", desc: "¿El tratado de libre comercio permite omitir inspección?", opts: [{o:"No, todo se inspecciona", ok:true}, {o:"Sí, pasa directo", ok:false}] },
            { t: "Paso 2: Arancel", desc: "¿Dónde se declara la clasificación arancelaria?", opts: [{o:"En el Pedimento", ok:true}, {o:"En la factura proforma", ok:false}] },
            { t: "Paso 3: Flete", desc: "La mercancía salió de aduana. ¿A dónde va?", opts: [{o:"Directo a tienda final sin revisión", ok:false}, {o:"Al centro de distribución (CEDIS)", ok:true}] }
        ],
        medio: [
            { t: "Fase 1: Origen", desc: "Compras FOB en China. ¿Quién paga el barco primario?", opts: [{o:"El vendedor", ok:false}, {o:"Yo (Importador)", ok:true}] },
            { t: "Fase 2: Arribo", desc: "Semáforo aduanal tocó ROJO. Procede:", opts: [{o:"Revisión documental y física 100%", ok:true}, {o:"Soborno rápido", ok:false}] },
            { t: "Fase 3: Almacenaje", desc: "¿Cuánto tiempo puedes dejar el contenedor fiscal sin multa?", opts: [{o:"Ilimitado", ok:false}, {o:"Máximo 7 días libres normalmente", ok:true}] },
            { t: "Fase 4: Documentación", desc: "¿Qué documento ampara el transporte terrestre nacional?", opts: [{o:"Carta Porte", ok:true}, {o:"Factura simple", ok:false}] },
            { t: "Fase 5: Entrega", desc: "¿Qué significa el término 'Last Mile' en logística?", opts: [{o:"La entrega final al cliente", ok:true}, {o:"El primer kilómetro del barco", ok:false}] }
        ],
        dificil: [
            { t: "Operación 1: EXW", desc: "Término EXW usado. Responsabilidad de la carga al buque es:", opts: [{o:"Mía, asumo todo el riesgo interno en origen", ok:true}, {o:"Fábrica china", ok:false}] },
            { t: "Operación 2: DUA", desc: "Faltó el Certificado de Origen en la ventanilla.", opts: [{o:"Tramitarlo de emergencia falso", ok:false}, {o:"Pagar impuestos completos sin preferencia arancelaria", ok:true}] },
            { t: "Operación 3: INCOTERMS", desc: "¿DDP obliga al vendedor a pagar la aduana de tu país?", opts: [{o:"Sí", ok:true}, {o:"No, solo el flete", ok:false}] },
            { t: "Operación 4: Arancel Quid", desc: "¿Cuál es el arancel que se expresa en términos porcentuales?", opts: [{o:"Ad-valorem", ok:true}, {o:"Específico", ok:false}] },
            { t: "Operación 5: Recinto", desc: "¿Qué es un Recinto Fiscalizado Estratégico?", opts: [{o:"Zona libre de impuestos temporal para manufactura", ok:true}, {o:"Una bodega pública", ok:false}] },
            { t: "Operación 6: VUCEM", desc: "¿Qué significan las siglas VUCEM?", opts: [{o:"Ventanilla Única de Comercio Exterior Mexicano", ok:true}, {o:"Vigilancia Unificada de Comercio", ok:false}] },
            { t: "Operación 7: NOM", desc: "¿Qué sucede si un producto no cumple con las NOM de seguridad?", opts: [{o:"Se retiene en aduana", ok:true}, {o:"Se vende más barato", ok:false}] },
            { t: "Operación 8: Padrón", desc: "Para importar masivamente necesitas estar inscrito en el:", opts: [{o:"Padrón de Importadores", ok:true}, {o:"Registro Civil", ok:false}] },
            { t: "Operación 9: Dumping", desc: "¿Qué es el dumping?", opts: [{o:"Vender por debajo del costo para eliminar competencia", ok:true}, {o:"Exportar basura", ok:false}] },
            { t: "Operación 10: T-MEC", desc: "¿Cuál es el tratado comercial más importante de México?", opts: [{o:"T-MEC", ok:true}, {o:"TLC-EU", ok:false}] }
        ]
    };

    let current = routes[diff][window.GameScore.round - 1];
    let shuffledOpts = [...current.opts].sort(() => Math.random() - 0.5);

    area.innerHTML = `
        <div class="game-content-card">
            <img src="assets/comercio_img.png" class="game-specialty-img" alt="Comercio">
            <h3>Logística Aduanal (${diff})</h3>
            <h4 style="color:var(--color-blue);">${current.t}</h4>
            <p style="margin:1rem 0; font-size:1.1rem;">${current.desc}</p>
            <div style="display:flex; gap:1rem; flex-direction:column;">
                ${shuffledOpts.map((opt) => `<button class="game-option-btn" data-correct="${opt.ok}" onclick="checkCom(${opt.ok}, '${diff}', this)">${opt.o}</button>`).join('')}
            </div>
            <div id="game-feedback" class="game-feedback"></div>
        </div>
    `;
};

window.checkCom = function(ok, diff, btn) {
    const feedback = document.getElementById('game-feedback');
    if (!feedback) return;

    btn.parentElement.querySelectorAll('button').forEach(b => b.disabled = true);

    if(ok) {
        feedback.textContent = 'Decisión Logística Correcta.';
        btn.style.background = '#28a745'; btn.style.color = 'white';
        feedback.className = 'game-feedback success-bounce';
        window.GameScore.correct++;
    } else {
        feedback.textContent = 'Error Logístico. Mercancía retenida.';
        btn.style.background = '#dc3545'; btn.style.color = 'white';
        
        // Highlight correct answer in green
        btn.parentElement.querySelectorAll('button').forEach(b => {
             if (b.getAttribute('data-correct') === 'true') {
                 b.style.background = '#28a745'; 
                 b.style.color = 'white';
             }
        });

        feedback.className = 'game-feedback error-shake';
        window.GameScore.incorrect++;
    }

    window.GameScore.round++;
    window.updateScoreboard();

    setTimeout(() => {
        const area = document.getElementById('active-game-area');
        if(area) window.comercioGame(area, diff);
    }, 1200);
};
