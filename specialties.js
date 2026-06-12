// Data and rendering specifically for Specialties

window.specialties = [
    {
        id: 'prog', title: 'Programación',
        description: 'Construye el futuro digital. Aprende múltiples lenguajes de código para desarrollar aplicaciones, sitios web funcionales y administrar la lógica detrás de los servidores automatizando procesos.',
        image: 'assets/prog_img.png', gameType: 'logic',
        detailDesc: 'La programación es el lenguaje del futuro. Aprenderás a darle instrucciones directas a las computadoras para resolver problemas automatizados, creando bases de datos seguras e interfaces de usuario increíbles.',
        materials: 'Computadora personal (recomendable mín. 8GB RAM), Entornos de Desarrollo Integrado (VS Code), acceso a internet, cuentas de hosting y repositorios como GitHub.',
        examples: ['Creación de páginas web (Tiendas virtuales, Blogs).', 'Desarrollo de Apps Móviles Interactivas.', 'Mantenimiento de Servidores y Soporte Técnico.'],
        labor: 'Toda empresa actual necesita presencia digital. Podrás trabajar desde casa (Home Office) para empresas extranjeras, como Desarrollador Junior en startups, Analista de Datos, o creando tus propias aplicaciones de cobro.'
    },
    {
        id: 'conta', title: 'Contabilidad',
        description: 'Domina las finanzas corporativas. Analiza balances, presupuestos y el marco fiscal legal para salvaguardar la salud económica de los negocios, optimizando sus utilidades y evitando sanciones.',
        image: 'assets/conta_img.png', gameType: 'math',
        detailDesc: 'Aprenderás a controlar el flujo de dinero, auditar cuentas empresariales, y entender el marco legal tributario. Toda empresa financieramente sana necesita expertos contables para administrar recursos y evitar crisis.',
        materials: 'Calculadora financiera o científica básica, cuadernos de hojas ledger, software contable y fiscal (p.ej. COI/NOI), libretas de balance, y compendios actualizados de la Ley de Impuestos y nómina.',
        examples: ['Cálculo de nóminas, aguinaldos y finiquitos.', 'Declaraciones de impuestos al sistema de administración.', 'Auditoría de libros mayores y elaboracion de Balances Generales.'],
        labor: 'Podrás ingresar a Despachos contables privados, Departamentos de finanzas de empresas transnacionales, Bancos o laborar como Consultor Financiero independiente ayudando a negocios locales.'
    },
    {
        id: 'fae', title: 'Fuentes Alternas de Energía',
        description: 'Lidera la transición verde mundial. Diseña e implementa ecologías eléctricas sustentables como paneles solares y generadores eólicos minimizando permanentemente el impacto ambiental.',
        image: 'assets/fae_img.png', gameType: 'drag',
        detailDesc: 'El mundo se dirige irreversiblemente hacia un escenario verde. Aquí analizarás, diagnosticarás y propondrás redes impulsadas por energía solar, eólica y fotovoltaica cuidando el impacto ambiental.',
        materials: 'Multímetros digitales, kits de celdas fotovoltaicas de práctica escolar, protoboards de circuitos impresos, cables conductores, cautín, inversores de corriente básicos pequeños y motores miniatura.',
        examples: ['Modelado de sistemas de paneles solares residenciales.', 'Medición de cargas y circuitos eléctricos sostenibles.', 'Diseño e investigación de turbinas y motores eco-amigables.'],
        labor: 'Alta demanda en empresas de manufactura automotriz o eléctrica, Parques solares y eólicos, Organizaciones de sustentabilidad, o emprendiendo negocios de instalación de celdas solares en hogares.'
    },
    {
        id: 'ofi', title: 'Ofimática',
        description: 'Controla el flujo de información corporativa. Sé experto en automatizar bases métricas usando macros corporativos, bases de datos masivas y estructurando redes ofimáticas funcionales.',
        image: 'assets/ofi_img.png', gameType: 'typing',
        detailDesc: 'Conocerás el núcleo de la operación corporativa. Serás experto en manipular procesadores de texto, hojas de cálculo avanzadas corporativas, diseño de presentaciones e infraestructura de información de red.',
        materials: 'Paquetería de Ofimática instalada (Microsoft Office / Google Workspace), teclado de trabajo (ideal mecánicos o ergonómicos para práctica veloz), unidades de respaldo corporativo USB, e impresoras/escáneres.',
        examples: ['Automatización con Macros en Excel y tablas dinámicas veloces.', 'Configuración de correos, agendas corporativas y servidores locales.', 'Captura y procesamiento de miles de datos diarios.'],
        labor: 'Podrás ocupar puestos como Asistente Ejecutivo de Gerencia, Analista de Captura de Datos, Administrador de inventarios comerciales o cualquier puesto logístico secretarial en grandes corporativos.'
    },
    {
        id: 'comercio', title: 'Comercio Internacional',
        description: 'Conecta mercados transatlánticos. Gestiona pedimentos legales, calcula rutas logísticas masivas y coordina las importaciones navieras y continentales mediante las leyes de aduana y aranceles tarifarios.',
        image: 'assets/comercio_img.png', gameType: 'sim',
        detailDesc: 'Todo producto extranjero que compras pasó por una aduana y una ruta logística inmensa. Aprenderás las regulaciones constitucionales, tratados de libre comercio, y esquemas de importación/exportación mundial.',
        materials: 'Diario Oficial de la Federación (DOF), Libros de clasificación arancelaria corporativas (Ley de Impuestos TIGIE), formatos de pedimentos simulados escolares y copias de los Tratados de Libre Comercio.',
        examples: ['Clasificación arancelaria en pedimentos aduanales para pagar impuestos correctos.', 'Cálculo de incoterms y costos de fletes marítimos o aéreos.', 'Coordinar con un Centro de Distribución Global.'],
        labor: 'Trabajar dentro de Agencias Aduanales, Puertos Navieros, Tráfico Portuario e Intermodal, o departamentos de Compras Extranjeras en comercializadoras y maquiladoras.'
    },
    {
        id: 'lab', title: 'Laboratorio Clínico',
        description: 'Explora y diagnostica patógenos ocultos en el cuerpo. Analiza muestras bioquímicas, procesos microbiológicos y convierte el microscopio en tu herramienta para salvar la vida de miles de pacientes.',
        image: 'assets/lab_img.png', gameType: 'memo',
        detailDesc: 'Te sumergirás en la ciencia de los fluidos e investigación del cuerpo. Procesarás muestras de sangre, saliva y agentes para identificar enfermedades, convirtiéndote en el aliado silencioso e indispensable del médico.',
        materials: 'Bata blanca de laboratorio obligatoria, tubos de ensayo, cajas pipetas, portaobjetos, microscopio óptico escolar, reactivos químicos básicos (tinción, hemoclasificadores), guantes de nitrilo y cubre bocas clínico.',
        examples: ['Extracción correcta y etiquetado de muestras hemáticas bajo protocolos NOM.', 'Ensayo en microscopio bacteriológico.', 'Procesamiento de cultivos virales o microbiología en agar.'],
        labor: 'Plazas en Hospitales Privados y Públicos, Bancos de Sangre, Laboratorios Químicos y Farmacéuticas procesando medicamentos y cosméticos.'
    },
    {
        id: 'rh', title: 'Administración de RH',
        description: 'Recluta, capacita e incentiva el recurso humano empresarial. Aplica pruebas piscométricas para selección corporativa asegurando la lealtad de la plantilla y evitando conflictos por problemas laborales.',
        fallbackText: 'RRHH', image: '', gameType: 'rh',
        detailDesc: 'El recurso más valioso de una empresa es su gente. Aprenderás dinámicas de psicología grupal, selección del talento ideal para cada puesto, cómo apaciguar conflictos laborales y mantener presupuestos estables.',
        materials: 'Formatos de Pruebas psicométricas impresas (Cleaver, Machover, Machiavelo), formatos de nómina blanca y finiquitos reales, casos prácticos empresariales impresos y la Ley Federal del Trabajo actualizada.',
        examples: ['Entrevistas laborales psicológicas y pruebas psicométricas.', 'Generación de cultura empresarial (Bonos, eventos, etc).', 'Aplicación de la Ley Federal del Trabajo para despidos y contrataciones legales.'],
        labor: 'Las agencias departamentales, maquiladoras, hospitales, agencias y cualquier entidad que posea más de 10 empleados buscará tu perfil en puestos analíticos y Jefaturas de Reclutamiento, Selección y Capacitación.'
    }
];

window.renderDashboard = function() {
    const specialtiesContainer = document.getElementById('specialties-container');
    const gamesContainer = document.getElementById('games-container');
    if (!specialtiesContainer || !gamesContainer) return;
    
    specialtiesContainer.innerHTML = '';
    gamesContainer.innerHTML = '';
    
    window.specialties.forEach((sp, idx) => {
        let imageHTML = sp.image ? `<img src="${sp.image}" alt="${sp.title}" class="card-img" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'card-img placeholder-img\\'>${sp.title[0]}</div>';">` 
                                 : `<div class="card-img placeholder-img">${sp.fallbackText}</div>`;

        // Info Card
        const infoCard = document.createElement('div');
        infoCard.className = `specialty-card fade-in`;
        infoCard.style.animationDelay = `${idx * 0.1}s`;
        infoCard.innerHTML = `
            ${imageHTML}
            <div class="card-content">
                <h4>${sp.title}</h4>
                <p>${sp.description}</p>
                <button class="btn-detail" onclick="openSpecialtyDetail('${sp.id}')">Leer Más</button>
            </div>
        `;
        specialtiesContainer.appendChild(infoCard);

        // Game Card
        const gameCard = document.createElement('div');
        gameCard.className = `specialty-card game-card fade-in`;
        gameCard.style.animationDelay = `${idx * 0.1}s`;
        gameCard.onclick = () => window.preloadGame(sp.id);
        gameCard.innerHTML = `
            <div class="card-content" style="align-items:center; text-align:center; justify-content:center; min-height:150px;">
                <h4 style="font-size:1.4rem;">Jugar: ${sp.title}</h4>
                <p style="margin-top:1rem; color:var(--color-text);">Haz clic para entrar al simulador</p>
            </div>
        `;
        gamesContainer.appendChild(gameCard);
    });
};

window.openSpecialtyDetail = function(id) {
    const sp = window.specialties.find(s => s.id === id);
    if (!sp) return;

    document.getElementById('detail-title').textContent = sp.title;
    document.getElementById('detail-desc').textContent = sp.detailDesc;
    document.getElementById('detail-jobs').textContent = sp.labor;
    
    const matsElement = document.getElementById('detail-materials');
    if(matsElement) matsElement.textContent = sp.materials || 'No especificados.';
    
    // Lista de ejemplos
    const ul = document.getElementById('detail-examples');
    ul.innerHTML = '';
    sp.examples.forEach(ex => {
        const li = document.createElement('li');
        li.textContent = ex;
        ul.appendChild(li);
    });

    // Image Handle
    const heroBox = document.getElementById('detail-hero-box');
    if(sp.image) {
        heroBox.innerHTML = `<img id="detail-img" src="${sp.image}" alt="${sp.title}" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'placeholder-img\\'>${sp.title}</div>';">`;
    } else {
        heroBox.innerHTML = `<div class="placeholder-img">${sp.title}</div>`;
    }

    if (window.switchView) {
        window.switchView('view-specialty-detail');
    }
};
