import React, { useState, useMemo } from 'react';
import { 
  Leaf, 
    
  Home,     
  Maximize,
  Globe, 
  AlertTriangle,
  Flower,
  X,
  Filter,
  PawPrint, // Adicionado para corrigir o erro
  Baby,     // Adicionado para corrigir o erro
  Smile,    // Adicionado
  Search,   // Adicionado
  Sun,      // Adicionado
  Activity, // Adicionado
  Sprout,   // Adicionado
  Wind,     // Adicionado
  Minus,    // Adicionado
  Plus,     // Adicionado
  Trash2,   // Adicionado
  Sparkles, // Adicionado
  Loader,   // Adicionado
  ArrowRight // Adicionado
} from 'lucide-react';

// --- CONFIGURAÇÃO DE IMAGENS ---
const AUTOMATIC_IMAGE_HOST = "/catalogo-flora-ilheus/images/"; 

// --- DATABASE COMPLETO ---
const plantData = [
    {
        "Nome": "Alamanda Amarela",
        "Nome Científico": "Allamanda cathartica",
        "Descrição": "Trepadeira vigorosa com flores amarelas grandes. Cobre cercas rapidamente.",
        "Altura": "Trepadeira",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Média",
        "Espacos": ["Jardim (Médio)", "Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Exótica",
        "Grupo": "Trepadeira",
        "Frutifera": false,
        "Tags": "Trepadeira; Fácil de Cuidar; Tropical; Floração Ornamental; Crescimento Rápido; Tóxica"
    },
    {
        "Nome": "Antúrio Vermelho",
        "Nome Científico": "Anthurium andraeanum",
        "Descrição": "Clássico de sombra. Flores duráveis e folhagem brilhante.",
        "Altura": "0.5 m",
        "Luz Solar": "Meia Sombra",
        "Necessidade de Água": "Média",
        "Espacos": ["Apartamento/Varanda", "Jardim (Médio)"],
        "Dificuldade": "Moderada",
        "Origem": "Exótica",
        "Grupo": "Herbácea",
        "Frutifera": false,
        "Tags": "Vaso; Sombra; Floração Longa; Tóxica"
    },
    {
        "Nome": "Araçá-amarelo",
        "Nome Científico": "Psidium cattleianum",
        "Descrição": "Arbusto frutífero resistente. Frutos parecem mini goiabas.",
        "Altura": "3-5 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Média",
        "Espacos": ["Jardim (Médio)", "Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Arbusto",
        "Frutifera": true,
        "Tags": "Frutífera; Atrai Pássaros; Resistente"
    },
    {
      "Nome": "Bambu Taboca",
      "Nome Científico": "Bambusa vulgaris",
      "Descrição": "Bambu brasileiro de crescimento rápido, ótimo para cerca viva, telas verdes e pontos verticais no projeto. Requer manutenção para controlar brotações e raízes. Geralmente não é tóxico.",
      "Altura": "3-8 m (varia conforme manejo)",
      "Luz Solar": "Sol Pleno",
      "Necessidade de Água": "Média",
      "Espacos": ["Jardim (Médio)", "Quintal (Grande)"],
      "Dificuldade": "Moderada",
      "Origem": "Nativa",
      "Grupo": "Bambu",
      "Frutifera": false,
      "Tags": "Cerca Viva; Crescimento Rápido; Ornamental; Requer Controle de Raiz"
    },
    
    {
        "Nome": "Bromélia Imperial",
        "Nome Científico": "Alcantarea imperialis",
        "Descrição": "Gigante das bromélias. Majestosa, tolera sol pleno e vira ponto focal no jardim.",
        "Altura": "1.5 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Baixa",
        "Espacos": ["Jardim (Médio)", "Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Herbácea",
        "Frutifera": false,
        "Tags": "Escultural; Nativa do Brasil"
    },
    {
        "Nome": "Bromélia Porto Seguro",
        "Nome Científico": "Acanthostachys strobilacea",
        "Descrição": "Folhas finas e pendentes com frutos alaranjados. Ótima para cestas suspensas.",
        "Altura": "0.3 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Média",
        "Espacos": ["Apartamento/Varanda"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Herbácea",
        "Frutifera": false,
        "Tags": "Pendente; Nativa do Brasil; Tolerante à Maresia"
    },
    {
        "Nome": "Calathea-zebra",
        "Nome Científico": "Goeppertia zebrina",
        "Descrição": "Folhas zebradas aveludadas. Exige sombra e umidade constante.",
        "Altura": "0.8 m",
        "Luz Solar": "Sombra",
        "Necessidade de Água": "Alta",
        "Espacos": ["Apartamento/Varanda", "Jardim (Médio)"],
        "Dificuldade": "Difícil",
        "Origem": "Nativa",
        "Grupo": "Herbácea",
        "Frutifera": false,
        "Tags": "Folhagem Ornamental; Sombra; Delicada"
    },
    {
        "Nome": "Clúsia",
        "Nome Científico": "Clusia fluminensis",
        "Descrição": "Folhas rígidas em forma de gota. Excelente para cercas vivas no litoral.",
        "Altura": "3-4 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Baixa",
        "Espacos": ["Jardim (Médio)", "Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Arbusto",
        "Frutifera": false,
        "Tags": "Cerca Viva; Nativa do Brasil; Alta Resistência"
    },
    {
        "Nome": "Costela-de-Adão",
        "Nome Científico": "Monstera deliciosa",
        "Descrição": "Folhagem escultural para áreas sombreadas. Muito usada em design de interiores.",
        "Altura": "2-3 m",
        "Luz Solar": "Sombra",
        "Necessidade de Água": "Média",
        "Espacos": ["Apartamento/Varanda", "Jardim (Médio)"],
        "Dificuldade": "Fácil",
        "Origem": "Exótica",
        "Grupo": "Herbácea",
        "Frutifera": true,
        "Tags": "Folhagem Ornamental; Sombra; Tóxica"
    },
    {
        "Nome": "Feijão-da-praia",
        "Nome Científico": "Sophora tomentosa",
        "Descrição": "Arbusto de restinga com flores amarelas e folhagem prateada.",
        "Altura": "1-3 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Baixa",
        "Espacos": ["Jardim (Médio)", "Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Arbusto",
        "Frutifera": false,
        "Tags": "Tolerante à Maresia; Alta Resistência"
    },
    {
        "Nome": "Grama Amendoim",
        "Nome Científico": "Arachis repens",
        "Descrição": "Forração com flores amarelas que nutre o solo. Não precisa de poda! Ideal para taludes, mas não aguenta pisoteio.",
        "Altura": "0.2 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Média",
        "Espacos": ["Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Forração",
        "Frutifera": false,
        "Tags": "Forração; Flores Amarelas; Sem Poda"
    },
    
    {
        "Nome": "Grama Esmeralda",
        "Nome Científico": "Zoysia japonica",
        "Descrição": "O clássico gramado denso. Resistente a pisoteio, forma um tapete perfeito ao sol. Exige poda frequente.",
        "Altura": "0.1 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Média",
        "Espacos": ["Jardim (Médio)", "Quintal (Grande)"],
        "Dificuldade": "Moderada",
        "Origem": "Exótica",
        "Grupo": "Gramado",
        "Frutifera": false,
        "Tags": "Forração; Resistente ao Pisoteio"
    },
    
    {
        "Nome": "Grama Santo Agostinho",
        "Nome Científico": "Stenotaphrum secundatum",
        "Descrição": "A rainha do litoral. Folhas mais largas e lisas, extremamente resistente à maresia e tolera bem a meia-sombra.",
        "Altura": "0.15 m",
        "Luz Solar": "Meia Sombra",
        "Necessidade de Água": "Média",
        "Espacos": ["Quintal (Grande)", "Jardim (Médio)"],
        "Dificuldade": "Fácil",
        "Origem": "Exótica",
        "Grupo": "Gramado",
        "Frutifera": false,
        "Tags": "Gramado; Litoral; Resistente à Maresia"
    },
    
    {
        "Nome": "Grumixama",
        "Nome Científico": "Eugenia brasiliensis",
        "Descrição": "Cereja brasileira. Frutos deliciosos e copa ornamental.",
        "Altura": "5-10 m",
        "Luz Solar": "Meia Sombra",
        "Necessidade de Água": "Alta",
        "Espacos": ["Jardim (Médio)", "Quintal (Grande)"],
        "Dificuldade": "Moderada",
        "Origem": "Nativa",
        "Grupo": "Árvore",
        "Frutifera": true,
        "Tags": "Frutífera; Atrai Pássaros; Sombra"
    },
    {
        "Nome": "Guapuruvu",
        "Nome Científico": "Schizolobium parahyba",
        "Descrição": "Crescimento explosivo. Tronco reto e flores amarelas no alto.",
        "Altura": "20-30 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Alta",
        "Espacos": ["Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Árvore",
        "Frutifera": false,
        "Tags": "Crescimento Rápido; Ornamental"
    },
    {
        "Nome": "Helicônia Papagaio",
        "Nome Científico": "Heliconia psittacorum",
        "Descrição": "Planta tropical de floração exuberante. Perfeita para renques junto a muros.",
        "Altura": "1-2 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Alta",
        "Espacos": ["Jardim (Médio)", "Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Exótica",
        "Grupo": "Herbácea",
        "Frutifera": false,
        "Tags": "Tropical; Atrai Beija-flores; Floração Ornamental"
    },
    {
        "Nome": "Ipê-amarelo",
        "Nome Científico": "Handroanthus chrysotrichus",
        "Descrição": "Símbolo do Brasil. Floração espetacular no inverno quando perde as folhas.",
        "Altura": "8-15 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Baixa",
        "Espacos": ["Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Árvore",
        "Frutifera": false,
        "Tags": "Símbolo do Brasil; Floração Ornamental; Decídua"
    },
    {
        "Nome": "Ipê-branco",
        "Nome Científico": "Handroanthus roseoalbus",
        "Descrição": "Floração branca efêmera e delicada. Porte menor que outros ipês.",
        "Altura": "7-16 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Baixa",
        "Espacos": ["Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Árvore",
        "Frutifera": false,
        "Tags": "Floração Efêmera; Ornamental"
    },
    {
        "Nome": "Ipê-roxo",
        "Nome Científico": "Handroanthus impetiginosus",
        "Descrição": "Espetáculo roxo no inverno. Ideal para calçadas se houver espaço.",
        "Altura": "8-12 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Baixa",
        "Espacos": ["Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Árvore",
        "Frutifera": false,
        "Tags": "Floração Ornamental; Inverno"
    },
    {
        "Nome": "Ixora Vermelha",
        "Nome Científico": "Ixora coccinea",
        "Descrição": "Arbusto muito florífero e resistente, ideal para cercas vivas baixas.",
        "Altura": "1-2 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Média",
        "Espacos": ["Jardim (Médio)", "Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Exótica",
        "Grupo": "Arbusto",
        "Frutifera": false,
        "Tags": "Cerca Viva; Tolerante à Maresia; Atrai Borboletas"
    },
    {
        "Nome": "Jasmim-Manga",
        "Nome Científico": "Plumeria rubra",
        "Descrição": "Árvore suculenta de flores perfumadas. Resistente à seca e maresia.",
        "Altura": "3-5 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Baixa",
        "Espacos": ["Jardim (Médio)", "Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Exótica",
        "Grupo": "Árvore",
        "Frutifera": false,
        "Tags": "Escultural; Tolerante à Maresia; Flores Perfumadas; Tóxica"
    },
    {
        "Nome": "Jatobá",
        "Nome Científico": "Hymenaea courbaril",
        "Descrição": "Árvore de grande porte com frutos de casca dura e polpa farinácea.",
        "Altura": "15-30 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Baixa",
        "Espacos": ["Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Árvore",
        "Frutifera": true,
        "Tags": "Frutífera; Uso de Madeira"
    },
    {
        "Nome": "Jequitibá-rosa",
        "Nome Científico": "Cariniana legalis",
        "Descrição": "O gigante da floresta. Árvore monumental para grandes espaços e parques.",
        "Altura": "30-50 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Média",
        "Espacos": ["Quintal (Grande)"],
        "Dificuldade": "Moderada",
        "Origem": "Nativa",
        "Grupo": "Árvore",
        "Frutifera": false,
        "Tags": "Sombra; Símbolo da Mata Atlântica; Porte Monumental"
    },
    {
        "Nome": "Maranta Tricolor",
        "Nome Científico": "Maranta leuconeura var. erythroneura",
        "Descrição": "Nervuras vermelhas vibrantes sobre fundo verde escuro. Joia da mata.",
        "Altura": "0.3 m",
        "Luz Solar": "Sombra",
        "Necessidade de Água": "Alta",
        "Espacos": ["Apartamento/Varanda"],
        "Dificuldade": "Difícil",
        "Origem": "Nativa",
        "Grupo": "Herbácea",
        "Frutifera": false,
        "Tags": "Folhagem Ornamental; Sombra"
    },
    {
        "Nome": "Maranta-pavão",
        "Nome Científico": "Maranta leuconeura var. kerchoveana",
        "Descrição": "Folhas com manchas que lembram penas de pavão. Ótima para forração em sombra.",
        "Altura": "0.3 m",
        "Luz Solar": "Sombra",
        "Necessidade de Água": "Alta",
        "Espacos": ["Apartamento/Varanda", "Jardim (Médio)"],
        "Dificuldade": "Difícil",
        "Origem": "Nativa",
        "Grupo": "Herbácea",
        "Frutifera": false,
        "Tags": "Folhagem Ornamental; Sombra; Forração"
    },
    {
        "Nome": "Orquídea Cattleya",
        "Nome Científico": "Cattleya schofieldiana",
        "Descrição": "Orquídea epífita com flores grandes e perfumadas. Exige cuidados específicos.",
        "Altura": "0.3 m",
        "Luz Solar": "Meia Sombra",
        "Necessidade de Água": "Média",
        "Espacos": ["Apartamento/Varanda"],
        "Dificuldade": "Difícil",
        "Origem": "Nativa",
        "Grupo": "Herbácea",
        "Frutifera": false,
        "Tags": "Floração Ornamental; Epífita"
    },
    {
        "Nome": "Orquídea-da-praia",
        "Nome Científico": "Epidendrum fulgens",
        "Descrição": "Orquídea terrestre resistente que cresce na areia. Flores laranja vibrantes.",
        "Altura": "0.6 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Baixa",
        "Espacos": ["Apartamento/Varanda", "Jardim (Médio)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Herbácea",
        "Frutifera": false,
        "Tags": "Tolerante à Maresia; Floração Ornamental"
    },
    {
        "Nome": "Paineira-rosa",
        "Nome Científico": "Ceiba speciosa",
        "Descrição": "Tronco bojudo com espinhos e flores rosa espetaculares.",
        "Altura": "20-30 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Baixa",
        "Espacos": ["Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Árvore",
        "Frutifera": false,
        "Tags": "Floração Ornamental; Decídua"
    },
    {
        "Nome": "Palmeira Areca",
        "Nome Científico": "Dypsis lutescens",
        "Descrição": "Palmeira de múltiplos caules, muito usada para cerca viva e privacidade.",
        "Altura": "3-6 m",
        "Luz Solar": "Meia Sombra",
        "Necessidade de Água": "Média",
        "Espacos": ["Jardim (Médio)", "Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Exótica",
        "Grupo": "Palmeira",
        "Frutifera": false,
        "Tags": "Privacidade; Tropical; Purifica o Ar"
    },
    {
        "Nome": "Palmito-juçara",
        "Nome Científico": "Euterpe edulis",
        "Descrição": "Palmeira elegante e ameaçada. Produz frutos que atraem muitos pássaros.",
        "Altura": "10-15 m",
        "Luz Solar": "Meia Sombra",
        "Necessidade de Água": "Alta",
        "Espacos": ["Quintal (Grande)"],
        "Dificuldade": "Moderada",
        "Origem": "Nativa",
        "Grupo": "Palmeira",
        "Frutifera": true,
        "Tags": "Ameaçada; Frutífera; Atrai Pássaros"
    },
    {
        "Nome": "Pau-brasil",
        "Nome Científico": "Paubrasilia echinata",
        "Descrição": "Árvore histórica com tronco espinhoso e flores amarelas perfumadas.",
        "Altura": "10-15 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Baixa",
        "Espacos": ["Quintal (Grande)"],
        "Dificuldade": "Moderada",
        "Origem": "Nativa",
        "Grupo": "Árvore",
        "Frutifera": false,
        "Tags": "Símbolo do Brasil; Histórica"
    },
    {
        "Nome": "Pau-ferro",
        "Nome Científico": "Caesalpinia ferrea",
        "Descrição": "Tronco marmorizado belíssimo. Copa ampla que fornece sombra leve.",
        "Altura": "8-15 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Baixa",
        "Espacos": ["Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Árvore",
        "Frutifera": false,
        "Tags": "Tronco Ornamental; Uso de Madeira; Sombra"
    },
    {
        "Nome": "Pitanga",
        "Nome Científico": "Eugenia uniflora",
        "Descrição": "Frutífera clássica. Aceita poda e pode ser mantida como arbusto.",
        "Altura": "3-5 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Média",
        "Espacos": ["Jardim (Médio)", "Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Arbusto",
        "Frutifera": true,
        "Tags": "Frutífera; Atrai Pássaros; Cerca Viva"
    },
    {
        "Nome": "Quaresmeira",
        "Nome Científico": "Pleroma granulosum",
        "Descrição": "Floração roxa intensa duas vezes ao ano. Ótima para calçadas (sem fiação).",
        "Altura": "8-12 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Média",
        "Espacos": ["Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Árvore",
        "Frutifera": false,
        "Tags": "Floração Ornamental; Calçada"
    },
    {
        "Nome": "Sibipiruna",
        "Nome Científico": "Caesalpinia peltophoroides",
        "Descrição": "Copa ampla e floração amarela. Muito usada em arborização urbana.",
        "Altura": "10-15 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Média",
        "Espacos": ["Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Árvore",
        "Frutifera": false,
        "Tags": "Arborização Urbana; Floração Ornamental; Sombra"
    },
    {
        "Nome": "Suculenta Jade",
        "Nome Científico": "Crassula ovata",
        "Descrição": "Planta robusta e de baixíssima manutenção. Parece uma mini árvore.",
        "Altura": "0.5 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Baixa",
        "Espacos": ["Apartamento/Varanda"],
        "Dificuldade": "Fácil",
        "Origem": "Exótica",
        "Grupo": "Suculenta",
        "Frutifera": false,
        "Tags": "Baixa Manutenção; Tolerante à Maresia; Alta Resistência"
    }
]
// --- HELPER FUNCTIONS ---

const getAutomaticImage = (plantName) => {
    if (!AUTOMATIC_IMAGE_HOST) return null;
    const cleanName = plantName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''); 
    return `${AUTOMATIC_IMAGE_HOST}${cleanName}.jpg`;
};

const formatImageURL = (url, plantName) => {
  if (AUTOMATIC_IMAGE_HOST && !url) return getAutomaticImage(plantName);
  if (!url) return '';

  if (url.includes('github.com') && url.includes('/blob/')) {
    return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
  }

  if (url.includes('drive.google.com')) {
    try {
      let fileId = '';
      const match1 = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      const match2 = url.match(/id=([a-zA-Z0-9_-]+)/);
      if (match1) fileId = match1[1]; else if (match2) fileId = match2[1];
      if (fileId) return `https://drive.google.com/uc?export=view&id=${fileId}`;
    } catch (e) { return url; }
  }
  
  return url;
};

// Gera caminho local para imagens das plantas (normaliza nomes: lowercase, sem acentos, espaços -> hífens)
const getPlantImage = (plantName) => {
  if (!plantName) return '';
  // Normaliza: remove acentos, converte para lowercase, espaços -> '-', remove chars não alfanuméricos/hífen
  const cleanName = plantName.toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const basePath = import.meta.env.BASE_URL || '/'; // Pega a base correta (/catalogo-flora-ilheus/)
  return `${basePath}images/${cleanName}.jpg`;
};

// Converte uma string simples em Markdown para HTML básico (headings, listas, bold/italic, links)
// NOTA: o resultado NÃO é sanitizado — em produção, use DOMPurify.sanitize(html) antes de inserir no DOM.
const markdownToHtml = (md) => {
  if (!md) return '';
  const lines = md.split(/\r?\n/);
  let out = '';
  let inList = false;

  for (let rawLine of lines) {
    const line = rawLine.trim();
    if (line === '') {
      if (inList) { out += '</ul>'; inList = false; }
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      if (inList) { out += '</ul>'; inList = false; }
      const level = heading[1].length;
      out += `<h${level}>${heading[2]}</h${level}>`;
      continue;
    }

    const listItem = line.match(/^[-*+]\s+(.*)$/);
    if (listItem) {
      if (!inList) { inList = true; out += '<ul>'; }
      out += `<li>${listItem[1]}</li>`;
      continue;
    }

    // Inline formatting: bold, italic, links
    let inline = line
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    out += `<p>${inline}</p>`;
  }

  if (inList) out += '</ul>';
  return out;
};

// --- COMPONENTS ---

const FilterSelect = ({ label, options, selected, onChange, icon: Icon }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 ml-1">
      <Icon size={12} className="text-lime-600" />
      {label}
    </label>
    <div className="relative">
        <select 
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            className="w-full appearance-none bg-white/50 backdrop-blur-sm border border-white/60 hover:border-emerald-300 text-emerald-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all shadow-sm font-medium cursor-pointer"
        >
            <option value="">Todos</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-emerald-600">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
        </div>
    </div>
  </div>
);

const FilterToggle = ({ label, isActive, onToggle, icon: Icon }) => (
    <button 
        onClick={onToggle}
        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all duration-300 group ${isActive ? 'bg-gradient-to-r from-lime-500 to-emerald-500 text-white border-transparent shadow-lg shadow-emerald-500/30' : 'bg-white/50 border-white/60 text-emerald-800 hover:bg-white hover:shadow-md'}`}
    >
        <div className="flex items-center gap-3">
            <Icon size={18} className={isActive ? 'text-white' : 'text-emerald-600'} />
            <span className="font-bold text-sm">{label}</span>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isActive ? 'border-white bg-white text-emerald-600' : 'border-emerald-300 bg-transparent'}`}>
            {isActive && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
        </div>
    </button>
);

const Tag = ({ text, color }) => (
  <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full shadow-sm backdrop-blur-md bg-opacity-90 border border-white/40 ${color} transition-transform hover:scale-105`}>
    {text}
  </span>
);

const PlantCard = ({ plant, isSelected, onToggle }) => {
  const imageSrc = plant.Imagem ? formatImageURL(plant.Imagem, plant.Nome) : getPlantImage(plant.Nome);
  const isNative = plant.Origem === "Nativa";

  // Ícone de Grupo dinâmico (Usando ícones seguros e importados)
  let GroupIcon = Leaf;
  if(plant.Grupo === "Árvore") GroupIcon = Sprout; 
  if(plant.Grupo === "Arbusto") GroupIcon = Leaf;
  if(plant.Grupo === "Gramado" || plant.Grupo === "Forração") GroupIcon = Wind;
  if(plant.Grupo === "Herbácea") GroupIcon = Flower;

  return (
    <div 
      className={`
      group relative flex flex-col h-full 
      bg-white border border-emerald-100/80 shadow-sm 
      rounded-[2rem] overflow-hidden transition-all duration-300 
      hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1
      ${isSelected ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}
    `}
      onClick={() => onToggle(plant)}
    >
      <div className="h-56 overflow-hidden relative">
           <img 
             src={imageSrc}
             alt={plant.Nome}
             loading="lazy"
             decoding="async"
             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
             onError={(e) => {
               const el = e.target;
               try {
                 const attempts = parseInt(el.dataset.attempts || '0', 10);
                 const src = el.src || '';
                 const m = src.match(/(\.jpe?g|\.png|\.webp)(\?.*)?$/i);
                 const base = m ? src.slice(0, m.index) : src;
                 const query = m && m[2] ? m[2] : '';

                 // 0: try .webp, 1: try .png, otherwise fallback
                 if (attempts === 0) {
                   el.dataset.attempts = '1';
                   el.src = base + '.webp' + query;
                   return;
                 }
                 if (attempts === 1) {
                   el.dataset.attempts = '2';
                   el.src = base + '.png' + query;
                   return;
                 }
               } catch (err) {
                 // ignore and fallback
               }
               el.onerror = null;
               el.src = "https://placehold.co/600x400?text=Sem+Foto";
             }}
           />
        
        {/* Gradiente Elegante */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-80"></div>
        
        {/* Badge de Origem Glass */}
        <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg backdrop-blur-md border border-white/30 flex items-center gap-1 shadow-lg ${isNative ? 'bg-emerald-600/80 text-white' : 'bg-amber-600/80 text-white'}`}>
                {isNative ? <Leaf size={10} /> : <Globe size={10} />}
                {plant.Origem}
            </span>
        </div>

        {/* Badge de Frutífera (Se aplicável) */}
        {plant.Frutifera && (
            <div className="absolute top-3 right-14">
                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg backdrop-blur-md border border-white/30 flex items-center gap-1 shadow-lg bg-rose-500/90 text-white">
                    <Sprout size={10} /> Frutífera
                </span>
            </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-xl font-bold leading-tight drop-shadow-md text-white">{plant.Nome}</h3>
            <p className="text-xs text-lime-100 font-medium opacity-90 drop-shadow-sm">{plant["Nome Científico"]}</p>
        </div>

        <div className="absolute top-3 right-3">
           <button className={`p-2 rounded-full transition-all duration-300 shadow-lg ${isSelected ? 'bg-gradient-to-r from-lime-500 to-green-500 text-white scale-110 rotate-90' : 'bg-white/30 text-white hover:bg-white hover:text-emerald-700 backdrop-blur-md'}`}>
             {isSelected ? <Minus size={18} /> : <Plus size={18} />}
           </button>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        
        {/* 1. LINHA DE METADADOS: Grupo */}
        <div className="flex flex-wrap gap-2 mb-4">
             {/* Tag Grupo */}
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg backdrop-blur-md border border-slate-200 bg-slate-100 text-slate-600 flex items-center gap-1 shadow-sm w-fit">
                <GroupIcon size={10} /> {plant.Grupo}
            </span>
        </div>

        {/* 2. LINHA DE TAGS FUNCIONAIS: Sol, Água */}
        <div className="flex flex-wrap gap-2 mb-3">
           {plant["Luz Solar"] === "Sol Pleno" && <Tag text="☀️ Sol" color="bg-amber-100 text-amber-800 border-amber-200" />}
           {plant["Luz Solar"] === "Meia Sombra" && <Tag text="⛅ Meia Sombra" color="bg-orange-100 text-orange-800 border-orange-200" />}
           {plant["Luz Solar"] === "Sombra" && <Tag text="☁️ Sombra" color="bg-blue-100 text-blue-800 border-blue-200" />}
           
           <Tag text={`💧 ${plant["Necessidade de Água"]}`} color="bg-sky-100 text-sky-800 border-sky-200" />
        </div>
        
        <p className="text-sm text-emerald-900/80 line-clamp-3 mb-4 leading-relaxed font-medium">{plant.Descrição}</p>
        
        <div className="mt-auto pt-3 border-t border-emerald-100/50 flex justify-between items-center text-xs text-emerald-800 font-semibold">
            <span className="flex items-center gap-1 opacity-70">
                <Leaf size={14} /> Altura: {plant.Altura}
            </span>
            <span className={`font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${plant.Dificuldade === 'Fácil' ? 'bg-green-100 text-green-700' : plant.Dificuldade === 'Moderada' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {plant.Dificuldade}
            </span>
        </div>
      </div>
    </div>
  );
};

const GardenPlan = ({ selectedPlants, onRemove }) => {
  const [aiAdvice, setAiAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    spaceSize: 'Médio',
    hasPets: false,
    hasChildren: false
  });

  // Note: removed example `gerarTexto()` because it referenced undefined
  // variables (`model`, `prompt`) and could cause runtime/lint errors.

  // Função para testar modelos disponíveis
  const testAvailableModels = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API;
      if (!apiKey) {
        console.error("Chave de API ausente");
        return;
      }
      
      const cleanKey = apiKey.trim();
      const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`;
      
      console.log("Listando modelos disponíveis...");
      const response = await fetch(listUrl);
      const data = await response.json();
      
      if (data.models && data.models.length > 0) {
        console.log("✅ Modelos disponíveis:");
        data.models.forEach(model => {
          console.log(`  - ${model.name} (versão: ${model.version})`);
        });
        // Retorna o primeiro modelo disponível
        const firstModel = data.models[0].name.split('/').pop();
        console.log(`\n📌 Use este modelo: "${firstModel}"`);
      } else {
        console.error("Nenhum modelo encontrado. Verifique sua chave de API e permissões no Google Cloud.");
      }
    } catch (error) {
      console.error("Erro ao listar modelos:", error);
    }
  };

  const generateAIPlan = async () => {
    if (selectedPlants.length === 0) return;
    setLoading(true);
    setAiAdvice(null);

    // 1. Monte seu prompt com base no espaço selecionado
    const spaceDescriptions = {
      "Pequeno (Varanda)": "varanda",
      "Médio (Jardim)": "jardim médio",
      "Grande (Quintal)": "quintal grande"
    };
    const spaceDesc = spaceDescriptions[userInfo.spaceSize] || "espaço";
    const promptFinal = `Crie um plano de jardinagem personalizado para um ${spaceDesc}.`;

    try {
      const apiKey = import.meta.env.VITE_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API;
      if (!apiKey) throw new Error("Chave de API ausente. Verifique VITE_API_KEY ou VITE_GEMINI_API_KEY no .env");

      const cleanKey = apiKey.trim();
      const finalUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${cleanKey}`;

      // Prepare a strict prompt: provide the available plants and selected plants, request JSON-only output
      const availableNames = plantData.map(p => p.Nome).join(', ');
      const selectedNames = selectedPlants.map(p => p.Nome).join(', ');
      const userHasPets = userInfo.hasPets ? true : false;
      const userHasChildren = userInfo.hasChildren ? true : false;
      const spaceSize = userInfo.spaceSize;

      const jsonInstruction = `Você é um assistente de paisagismo. Use APENAS plantas da lista fornecida. Disponíveis: ${availableNames}. Selecionadas: ${selectedNames}. ` +
        `Informações do usuário: espaço=${spaceSize}, temPets=${userHasPets}, temCrianças=${userHasChildren}. ` +
        `ESTRUTURA DO JSON: { "project": { "overview": "texto curto", "placements": [{ "plant": "Nome", "location": "onde", "reason": "motivo", "watering": "frequência (ex: 2x por semana)", "fertilizing": "plano (ex: mensal com NPK 10-10-10)" }] }, "cautions": [{ "plant": "Nome (se tóxica)", "toxicity": "breve descrição", "safety_tip": "como usar com segurança (ex: colocar num local alto, longe de pets)" }], "alternatives": [{ "plant": "Nome", "reason": "por quê" }], "notes": "observações" }. Para cada planta SELECIONADA, inclua um plano específico de rega e adubagem baseado em suas necessidades. Se temPets ou temCrianças for true, NÃO coloque plantas tóxicas em 'placements'; coloque em 'cautions' com uma dica de segurança. Retorne apenas JSON, sem texto adicional.`;

      const prompt = `${promptFinal}\n\n${jsonInstruction}`;

      console.log("Chamando API (JSON prompt) em:", finalUrl);

      const response = await fetch(finalUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => null);
        console.error("Erro da API:", response.status, errText || response.statusText);
        throw new Error(`Erro API: ${response.status} - ${errText || response.statusText}`);
      }

      const data = await response.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleaned = raw.replace(/```(?:json|text|\w*)\n?/g, '').trim();
      console.log('Resposta bruta da IA:', cleaned);

      // Tenta parsear JSON estrito
      let parsed = null;
      try {
        parsed = JSON.parse(cleaned);
      } catch (e) {
        // tenta extrair o primeiro objeto JSON do texto
        const match = cleaned.match(/\{[\s\S]*\}/);
        if (match) {
          try { parsed = JSON.parse(match[0]); } catch (_) { parsed = null; }
        }
      }

      // Se conseguimos um JSON válido, construa HTML estruturado (projeto primeiro, depois alternativas)
      if (parsed && typeof parsed === 'object') {
        const projectPlacements = Array.isArray(parsed?.project?.placements) ? parsed.project.placements : (Array.isArray(parsed.suggestions) ? parsed.suggestions : []);
        const projectOverview = parsed?.project?.overview || parsed.overview || '';
        const alternatives = Array.isArray(parsed?.alternatives) ? parsed.alternatives : (Array.isArray(parsed.otherPlants) ? parsed.otherPlants : []);
        const cautions = Array.isArray(parsed?.cautions) ? parsed.cautions : [];

        const validPlants = new Set(plantData.map(p => p.Nome.toLowerCase()));
        let placements = projectPlacements.filter(s => s.plant && validPlants.has(s.plant.toLowerCase()));

        let html = '';
        html += `<h2 class="text-2xl font-bold text-emerald-900 mb-4">Seu Projeto Paisagístico</h2>`;
        html += `<div class="ai-overview mb-6 p-4 bg-emerald-50/50 rounded-lg">${markdownToHtml(projectOverview)}</div>`;

        // SEÇÃO 1: PLANTAS ESCOLHIDAS COM REGA/ADUBAGEM
        html += `<h3 class="text-xl font-bold text-emerald-900 mt-8 mb-4 border-b-2 border-emerald-500 pb-2">Plantas Escolhidas para o Projeto</h3>`;
        if (placements.length === 0) {
          html += `<div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">Nenhuma planta válida foi posicionada. Tente ajustar sua seleção.</div>`;
        } else {
          html += '<div class="grid gap-4">';
          placements.forEach((s) => {
            const plantName = s.plant;
            const plant = plantData.find(p => p.Nome.toLowerCase() === plantName.toLowerCase());
            const img = plant ? getPlantImage(plant.Nome) : '';
            const location = s.location || s.location?.toString() || '';
            const reason = s.reason || '';
            const watering = s.watering || '';
            const fertilizing = s.fertilizing || '';

            html += `<div class="flex gap-4 p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50/30 shadow-sm">
              <img src="${img}" alt="${plantName}" class="w-24 h-24 object-cover rounded-lg flex-shrink-0" onerror="this.src='https://placehold.co/120x90?text=Sem+foto'" />
              <div class="flex-1">
                <h4 class="font-black text-lg text-emerald-900">${plantName}</h4>
                <div class="text-sm text-emerald-700 mt-2"><strong>📍 Posicionamento:</strong> ${location}</div>
                <div class="text-sm text-emerald-700 mt-1"><strong>💡 Motivo:</strong> ${reason}</div>
                ${watering ? `<div class="text-sm text-emerald-700 mt-2"><strong>💧 Rega:</strong> ${watering}</div>` : ''}
                ${fertilizing ? `<div class="text-sm text-emerald-700 mt-1"><strong>🌱 Adubagem:</strong> ${fertilizing}</div>` : ''}
              </div>
            </div>`;
          });
          html += '</div>';
        }

        // SEÇÃO 2: PLANTAS ALTERNATIVAS SUGERIDAS
        const validAlternatives = (Array.isArray(alternatives) ? alternatives : []).filter(a => a.plant && validPlants.has(a.plant.toLowerCase()));
        if (validAlternatives.length > 0) {
          html += `<h3 class="text-xl font-bold text-emerald-900 mt-8 mb-4 border-b-2 border-lime-500 pb-2">Outras plantas que podem se encaixar</h3>`;
          html += '<div class="grid gap-3">';
          validAlternatives.forEach(a => {
            const plantName = a.plant;
            const p = plantData.find(pp => pp.Nome.toLowerCase() === plantName.toLowerCase());
            const img = p ? getPlantImage(p.Nome) : '';
            html += `<div class="flex items-center gap-3 p-3 rounded-lg bg-lime-50/50 border border-lime-200"><img src="${img}" class="w-14 h-14 object-cover rounded-md flex-shrink-0" onerror="this.src='https://placehold.co/80x60?text=Sem'"/><div><strong class="text-emerald-900">${plantName}</strong><div class="text-sm text-emerald-700">${a.reason || ''}</div></div></div>`;
          });
          html += '</div>';
        }

        // SEÇÃO 3: ALERTAS DE TOXICIDADE (se aplicável)
        if (cautions && cautions.length > 0) {
          html += `<h3 class="text-lg font-bold text-rose-900 mt-8 mb-4 border-b-2 border-rose-500 pb-2">⚠️ Plantas Tóxicas - Dicas de Segurança</h3>`;
          html += '<div class="grid gap-3">';
          cautions.forEach(c => {
            html += `<div class="p-4 rounded-lg bg-rose-50/70 border border-rose-300">
              <strong class="text-rose-900">${c.plant}</strong>
              <div class="text-sm text-rose-800 mt-2"><strong>Toxicidade:</strong> ${c.toxicity || ''}</div>
              <div class="text-sm text-emerald-700 mt-2 bg-white/60 p-2 rounded"><strong>✓ Como usar com segurança:</strong> ${c.safety_tip || 'Posicione em local seguro.'}</div>
            </div>`;
          });
          html += '</div>';
        }

        if (parsed.notes) html += `<h3 class="text-lg font-bold text-emerald-900 mt-8 mb-2">📝 Notas Finais</h3><div class="mt-2 text-sm text-emerald-700 bg-white/50 p-4 rounded-lg">${markdownToHtml(parsed.notes)}</div>`;

        // sanitize result if possible
        try {
          const DOMPurify = (await import('dompurify')).default;
          setAiAdvice(DOMPurify.sanitize(html));
        } catch (e) {
          console.warn('DOMPurify não disponível — servindo HTML sem sanitização. Instale dompurify para segurança.');
          setAiAdvice(html);
        }
      } else {
        // fallback: model didn't return JSON — convert whole text to HTML
        const fallbackHtml = markdownToHtml(cleaned);
        try {
          const DOMPurify = (await import('dompurify')).default;
          setAiAdvice(DOMPurify.sanitize(fallbackHtml));
        } catch (e) {
          setAiAdvice(fallbackHtml);
        }
      }

    } catch (error) {
      console.error("Falha na requisição:", error);
      setAiAdvice(`Erro: ${error.message || 'Falha na requisição.'}`);
      alert("Erro ao conectar. Verifique o console (F12).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-8 border border-white/50 shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/30 pb-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl text-white shadow-xl shadow-emerald-500/30">
               <Home size={32} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-900 to-teal-800 tracking-tight">Seu Projeto</h2>
              <p className="text-emerald-700 font-bold">Paisagismo Residencial Personalizado</p>
            </div>
          </div>
          
          {selectedPlants.length > 0 && !loading && !aiAdvice && (
             <button onClick={generateAIPlan} className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg transition-all hover:shadow-emerald-500/40 hover:-translate-y-1">
               <Sparkles size={20} className="text-yellow-200" />
               Gerar Consultoria
             </button>
          )}
        </div>

        {/* --- FORMULÁRIO DE ANÁLISE DE ESPAÇO --- */}
        {selectedPlants.length > 0 && !aiAdvice && (
            <div className="mb-8 p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <h3 className="text-emerald-800 font-bold mb-4 flex items-center gap-2">
                    <Activity size={20} /> Personalize sua Análise
                </h3>
                <div className="flex flex-wrap gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-emerald-700">Tamanho do Espaço</label>
                        <select 
                            value={userInfo.spaceSize}
                            onChange={(e) => setUserInfo({...userInfo, spaceSize: e.target.value})}
                            className="px-4 py-2 rounded-xl border-emerald-200 bg-white text-emerald-900 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                        >
                            <option value="Pequeno (Varanda)">Pequeno (Varanda)</option>
                            <option value="Médio (Jardim)">Médio (Jardim)</option>
                            <option value="Grande (Quintal)">Grande (Quintal)</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-emerald-700">Segurança</label>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setUserInfo({...userInfo, hasPets: !userInfo.hasPets})}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${userInfo.hasPets ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-bold' : 'bg-white border-emerald-200 text-emerald-600'}`}
                            >
                                <PawPrint size={18} /> Tenho Pets
                            </button>
                            <button 
                                onClick={() => setUserInfo({...userInfo, hasChildren: !userInfo.hasChildren})}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${userInfo.hasChildren ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-bold' : 'bg-white border-emerald-200 text-emerald-600'}`}
                            >
                                <Baby size={18} /> Tenho Crianças
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {selectedPlants.length === 0 ? (
           <div className="text-center py-24 bg-white/40 border-2 border-dashed border-emerald-200 rounded-3xl backdrop-blur-sm">
             <div className="bg-white/80 p-5 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-md">
                <Sprout size={40} className="text-emerald-500" />
             </div>
             <p className="text-emerald-900 text-2xl font-black">Comece seu Jardim</p>
             <p className="text-emerald-700/70 text-lg">Selecione plantas no catálogo para ver a mágica acontecer.</p>
           </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {selectedPlants.map(plant => (
              <div key={plant.Nome} className="flex items-center bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-lg relative group hover:shadow-xl hover:bg-white/90 transition-all hover:-translate-y-1">
                <img src={getPlantImage(plant.Nome)} className="w-20 h-20 rounded-xl object-cover shadow-sm" alt={plant.Nome} onError={(e) => { e.target.src = `https://placehold.co/100x100/e2e8f0/1e293b?text=${encodeURIComponent(plant.Nome.charAt(0))}`; }} />
                <div className="ml-4">
                  <h4 className="font-black text-emerald-900 text-lg">{plant.Nome}</h4>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide bg-emerald-100 px-2 py-0.5 rounded-full">{plant["Luz Solar"]}</span>
                  </div>
                  {/* Alerta de Toxicidade no Card */}
                  {plant.Tags.includes("Tóxica") && (
                      <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full w-fit">
                          <AlertTriangle size={10} /> Tóxica
                      </div>
                  )}
                </div>
                <button onClick={() => onRemove(plant)} className="absolute top-2 right-2 text-red-400 hover:text-white hover:bg-red-500 transition-all p-2 rounded-xl">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div className="py-20 text-center bg-white/30 rounded-3xl">
            <Loader size={56} className="animate-spin mx-auto text-emerald-600 mb-6" />
            <h3 className="text-2xl font-black text-emerald-900">Planejando seu espaço...</h3>
            <p className="text-emerald-700 font-medium">Avaliando segurança, insolação e composição visual.</p>
          </div>
        )}

        {aiAdvice && (
          <div className="bg-white/95 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/60 shadow-2xl animate-in fade-in slide-in-from-bottom-8">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-emerald-100">
               <h3 className="text-3xl font-black text-emerald-900 flex items-center gap-3">
                 <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600"><Leaf size={28} /></div>
                 Consultoria Técnica
               </h3>
               <button onClick={generateAIPlan} className="text-sm font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl transition-colors hover:bg-emerald-100">
                 Atualizar
                 <ArrowRight size={16} />
               </button>
            </div>
            {/* WARNING: aiAdvice is rendered as HTML. Sanitize before rendering to avoid XSS. */}
            {/* Consider installing DOMPurify and using: DOMPurify.sanitize(aiAdvice) */}
            <div className="prose prose-emerald prose-lg max-w-none prose-headings:font-black prose-headings:text-emerald-900 prose-p:text-emerald-800 prose-p:font-medium prose-strong:text-emerald-950" dangerouslySetInnerHTML={{ __html: aiAdvice }} />
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function PaisagismoIlheus() {
  const [view, setView] = useState('catalog');
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ espaco: "", luz: "", dificuldade: "", origem: "", grupo: "", frutifera: false });

  const luzOptions = useMemo(() => [...new Set(plantData.map(p => p["Luz Solar"]))], []);
  const espacoOptions = ["Apartamento/Varanda", "Jardim (Médio)", "Quintal (Grande)"];
  const dificuldadeOptions = ["Fácil", "Moderada", "Difícil"];
  const origemOptions = ["Nativa", "Exótica"];
  const grupoOptions = [...new Set(plantData.map(p => p.Grupo))];
  
  const filteredPlants = useMemo(() => {
    return plantData.filter(plant => {
      const matchesSearch = plant.Nome.toLowerCase().includes(search.toLowerCase()) || plant.Tags.toLowerCase().includes(search.toLowerCase());
      const matchesLuz = filters.luz ? plant["Luz Solar"] === filters.luz : true;
      const matchesEspaco = filters.espaco ? plant.Espacos.includes(filters.espaco) : true;
      const matchesDificuldade = filters.dificuldade ? plant.Dificuldade === filters.dificuldade : true;
      const matchesOrigem = filters.origem ? plant.Origem === filters.origem : true;
      const matchesGrupo = filters.grupo ? plant.Grupo === filters.grupo : true;
      const matchesFrutifera = filters.frutifera ? plant.Frutifera === true : true;
        
      return matchesSearch && matchesLuz && matchesEspaco && matchesDificuldade && matchesOrigem && matchesGrupo && matchesFrutifera;
    });
  }, [search, filters]);

  const togglePlant = (plant) => {
    if (selectedPlants.find(p => p.Nome === plant.Nome)) setSelectedPlants(prev => prev.filter(p => p.Nome !== plant.Nome));
    else setSelectedPlants(prev => [...prev, plant]);
  };

  return (
    <div className="min-h-screen font-sans text-emerald-950 selection:bg-lime-200 selection:text-emerald-900 relative">
      
      {/* Background Abstrato "Lima/Primavera" */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-lime-50 via-emerald-50 to-teal-50"></div>
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-lime-200/40 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full h-screen overflow-hidden flex flex-col md:flex-row">
        
        {/* --- SIDEBAR DE FILTROS --- */}
        <aside className="w-full md:w-80 shrink-0 bg-white/60 backdrop-blur-2xl border-r border-white/40 h-full overflow-y-auto custom-scrollbar flex flex-col shadow-2xl relative z-20">
            <div className="p-6 pb-2">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl text-white shadow-lg shadow-emerald-500/30">
                        <Home size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-emerald-900 tracking-tight leading-none">Flora Ilhéus</h1>
                        <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider mt-1">Paisagismo Urbano</p>
                    </div>
                </div>

                {/* Busca */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" size={18} />
                    <input type="text" placeholder="Buscar planta..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-white/70 border border-white/60 rounded-2xl focus:outline-none focus:border-lime-500 focus:bg-white text-emerald-900 placeholder-emerald-600/50 font-bold transition-all shadow-inner text-sm" />
                </div>

                <div className="h-px w-full bg-emerald-900/10 mb-6"></div>
                
                <h3 className="text-xs font-black text-emerald-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Filter size={14} /> Filtros de Seleção
                </h3>
            </div>

            <div className="px-6 space-y-5 pb-10">
                <FilterSelect label="Tipo de Planta" icon={Leaf} options={[...new Set(plantData.map(p => p.Grupo))]} selected={filters.grupo} onChange={(val) => setFilters(prev => ({...prev, grupo: val}))} />
                <FilterSelect label="Tamanho do Espaço" icon={Maximize} options={["Apartamento/Varanda", "Jardim (Médio)", "Quintal (Grande)"]} selected={filters.espaco} onChange={(val) => setFilters(prev => ({...prev, espaco: val}))} />
                <FilterSelect label="Luz Solar" icon={Sun} options={[...new Set(plantData.map(p => p["Luz Solar"]))]} selected={filters.luz} onChange={(val) => setFilters(prev => ({...prev, luz: val}))} />
                <FilterSelect label="Dificuldade" icon={Activity} options={["Fácil", "Moderada", "Difícil"]} selected={filters.dificuldade} onChange={(val) => setFilters(prev => ({...prev, dificuldade: val}))} />
                <FilterSelect label="Origem" icon={Globe} options={["Nativa", "Exótica"]} selected={filters.origem} onChange={(val) => setFilters(prev => ({...prev, origem: val}))} />
                
                <FilterToggle label="Apenas Frutíferas" icon={Sprout} isActive={filters.frutifera} onToggle={() => setFilters(prev => ({...prev, frutifera: !prev.frutifera}))} />

                <button onClick={() => {setFilters({luz:'', espaco:'', dificuldade:'', origem:'', grupo:'', frutifera: false}); setSearch('')}} className="w-full py-3 mt-4 text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100 flex items-center justify-center gap-2">
                    <X size={14} /> Limpar Filtros
                </button>
            </div>
        </aside>

        {/* --- CONTEÚDO PRINCIPAL --- */}
        <main className="flex-1 h-full overflow-y-auto relative custom-scrollbar">
            
            {/* --- CONTEÚDO PRINCIPAL (COM NOVO HEADER) --- */}
          <div className="flex-1 h-full overflow-y-auto relative custom-scrollbar">
    
    {/* 1. NOVO CABEÇALHO HERO (Degradê + Vidro + Animação) */}
    <header className="relative text-center pt-20 pb-10 px-4 max-w-5xl mx-auto overflow-hidden md:overflow-visible">
        {/* Luz de Fundo (Glow) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] bg-emerald-400/20 blur-[100px] rounded-full -z-10 pointer-events-none" />

        {/* Badge Glassmorphism */}
        <div className="inline-flex items-center justify-center gap-2 mb-8 px-5 py-2 rounded-full border border-emerald-500/20 bg-white/40 backdrop-blur-md shadow-lg shadow-emerald-500/5 animate-fade-in-up">
            <Leaf className="w-4 h-4 text-emerald-700" />
            <span className="text-emerald-900 font-bold text-xs tracking-widest uppercase">Catálogo Digital</span>
        </div>
        
        {/* Título Gigante com Degradê */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-none animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <span className="bg-gradient-to-br from-emerald-950 via-emerald-600 to-teal-500 bg-clip-text text-transparent drop-shadow-sm">
            Flora Ilhéus
            </span>
        </h1>
        
        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-emerald-800/80 font-medium max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Explore as melhores opções de plantas para o clima da nossa região.
        </p>
    </header>

    {/* 2. MENU DE ABAS (STICKY) */}
    <div className="sticky top-0 z-30 p-4 flex justify-center pointer-events-none">
        <div className="flex gap-2 bg-white/95 p-1.5 rounded-2xl shadow-xl border border-white/50 pointer-events-auto">
            <button 
                onClick={() => setView('catalog')} 
                className={`px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all shadow-sm ${view === 'catalog' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/30' : 'bg-transparent text-emerald-800 hover:bg-emerald-50'}`}
            >
                Catálogo
            </button>
            <button 
                onClick={() => setView('design')} 
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all shadow-sm ${view === 'design' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/30' : 'bg-transparent text-emerald-800 hover:bg-emerald-50'}`}
            >
                Meu Jardim
                {selectedPlants.length > 0 && <span className="bg-lime-400 text-emerald-900 text-[10px] px-2 py-0.5 rounded-full animate-pulse">{selectedPlants.length}</span>}
            </button>
        </div>
    </div>

    {/* 3. ÁREA DE CONTEÚDO (LISTA OU JARDIM) */}
    <div className="px-4 md:px-10 pb-20">
        {view === 'catalog' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Contador de plantas (Sem título repetido) */}
                <div className="flex justify-end items-end mb-4">
                    <span className="text-xs font-black text-emerald-900/40 uppercase tracking-widest bg-emerald-900/5 px-3 py-1 rounded-lg">
                        {filteredPlants.length} plantas
                    </span>
                </div>

                {/* Grid de Plantas */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {filteredPlants.map((plant) => (
                    <PlantCard key={plant.Nome} plant={plant} isSelected={selectedPlants.some(p => p.Nome === plant.Nome)} onToggle={togglePlant} />
                    ))}
                </div>
                
                {/* Estado Vazio (Sem resultados) */}
                {filteredPlants.length === 0 && (
                    <div className="text-center py-32 bg-white/20 backdrop-blur-md rounded-[2.5rem] border-2 border-dashed border-white/40 flex flex-col items-center justify-center">
                        <div className="bg-white/40 p-4 rounded-full mb-4">
                            <Leaf size={40} className="text-emerald-400 opacity-50" />
                        </div>
                        <p className="text-emerald-900 text-2xl font-black mb-2">Nenhuma planta encontrada.</p>
                        <p className="text-emerald-700/60 font-medium">Tente ajustar os filtros na barra lateral.</p>
                    </div>
                )}
            </div>
        ) : (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <GardenPlan selectedPlants={selectedPlants} onRemove={(p) => togglePlant(p)} />
            </div>
        )}
    </div>
</div>
  </main>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16, 185, 129, 0.4); }
        /* Typography overrides for the AI content */
        .prose strong { color: #059669; font-weight: 800; }
        .prose ul li { margin-bottom: 0.5em; }
      `}</style>
    </div>
  );
}