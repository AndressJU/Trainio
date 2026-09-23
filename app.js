/**
 * TRAINIO (Coach Personal) - Core Application Logic
 * Desarrollado para gestión integral de atletas, rutinas, progreso y calendario.
 */

// ==========================================
// 1. BASE DE DATOS INICIAL (MOCK DATA)
// ==========================================
const DEFAULT_EXERCISES = [
  // Pecho
  { id: 'ex_1', name: 'Press de Banca Plano', muscle: 'Pecho', defaultSets: '4', defaultReps: '8-10', tempo: '3-0-1', rest: '90s' },
  { id: 'ex_2', name: 'Press Inclinado con Mancuernas', muscle: 'Pecho', defaultSets: '3', defaultReps: '10-12', tempo: '2-0-1', rest: '75s' },
  { id: 'ex_3', name: 'Cruces en Polea Media', muscle: 'Pecho', defaultSets: '3', defaultReps: '12-15', tempo: '2-1-2', rest: '60s' },
  { id: 'ex_4', name: 'Fondos en Paralelas (Dips)', muscle: 'Pecho', defaultSets: '3', defaultReps: '8-10', tempo: '2-0-1', rest: '90s' },
  // Espalda
  { id: 'ex_5', name: 'Dominadas Pronas / Lastre', muscle: 'Espalda', defaultSets: '4', defaultReps: '6-8', tempo: '2-1-1', rest: '120s' },
  { id: 'ex_6', name: 'Remo con Barra 90º', muscle: 'Espalda', defaultSets: '4', defaultReps: '8-10', tempo: '2-0-1', rest: '90s' },
  { id: 'ex_7', name: 'Jalón al Pecho Agarre Neutro', muscle: 'Espalda', defaultSets: '3', defaultReps: '10-12', tempo: '3-0-1', rest: '75s' },
  { id: 'ex_8', name: 'Remo Gironda Unilateral', muscle: 'Espalda', defaultSets: '3', defaultReps: '12', tempo: '2-1-1', rest: '60s' },
  // Pierna
  { id: 'ex_9', name: 'Sentadilla Trasera Barra Alta', muscle: 'Pierna', defaultSets: '4', defaultReps: '6-8', tempo: '3-1-1', rest: '120s' },
  { id: 'ex_10', name: 'Prensa Inclinada 45º', muscle: 'Pierna', defaultSets: '3', defaultReps: '10-12', tempo: '2-0-1', rest: '90s' },
  { id: 'ex_11', name: 'Peso Muerto Rumano', muscle: 'Pierna', defaultSets: '4', defaultReps: '8-10', tempo: '3-1-1', rest: '90s' },
  { id: 'ex_12', name: 'Curl Femoral Tumbado', muscle: 'Pierna', defaultSets: '3', defaultReps: '12-15', tempo: '2-0-2', rest: '60s' },
  { id: 'ex_13', name: 'Elevación de Talones en Máquina', muscle: 'Pierna', defaultSets: '4', defaultReps: '15', tempo: '2-2-1', rest: '45s' },
  // Hombro
  { id: 'ex_14', name: 'Press Militar con Barra', muscle: 'Hombro', defaultSets: '4', defaultReps: '6-8', tempo: '2-1-1', rest: '90s' },
  { id: 'ex_15', name: 'Elevaciones Laterales en Polea', muscle: 'Hombro', defaultSets: '4', defaultReps: '12-15', tempo: '2-1-2', rest: '45s' },
  { id: 'ex_16', name: 'Pájaros con Mancuerna (Deltoide Post)', muscle: 'Hombro', defaultSets: '3', defaultReps: '15', tempo: '2-1-1', rest: '45s' },
  // Brazos
  { id: 'ex_17', name: 'Curl con Barra Z', muscle: 'Brazos', defaultSets: '3', defaultReps: '10', tempo: '2-0-1', rest: '60s' },
  { id: 'ex_18', name: 'Press Francés con Mancuernas', muscle: 'Brazos', defaultSets: '3', defaultReps: '10-12', tempo: '3-0-1', rest: '60s' },
  { id: 'ex_19', name: 'Extensiones de Tríceps en Cuerda', muscle: 'Brazos', defaultSets: '3', defaultReps: '12-15', tempo: '2-1-1', rest: '45s' },
  // Core
  { id: 'ex_20', name: 'Rueda Abdominal (Ab Wheel)', muscle: 'Core', defaultSets: '3', defaultReps: '10-12', tempo: '3-1-1', rest: '60s' },
  { id: 'ex_21', name: 'Plancha Isométrica con Carga', muscle: 'Core', defaultSets: '3', defaultReps: '45s', tempo: 'Hold', rest: '45s' }
];

const DEFAULT_ROUTINES = [
  {
    id: 'rout_1',
    name: 'Push Day: Pecho, Hombro & Tríceps',
    category: 'Torso / Push',
    description: 'Enfoque en hipertrofia y empuje con sobrecarga progresiva en banca.',
    exercises: [
      { name: 'Press de Banca Plano', sets: '4', reps: '6-8', rest: '90s' },
      { name: 'Press Inclinado con Mancuernas', sets: '3', reps: '10', rest: '75s' },
      { name: 'Press Militar con Barra', sets: '3', reps: '8', rest: '90s' },
      { name: 'Elevaciones Laterales en Polea', sets: '4', reps: '12-15', rest: '45s' },
      { name: 'Extensiones de Tríceps en Cuerda', sets: '3', reps: '12', rest: '45s' }
    ]
  },
  {
    id: 'rout_2',
    name: 'Pull Day: Espalda & Bíceps',
    category: 'Espalda / Pull',
    description: 'Tracción vertical y horizontal con activación de deltoide posterior.',
    exercises: [
      { name: 'Dominadas Pronas / Lastre', sets: '4', reps: '6-8', rest: '120s' },
      { name: 'Remo con Barra 90º', sets: '4', reps: '8-10', rest: '90s' },
      { name: 'Jalón al Pecho Agarre Neutro', sets: '3', reps: '10-12', rest: '75s' },
      { name: 'Pájaros con Mancuerna', sets: '3', reps: '15', rest: '45s' },
      { name: 'Curl con Barra Z', sets: '3', reps: '10', rest: '60s' }
    ]
  },
  {
    id: 'rout_3',
    name: 'Leg Day: Fuerza & Cuádriceps',
    category: 'Pierna / Lower',
    description: 'Desarrollo integral de tren inferior con foco en fuerza de sentadilla.',
    exercises: [
      { name: 'Sentadilla Trasera Barra Alta', sets: '4', reps: '6-8', rest: '120s' },
      { name: 'Prensa Inclinada 45º', sets: '3', reps: '10-12', rest: '90s' },
      { name: 'Peso Muerto Rumano', sets: '4', reps: '8-10', rest: '90s' },
      { name: 'Curl Femoral Tumbado', sets: '3', reps: '12-15', rest: '60s' },
      { name: 'Elevación de Talones', sets: '4', reps: '15', rest: '45s' }
    ]
  },
  {
    id: 'rout_4',
    name: 'Fuerza 5x5 Powerlifting',
    category: 'Fuerza 5x5',
    description: 'Bloque de intensificación para atletas de fuerza y levantamiento.',
    exercises: [
      { name: 'Sentadilla Trasera Barra Alta', sets: '5', reps: '5', rest: '180s' },
      { name: 'Press de Banca Plano', sets: '5', reps: '5', rest: '180s' },
      { name: 'Remo con Barra 90º', sets: '5', reps: '5', rest: '120s' }
    ]
  }
];

const DEFAULT_CLIENTS = [
  {
    id: 'cli_1',
    name: 'Carlos Mendoza',
    goal: 'Hipertrofia',
    level: 'Intermedio',
    age: 26,
    weight: 78.5,
    height: 178,
    phone: '+34 611 234 567',
    assignedRoutineId: 'rout_1',
    adherence: 96,
    avatarBg: '#38bdf8',
    notes: 'Objetivo ganar 3 kg de masa muscular limpia. Muy disciplinado con las cargas. Molestia leve en muñeca izquierda solucionada con muñequeras.',
    progressHistory: [
      { date: '2026-06-01', weight: 81.2, squat: 120, bench: 85, deadlift: 150, ohp: 50 },
      { date: '2026-07-01', weight: 80.1, squat: 125, bench: 87.5, deadlift: 155, ohp: 52.5 },
      { date: '2026-08-01', weight: 79.2, squat: 130, bench: 92.5, deadlift: 162.5, ohp: 57.5 },
      { date: '2026-09-01', weight: 78.5, squat: 135, bench: 97.5, deadlift: 170, ohp: 62.5 }
    ]
  },
  {
    id: 'cli_2',
    name: 'Elena Ramos',
    goal: 'Pérdida de Grasa',
    level: 'Principiante',
    age: 29,
    weight: 64.2,
    height: 165,
    phone: '+34 622 987 654',
    assignedRoutineId: 'rout_3',
    adherence: 91,
    avatarBg: '#22c55e',
    notes: 'Entrena 3 días por semana. Prioridad a recomposición corporal y adherencia a la proteína diaria.',
    progressHistory: [
      { date: '2026-06-15', weight: 68.0, squat: 60, bench: 35, deadlift: 75, ohp: 22.5 },
      { date: '2026-07-15', weight: 66.4, squat: 67.5, bench: 37.5, deadlift: 82.5, ohp: 25 },
      { date: '2026-08-15', weight: 65.1, squat: 72.5, bench: 42.5, deadlift: 90, ohp: 27.5 },
      { date: '2026-09-15', weight: 64.2, squat: 77.5, bench: 45, deadlift: 95, ohp: 30 }
    ]
  },
  {
    id: 'cli_3',
    name: 'Miguel Torres',
    goal: 'Fuerza',
    level: 'Avanzado',
    age: 32,
    weight: 86.0,
    height: 182,
    phone: '+34 633 456 789',
    assignedRoutineId: 'rout_4',
    adherence: 98,
    avatarBg: '#f59e0b',
    notes: 'Preparación para toma de marcas en noviembre. Sentadilla con técnica perfecta, cuidando lumbar en peso muerto.',
    progressHistory: [
      { date: '2026-06-01', weight: 84.5, squat: 155, bench: 120, deadlift: 200, ohp: 75 },
      { date: '2026-07-01', weight: 85.0, squat: 162.5, bench: 125, deadlift: 205, ohp: 77.5 },
      { date: '2026-08-01', weight: 85.8, squat: 167.5, bench: 127.5, deadlift: 212.5, ohp: 80 },
      { date: '2026-09-01', weight: 86.0, squat: 172.5, bench: 132.5, deadlift: 220, ohp: 82.5 }
    ]
  },
  {
    id: 'cli_4',
    name: 'Sofía Chen',
    goal: 'Rendimiento',
    level: 'Intermedio',
    age: 24,
    weight: 58.7,
    height: 170,
    phone: '+34 644 112 233',
    assignedRoutineId: 'rout_2',
    adherence: 89,
    avatarBg: '#a855f7',
    notes: 'Combina atletismo y gimnasio. Enfoque en potencia de cadena posterior y prevención de lesiones.',
    progressHistory: [
      { date: '2026-07-01', weight: 59.8, squat: 70, bench: 45, deadlift: 90, ohp: 30 },
      { date: '2026-08-01', weight: 59.1, squat: 75, bench: 47.5, deadlift: 97.5, ohp: 32.5 },
      { date: '2026-09-01', weight: 58.7, squat: 80, bench: 50, deadlift: 105, ohp: 35 }
    ]
  }
];

const DEFAULT_SCHEDULE = [
  { id: 'sch_1', day: 'Lunes', time: '09:00', clientId: 'cli_1', routineId: 'rout_1', completed: true },
  { id: 'sch_2', day: 'Lunes', time: '11:30', clientId: 'cli_2', routineId: 'rout_3', completed: true },
  { id: 'sch_3', day: 'Martes', time: '10:00', clientId: 'cli_3', routineId: 'rout_4', completed: false },
  { id: 'sch_4', day: 'Miércoles', time: '08:30', clientId: 'cli_1', routineId: 'rout_2', completed: false },
  { id: 'sch_5', day: 'Miércoles', time: '17:00', clientId: 'cli_4', routineId: 'rout_2', completed: false },
  { id: 'sch_6', day: 'Jueves', time: '12:00', clientId: 'cli_2', routineId: 'rout_3', completed: false },
  { id: 'sch_7', day: 'Viernes', time: '10:00', clientId: 'cli_3', routineId: 'rout_4', completed: false },
  { id: 'sch_8', day: 'Viernes', time: '16:30', clientId: 'cli_1', routineId: 'rout_3', completed: false }
];

// ==========================================
// 2. GESTOR DE ESTADO (STATE & STORAGE)
// ==========================================
const App = {
  data: {
    clients: [],
    routines: [],
    exercises: [],
    schedule: []
  },
  currentView: 'dashboard',
  currentClientFilter: 'all',
  selectedClientId: null,
  activeDetailClientId: null,
  currentAssignRoutineId: null,

  init() {
    this.loadState();
    this.setupNavigation();
    this.setupModals();
    this.renderAll();
    this.setupRoutineBuilderDefaultRows();
  },

  loadState() {
    const saved = localStorage.getItem('TRAINIO_DATA_V1');
    if (saved) {
      try {
        this.data = JSON.parse(saved);
      } catch (e) {
        console.error('Error al cargar datos locales, reiniciando con default', e);
        this.resetToDefaults();
      }
    } else {
      this.resetToDefaults();
    }
    // Seleccionar primer cliente para la vista de progreso
    if (this.data.clients.length > 0) {
      this.selectedClientId = this.data.clients[0].id;
    }
  },

  resetToDefaults() {
    this.data = {
      clients: DEFAULT_CLIENTS,
      routines: DEFAULT_ROUTINES,
      exercises: DEFAULT_EXERCISES,
      schedule: DEFAULT_SCHEDULE
    };
    this.saveState();
  },

  saveState() {
    localStorage.setItem('TRAINIO_DATA_V1', JSON.stringify(this.data));
  },

  // ==========================================
  // 3. NAVEGACIÓN Y VISTAS
  // ==========================================
  setupNavigation() {
    // Desktop Nav
    document.querySelectorAll('.sidebar .nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        this.navigate(view);
      });
    });

    // Mobile Nav
    document.querySelectorAll('.mobile-nav .mobile-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        this.navigate(view);
      });
    });
  },

  navigate(viewName) {
    this.currentView = viewName;

    // Actualizar botones de navegación
    document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(el => {
      if (el.getAttribute('data-view') === viewName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Mostrar sección correspondiente
    document.querySelectorAll('.view').forEach(view => {
      view.classList.remove('active');
    });

    const activeView = document.getElementById(`view-${viewName}`);
    if (activeView) {
      activeView.classList.add('active');
    }

    // Actualizar títulos del Topbar
    const titleMap = {
      dashboard: { title: 'Dashboard', sub: 'Panel de control de rendimiento y atletas' },
      clients: { title: 'Mis Atletas', sub: 'Directorio y seguimiento personalizado de clientes' },
      routines: { title: 'Rutinas & Ejercicios', sub: 'Catálogo de planes de entrenamiento y sobrecarga' },
      progress: { title: 'Progreso & Marcas', sub: 'Analítica de pesajes y marcas personales (1RM)' },
      calendar: { title: 'Planificador Semanal', sub: 'Agenda y programación de sesiones de entrenamiento' }
    };

    if (titleMap[viewName]) {
      document.getElementById('page-title').innerText = titleMap[viewName].title;
      document.getElementById('page-subtitle').innerText = titleMap[viewName].sub;
    }

    // Si entra a progreso, redibujar gráfica
    if (viewName === 'progress') {
      this.renderProgressView();
    }
  },

  // ==========================================
  // 4. RENDERIZADO GLOBAL
  // ==========================================
  renderAll() {
    this.renderDashboard();
    this.renderClients();
    this.renderRoutines();
    this.showMuscleGroup('Pecho');
    this.renderProgressView();
    this.renderCalendar();
    this.populateRoutineSelects();
    this.populateClientSelects();
  },

  // ------------------------------------------
  // DASHBOARD
  // ------------------------------------------
  renderDashboard() {
    // KPIs
    document.getElementById('kpi-total-clients').innerText = this.data.clients.length;
    document.getElementById('nav-clients-count').innerText = this.data.clients.length;
    document.getElementById('kpi-total-routines').innerText = this.data.routines.length;

    // Sesiones de hoy (simulado Lunes/Martes según días)
    const todaySessions = this.data.schedule.slice(0, 3);
    document.getElementById('kpi-today-sessions').innerText = todaySessions.length;

    const sessionsContainer = document.getElementById('dashboard-sessions-list');
    sessionsContainer.innerHTML = '';

    if (todaySessions.length === 0) {
      sessionsContainer.innerHTML = '<p class="text-muted">No hay sesiones programadas para hoy.</p>';
    } else {
      todaySessions.forEach(session => {
        const client = this.data.clients.find(c => c.id === session.clientId) || { name: 'Atleta' };
        const routine = this.data.routines.find(r => r.id === session.routineId) || { name: 'Rutina asignada' };

        const row = document.createElement('div');
        row.className = 'session-item';
        row.innerHTML = `
          <div class="session-left">
            <span class="session-time">${session.time}</span>
            <div class="session-info">
              <h4>${client.name}</h4>
              <p>${routine.name}</p>
            </div>
          </div>
          <button class="session-check-btn ${session.completed ? 'completed' : ''}" 
                  title="${session.completed ? 'Completada' : 'Marcar como completada'}"
                  onclick="App.toggleSessionComplete('${session.id}')">
            ${session.completed ? '✓' : '○'}
          </button>
        `;
        sessionsContainer.appendChild(row);
      });
    }

    // Atletas Destacados en Dashboard
    const featuredContainer = document.getElementById('dashboard-featured-clients');
    featuredContainer.innerHTML = '';
    this.data.clients.slice(0, 4).forEach(cli => {
      const row = document.createElement('div');
      row.className = 'featured-client-row';
      row.onclick = () => App.openClientDetail(cli.id);
      row.innerHTML = `
        <div class="client-mini-profile">
          <div class="avatar-circle" style="background: ${cli.avatarBg}">${this.getInitials(cli.name)}</div>
          <div>
            <h4 style="font-size: 0.95rem; font-weight: 600;">${cli.name}</h4>
            <p style="font-size: 0.78rem; color: var(--text-secondary);">${cli.goal} · ${cli.weight} kg</p>
          </div>
        </div>
        <span class="badge badge-green">${cli.adherence}% adherencia</span>
      `;
      featuredContainer.appendChild(row);
    });
  },

  toggleSessionComplete(sessionId) {
    const session = this.data.schedule.find(s => s.id === sessionId);
    if (session) {
      session.completed = !session.completed;
      this.saveState();
      this.renderDashboard();
      this.renderCalendar();
      this.showToast(session.completed ? '¡Sesión marcada como completada!' : 'Sesión desmarcada');
    }
  },

  // ------------------------------------------
  // CLIENTES (CRM)
  // ------------------------------------------
  renderClients() {
    const container = document.getElementById('clients-cards-container');
    container.innerHTML = '';

    const searchTerm = (document.getElementById('client-search-input')?.value || '').toLowerCase();
    const filter = this.currentClientFilter;

    const filtered = this.data.clients.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(searchTerm) ||
        c.goal.toLowerCase().includes(searchTerm) ||
        (c.phone && c.phone.includes(searchTerm));
      const matchFilter = filter === 'all' || c.goal.toLowerCase() === filter.toLowerCase();
      return matchSearch && matchFilter;
    });

    if (filtered.length === 0) {
      container.innerHTML = '<p class="text-muted" style="grid-column: 1/-1; padding: 2rem 0; text-align: center;">No se encontraron atletas con ese criterio.</p>';
      return;
    }

    filtered.forEach(cli => {
      const routine = this.data.routines.find(r => r.id === cli.assignedRoutineId);
      const routineName = routine ? routine.name : 'Sin rutina asignada';

      const card = document.createElement('div');
      card.className = 'client-card';
      card.onclick = () => App.openClientDetail(cli.id);

      card.innerHTML = `
        <div class="client-card-header">
          <div class="client-card-avatar" style="background: ${cli.avatarBg}">
            ${this.getInitials(cli.name)}
          </div>
          <div class="client-card-title">
            <h3>${cli.name}</h3>
            <div class="client-metrics-pills">
              <span class="badge badge-blue">${cli.goal}</span>
              <span class="badge badge-purple">${cli.level}</span>
            </div>
          </div>
        </div>

        <div class="client-stats-strip">
          <div class="stat-col">
            <span>Peso</span>
            <strong>${cli.weight} kg</strong>
          </div>
          <div class="stat-col">
            <span>Altura</span>
            <strong>${cli.height} cm</strong>
          </div>
          <div class="stat-col">
            <span>Edad</span>
            <strong>${cli.age} años</strong>
          </div>
        </div>

        <div class="client-routine-assigned">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/></svg>
          <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${routineName}</span>
        </div>

        <div class="adherence-bar-container">
          <div class="adherence-label-row">
            <span>Adherencia al plan</span>
            <strong style="color: var(--color-primary);">${cli.adherence}%</strong>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${cli.adherence}%;"></div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  },

  filterClients() {
    this.renderClients();
  },

  setClientFilter(filter) {
    this.currentClientFilter = filter;
    document.querySelectorAll('.filter-pills .pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
    });
    this.renderClients();
  },

  openClientModal() {
    this.closeModals();
    document.getElementById('form-new-client').reset();
    this.populateRoutineSelects();
    document.getElementById('modal-client').classList.add('active');
  },

  saveClient(e) {
    e.preventDefault();
    const name = document.getElementById('client-name').value.trim();
    const goal = document.getElementById('client-goal').value;
    const level = document.getElementById('client-level').value;
    const weight = parseFloat(document.getElementById('client-weight').value);
    const height = parseInt(document.getElementById('client-height').value);
    const phone = document.getElementById('client-phone').value.trim();
    const routineId = document.getElementById('client-assigned-routine').value;
    const notes = document.getElementById('client-notes').value.trim();

    const colors = ['#22c55e', '#38bdf8', '#a855f7', '#f59e0b', '#ec4899'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const todayStr = new Date().toISOString().split('T')[0];

    const newClient = {
      id: 'cli_' + Date.now(),
      name,
      goal,
      level,
      age: 25,
      weight,
      height,
      phone: phone || '+34 600 000 000',
      assignedRoutineId: routineId,
      adherence: 100,
      avatarBg: randomColor,
      notes: notes || 'Alta reciente de atleta.',
      progressHistory: [
        { date: todayStr, weight, squat: 100, bench: 70, deadlift: 120, ohp: 45 }
      ]
    };

    this.data.clients.unshift(newClient);
    this.saveState();
    this.closeModals();
    this.renderAll();
    this.showToast(`¡Atleta ${name} registrado con éxito!`);
  },

  openClientDetail(clientId) {
    this.activeDetailClientId = clientId;
    const cli = this.data.clients.find(c => c.id === clientId);
    if (!cli) return;

    document.getElementById('detail-client-avatar').innerText = this.getInitials(cli.name);
    document.getElementById('detail-client-avatar').style.background = cli.avatarBg;
    document.getElementById('detail-client-name').innerText = cli.name;
    document.getElementById('detail-client-goal').innerText = cli.goal;

    document.getElementById('detail-client-weight').innerText = `${cli.weight} kg`;
    document.getElementById('detail-client-height').innerText = `${cli.height} cm`;
    document.getElementById('detail-client-adherence').innerText = `${cli.adherence}%`;
    document.getElementById('detail-client-level').innerText = cli.level;

    const routine = this.data.routines.find(r => r.id === cli.assignedRoutineId);
    const routineBox = document.getElementById('detail-client-routine-box');
    if (routine) {
      routineBox.innerHTML = `
        <h5 style="font-weight: 600; font-size: 0.95rem; margin-bottom: 4px;">${routine.name}</h5>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">${routine.description}</p>
        <span class="badge badge-purple">${routine.exercises.length} Ejercicios incluidos</span>
      `;
    } else {
      routineBox.innerHTML = '<p class="text-muted">Ninguna rutina asignada actualmente.</p>';
    }

    document.getElementById('detail-client-notes').innerText = cli.notes || 'Sin observaciones.';

    // Enlace de WhatsApp
    const cleanPhone = (cli.phone || '').replace(/[^0-9]/g, '');
    const waBtn = document.getElementById('detail-whatsapp-btn');
    if (cleanPhone) {
      waBtn.href = `https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(cli.name)},%20¿cómo%20ha%20ido%20el%20entrenamiento%20de%20hoy?`;
      waBtn.style.display = 'inline-flex';
    } else {
      waBtn.style.display = 'none';
    }

    document.getElementById('modal-client-detail').classList.add('active');
  },

  deleteCurrentClient() {
    if (!this.activeDetailClientId) return;
    const cli = this.data.clients.find(c => c.id === this.activeDetailClientId);
    if (confirm(`¿Estás seguro de que deseas eliminar a ${cli?.name || 'este atleta'}?`)) {
      this.data.clients = this.data.clients.filter(c => c.id !== this.activeDetailClientId);
      this.saveState();
      this.closeModals();
      this.renderAll();
      this.showToast('Atleta eliminado correctamente.');
    }
  },

  // ------------------------------------------
  // RUTINAS & BIBLIOTECA DE EJERCICIOS
  // ------------------------------------------
  renderRoutines() {
    const container = document.getElementById('routines-cards-container');
    container.innerHTML = '';

    this.data.routines.forEach(rout => {
      const card = document.createElement('div');
      card.className = 'routine-card';

      let exercisesHtml = rout.exercises.slice(0, 3).map(ex => `
        <div class="exercise-pill-row">
          <span class="ex-name">${ex.name}</span>
          <span class="ex-spec">${ex.sets}x${ex.reps} (${ex.rest})</span>
        </div>
      `).join('');

      if (rout.exercises.length > 3) {
        exercisesHtml += `<p style="font-size: 0.75rem; color: var(--text-dim); text-align: center;">+ ${rout.exercises.length - 3} ejercicios más</p>`;
      }

      card.innerHTML = `
        <div class="routine-card-header">
          <div>
            <h3>${rout.name}</h3>
            <span class="badge badge-blue">${rout.category}</span>
          </div>
          <button class="btn btn-xs btn-secondary" onclick="App.openAssignRoutineModal('${rout.id}')" title="Asignar a un atleta">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 4px; vertical-align: middle;"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>
            Asignar
          </button>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">${rout.description}</p>
        <div class="routine-exercises-preview">
          ${exercisesHtml}
        </div>
      `;
      container.appendChild(card);
    });
  },

  // ------------------------------------------
  // ASIGNACIÓN DE RUTINA A ATLETA
  // ------------------------------------------
  openAssignRoutineModal(routineId) {
    const rout = this.data.routines.find(r => r.id === routineId);
    if (!rout) return;

    this.currentAssignRoutineId = routineId;
    this.closeModals();

    const banner = document.getElementById('assign-routine-banner');
    if (banner) {
      banner.innerHTML = `
        <div class="assign-routine-info">
          <h4>${rout.name}</h4>
          <p>${rout.description || 'Plan de entrenamiento personalizado.'}</p>
          <div class="assign-routine-meta">
            <span class="badge badge-blue">${rout.category}</span>
            <span style="font-size: 0.8rem; color: var(--text-dim);">${(rout.exercises || []).length} ejercicios configurados</span>
          </div>
        </div>
      `;
    }

    const searchInput = document.getElementById('assign-routine-search');
    if (searchInput) searchInput.value = '';

    this.renderAssignRoutineList();

    const modal = document.getElementById('modal-assign-routine');
    if (modal) modal.classList.add('active');
  },

  renderAssignRoutineList() {
    const container = document.getElementById('assign-routine-athletes-list');
    if (!container) return;
    container.innerHTML = '';

    if (!this.data.clients || this.data.clients.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
          <p>No tienes atletas registrados todavía.</p>
          <button class="btn btn-sm btn-primary" style="margin-top: 10px;" onclick="App.openClientModal()">+ Registrar Atleta</button>
        </div>
      `;
      return;
    }

    const filterText = (document.getElementById('assign-routine-search')?.value || '').toLowerCase().trim();
    const filteredClients = this.data.clients.filter(c => {
      return c.name.toLowerCase().includes(filterText) ||
        c.goal.toLowerCase().includes(filterText) ||
        (c.level && c.level.toLowerCase().includes(filterText));
    });

    if (filteredClients.length === 0) {
      container.innerHTML = `
        <p class="text-muted" style="text-align: center; padding: 2rem 0;">No se encontraron atletas que coincidan con "${filterText}".</p>
      `;
      return;
    }

    const currentRoutineId = this.currentAssignRoutineId;

    filteredClients.forEach(cli => {
      const isAlreadyAssigned = cli.assignedRoutineId === currentRoutineId;
      const assignedRout = this.data.routines.find(r => r.id === cli.assignedRoutineId);
      const assignedName = assignedRout ? assignedRout.name : 'Sin rutina asignada';

      const item = document.createElement('div');
      item.className = 'assign-athlete-item' + (isAlreadyAssigned ? ' is-current' : '');

      item.innerHTML = `
        <div class="assign-athlete-info">
          <div class="assign-athlete-avatar" style="background: ${cli.avatarBg || '#22c55e'}">
            ${this.getInitials(cli.name)}
          </div>
          <div class="assign-athlete-text">
            <div class="assign-athlete-name">
              <span>${cli.name}</span>
              <span class="badge badge-blue" style="font-size: 0.72rem; padding: 2px 7px;">${cli.goal}</span>
              <span class="badge badge-purple" style="font-size: 0.72rem; padding: 2px 7px;">${cli.level}</span>
            </div>
            <div class="assign-athlete-sub">
              Rutina actual: <strong style="color: ${isAlreadyAssigned ? 'var(--color-primary)' : 'var(--text-main)'}">${assignedName}</strong>
            </div>
          </div>
        </div>
        <div>
          ${isAlreadyAssigned ? `
            <span class="badge badge-green" style="display: flex; align-items: center; gap: 4px; padding: 6px 12px; font-size: 0.8rem; font-weight: 600;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Asignada
            </span>
          ` : `
            <button class="btn btn-sm btn-primary" onclick="App.confirmAssignRoutine('${cli.id}')">
              <span>Asignar a este atleta</span>
            </button>
          `}
        </div>
      `;

      container.appendChild(item);
    });
  },

  filterAssignRoutineList() {
    this.renderAssignRoutineList();
  },

  confirmAssignRoutine(clientId) {
    const routineId = this.currentAssignRoutineId;
    const client = this.data.clients.find(c => c.id === clientId);
    const routine = this.data.routines.find(r => r.id === routineId);

    if (!client || !routine) return;

    client.assignedRoutineId = routineId;
    this.saveState();
    this.renderAll();
    this.closeModals();
    this.showToast(`Rutina "${routine.name}" asignada a ${client.name} con éxito.`);
  },

  assignRoutineQuick(routineId) {
    this.openAssignRoutineModal(routineId);
  },

  showMuscleGroup(muscle) {
    document.querySelectorAll('#muscle-selector .tag-btn').forEach(btn => {
      btn.classList.toggle('active', btn.innerText.trim() === muscle);
    });

    const container = document.getElementById('exercises-library-container');
    container.innerHTML = '';

    const list = this.data.exercises.filter(ex => ex.muscle === muscle);
    list.forEach(ex => {
      const card = document.createElement('div');
      card.className = 'exercise-card';
      card.innerHTML = `
        <h4>
          ${ex.name}
          <span class="badge badge-green">${ex.muscle}</span>
        </h4>
        <p>Sugerido: ${ex.defaultSets} series de ${ex.defaultReps} reps con tempo ${ex.tempo}.</p>
        <div class="exercise-meta">
          <span>Descanso: ${ex.rest}</span>
        </div>
      `;
      container.appendChild(card);
    });
  },

  openRoutineModal() {
    this.closeModals();
    document.getElementById('form-new-routine').reset();
    this.setupRoutineBuilderDefaultRows();
    document.getElementById('modal-routine').classList.add('active');
  },

  setupRoutineBuilderDefaultRows() {
    const list = document.getElementById('routine-exercises-list');
    list.innerHTML = '';
    // Añadir 3 filas por defecto
    this.addExerciseRowToRoutine('Press de Banca Plano', '4', '8-10', '90s');
    this.addExerciseRowToRoutine('Press Inclinado Mancuernas', '3', '10-12', '75s');
    this.addExerciseRowToRoutine('Elevaciones Laterales', '4', '12-15', '45s');
  },

  addExerciseRowToRoutine(defaultName = '', defaultSets = '3', defaultReps = '10', defaultRest = '60s') {
    const list = document.getElementById('routine-exercises-list');
    const row = document.createElement('div');
    row.className = 'routine-exercise-row';
    row.innerHTML = `
      <input type="text" class="row-ex-name" placeholder="Nombre ejercicio" value="${defaultName}" required>
      <input type="text" class="row-ex-sets" placeholder="Series" value="${defaultSets}" required>
      <input type="text" class="row-ex-reps" placeholder="Reps" value="${defaultReps}" required>
      <input type="text" class="row-ex-rest" placeholder="Descanso" value="${defaultRest}">
      <button type="button" class="btn btn-xs btn-ghost text-danger" onclick="this.parentElement.remove()">✕</button>
    `;
    list.appendChild(row);
  },

  saveRoutine(e) {
    e.preventDefault();
    const name = document.getElementById('routine-name').value.trim();
    const category = document.getElementById('routine-category').value;
    const description = document.getElementById('routine-description').value.trim() || 'Plan de entrenamiento personalizado.';

    const rows = document.querySelectorAll('.routine-exercise-row');
    const exercises = [];
    rows.forEach(r => {
      const exName = r.querySelector('.row-ex-name').value.trim();
      const sets = r.querySelector('.row-ex-sets').value.trim();
      const reps = r.querySelector('.row-ex-reps').value.trim();
      const rest = r.querySelector('.row-ex-rest').value.trim() || '60s';
      if (exName) {
        exercises.push({ name: exName, sets, reps, rest });
      }
    });

    if (exercises.length === 0) {
      alert('Debes añadir al menos un ejercicio a la rutina.');
      return;
    }

    const newRoutine = {
      id: 'rout_' + Date.now(),
      name,
      category,
      description,
      exercises
    };

    this.data.routines.unshift(newRoutine);
    this.saveState();
    this.closeModals();
    this.renderAll();
    this.showToast(`¡Rutina "${name}" guardada con éxito!`);
  },

  // ------------------------------------------
  // PROGRESO & ANALÍTICA (GRÁFICA NATIVA SVG)
  // ------------------------------------------
  renderProgressView() {
    const select = document.getElementById('progress-client-select');
    if (!select) return;

    // Actualizar dropdown con clientes
    select.innerHTML = '';
    this.data.clients.forEach(cli => {
      const opt = document.createElement('option');
      opt.value = cli.id;
      opt.innerText = `${cli.name} (${cli.goal})`;
      if (cli.id === this.selectedClientId) opt.selected = true;
      select.appendChild(opt);
    });

    const client = this.data.clients.find(c => c.id === this.selectedClientId) || this.data.clients[0];
    if (!client) return;

    this.selectedClientId = client.id;
    const history = client.progressHistory || [];

    // Calcular diferencia de peso
    if (history.length >= 2) {
      const firstWeight = history[0].weight;
      const lastWeight = history[history.length - 1].weight;
      const diff = (lastWeight - firstWeight).toFixed(1);
      const sign = diff > 0 ? '+' : '';
      document.getElementById('weight-total-diff').innerText = `${sign}${diff} kg evolución`;
      document.getElementById('weight-trend-label').innerText = `${history.length} registros desde ${history[0].date}`;
    } else {
      document.getElementById('weight-total-diff').innerText = '1 registro';
      document.getElementById('weight-trend-label').innerText = 'Agrega más pesajes para ver la tendencia';
    }

    // Dibujar Gráfica SVG
    this.drawWeightSvgChart(history);

    // Renderizar PRs
    this.renderClientPrs(history);
  },

  onProgressClientChange() {
    const select = document.getElementById('progress-client-select');
    this.selectedClientId = select.value;
    this.renderProgressView();
  },

  drawWeightSvgChart(history) {
    const svg = document.getElementById('weight-chart-svg');
    if (!svg) return;
    svg.innerHTML = '';

    if (!history || history.length === 0) {
      svg.innerHTML = '<text x="300" y="120" text-anchor="middle" fill="#64748b" font-family="Outfit">Sin registros de pesaje</text>';
      return;
    }

    const width = 600;
    const height = 240;
    const padX = 50;
    const padY = 40;

    const weights = history.map(h => h.weight);
    const minW = Math.min(...weights) - 1.5;
    const maxW = Math.max(...weights) + 1.5;
    const rangeW = maxW - minW || 1;

    // Puntos normalizados
    const points = history.map((item, idx) => {
      const x = padX + (idx / (history.length - 1 || 1)) * (width - padX * 2);
      const y = height - padY - ((item.weight - minW) / rangeW) * (height - padY * 2);
      return { x, y, weight: item.weight, date: item.date };
    });

    // Líneas horizontales de guía
    for (let i = 0; i <= 3; i++) {
      const yLine = padY + (i / 3) * (height - padY * 2);
      const val = (maxW - (i / 3) * rangeW).toFixed(1);
      svg.innerHTML += `
        <line x1="${padX}" y1="${yLine}" x2="${width - padX}" y2="${yLine}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4"/>
        <text x="${padX - 10}" y="${yLine + 4}" text-anchor="end" fill="#64748b" font-size="11" font-family="Space Grotesk">${val}k</text>
      `;
    }

    // Curva / Camino SVG
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathD += ` L ${points[i].x} ${points[i].y}`;
    }

    // Área sombreada con degradado
    const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`;

    svg.innerHTML += `
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#22c55e" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#22c55e" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <path d="${areaD}" fill="url(#chartGradient)"/>
      <path d="${pathD}" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    `;

    // Círculos y textos en cada punto
    points.forEach(p => {
      const dateShort = p.date.slice(5);
      svg.innerHTML += `
        <circle cx="${p.x}" cy="${p.y}" r="5" fill="#07090e" stroke="#22c55e" stroke-width="2.5"/>
        <text x="${p.x}" y="${p.y - 12}" text-anchor="middle" fill="#f8fafc" font-size="12" font-weight="700" font-family="Space Grotesk">${p.weight} kg</text>
        <text x="${p.x}" y="${height - padY + 18}" text-anchor="middle" fill="#64748b" font-size="11" font-family="Space Grotesk">${dateShort}</text>
      `;
    });
  },

  renderClientPrs(history) {
    const container = document.getElementById('client-prs-container');
    container.innerHTML = '';

    const latest = history[history.length - 1] || {};
    const first = history[0] || {};

    const prs = [
      { name: 'Sentadilla', val: latest.squat || 0, firstVal: first.squat || 0 },
      { name: 'Press Banca', val: latest.bench || 0, firstVal: first.bench || 0 },
      { name: 'Peso Muerto', val: latest.deadlift || 0, firstVal: first.deadlift || 0 },
      { name: 'Press Militar', val: latest.ohp || 0, firstVal: first.ohp || 0 }
    ];

    prs.forEach(pr => {
      const diff = pr.val - pr.firstVal;
      const gainText = diff > 0 ? `+${diff} kg progreso` : 'Base inicial';

      const card = document.createElement('div');
      card.className = 'pr-card';
      card.innerHTML = `
        <span class="pr-name">${pr.name} 1RM</span>
        <span class="pr-value">${pr.val} <span style="font-size: 0.9rem; color: var(--text-secondary);">kg</span></span>
        <span class="pr-gain">${gainText}</span>
      `;
      container.appendChild(card);
    });
  },

  openProgressModal() {
    this.closeModals();
    this.populateClientSelects();
    document.getElementById('form-new-progress').reset();
    document.getElementById('progress-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('modal-progress').classList.add('active');
  },

  saveProgressEntry(e) {
    e.preventDefault();
    const clientId = document.getElementById('progress-entry-client').value;
    const date = document.getElementById('progress-date').value;
    const weight = parseFloat(document.getElementById('progress-weight').value);
    const squat = parseFloat(document.getElementById('progress-pr-squat').value) || 0;
    const bench = parseFloat(document.getElementById('progress-pr-bench').value) || 0;
    const deadlift = parseFloat(document.getElementById('progress-pr-deadlift').value) || 0;
    const ohp = parseFloat(document.getElementById('progress-pr-ohp').value) || 0;

    const client = this.data.clients.find(c => c.id === clientId);
    if (!client) return;

    if (!client.progressHistory) client.progressHistory = [];

    // Actualizar peso del atleta
    client.weight = weight;

    client.progressHistory.push({
      date,
      weight,
      squat: squat || (client.progressHistory.slice(-1)[0]?.squat || 100),
      bench: bench || (client.progressHistory.slice(-1)[0]?.bench || 70),
      deadlift: deadlift || (client.progressHistory.slice(-1)[0]?.deadlift || 120),
      ohp: ohp || (client.progressHistory.slice(-1)[0]?.ohp || 45)
    });

    this.selectedClientId = clientId;
    this.saveState();
    this.closeModals();
    this.renderAll();
    this.showToast(`Nuevo pesaje de ${client.name} registrado.`);
  },

  // ------------------------------------------
  // CALENDARIO & PLANIFICADOR SEMANAL
  // ------------------------------------------
  renderCalendar() {
    const container = document.getElementById('week-calendar-container');
    container.innerHTML = '';

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const currentDayName = days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]; // Lunes a Domingo

    days.forEach((day, index) => {
      const isToday = day === currentDayName;
      const daySessions = this.data.schedule.filter(s => s.day === day);

      const col = document.createElement('div');
      col.className = `calendar-day-col ${isToday ? 'today' : ''}`;

      let sessionsHtml = '';
      if (daySessions.length === 0) {
        sessionsHtml = `<p class="text-muted" style="font-size: 0.75rem; text-align: center; margin-top: 1rem;">Descanso / Libre</p>`;
      } else {
        daySessions.forEach(sess => {
          const client = this.data.clients.find(c => c.id === sess.clientId) || { name: 'Atleta' };
          const routine = this.data.routines.find(r => r.id === sess.routineId) || { name: 'Entrenamiento' };

          sessionsHtml += `
            <div class="calendar-session-chip ${sess.completed ? 'completed' : ''}" 
                 onclick="App.toggleSessionComplete('${sess.id}')"
                 title="Haz clic para marcar como completada">
              <span class="chip-time">${sess.time} ${sess.completed ? '✓' : ''}</span>
              <span class="chip-client">${client.name}</span>
              <span class="chip-routine">${routine.name}</span>
            </div>
          `;
        });
      }

      col.innerHTML = `
        <div class="day-header">
          <span class="day-name">${day}</span>
          <span class="day-number">${index + 21}</span>
        </div>
        <div class="calendar-sessions-container">
          ${sessionsHtml}
        </div>
      `;
      container.appendChild(col);
    });
  },

  openScheduleSessionModal() {
    this.closeModals();
    this.populateClientSelects();
    this.populateRoutineSelects();
    document.getElementById('modal-schedule').classList.add('active');
  },

  saveScheduledSession(e) {
    e.preventDefault();
    const clientId = document.getElementById('schedule-client').value;
    const day = document.getElementById('schedule-day').value;
    const time = document.getElementById('schedule-time').value;
    const routineId = document.getElementById('schedule-routine').value;

    const newSession = {
      id: 'sch_' + Date.now(),
      day,
      time,
      clientId,
      routineId,
      completed: false
    };

    this.data.schedule.push(newSession);
    this.saveState();
    this.closeModals();
    this.renderAll();
    this.showToast('Sesión programada en el calendario.');
  },

  // ------------------------------------------
  // UTILIDADES & HELPERS
  // ------------------------------------------
  populateRoutineSelects() {
    const selects = [
      document.getElementById('client-assigned-routine'),
      document.getElementById('schedule-routine')
    ];
    selects.forEach(select => {
      if (!select) return;
      select.innerHTML = '<option value="">-- Seleccionar Rutina --</option>';
      this.data.routines.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.id;
        opt.innerText = r.name;
        select.appendChild(opt);
      });
    });
  },

  populateClientSelects() {
    const selects = [
      document.getElementById('progress-entry-client'),
      document.getElementById('schedule-client')
    ];
    selects.forEach(select => {
      if (!select) return;
      select.innerHTML = '';
      this.data.clients.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.innerText = c.name;
        select.appendChild(opt);
      });
    });
  },

  getInitials(name = '') {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return (name.slice(0, 2) || 'AT').toUpperCase();
  },

  setupModals() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModals();
        }
      });
    });
  },

  closeModals() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.classList.remove('active');
    });
  },

  showToast(message) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-message');
    msg.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
};

// Inicializar la app al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
