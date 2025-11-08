/**
 * Módulo de UI (User Interface)
 * Contém todas as funções responsáveis por renderizar
 * e manipular o DOM.
 */

// Importa utilitários necessários para a renderização
import { truncate, formatMarkdown, getSpinnerHtml } from './utils.js';

/**
 * Renderiza os cards das plantas no grid.
 * @param {HTMLElement} gridElement - O elemento <div id="plant-grid">.
 * @param {HTMLElement} countElement - O elemento <span id="results-count">.
 * @param {Array} plants - A lista de plantas (filteredPlants) para renderizar.
 * @param {Array} projectPlants - A lista de plantas no projeto (para saber quais marcar como "selecionadas").
 * @param {Function} onAddClick - Callback a ser chamado quando o botão +/- é clicado.
 * @param {Function} onDetailsClick - Callback a ser chamado quando "Ver detalhes" é clicado.
 */
export function renderGrid(gridElement, countElement, plants, projectPlants, onAddClick, onDetailsClick) {
    gridElement.innerHTML = ''; // Limpa o grid
    countElement.textContent = `${plants.length} plantas encontradas`;

    if (plants.length === 0) {
        gridElement.innerHTML = '<p class="text-gray-500 col-span-full text-center py-10">Nenhuma planta encontrada com esses filtros.</p>';
        return;
    }

    plants.forEach((plant, index) => {
        const card = document.createElement('div');
        card.className = 'plant-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg';
        card.style.animationDelay = `${index * 25}ms`;
        card.classList.add('plant-card-enter');

        const isSelected = projectPlants.some(p => p.id === plant.id);
        card.dataset.selected = isSelected.toString();

        card.innerHTML = `
            <div class="p-5">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="text-lg font-bold text-gray-900">${plant.Nome}</h3>
                        <p class="text-sm text-gray-500 italic">${plant['Nome Científico']}</p>
                    </div>
                    <button class="add-btn highlight-bg highlight-bg-dark-hover text-white rounded-full w-8 h-8 flex items-center justify-center transition-transform duration-200 flex-shrink-0 ${isSelected ? 'remove-btn' : ''}" 
                            aria-label="${isSelected ? 'Remover do projeto' : 'Adicionar ao projeto'}">
                        ${isSelected ? 
                            '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>' : 
                            '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" /></svg>'}
                    </button>
                </div>
                <p class="text-gray-700 text-sm mb-4">${truncate(plant.Descrição, 110)}</p>
                <div class="flex flex-wrap gap-2">
                    <span class="spec-tag bg-blue-100 text-blue-800">${plant['Luz Solar']}</span>
                    <span class="spec-tag bg-green-100 text-green-800">${plant['Necessidade de Água']}</span>
                    <span class="spec-tag bg-yellow-100 text-yellow-800">${plant.Crescimento}</span>
                </div>
            </div>
            <button class="details-btn block w-full text-left px-5 py-3 bg-gray-50 text-emerald-600 font-medium hover:bg-gray-100 transition-colors duration-200">
                Ver detalhes
            </button>
        `;

        // Adiciona listeners (callbacks) vindos do app.js
        card.querySelector('.add-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            onAddClick(plant, card); // Chama o callback (toggleProjectPlant)
        });
        
        card.querySelector('.details-btn').addEventListener('click', () => {
            onDetailsClick(plant); // Chama o callback (openModal)
        });

        gridElement.appendChild(card);
    });
}

/**
 * Renderiza o painel lateral do projeto.
 * @param {Array} projectPlants - A lista de plantas no projeto.
 * @param {Function} onRemoveClick - Callback a ser chamado ao remover um item.
 */
export function renderProjectPanel(projectPlants, onRemoveClick) {
    const projectList = document.getElementById('project-list');
    const projectEmptyState = document.getElementById('project-empty-state');
    const projectActions = document.getElementById('project-actions');
    const projectPlantCount = document.getElementById('project-plant-count');

    projectPlantCount.textContent = `${projectPlants.length} ${projectPlants.length === 1 ? 'planta' : 'plantas'}`;

    if (projectPlants.length === 0) {
        projectList.innerHTML = '';
        projectEmptyState.style.display = 'block';
        projectActions.style.display = 'none';
    } else {
        projectEmptyState.style.display = 'none';
        projectActions.style.display = 'block';
        
        projectList.innerHTML = projectPlants.map(plant => `
            <div class="project-list-item flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <div>
                    <p class="font-medium text-gray-800">${plant.Nome}</p>
                    <p class="text-sm text-gray-500">${plant['Luz Solar']} / ${plant['Necessidade de Água']}</p>
                </div>
                <button class="remove-project-item-btn text-red-500 hover:text-red-700 transition-colors" data-id="${plant.id}" aria-label="Remover ${plant.Nome}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        `).join('');

        // Adiciona listeners (callbacks)
        projectList.querySelectorAll('.remove-project-item-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                onRemoveClick(id); // Chama o callback
            });
        });
    }
}

/**
 * Abre e preenche o modal com detalhes da planta.
 * @param {object} plant - O objeto da planta.
 * @param {Function} onIaCareClick - Callback para o botão de "Gerar Plano de Cuidados".
 */
export function openModal(plant, onIaCareClick) {
    const modal = document.getElementById('plant-modal');
    
    document.getElementById('modal-title').textContent = plant.Nome;
    document.getElementById('modal-subtitle').textContent = plant['Nome Científico'];
    
    const modalDescricao = document.getElementById('modal-descricao');
    modalDescricao.innerHTML = formatMarkdown(plant.Descrição);

    const detailsContainer = document.getElementById('modal-details');
    detailsContainer.innerHTML = `
        <div class="spec-item"><span class="spec-label">Luz Solar:</span><span class="spec-value">${plant['Luz Solar']}</span></div>
        <div class="spec-item"><span class="spec-label">Água:</span><span class="spec-value">${plant['Necessidade de Água']}</span></div>
        <div class="spec-item"><span class="spec-label">Crescimento:</span><span class="spec-value">${plant.Crescimento}</span></div>
        <div class="spec-item"><span class="spec-label">Altura:</span><span class="spec-value">${plant.Altura}</span></div>
        <div class="spec-item"><span class="spec-label">Floração:</span><span class="spec-value">${plant.Floração}</span></div>
        <div class="spec-item"><span class="spec-label">Solo Ideal:</span><span class="spec-value">${plant['Solo Ideal']}</span></div>
    `;

    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = plant.Tags.split(';')
        .map(tag => `<span class="tag">${tag.trim()}</span>`)
        .join('');

    // Configura o botão de IA (resetando estado anterior)
    const iaBtn = document.getElementById('ia-care-btn');
    iaBtn.disabled = false;
    iaBtn.innerHTML = 'Gerar Plano de Cuidados';
    
    const iaResult = document.getElementById('ia-result-container');
    iaResult.style.display = 'none';
    iaResult.innerHTML = '';
    
    // Remove listener antigo e adiciona um novo para garantir o callback correto
    const newIaBtn = iaBtn.cloneNode(true);
    iaBtn.parentNode.replaceChild(newIaBtn, iaBtn);
    newIaBtn.addEventListener('click', () => onIaCareClick(plant, newIaBtn));

    // Exibe o modal
    modal.classList.remove('hidden');
    void modal.offsetWidth; 
    modal.classList.add('modal-active');
}

/**
 * Fecha o modal.
 */
export function closeModal() {
    const modal = document.getElementById('plant-modal');
    modal.classList.remove('modal-active');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300); // 300ms (duração da animação em style.css)
}

/**
 * Atualiza visualmente um card e seu botão +/- no grid.
 * @param {HTMLElement} cardElement - O elemento do card.
 * @param {boolean} isSelected - O novo estado de seleção.
 */
export function updateCardSelection(cardElement, isSelected) {
    if (!cardElement) return;

    cardElement.dataset.selected = isSelected.toString();
    const btn = cardElement.querySelector('.add-btn');
    
    btn.innerHTML = isSelected ? 
        '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>' : 
        '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" /></svg>';
    
    btn.setAttribute('aria-label', isSelected ? 'Remover do projeto' : 'Adicionar ao projeto');
    btn.classList.toggle('remove-btn', isSelected);
}