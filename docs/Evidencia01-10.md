# Evidencia del jueves 01 de octubre de 2026

## Descripción general de la clase

En esta sesión se dio inicio al proyecto escolar **UniDash**, un dashboard personal que integra tareas, finanzas, estadísticas, divisas y noticias. Las actividades realizadas fueron:

- Inicialización del repositorio en **GitHub** y del sitio en **Netlify** para el control de versiones y el despliegue.
- Creación del archivo index.html con la estructura y el contenido inicial de la página.
- Importación de los archivos styles.css y theme.css (carpeta css/), proporcionados por el docente a través de Microsoft Teams.

## Descripción del código: index.html

El documento define la estructura base de la aplicación y se organiza en las siguientes partes:

- **Encabezado (<head>):** configura la codificación, el diseño adaptable (*viewport*) y la descripción del proyecto. Carga las librerías **Tailwind CSS 4** y **Chart.js 4.5** desde CDN, además de las hojas de estilo locales theme.css y styles.css.
- **Barra lateral (<aside id="sidebar">):** contiene la marca de la aplicación, el menú de navegación con seis vistas (Dashboard, Tareas, Finanzas, Estadísticas, Divisas y Noticias) y un pie con las tecnologías utilizadas. Cada botón utiliza el atributo data-view, que permitirá cambiar de vista mediante JavaScript.
- **Contenido principal (<main>):**
  - *Barra superior:* muestra el título de la sección, el botón de menú para dispositivos móviles y el control para detectar la ubicación del usuario.
  - *Vista Dashboard:* incluye un panel de bienvenida con un módulo de clima, cuatro tarjetas de métricas (balance, ingresos, egresos y tareas pendientes) y dos paneles con gráficas (<canvas>) de ingresos vs. egresos y de tareas pendientes.
  - *Vistas restantes:* secciones vacías (Tareas, Finanzas, Estadísticas, Divisas y Noticias) que se desarrollarán en próximas sesiones.

Los elementos con id (por ejemplo metric-balance o dashboard-finance-chart) están preparados para que JavaScript les asigne datos y renderice las gráficas posteriormente.

## Código

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="UniDash - DJMG - Proyecto escolar">
    <title>UniDash</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.min.js"></script>

    <link rel="stylesheet" href="./css/theme.css">
    <link rel="stylesheet" href="./css/styles.css">
</head>
<body class="bg-slate-950 text-slate-100">
    <aside id="sidebar" class="sidebar">   
        <div class="sidebar-brand">
            <div class="brand-mark">✨</div>
            <div>
                <p class="brand-title">UniDash</p>
                <p class="brand-subtitle">Datos Mock</p>
            </div>
        </div>
        <nav class="sidebar-nav" aria-label="Navegacion Principal">
            <button class="nav-item active" data-view="dashboard">Dashboard</button>
            <button class="nav-item" data-view="tasks">Tareas</button>
            <button class="nav-item" data-view="finance">Finanzas</button>
            <button class="nav-item" data-view="analytics">Estadisticas</button>
            <button class="nav-item" data-view="currency">Divisas</button>
            <button class="nav-item" data-view="news">Noticias</button>
        </nav>
        <div class="sidebar-footer">
            <p class="text-xs text-slate-500">
                HTML5 | TailwindCSS | JavaScript | Responsive | ChartJS
            </p>
        </div>    
    </aside>

    <main class="main-content">
        <header class="topbar">
            <button id="mobile-menu-button" class="icon-button lg:hidden" aria-label="Abrir menú">☰</button>
            <div>
                <p id="page-eyebrow" class="eyebrow">Resumen Personal</p>
                <h1 id="page-title" class="page-title">Dashboard</h1>
            </div>
            <div class="topbar-location">
                <span class="local-status">Ubicacion no detectada</span>
                <button id="detect-location-button" class="secondary-button">Detectar ubicación</button> 
            </div>
        </header>

        <section id="view-dashboard" class="view-section active">
            <div class="hero-panel">
                <div>
                    <p class="eyebrow">Tu centro de control</p>
                    <h2 class="hero-title">Organixa tu dia, controla tus finansas y consulta datos del mundo en tiempo real</h2>
                    <p class="hero-copy">Todo lo mas importante en un solo dashboard</p>
                </div>
                <div class="weather-min-card">
                    <span id="weather-icon" class="weather-icon">nube</span>
                    <div>
                        <p id="weather-temperature" class="weather-temperature">--°C</p>
                        <p id="weather-description" class="text-sm text-slate-400">Clima Proximamanete</p>
                    </div>
                </div>
            </div>

            <div class="metric-grid">
                <article class="metric-card">
                    <p class="metric-label">Balance</p>
                    <p id="metric-balance" class="metric-value">$0.00</p>
                    <p class="metric-helper">Ingresos menos egresos</p>
                </article>

                <article class="metric-cart">
                    <p class="metric-label">Ingresos</p>
                    <p id="metric-income" class="metric-value">$0.00</p>
                    <p class="metric-helper">Acumulador</p>
                </article>

                <article class="metric-cart">
                    <p class="metric-label">Egresos</p>
                    <p id="metric-expense" class="metric-value">$0.00</p>
                    <p class="metric-helper">Acumulados</p>
                </article>

                <article class="metric-cart">
                    <p class="metric-label">Tareas pendientes</p>
                    <p id="metric-pending" class="metric-value">0</p>
                    <p class="metric-helper">
                        <span id="metric-overdue">0</span>Vencidad
                    </p>
                </article>
            </div>
            <div class="dashboard-grid">
                <article class="panel">
                    <div class="panel-heading">
                        <p class="eyebrow">Finanzas</p>
                        <h3 class="panel-title">Ingresos vs egresos</h3>   
                    </div>

                    <button class="link-button" data-go-view="analytics">Ver Estadisticas</button>
                    <div class="chart-wrapper compact-chart">
                        <canvas id="dashboard-finance-chart"></canvas>    
                    </div>
                </article>

                <article class="panel">
                    <div class="panel-heading">
                        <p class="eyebrow">Productividad</p>
                        <h3 class="panel-title">Tareas pendientes</h3>   
                    </div>

                    <button class="link-button" data-go-view="tasks">Ver Tareas</button>
                    <div class="char-wrapper compact-chart">
                        <canvas id="dashboard-task-chart" class="stack-list"></canvas>    
                    </div>
                </article>

            </div>
            <div class="dashboard-grid">
                
            </div>
        </section>

        <section id="view-tasks" class="view-section"></section>
        <section id="view-finance" class="view-section"></section>
        <section id="view-analytics" class="view-section"></section>
        <section id="view-currency" class="view-section"></section>
        <section id="view-news" class="view-section"></section>
    </main>
</body>
</html>
```