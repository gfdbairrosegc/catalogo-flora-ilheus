// --- APLICATIVO PRINCIPAL ---
window.app = {
    // Banco de dados
    allPlants: [], // Será preenchido pelo dados.js
    filteredPlants: [],
    
    // Estado dos Filtros
    activeFilters: {
        luz: 'todos',
        agua: 'todos',
        crescimento: 'todos',
        tags: []
    },
    
    // Estado do Projeto
    projectPlants: [], // Armazena as plantas selecionadas (o "carrinho")

    // --- INICIALIZAÇÃO E CONFIGURAÇÃO ---

    init() {
        console.log("App inicializado.");
        // O 'plantData' vem do arquivo dados.js
        this.allPlants = [...plantData].map((plant, index) => ({...plant, id: index})); // Adiciona um ID único
        this.filteredPlants = [...this.allPlants];
        
        this.setupListeners();
        this.renderGrid();
        this.renderProjectPanel(); // Renderiza o painel de projeto inicial
    },

    setupListeners() {
        // Listener da barra de pesquisa
        document.getElementById('search-input').addEventListener('input', (e) => this.filterPlants());
        
        // Listeners dos filtros dropdown
        document.getElementById('filter-luz').addEventListener('change', (e) => {
            this.activeFilters.luz = e.target.value;
            this.filterPlants();
        });
        document.getElementById('filter-agua').addEventListener('change', (e) => {
            this.activeFilters.agua = e.target.value;
            this.filterPlants();
        });
        document.getElementById('filter-crescimento').addEventListener('change', (e) => {
            this.activeFilters.crescimento = e.target.value;
            this.filterPlants();
        });

        // Listener dos botões de tag
        document.querySelectorAll('.tag-filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                const tag = button.dataset.tag;
                
                if (this.activeFilters.tags.includes(tag)) {
                    this.activeFilters.tags = this.activeFilters.tags.filter(t => t !== tag);
                    button.dataset.active = "false";
                    button.classList.remove('bg-emerald-700', 'text-white', 'shadow-md', 'translate-y-[-1px]');
                    button.classList.add('bg-gray-200', 'text-gray-700');
                } else {
                    this.activeFilters.tags.push(tag);
                    button.dataset.active = "true";
                    button.classList.add('bg-emerald-700', 'text-white', 'shadow-md', 'translate-y-[-1px]');
                    button.classList.remove('bg-gray-200', 'text-gray-700');
                }
                
                this.filterPlants();
            });
        });

        // Listener do botão de resetar
        document.getElementById('reset-filters-btn').addEventListener('click', () => this.resetFilters());
        
        // Listeners do Modal
        document.getElementById('modal-close-btn').addEventListener('click', () => this.closeModal());
        document.getElementById('modal-backdrop').addEventListener('click', () => this.closeModal());
        
        // Listeners dos botões de IA do Painel de Projeto
        document.getElementById('ia-synergy-btn').addEventListener('click', (e) => this.generateProjectAnalysis('synergy', e.currentTarget));
        document.getElementById('ia-layout-btn').addEventListener('click', (e) => this.generateProjectAnalysis('layout', e.currentTarget));
    },

    resetFilters() {
        this.activeFilters = { luz: 'todos', agua: 'todos', crescimento: 'todos', tags: [] };
        
        document.getElementById('search-input').value = '';
        document.getElementById('filter-luz').value = 'todos';
        document.getElementById('filter-agua').value = 'todos';
        document.getElementById('filter-crescimento').value = 'todos';
        
        document.querySelectorAll('.tag-filter-btn').forEach(button => {
            button.dataset.active = "false";
            button.classList.remove('bg-emerald-700', 'text-white', 'shadow-md', 'translate-y-[-1px]');
            button.classList.add('bg-gray-200', 'text-gray-700');
        });
        
        this.filterPlants();
    },

    // --- LÓGICA DE FILTRAGEM ---

    filterPlants() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
        
        this.filteredPlants = this.allPlants.filter(plant => {
            const matchesSearch = 
                plant["Nome"].toLowerCase().includes(searchTerm) ||
                plant["Nome Científico"].toLowerCase().includes(searchTerm) ||
                plant["Descrição"].toLowerCase().includes(searchTerm) ||
                plant["Tags"].toLowerCase().includes(searchTerm);

            const matchesLuz = this.activeFilters.luz === 'todos' || plant["Luz Solar"].split(' / ').includes(this.activeFilters.luz);
            const matchesAgua = this.activeFilters.agua === 'todos' || plant["Necessidade de Água"] === this.activeFilters.agua;
            const matchesCrescimento = this.activeFilters.crescimento === 'todos' || plant["Crescimento"] === this.activeFilters.crescimento;

            const plantTags = plant["Tags"].split('; ').map(t => t.trim());
            const matchesTags = this.activeFilters.tags.length === 0 || 
                this.activeFilters.tags.every(tag => plantTags.includes(tag));

            return matchesSearch && matchesLuz && matchesAgua && matchesCrescimento && matchesTags;
        });

        this.renderGrid();
    },

    // --- RENDERIZAÇÃO DO GRID DE PLANTAS ---

    renderGrid() {
        const grid = document.getElementById('plant-grid');
        const countElement = document.getElementById('results-count');
        
        grid.innerHTML = ''; 
        
        if (this.filteredPlants.length === 0) {
            grid.innerHTML = '<p class="text-gray-500 col-span-full text-center py-10">Nenhuma planta encontrada com esses filtros.</p>';
            countElement.textContent = 'Nenhum resultado';
            return;
        }

        countElement.textContent = `${this.filteredPlants.length} resultado(s) encontrado(s)`;
        
        this.filteredPlants.forEach((plant, index) => {
            const card = document.createElement('div');
            const isSelected = this.projectPlants.some(p => p.id === plant.id);
            
            card.className = 'plant-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-gray-200';
            card.style.animationDelay = `${index * 0.03}s`;
            card.classList.add('plant-card-enter');
            card.dataset.plantId = plant.id;
            card.dataset.selected = isSelected;
            
            if (isSelected) {
                card.classList.add('plant-card-selected-state'); // Classe de estilo de seleção
            }

            const tagsHtml = plant.Tags.split('; ').slice(0, 3).map(tag => 
                `<span class="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">${tag}</span>`
            ).join(' ');

            card.innerHTML = `
                <div class="p-5">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-lg font-bold text-gray-900 leading-tight">${plant["Nome"]}</h3>
                        <div 
                            class="add-to-project-btn flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${isSelected ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-emerald-100 hover:text-emerald-700'}" 
                            title="${isSelected ? 'Remover do projeto' : 'Adicionar ao projeto'}"
                        >
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="${isSelected ? 'M5 13l4 4L19 7' : 'M12 4.5v15m7.5-7.5h-15'}" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-sm text-gray-500 italic mb-3">${plant["Nome Científico"]}</p>
                    <p class="text-gray-700 text-sm mb-4 min-h-[40px]">${this.truncate(plant["Descrição"], 90)}</p>
                    <div class="flex flex-wrap gap-2">
                        ${tagsHtml}
                    </div>
                </div>
            `;
            
            // Listeners do Card
            card.addEventListener('click', (e) => {
                // Se o clique foi no botão, deixa o outro listener cuidar
                if (e.target.closest('.add-to-project-btn')) return;
                this.openModal(plant);
            });
            
            card.querySelector('.add-to-project-btn').addEventListener('click', (e) => {
                e.stopPropagation(); // Impede que o clique no botão abra o modal
                this.toggleProjectPlant(plant, card);
            });
            
            grid.appendChild(card);
        });
    },
    
    // --- LÓGICA DO PAINEL DE PROJETO ("CARRINHO") ---
    
    toggleProjectPlant(plant, cardElement) {
        const index = this.projectPlants.findIndex(p => p.id === plant.id);
        const button = cardElement.querySelector('.add-to-project-btn');

        if (index > -1) {
            // Remove do projeto
            this.projectPlants.splice(index, 1);
            cardElement.dataset.selected = "false";
            cardElement.classList.remove('plant-card-selected-state');
            button.classList.remove('bg-emerald-600', 'text-white');
            button.classList.add('bg-gray-200', 'text-gray-600', 'hover:bg-emerald-100', 'hover:text-emerald-700');
            button.title = "Adicionar ao projeto";
            button.innerHTML = `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`;
        } else {
            // Adiciona ao projeto
            this.projectPlants.push(plant);
            cardElement.dataset.selected = "true";
            cardElement.classList.add('plant-card-selected-state');
            button.classList.add('bg-emerald-600', 'text-white');
            button.classList.remove('bg-gray-200', 'text-gray-600', 'hover:bg-emerald-100', 'hover:text-emerald-700');
            button.title = "Remover do projeto";
            button.innerHTML = `<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>`;
        }
        
        this.renderProjectPanel();
    },
    
    renderProjectPanel() {
        const list = document.getElementById('project-list');
        const countElement = document.getElementById('project-count');
        const emptyState = document.getElementById('project-empty-state');
        const projectContent = document.getElementById('project-content');
        const projectCounterBadge = document.getElementById('project-counter-badge');

        list.innerHTML = '';
        
        if (this.projectPlants.length === 0) {
            emptyState.style.display = 'block';
            projectContent.style.display = 'none';
            countElement.textContent = 'Projeto Vazio';
            projectCounterBadge.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            projectContent.style.display = 'block';
            countElement.textContent = `Meu Projeto (${this.projectPlants.length})`;
            
            projectCounterBadge.textContent = this.projectPlants.length;
            projectCounterBadge.style.display = 'flex';
            
            this.projectPlants.forEach(plant => {
                const item = document.createElement('li');
                item.className = 'flex items-center justify-between p-2 bg-white rounded-lg shadow-sm';
                item.innerHTML = `
                    <div>
                        <p class="text-sm font-semibold text-gray-800">${plant.Nome}</p>
                        <p class="text-xs text-gray-500">${plant['Luz Solar']} / ${plant['Necessidade de Água']} Água</p>
                    </div>
                    <button class="remove-from-project-btn text-red-400 hover:text-red-600 p-1" data-plant-id="${plant.id}" title="Remover">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" /></svg>
                    </button>
                `;
                list.appendChild(item);
            });
            
            // Adiciona listeners aos botões de remover
            list.querySelectorAll('.remove-from-project-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const plantId = parseInt(button.dataset.plantId);
                    const plant = this.allPlants.find(p => p.id === plantId);
                    const cardElement = document.querySelector(`.plant-card[data-plant-id="${plantId}"]`);
                    if (plant && cardElement) {
                        this.toggleProjectPlant(plant, cardElement);
                    }
                });
            });
        }
    },

    // --- LÓGICA DO MODAL ---

    openModal(plant) {
        const modal = document.getElementById('plant-modal');
        
        document.getElementById('modal-nome').textContent = plant["Nome"];
        document.getElementById('modal-nome-cientifico').textContent = plant["Nome Científico"];
        document.getElementById('modal-descricao').textContent = plant["Descrição"];

        const detailsContainer = document.getElementById('modal-details');
        detailsContainer.innerHTML = '';
        
        const details = [
            { label: 'Luz Solar', value: plant["Luz Solar"] },
            { label: 'Rega', value: plant["Necessidade de Água"] },
            { label: 'Altura', value: plant["Altura"] },
            { label: 'Crescimento', value: plant["Crescimento"] },
            { label: 'Solo Ideal', value: plant["Solo Ideal"] },
            { label: 'Floração', value: plant["Floração"] }
        ];

        details.forEach(detail => {
            detailsContainer.innerHTML += `
                <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">${detail.label}</p>
                    <p class="text-base font-semibold text-gray-800">${detail.value}</p>
                </div>
            `;
        });

        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = '';
        plant.Tags.split('; ').forEach(tag => {
            tagsContainer.innerHTML += `<span class="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">${tag}</span>`;
        });

        const iaButton = document.getElementById('ia-care-btn');
        iaButton.innerHTML = `
            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17.438 9.154a4.5 4.5 0 00-3.09-3.09L11.5 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L18.25 12l-2.846.813a4.5 4.5 0 00-3.09 3.09L11.5 18.75l.813-2.846a4.5 4.5 0 003.09-3.09L18.25 12z" /></svg>
            Gerar plano de cuidados (IA)
        `;
        iaButton.disabled = false;
        
        iaButton.replaceWith(iaButton.cloneNode(true));
        document.getElementById('ia-care-btn').addEventListener('click', (e) => this.generateCarePlan(plant, e.currentTarget));

        const iaResult = document.getElementById('ia-result-container');
        iaResult.innerHTML = '';
        iaResult.style.display = 'none';

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    },

    closeModal() {
        const modal = document.getElementById('plant-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    },

    // --- LÓGICA DA API (IA) ---

    getSpinnerHtml() {
        return `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Gerando...
        `;
    },
    
    // IA para Plano de Cuidados (no Modal)
    async generateCarePlan(plant, buttonElement) {
        const resultContainer = document.getElementById('ia-result-container');
        const originalButtonText = buttonElement.innerHTML;
        
        try {
            buttonElement.disabled = true;
            buttonElement.innerHTML = this.getSpinnerHtml();
            
            resultContainer.innerHTML = '<p class="text-gray-600 text-sm animate-pulse">Gerando plano de cuidados para <strong>' + plant["Nome"] + '</strong> em Ilhéus. Isso pode levar alguns segundos...</p>';
            resultContainer.style.display = 'block';

            // *** SIMULAÇÃO DE API ***
            const API_URL = 'https://sua-api.com/generate'; // SUBSTITUA PELA SUA API
            const prompt = `
                Crie um plano de cuidados simples para a planta "${plant["Nome"]}" (${plant["Nome Científico"]}), 
                considerando especificamente o clima de Ilhéus, Bahia (quente e úmido, com influência da maresia se a tag 'Tolerante à Maresia' estiver presente).
                
                Seja breve e direto. Use markdown simples (negrito ** e itálico * e listas -).
                
                Dados da planta para referência:
                - Descrição: ${plant["Descrição"]}
                - Tags: ${plant["Tags"]}
                - Luz: ${plant["Luz Solar"]}
                - Água: ${plant["Necessidade de Água"]}
            `;
            
            console.log("Enviando prompt para API (simulado):", prompt);

            // Simulação de chamada de API
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            const data = { 
                generatedText: `Aqui está um plano de cuidados para sua **${plant["Nome"]}** no clima quente e úmido de Ilhéus:\n\n* **Luz:** ${plant["Luz Solar"]}. Se for "Sol Pleno", evite o sol mais forte do meio-dia (11h-15h) nos primeiros meses. Se for "Meia Sombra" ou "Sombra", proteja do sol direto.\n* **Rega:** Sendo uma planta de necessidade ${plant["Necessidade de Água"].toLowerCase()}, o calor de Ilhéus exigirá atenção. Verifique o solo: se os primeiros 2-3cm estiverem secos, é hora de regar. *Nunca deixe o solo encharcado.*\n* **Umidade:** Ela vai *adorar* a umidade natural da cidade! Não precisa se preocupar em borrifar água.\n* **Maresia:** ${plant.Tags.includes("Tolerante à Maresia") ? "Ótima notícia! Esta planta tolera bem a maresia, perfeita para áreas mais próximas da praia." : "Esta planta é mais sensível. Tente protegê-la dos ventos diretos do mar se estiver muito perto da orla."}`
            };
            // FIM DA SIMULAÇÃO

            if (data && data.generatedText) {
                resultContainer.innerHTML = this.formatMarkdown(data.generatedText);
                resultContainer.style.display = 'block';
            } else {
                throw new Error("A resposta da API estava vazia.");
            }

        } catch (error) {
            console.error("Erro ao gerar plano de cuidados:", error);
            resultContainer.innerHTML = `<p class="text-red-600">Erro ao gerar plano: ${error.message}</p>`;
            resultContainer.style.display = 'block';
        } finally {
            buttonElement.disabled = false;
            buttonElement.innerHTML = originalButtonText;
        }
    },
    
    // IA para Análise de Projeto (no Painel Lateral)
    async generateProjectAnalysis(type, buttonElement) {
        if (this.projectPlants.length === 0) return;
        
        const resultContainer = document.getElementById('project-ia-result');
        const originalButtonText = buttonElement.innerHTML;
        const otherButton = (type === 'synergy') ? document.getElementById('ia-layout-btn') : document.getElementById('ia-synergy-btn');
        
        const plantList = this.projectPlants.map(p => `- ${p.Nome} (Luz: ${p['Luz Solar']}, Água: ${p['Necessidade de Água']})`).join('\n');
        
        let promptType = "";
        if (type === 'synergy') {
            promptType = "Análise de Sinergia e Conflitos";
        } else {
            promptType = "Sugestão de Layout/Arranjo";
        }
        
        try {
            buttonElement.disabled = true;
            otherButton.disabled = true;
            buttonElement.innerHTML = this.getSpinnerHtml();
            
            resultContainer.innerHTML = `<p class="text-gray-600 text-sm animate-pulse">Gerando ${promptType} para ${this.projectPlants.length} plantas... Isso pode demorar um pouco.</p>`;
            resultContainer.style.display = 'block';

            // *** SIMULAÇÃO DE API ***
            const API_URL = 'https://sua-api.com/generate'; // SUBSTITUA PELA SUA API
            let prompt = "";
            let responseText = "";
            
            if (type === 'synergy') {
                prompt = `
                    Analise a sinergia e os possíveis conflitos entre as seguintes plantas para um jardim em Ilhéus, BA.
                    Considere principalmente a compatibilidade de Luz e Rega.
                    
                    Plantas:
                    ${plantList}
                    
                    Seja breve e direto, usando markdown (negrito, itálico, listas).
                `;
                
                // Simulação de Resposta
                await new Promise(resolve => setTimeout(resolve, 2000));
                responseText = `### Análise de Sinergia (Ilhéus, BA)\n\n**Pontos Fortes:**\n* A maioria das suas plantas ama o clima quente e úmido de Ilhéus.\n* *Boa compatibilidade de luz:* Várias plantas de Sol Pleno (Ex: Helicônia, Ixora) estão bem agrupadas.\n\n**Pontos de Atenção (Conflitos):**\n* **Rega:** Você misturou plantas de *Rega Alta* (como a Samambaia) com plantas de *Rega Baixa* (como a Zamioculca). Cuidado para não apodrecer uma ou secar a outra se plantadas no mesmo vaso/canteiro.\n* **Luz:** A Costela-de-adão (Sombra) *não deve* ficar perto da Primavera (Sol Pleno).`;
                
            } else { // type === 'layout'
                prompt = `
                    Sugira um layout ou arranjo simples para as seguintes plantas, pensando em um jardim em Ilhéus, BA.
                    Considere o porte (Altura), a luz e a estética (cores, texturas).
                    
                    Plantas:
                    ${plantList}
                    
                    Seja breve e direto, usando markdown (negrito, itálico, listas).
                `;
                
                // Simulação de Resposta
                await new Promise(resolve => setTimeout(resolve, 2000));
                responseText = `### Sugestão de Layout\n\nBaseado no porte e luz:\n\n1.  **Fundo (Sol Pleno):** Use as plantas mais altas como *pano de fundo* ou *cerca viva*. Ex: Palmeira-areca, Guapuruvu (se houver espaço!).\n2.  **Meio (Sol Pleno/Meia Sombra):** Coloque os arbustos e plantas de porte médio na frente das altas. Ex: Ixora, Jasmim-Manga.\n3.  **Frente (Meia Sombra/Sombra):** Use as plantas menores e forrações na borda ou sob as maiores. Ex: Lírio-da-paz, Abacaxi-roxo.\n4.  **Vasos (Áreas Protegidas):** Plantas como a Zamioculca e a Maranta-pavão ficarão melhores em vasos na varanda, protegidas do sol direto.`;
            }
            
            console.log("Enviando prompt para API (simulado):", prompt);

            const data = { generatedText: responseText };
            // FIM DA SIMULAÇÃO

            if (data && data.generatedText) {
                resultContainer.innerHTML = `
                    <h4 class="text-base font-semibold text-gray-800 mb-2">${promptType}</h4>
                    ${this.formatMarkdown(data.generatedText)}
                `;
                resultContainer.style.display = 'block';
            } else {
                throw new Error("A resposta da API estava vazia.");
            }

        } catch (error) {
            console.error("Erro ao gerar análise de projeto:", error);
            resultContainer.innerHTML = `<p class="text-red-600">Erro ao gerar análise: ${error.message}</p>`;
            resultContainer.style.display = 'block';
        } finally {
            buttonElement.disabled = false;
            otherButton.disabled = false;
            buttonElement.innerHTML = originalButtonText;
        }
    },

    // --- FUNÇÕES UTILITÁRES ---

    truncate(str, n) {
        return (str.length > n) ? str.slice(0, n-1) + '...' : str;
    },

    formatMarkdown(text) {
        // Converte ### Título em <h4>...</h4>
        text = text.replace(/### (.*?)\\n/g, '<h4 class="text-base font-semibold text-gray-800 mt-3 mb-2">$1</h4>');
        // Converte **texto** em <strong>texto</strong>
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>');
        // Converte *texto* em <em>texto</em>
        text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
        // Converte listas ( - ou * )
        text = text.replace(/\\n[\s]*[\-\*][\s]*/g, '</li><li>');
        text = text.replace(/<li>/g, '<li class="ml-1">');
        text = text.replace(/<\/li><li>/g, '</li><li class="mt-1">');
        text = '<ul class="list-disc list-outside pl-5 text-gray-700">' + text + '</li></ul>';
        text = text.replace(/<ul><li class="ml-1">/g, '<ul class="list-disc list-outside pl-5 text-gray-700 space-y-1"><li>');
        text = text.replace(/><li>/g, '><li class="mt-1">');
        // Limpa tags de lista vazias que podem ter sido criadas
        text = text.replace(/<li>\s*<\/li>/g, '');
        text = text.replace(/<ul>\s*<\/ul>/g, '');
        // Converte quebras de linha em <br>
        text = text.replace(/\n/g, '<br>');
        text = text.replace(/<br><ul/g, '<ul');
        text = text.replace(/<\/ul><br>/g, '</ul>');
        return text;
    }
};

// --- INICIALIZAÇÃO ---
// Chamar init() diretamente, pois o script está no final do body.
window.app.init();