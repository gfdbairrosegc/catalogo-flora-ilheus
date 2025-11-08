/**
 * Módulo de Utilitários
 * Contém funções puras e reutilizáveis.
 */

/**
 * Trunca uma string para um número específico de caracteres, adicionando "..."
 * @param {string} str - A string para truncar.
 * @param {number} num - O comprimento máximo.
 * @returns {string} - A string truncada.
 */
export function truncate(str, num) {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + '...';
}

/**
 * Retorna o HTML de um ícone de "spinner" para feedback de carregamento.
 * @returns {string} - O HTML do SVG do spinner.
 */
export function getSpinnerHtml() {
    return `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg> Processando...`;
}

/**
 * Converte uma string de markdown simplificado (negrito, títulos, listas) para HTML.
 * @param {string} text - O texto em markdown.
 * @returns {string} - O texto formatado em HTML.
 */
export function formatMarkdown(text) {
    if (!text) return '';

    let html = text;

    // Converte ### Título
    html = html.replace(/### (.*?)\n/g, '<h4 class="text-base font-semibold text-gray-800 mt-3 mb-2">$1</h4>');
    
    // Converte **negrito**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>');
    
    // Converte *itálico* (se necessário, mas não estava no original)
    // html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Converte listas ( - ou * )
    // Transforma múltiplos \n em um só antes de processar
    html = html.replace(/\n\n/g, '\n');
    
    // Converte linhas que começam com - ou * em <li>
    html = html.replace(/^\s*[\-\*]\s*(.*?)$/gm, '<li>$1</li>');
    
    // Agrupa <li> adjacentes em <ul>
    html = html.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    
    // Corrige múltiplos <ul> criados
    html = html.replace(/<\/ul>\n<ul>/g, '');

    // Adiciona classes de estilo ao <ul> e <li>
    html = html.replace(/<ul>/g, '<ul class="list-disc list-outside pl-5 text-gray-700 space-y-1 mt-2">');
    html = html.replace(/<li>/g, '<li class="text-gray-700">');

    // Converte quebras de linha restantes em <p>
    html = html.replace(/^(?!<[u|h]).*$/gm, (match) => {
        if (match.trim() === '') return '';
        // Evita adicionar <p> em volta de <ul>
        if (match.startsWith('<ul')) return match; 
        return `<p class="text-gray-700 mb-2">${match}</p>`;
    });

    // Limpa quebras de linha extras entre parágrafos e listas
    html = html.replace(/<\/p>\n<ul/g, '</p><ul');
    html = html.replace(/<\/ul>\n<p/g, '</ul><p');

    return html.trim();
}