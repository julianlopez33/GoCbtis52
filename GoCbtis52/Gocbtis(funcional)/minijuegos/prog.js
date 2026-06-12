// 1. Programación
window.progGame = function(area, diff) {
    if (window.checkGameOver('active-game-area')) return;

    const questions = {
        facil: [
            { 
                q: "let numero = 5;\nconsole.log(numero + 2);", 
                opts: ["7", "5", "2", "52"], 
                a: "7" 
            },
            { 
                q: "let saludo = 'Hola';\nlet nombre = 'Ana';\nconsole.log(saludo + ' ' + nombre);", 
                opts: ["'Hola Ana'", "'HolaAna'", "'Ana Hola'", "Error"], 
                a: "'Hola Ana'" 
            },
            { 
                q: "let llueve = false;\nconsole.log(llueve);", 
                opts: ["false", "true", "llueve", "undefined"], 
                a: "false" 
            }
        ],
        medio: [
            { 
                q: "let x = 10;\nx = x + 5;\nconsole.log(x);", 
                opts: ["15", "10", "5", "x"], 
                a: "15" 
            },
            { 
                q: "let edad = 18;\nif (edad >= 18) {\n  console.log('Mayor de edad');\n} else {\n  console.log('Menor de edad');\n}", 
                opts: ["'Mayor de edad'", "'Menor de edad'", "18", "Error"], 
                a: "'Mayor de edad'" 
            },
            { 
                q: "let frutas = ['Manzana', 'Plátano'];\nconsole.log(frutas.length);", 
                opts: ["2", "1", "3", "0"], 
                a: "2" 
            },
            { 
                q: "let suma = 0;\nfor (let i = 1; i <= 3; i++) {\n  suma = suma + i;\n}\nconsole.log(suma);", 
                opts: ["6", "3", "4", "5"], 
                a: "6" 
            },
            { 
                q: "let activo = true;\nconsole.log(!activo);", 
                opts: ["false", "true", "activo", "Error"], 
                a: "false" 
            }
        ],
        dificil: [
            { 
                q: "let a = 10;\nlet b = 20;\nif (a > b) {\n  console.log(a);\n} else {\n  console.log(b);\n}", 
                opts: ["20", "10", "a", "b"], 
                a: "20" 
            },
            { 
                q: "let frutas = ['Manzana', 'Plátano', 'Naranja'];\nconsole.log(frutas[0]);", 
                opts: ["'Manzana'", "'Plátano'", "'Naranja'", "undefined"], 
                a: "'Manzana'" 
            },
            { 
                q: "let contador = 0;\nwhile (contador < 3) {\n  contador++;\n}\nconsole.log(contador);", 
                opts: ["3", "2", "4", "0"], 
                a: "3" 
            },
            { 
                q: "function duplicar(n) {\n  return n * 2;\n}\nconsole.log(duplicar(4));", 
                opts: ["8", "4", "2", "16"], 
                a: "8" 
            },
            { 
                q: "let x = 15;\nlet residuo = x % 2;\nconsole.log(residuo);", 
                opts: ["1", "0", "7.5", "2"], 
                a: "1" 
            },
            { 
                q: "let valor = '10';\nif (valor === 10) {\n  console.log('Igual');\n} else {\n  console.log('Diferente');\n}", 
                opts: ["'Diferente'", "'Igual'", "10", "Error"], 
                a: "'Diferente'" 
            },
            { 
                q: "let numero = 5;\nnumero *= 3;\nconsole.log(numero);", 
                opts: ["15", "5", "8", "3"], 
                a: "15" 
            },
            { 
                q: "let nombre = '';\nif (nombre) {\n  console.log('Tiene nombre');\n} else {\n  console.log('Vacío');\n}", 
                opts: ["'Vacío'", "'Tiene nombre'", "nombre", "undefined"], 
                a: "'Vacío'" 
            },
            { 
                q: "let arreglo = [1, 2, 3];\narreglo.push(4);\nconsole.log(arreglo);", 
                opts: ["[1, 2, 3, 4]", "[1, 2, 3]", "[4, 1, 2, 3]", "Error"], 
                a: "[1, 2, 3, 4]" 
            },
            { 
                q: "let x = 5;\nlet y = 10;\nlet z = (x > 3 && y < 15);\nconsole.log(z);", 
                opts: ["true", "false", "undefined", "null"], 
                a: "true" 
            }
        ]
    };

    let current = questions[diff][window.GameScore.round - 1];
    let shuffledOpts = [...current.opts].sort(() => Math.random() - 0.5);

    area.innerHTML = `
        <div class="game-content-card">
            <img src="assets/prog_img.png" class="game-specialty-img" alt="Programación">
            <h3>Depuración de Código (${diff})</h3>
            <div class="logic-puzzle-code">${current.q}</div>
            <p>¿Qué imprimirá esta consola?</p>
            <div class="game-quiz-options">
                ${shuffledOpts.map((o) => {
                    const isCorrect = o === current.a;
                    return `<button class="game-option-btn" data-correct="${isCorrect}" onclick="genCheck(this, ${isCorrect}, 'progGame', '${diff}')">${o.replace(/</g, "&lt;")}</button>`;
                }).join('')}
            </div>
            <div id="game-feedback" class="game-feedback"></div>
        </div>
    `;
};

// Evaluador Universal para Prog y Conta
window.genCheck = function(btn, isCorrect, gameFuncStr, diff) {
    const feedback = document.getElementById('game-feedback');
    if (!feedback) return; 

    const buttons = btn.parentElement.querySelectorAll('button');
    buttons.forEach(b => b.disabled = true);

    if (isCorrect) {
        btn.style.background = '#28a745'; btn.style.color = 'white';
        feedback.textContent = '¡Correcto!';
        feedback.className = 'game-feedback success-bounce';
        window.GameScore.correct++;
    } else {
        btn.style.background = '#dc3545'; btn.style.color = 'white';
        
        // Highlight correct answer in green
        buttons.forEach(b => {
            if (b.getAttribute('data-correct') === 'true') {
                b.style.background = '#28a745';
                b.style.color = 'white';
            }
        });

        feedback.textContent = 'Respuesta incorrecta.';
        feedback.className = 'game-feedback error-shake';
        window.GameScore.incorrect++;
    }
    
    window.GameScore.round++;
    window.updateScoreboard();
    
    setTimeout(() => {
        const area = document.getElementById('active-game-area');
        if(area && window[gameFuncStr]) window[gameFuncStr](area, diff);
    }, 1200);
};
