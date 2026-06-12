# Bitácora de Desarrollo: Go! Cbtis 52

Esta bitácora documenta el proceso cronológico de creación y evolución del portal estudiantil **Go! Cbtis 52**, detallando la implementación de sus funciones principales y el propósito de cada tecnología utilizada.

---

## 📅 Abril 2026: Cimientos y Portal Estudiantil

### 16 de Abril, 2026: Migración al Backend y Seguridad
- **Objetivo:** Crear un sistema de gestión escolar dinámico y seguro.
- **Implementación Técnica:**
    - **SQL:** Creación de la base de datos `usuarios` con campos para especialidad, nombre y credenciales seguras.
    - **PHP:** Desarrollo de la lógica de autenticación en el servidor para permitir el acceso controlado.
    - **JS:** Manejo de la interfaz de usuario para el inicio de sesión y registro mediante peticiones asíncronas.
    - **HTML/CSS:** Diseño de la estructura responsiva del portal y la sección de perfil del alumno.
- **¿Para qué sirvió?:** Permitió que los estudiantes tuvieran una identidad digital dentro de la plataforma y que sus datos estuvieran protegidos en una base de datos profesional.

### 17 de Abril, 2026: Sistema Interactivo de Minijuegos
- **Objetivo:** Reforzar el aprendizaje técnico mediante la gamificación.
- **Implementación Técnica:**
    - **JS:** Desarrollo del motor de cuestionarios dinámicos con soporte para múltiples especialidades.
    - **HTML:** Estructuración de los contenedores de juego y modales de resultados.
    - **CSS:** Creación de una línea visual para los juegos, incluyendo retroalimentación visual (aciertos/errores).
- **¿Para qué sirvió?:** Se implementaron 3 niveles de dificultad (Fácil, Intermedio, Difícil), proporcionando una herramienta de estudio divertida y efectiva para los alumnos.

---

## 📅 Mayo 2026: Optimización y Experiencia de Usuario

### 7 de Mayo, 2026: Transformación a PWA e Instalabilidad
- **Objetivo:** Facilitar el acceso al portal desde cualquier dispositivo, incluso sin conexión estable.
- **Implementación Técnica:**
    - **JS (Service Workers):** Configuración para el almacenamiento en caché de los recursos del portal.
    - **HTML/JSON:** Implementación del manifiesto de la aplicación para permitir su instalación.
    - **CSS:** Ajustes finales de diseño para asegurar que el portal se vea y se sienta como una aplicación nativa.
- **¿Para qué sirvió?:** Los estudiantes ahora pueden instalar "Go! Cbtis 52" en sus teléfonos móviles como una aplicación, mejorando significativamente la accesibilidad.

### 8 de Mayo, 2026: Documentación y Bitácora Final
- **Objetivo:** Consolidar el conocimiento y uso del sistema.
- **Implementación Técnica:**
    - **Documentación:** Creación de guías de usuario y esta bitácora técnica.
- **¿Para qué sirvió?:** Proporcionar una trazabilidad clara de cómo se construyó el proyecto y facilitar su mantenimiento futuro.

---

## 🛠 Resumen Técnico del Proyecto

| Tecnología | Función Principal en Go! Cbtis |
| :--- | :--- |
| **HTML5** | Estructura del portal y contenedores de aprendizaje. |
| **CSS3** | Diseño visual responsivo y animaciones de interfaz. |
| **JavaScript** | Lógica de minijuegos, comunicación con el servidor y PWA. |
| **PHP** | Procesamiento de datos y seguridad de usuarios. |
| **MySQL (SQL)** | Almacenamiento persistente de la información académica. |

---

## 🚀 Estado del Proyecto
El portal **Go! Cbtis 52** se encuentra en su fase funcional completa, operando de manera fluida en entornos XAMPP y listo para ser utilizado como una herramienta de apoyo educativo integral.
