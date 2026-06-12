// 2. Contabilidad
window.contaGame = function(area, diff) {
    if (window.checkGameOver('active-game-area')) return;

    const questions = {
        facil: [
            { q: "Una venta de $100 tiene un IVA del 16%. ¿Cuánto es el IVA?", opts: ["$10", "$16", "$116", "$0"], a: "$16" },
            { q: "Si tienes 5 de Activo y 2 de Pasivo. ¿Cuánto es tu Capital?", opts: ["3", "7", "2", "10"], a: "3" },
            { q: "Compras un bien por $200 + IVA (16%). Total a pagar:", opts: ["$200", "$216", "$232", "$16"], a: "$232" }
        ],
        medio: [
            { q: "Ingreso Bruto: $10,000. Deducciones: $2,500. ISR (10% neto).", opts: ["$1,000", "$250", "$750", "$7,500"], a: "$750" },
            { q: "¿En qué estado financiero aparecen Costos y Gastos?", opts: ["Balance Gral", "Estado Resultados", "Flujo Caja", "Balance Comprobación"], a: "Estado Resultados" },
            { q: "Vendes mercancía que costó $1200 en $2000. Utilidad bruta:", opts: ["$3200", "$800", "$1200", "$2000"], a: "$800" },
            { q: "Activos: $20,000. Pasivos: $8,000. ¿Capital Social?", opts: ["$28,000", "$12,000", "$8,000", "$40,000"], a: "$12,000" },
            { q: "Venta: $500. IVA: 16%. Total Facturado:", opts: ["$580", "$516", "$600", "$500"], a: "$580" }
        ],
        dificil: [
            { q: "Balance: Activos = $50,000. Capital = $20,000. ¿Pasivo total?", opts: ["$30,000", "$70,000", "$50,000", "$0"], a: "$30,000" },
            { q: "Tasa de depreciación lineal equipo cómputo anual (México):", opts: ["10%", "20%", "30%", "25%"], a: "30%" },
            { q: "Si pagas sueldos por $5,000 y retienes $500 de ISR, la póliza cargo/abono a bancos es:", opts: ["Cargo 5000", "Abono 4500", "Abono 5000", "Cargo 4500"], a: "Abono 4500" },
            { q: "Calcula el IVA (16%) de un producto que cuesta $3,450:", opts: ["$552", "$345", "$1,000", "$4,002"], a: "$552" },
            { q: "¿Qué tipo de cuenta es 'Proveedores'?", opts: ["Activo", "Pasivo", "Capital", "Egreso"], a: "Pasivo" },
            { q: "Un activo de $10,000 se deprecia 10% anual. Valor neto tras 2 años:", opts: ["$9,000", "$8,000", "$10,000", "$7,000"], a: "$8,000" },
            { q: "¿Qué principio contable obliga a registrar una pérdida probable?", opts: ["Dualidad Económica", "Devengación", "Prudencia", "Consistencia"], a: "Prudencia" },
            { q: "Si una empresa tiene liquidez de 2:1, significa que por cada peso de deuda tiene:", opts: ["1 peso de activo", "2 pesos de activo", "0.5 pesos de activo", "Igual de deuda"], a: "2 pesos de activo" },
            { q: "¿Cuál es el libro donde se registran cronológicamente las operaciones?", opts: ["Libro Mayor", "Balanza", "Libro Diario", "Inventario"], a: "Libro Diario" },
            { q: "Un cargo en una cuenta de Activo representa:", opts: ["Disminución", "Aumento", "Saldo Acreedor", "Cierre"], a: "Aumento" }
        ]
    };

    let current = questions[diff][window.GameScore.round - 1];
    let shuffledOpts = [...current.opts].sort(() => Math.random() - 0.5);

    area.innerHTML = `
        <div class="game-content-card">
            <img src="assets/conta_img.png" class="game-specialty-img" alt="Contabilidad">
            <h3>Auditoría Financiera (${diff})</h3>
            <p style="font-size:1.2rem; margin:1rem 0;">${current.q}</p>
            <div class="game-quiz-options">
                ${shuffledOpts.map((o) => {
                    const isCorrect = o === current.a;
                    return `<button class="game-option-btn" data-correct="${isCorrect}" onclick="genCheck(this, ${isCorrect}, 'contaGame', '${diff}')">${o}</button>`;
                }).join('')}
            </div>
            <div id="game-feedback" class="game-feedback"></div>
        </div>
    `;
};
