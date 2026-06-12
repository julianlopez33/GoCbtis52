// Main Application Logic

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginAgeInput = document.getElementById('login-age');
const regAgeInput = document.getElementById('reg-age');
const btnShowLogin = document.getElementById('btn-show-login');
const btnShowRegister = document.getElementById('btn-show-register');
const views = document.querySelectorAll('.view');
const navBtns = document.querySelectorAll('.nav-btn[data-tab]');
const diffSelector = document.getElementById('difficulty-selector');
const gameArena = document.getElementById('game-arena');
const gameTitle = document.getElementById('game-title');

let currentSpecialty = null;
let currentTutorialStep = 0;

const tutorialSteps = [
    {
        title: "Tablero Principal",
        desc: "Este es el corazón de la plataforma. Aquí podrás acceder a todas las secciones rápidamente desde el menú superior.",
        icon: "🏠"
    },
    {
        title: "Novedades CBTIS 52",
        desc: "Mantente al tanto de las últimas noticias, eventos y convocatorias importantes de nuestra institución.",
        icon: "🔔"
    },
    {
        title: "Especialidades Técnicas",
        desc: "Explora las diferentes carreras que ofrecemos. Haz clic en 'Leer más' para conocer qué aprenderás y dónde podrás trabajar.",
        icon: "📚"
    },
    {
        title: "Minijuegos Interactivos",
        desc: "¡Aprende jugando! Cada especialidad tiene un reto único que pondrá a prueba tus conocimientos de forma divertida.",
        icon: "🎮"
    },
    {
        title: "Tu Perfil",
        desc: "Aquí podrás ver tus datos registrados y en un futuro personalizar tu experiencia en el portal.",
        icon: "👤"
    }
];

// View Switching
window.switchView = function(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
    }
}

// Tabs Switching
navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if(e.target.classList.contains('logout-btn')) return;
        window.goToTab(e.target.getAttribute('data-tab'));
    });
});

window.goToTab = function(tabId) {
    navBtns.forEach(b => {
        if(b.getAttribute('data-tab') === tabId) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    const targetTab = document.getElementById(tabId);
    if(targetTab) targetTab.classList.add('active');
    
    // Scroll to top when switching tabs
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelector('.logout-btn').addEventListener('click', () => { loginForm.reset(); registerForm.reset(); window.switchView('view-auth'); });
document.querySelector('.back-to-login').addEventListener('click', () => { loginForm.reset(); registerForm.reset(); window.switchView('view-auth'); });
document.querySelectorAll('.btn-back-dashboard').forEach(b => b.addEventListener('click', () => window.switchView('view-dashboard')));

// View Auth Toggles
btnShowLogin.addEventListener('click', () => {
    btnShowLogin.classList.add('active');
    btnShowRegister.classList.remove('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});

btnShowRegister.addEventListener('click', () => {
    btnShowRegister.classList.add('active');
    btnShowLogin.classList.remove('active');
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
});

// Auth Handlers
function handleAuth(e, ageInputVal) {
    e.preventDefault();
    const age = parseInt(ageInputVal, 10);
    if (age >= 13 && age <= 15) {
        if (window.renderDashboard) window.renderDashboard();
        if (window.renderNews) window.renderNews();
        
        // Verificar si ya vio el tutorial
        const tutorialSeen = localStorage.getItem('tutorialSeen');
        console.log("Tutorial visto anteriormente:", tutorialSeen);
        
        if (!tutorialSeen) {
            window.switchView('view-onboarding');
        } else {
            window.switchView('view-dashboard');
        }
    } else {
        window.switchView('view-rejection');
    }
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const loginEmail = document.getElementById('login-name').value;
    const loginPass = document.getElementById('login-pass').value;

    try {
        const response = await fetch('backend/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo: loginEmail, password: loginPass })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Populate profile data
            if (result.data) {
                document.getElementById('profile-name-display').textContent = result.data.nombre || 'Usuario';
                document.getElementById('profile-email-display').textContent = result.data.correo || loginEmail;
                document.getElementById('profile-age-display').textContent = (result.data.edad || loginAgeInput.value) + ' años';
            }
            
            handleAuth(e, loginAgeInput.value); // Procede con acceso a UI
        } else {
            alert(result.message); // El mensaje de error lo da el PHP directo
        }
    } catch (error) {
        alert('Error crítico de Servidor. ¿Es seguro que tu carpeta está ejecutándose bajo `xampp/htdocs/` y tu Apache/MySQL están encendidos?');
        console.error(error);
    }
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const age = parseInt(regAgeInput.value, 10);
    const regPass = document.getElementById('reg-pass').value;
    const regPassConfirm = document.getElementById('reg-pass-confirm').value;
    const regEmail = document.getElementById('reg-email').value;
    const regName = document.getElementById('reg-name').value;

    if (regPass !== regPassConfirm) {
        alert('Las contraseñas no coinciden. Por favor, verifícalas e inténtalo de nuevo.');
        return;
    }

    if (age >= 13 && age <= 15) {
        try {
            const response = await fetch('backend/registro.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: regName, correo: regEmail, edad: age, password: regPass })
            });
            
            const result = await response.json();
            
            if(result.success) {
                alert(result.message);
                registerForm.reset();
                btnShowLogin.click(); // Alterna visualmente hacia la pestaña de Login
            } else {
                alert("Servidor respondió con error: " + result.message);
            }
        } catch (error) {
            alert('Error crítico de Servidor. ¿Es seguro que tu carpeta está dentro de htdocs y corres MySQL?');
            console.error(error);
        }
    } else {
        window.switchView('view-rejection');
    }
});

window.preloadGame = function(id) {
    if(!window.specialties) return;
    currentSpecialty = window.specialties.find(s => s.id === id);
    if (!currentSpecialty) return;
    
    gameTitle.textContent = currentSpecialty.title;
    diffSelector.style.display = 'block';
    gameArena.style.display = 'none';
    document.getElementById('active-scoreboard').style.display = 'none'; 
    gameArena.innerHTML = '';
    window.switchView('view-minigame');
}

window.startGame = function(diff) {
    diffSelector.style.animation = 'none';
    diffSelector.style.display = 'none';
    
    // Configurar Marcador Global
    let maxRounds = 3;
    if (diff === 'medio') maxRounds = 5;
    if (diff === 'dificil') maxRounds = 10;
    
    window.GameScore = { correct: 0, incorrect: 0, round: 1, max: maxRounds };
    document.getElementById('active-scoreboard').style.display = 'flex';
    window.updateScoreboard();

    gameArena.style.display = 'block';
    gameArena.innerHTML = `<div class="game-area" id="active-game-area"></div>`;
    
    const area = document.getElementById('active-game-area');
    const type = currentSpecialty.gameType;
    
    if(type === 'logic') window.progGame(area, diff);
    if(type === 'math') window.contaGame(area, diff);
    if(type === 'drag') window.faeGame(area, diff);
    if(type === 'typing') window.ofiGame(area, diff);
    if(type === 'sim') window.comercioGame(area, diff);
    if(type === 'memo') window.labGame(area, diff);
    if(type === 'rh') window.rhGame(area, diff);
}

window.updateScoreboard = function() {
    const sr = document.getElementById('score-round');
    const sm = document.getElementById('score-max');
    const sc = document.getElementById('score-correct');
    const si = document.getElementById('score-incorrect');
    if (!sr || !sm || !sc || !si) return;
    sr.textContent = window.GameScore.round > window.GameScore.max ? window.GameScore.max : window.GameScore.round;
    sm.textContent = window.GameScore.max;
    sc.textContent = window.GameScore.correct;
    si.textContent = window.GameScore.incorrect;
}

window.checkGameOver = function(areaId) {
    const area = document.getElementById(areaId);
    if (!area) return false;
    
    if (window.GameScore.round > window.GameScore.max) {
        area.innerHTML = `
            <div class="animate-pop">
                <h3 style="color:var(--color-blue); font-size:2rem; margin-bottom:1rem;">¡Reto Terminado!</h3>
                <p style="font-size:1.2rem; margin-bottom:0.5rem;">Resultados Obtenidos:</p>
                <p style="font-size:1.5rem; color:#28a745; font-weight:bold;">Aciertos: ${window.GameScore.correct}</p>
                <p style="font-size:1.5rem; color:#dc3545; font-weight:bold; margin-bottom:2rem;">Errores: ${window.GameScore.incorrect}</p>
                <button class="btn-primary" style="width:auto; padding: 1rem 3rem;" onclick="switchView('view-dashboard')">Volver al Menú</button>
            </div>
        `;
        return true;
    }
    return false;
}
// ======= TUTORIAL LOGIC =======
document.getElementById('btn-start-tutorial').addEventListener('click', () => {
    currentTutorialStep = 0;
    renderTutorialStep();
    window.switchView('view-tutorial');
});

document.getElementById('btn-skip-tutorial').addEventListener('click', () => {
    finishTutorial();
});

document.getElementById('btn-tutorial-next').addEventListener('click', () => {
    if (currentTutorialStep < tutorialSteps.length - 1) {
        currentTutorialStep++;
        renderTutorialStep();
    }
});

document.getElementById('btn-tutorial-prev').addEventListener('click', () => {
    if (currentTutorialStep > 0) {
        currentTutorialStep--;
        renderTutorialStep();
    }
});

document.getElementById('btn-tutorial-finish').addEventListener('click', () => {
    finishTutorial();
});

function renderTutorialStep() {
    const step = tutorialSteps[currentTutorialStep];
    const contentArea = document.getElementById('tutorial-content-area');
    const dotsContainer = document.getElementById('tutorial-dots');
    const btnNext = document.getElementById('btn-tutorial-next');
    const btnPrev = document.getElementById('btn-tutorial-prev');
    const btnFinish = document.getElementById('btn-tutorial-finish');

    // Render Content
    contentArea.innerHTML = `
        <div class="tutorial-image">${step.icon}</div>
        <h2>${step.title}</h2>
        <p>${step.desc}</p>
    `;

    // Render Dots
    dotsContainer.innerHTML = tutorialSteps.map((_, i) => 
        `<div class="dot ${i === currentTutorialStep ? 'active' : ''}"></div>`
    ).join('');

    // Update Buttons
    btnPrev.style.display = currentTutorialStep === 0 ? 'none' : 'block';
    
    if (currentTutorialStep === tutorialSteps.length - 1) {
        btnNext.style.display = 'none';
        btnFinish.style.display = 'block';
    } else {
        btnNext.style.display = 'block';
        btnFinish.style.display = 'none';
    }
}

function finishTutorial() {
    localStorage.setItem('tutorialSeen', 'true');
    window.switchView('view-dashboard');
}

// Permitir reiniciar el tutorial desde el perfil
window.resetTutorial = function() {
    localStorage.removeItem('tutorialSeen');
    alert("Tutorial reiniciado. La próxima vez que inicies sesión verás la bienvenida.");
}

