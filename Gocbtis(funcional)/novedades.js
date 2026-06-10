// Data and rendering specifically for Novedades (News Feed)

window.novedades = [
    {
        title: 'Convocatoria Extraordinaria Semestral',
        date: '16 Abr',
        content: '¡Atención alumnos! Ya están publicadas las fechas para los exámenes extraordinarios del semestre actual. Verifica el calendario en las ventanillas de control escolar y prepárate con tiempo.'
    },
    {
        title: 'Torneo Regional de Robótica y Algoritmia',
        date: '10 May',
        content: 'Nuestros alumnos de la especialidad de Programación y Ofimática obtuvieron el 1er lugar en diseño de algoritmos autónomos, venciendo a más de 12 planteles de educación media superior de la región. ¡Orgullo DGETI!'
    },
    {
        title: 'Jornada de Donación de Sangre',
        date: '02 May',
        content: 'Invitamos a todos los estudiantes y docentes a la jornada altruista organizada por Laboratorio Clínico este viernes en el auditorio principal.'
    },
    {
        title: 'Apertura del Nuevo Taller Fotovoltaico',
        date: '28 Abr',
        content: 'Se ha inaugurado el nuevo parque de inversores solares para las prácticas de Fuentes Alternas. A partir del lunes se habilitan las reservaciones de equipo.'
    },
    {
        title: 'Muestra Aduanera Estudiantil',
        date: '15 Abr',
        content: 'Asiste a la exposición de rutas de Logística Terrestre realizada por los alumnos de Comercio Internacional en el domo deportivo.'
    }
];

window.renderNews = function() {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;
    
    newsContainer.innerHTML = '';
    
    window.novedades.forEach((news, idx) => {
        const card = document.createElement('div');
        card.className = `news-card fade-in`;
        card.style.animationDelay = `${idx * 0.1}s`;
        
        card.innerHTML = `
            <div class="news-content">
                <h4>${news.title}</h4>
                <p>${news.content}</p>
            </div>
            <div class="news-date">${news.date}</div>
        `;
        
        newsContainer.appendChild(card);
    });
};
