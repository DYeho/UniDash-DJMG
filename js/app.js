import { initTasksVisualDemo } from "./modules/tasks.module.js"

const viewTitles = {
    dashboard: ['Resumen Visual', 'Dashboard'],
    tasks: ['Componente Visual', 'Tareas'],
    finance: ['Componente Visual', 'Finanzas'],
    analytics: ['Componente Visual', 'Estadisticas'],
    currency: ['Componente Visual', 'Divisas'],
    news: ['Componente Visual', 'Noticias'],
}

function showView (name) {
    document.querySelectorAll('.view-section').forEach((s) => s.classList.remove('active'))
    document.querySelector(`#view-${name}`)?.classList.add('active')
    document.querySelectorAll('.nav-item').forEach ((b) => b.classList.toggle('active', b.dataset.view === name))
    const [e, t] = viewTitles[name] || viewTitles.dashboard
    document.querySelector('#page-eyebrow').textContent = e
    document.querySelector('#page-title').textContent = t
    document.querySelector('#sidebar').classList.remove('open')
}

function initNavigation () {
    document.querySelectorAll('[data-view]').forEach ((b) => b.addEventListener('click', () => showView(b.dataset.view)))

    document.querySelectorAll('[data-go-view]').forEach((b) => b.addEventListener('click', () => showView(b.dataset.goView)))

    document.querySelector('#mobile-menu-button').addEventListener('click', () => document.querySelector('#sidebar').classList.toggle('open'))
}

function bootstrap () {
    initNavigation()
    initTasksVisualDemo()
    // Falstan funiciones de los demas modulos 
    document.querySelector('#toast').textContent = 'Sesión 1 - Mock y UI/UX'
}

bootstrap()