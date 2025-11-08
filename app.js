// --- IMPORTAÇÕES DE MÓDULOS ---

// Importa utilitários puros (usados pela lógica da IA)
import { formatMarkdown, getSpinnerHtml } from './utils.js';

// Importa todo o módulo de UI
import * as UI from './ui.js';

// --- ESTADO DA APLICAÇÃO ---
// O estado vive aqui, no módulo principal.
let allPlants = [];
let filteredPlants = [];
let projectPlants = [];

const activeFilters = {
    luz: 'todos',
    agua: 'todos',
    crescimento: 'todos',
    tags: []
};

// --- ARMAZENAMENTO DE ELEMENTOS DO DOM ---
// Buscamos os elementos "container" uma vez para evitar repetição
const dom = {
    grid: document.getElementById('plant-grid'),
    count: document.getElementById('results-count'),
    searchInput: document.getElementById('search-input'),
    filterLuz: document.getElementById('filter-luz'),
    filterAgua: document.getElementById('filter-agua'),
    filterCrescimento: document.getElementById('filter-crescimento'),
    tagButtons: document.querySelectorAll('.tag-filter-btn'),
    resetBtn: document.getElementById('reset-filters-btn'),
    modal: document.getElementById('plant-modal')
};

// --- INICIALIZAÇÃO ---

/**
 * Inicializa a aplicação: busca dados e configura listeners.
 */
async function init() {
    console.log("App (Módulo Principal) inicializando...");
    
    try {
        const response = await fetch('./dados.json');
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        
        const plantData = await response.json();

        allPlants = plantData.map((plant, index) => ({...plant, id: index}));
        filteredPlants = [...allPlants];
        
        setupListeners();
        // Renderização inicial
        UI.renderGrid(dom.grid, dom.count, filteredPlants, projectPlants, handleToggleProject, handleOpenModal);
        UI.renderProjectPanel(projectPlants, handleRemoveFromProject);
        
        console.log("App pronto. Dados carregados.");

    } catch (error) {
        console.error("Erro crítico na inicialização:", error);
        dom.grid.innerHTML = 
            '<p class="text-red-600 col-span-full text-center py-10"><b>Erro:</b> Não foi possível carregar o banco de dados de plantas.</p>';
        dom.count.textContent = 'Falha ao carregar';
    }
}

// --- CONFIGURAÇÃO DE LISTENERS (Event Handlers) ---

/**
 * Configura todos os ouvintes de eventos da página.
 */
function setupListeners() {
    dom.searchInput.addEventListener('input', filterPlants);
    
    dom.filterLuz.addEventListener('change', (e) => {
        activeFilters.luz = e.target.value;
        filterPlants();
    });
    dom.filterAgua.addEventListener('change', (e) => {
        activeFilters.agua = e.target.value;
        filterPlants();
    });
    dom.filterCrescimento.addEventListener('change', (e) => {
        activeFilters.crescimento = e.target.value;
        filterPlants();
    });
    
    dom.tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tag = button.dataset.tag;
            const isActive = button.dataset.active === 'true';
            
            if (isActive) {
                button.dataset.active = 'false';
                button.classList.remove('tag-active');
                activeFilters.tags = activeFilters.tags.filter(t => t !== tag);
            } else {
                button.dataset.active = 'true';
                button.classList.add('tag-active');
                activeFilters.tags.push(tag);
            }
            filterPlants();
        });
    });

    dom.resetBtn.addEventListener('click', resetFilters);
    
    // Listeners do Modal (fechar)
    document.getElementById('modal-close-btn').addEventListener('click', UI.closeModal);
    document.getElementById('modal-backdrop').addEventListener('click', UI.closeModal);
    
    // Listeners dos botões de IA do Painel de Projeto
    document.getElementById('ia-synergy-btn').addEventListener('click', (e) => generateProjectAnalysis('synergy', e.currentTarget));
    document.getElementById('ia-layout-btn').addEventListener('click', (e) => generateProjectAnalysis('layout', e.currentTarget));
}

// --- LÓGICA DE ESTADO E FILTRAGEM ---

/**
 * Reseta todos os filtros e re-renderiza.
 */
function resetFilters() {
    activeFilters.luz = 'todos';
    activeFilters.agua = 'todos';
    activeFilters.crescimento = 'todos';
    activeFilters.tags = [];

    dom.searchInput.value = '';
    dom.filterLuz.value = 'todos';
    dom.filterAgua.value = 'todos';
    dom.filterCrescimento.value = 'todos';
    
    dom.tagButtons.forEach(button => {
        button.dataset.active = 'false';
        button.classList.remove('tag-active');
    });

    filterPlants();
}

/**
 * Filtra as plantas com base no estado 'activeFilters' e re-renderiza o grid.
 */
function filterPlants() {
    const searchTerm = dom.searchInput.value.toLowerCase().trim();

    filteredPlants = allPlants.filter(plant => {
        const matchesSearch = searchTerm === '' ||
            plant.Nome.toLowerCase().includes(searchTerm) ||
            plant['Nome Científico'].toLowerCase().includes(searchTerm);
        const matchesLuz = activeFilters.luz === 'todos' || plant['Luz Solar'] === activeFilters.luz;
        const matchesAgua = activeFilters.agua === 'todos' || plant['Necessidade de Água'] === activeFilters.agua;
        const matchesCrescimento = activeFilters.crescimento === 'todos' || plant.Crescimento === activeFilters.crescimento;
        const matchesTags = activeFilters.tags.length === 0 ||
            activeFilters.tags.every(tag => plant.Tags.includes(tag));

        return matchesSearch && matchesLuz && matchesAgua && matchesCrescimento && matchesTags;
    });

    // Chama a UI para renderizar o novo estado
    UI.renderGrid(dom.grid, dom.count, filteredPlants, projectPlants, handleToggleProject, handleOpenModal);
}

// --- HANDLERS (Funções que ligam Lógica e UI) ---

/**
 * Adiciona ou remove uma planta do projeto.
 * Esta é a *lógica*.
 * @param {object} plant - O objeto da planta.
 * @param {HTMLElement} cardElement - O elemento do card (opcional).
 */
function handleToggleProject(plant, cardElement) {
    const index = projectPlants.findIndex(p => p.id === plant.id);
    let isSelected = false;

    if (index > -1) {
        projectPlants.splice(index, 1); // Remove
        isSelected = false;
    } else {
        projectPlants.push(plant); // Adiciona
        isSelected = true;
    }
    
    // Chama a UI para atualizar o painel
    UI.renderProjectPanel(projectPlants, handleRemoveFromProject);
    // Chama a UI para atualizar o card
    UI.updateCardSelection(cardElement, isSelected);
}

/**
 * Remove uma planta do projeto (usado pelo painel lateral).
 * @param {number} plantId - O ID da planta a remover.
 */
function handleRemoveFromProject(plantId) {
    const plant = allPlants.find(p => p.id === plantId);
    if (!plant) return;

    // Encontra o card correspondente no grid, se estiver visível
    const cardInGrid = dom.grid.querySelector(`.plant-card[data-selected="true"] .add-btn`)
        ?.closest('.plant-card'); // Lógica complexa para achar o card

    handleToggleProject(plant, cardInGrid || null);
}

/**
 * Abre o modal (lógica).
 * @param {object} plant - A planta a ser exibida.
 */
function handleOpenModal(plant) {
    // Chama a UI, passando a *função de callback* que a UI deve usar
    UI.openModal(plant, generateCarePlan);
}


// --- LÓGICA DA API (IA) ---
// (Permanece em app.js pois é lógica de "negócio", não UI)

async function generateCarePlan(plant, buttonElement) {
    buttonElement.disabled = true;
    buttonElement.innerHTML = getSpinnerHtml(); // Util vindo de utils.js

    const resultContainer = document.getElementById('ia-result-container');
    resultContainer.style.display = 'none';
    await new Promise(resolve => setTimeout(resolve, 1500));

    const iaText = `
### Plano de Cuidados para ${plant.Nome} em Ilhéus, BA
... (mesmo texto de antes) ...
`;

    resultContainer.innerHTML = formatMarkdown(iaText); // Util vindo de utils.js
    resultContainer.style.display = 'block';
    buttonElement.disabled = false;
    buttonElement.innerHTML = 'Gerar Novo Plano';
}

async function generateProjectAnalysis(type, buttonElement) {
    buttonElement.disabled = true;
    const originalText = buttonElement.innerHTML;
    buttonElement.innerHTML = getSpinnerHtml();

    const resultContainer = document.getElementById('ia-project-result');
    resultContainer.style.display = 'none';
    await new Promise(resolve => setTimeout(resolve, 2000));

    const plantNames = projectPlants.map(p => p.Nome).join(', ');
    let iaText = '';
    // ... (mesma lógica de IA de antes) ...
    iaText = `### Análise (${type}) para: ${plantNames}\n\n... (resultado simulado) ...`;

    resultContainer.innerHTML = formatMarkdown(iaText);
    resultContainer.style.display = 'block';
    buttonElement.disabled = false;
    buttonElement.innerHTML = originalText;
}

// --- INICIAR A APLICAÇÃO ---
document.addEventListener('DOMContentLoaded', init);