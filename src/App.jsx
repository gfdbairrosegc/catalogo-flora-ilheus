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
  PawPrint,
  Baby,
  Smile,
  Search,
  Sun,
  Activity,
  Sprout,
  Wind,
  Minus,
  Plus,
  Trash2,
  Sparkles,
  Loader,
  ArrowRight
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
        "Nome": "Acerola",
        "Nome Científico": "Malpighia emarginata",
        "Descrição": "Arbusto frutífero com alta concentração de vitamina C. Frutos vermelhos apetitosos e floração delicada.",
        "Altura": "1-4 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Média",
        "Espacos": ["Jardim (Médio)", "Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Nativa",
        "Grupo": "Arbusto",
        "Frutifera": true,
        "Tags": "Frutífera; Atrai Pássaros; Vitamina C"
    },
    {
        "Nome": "Jambo",
        "Nome Científico": "Syzygium malaccense",
        "Descrição": "Árvore tropical com frutos carnudos e saborosos. Folhagem densa e flores brancas perfumadas.",
        "Altura": "5-10 m",
        "Luz Solar": "Sol Pleno",
        "Necessidade de Água": "Alta",
        "Espacos": ["Jardim (Médio)", "Quintal (Grande)"],
        "Dificuldade": "Fácil",
        "Origem": "Exótica",
        "Grupo": "Árvore",
        "Frutifera": true,
        "Tags": "Frutífera; Tropical; Atrai Pássaros; Flores Perfumadas"
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

const Tag = ({ text, color = "bg-emerald-100 text-emerald-800" }) => (
  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${color} border border-black/5`}>
    {text}
  </span>
);

// --- COMPONENTE DO PLANO GERADO ---
const GardenPlan = ({ selectedPlants, onRemove }) => {
    const [loading, setLoading] = useState(false);
    const [aiAdvice, setAiAdvice] = useState(null);
    const [userInfo, setUserInfo] = useState({
        spaceSize: "Médio (Jardim)",
        sunlight: "Sol Pleno",
        skillLevel: "Iniciante"
    });

    const generatePlan = async () => {
        if (selectedPlants.length === 0) return;
        setLoading(true);
        setAiAdvice(null);
        
        // 1. Monte seu prompt com base no espaço selecionado
        const spaceDescriptions = {
          "Pequeno (Varanda)": "varanda",
          "Médio (Jardim)": "jardim médio",
          "Grande (Quintal)": "quintal grande"
        };
        let spaceDesc = spaceDescriptions[userInfo.spaceSize] || "";
        
        // Fallback robusto se a string não bater exato
        if (!spaceDesc && userInfo.spaceSize) {
           const key = userInfo.spaceSize.toString().toLowerCase();
           if (key.includes('varanda') || key.includes('pequeno')) spaceDesc = 'varanda';
           else if (key.includes('quintal') || key.includes('grande')) spaceDesc = 'quintal grande';
           else if (key.includes('jardim') || key.includes('médio') || key.includes('medio')) spaceDesc = 'jardim médio';
        }
        if (!spaceDesc) spaceDesc = 'espaço';

        console.log('Gerando plano — spaceSize key:', userInfo.spaceSize, '-> prompt description:', spaceDesc);

        const promptFinal = `Crie um plano de jardinagem personalizado para um ${spaceDesc}.
Tenho estas plantas selecionadas: ${selectedPlants.map(p => p.Nome).join(', ')}.
Perfil do jardineiro: nível ${userInfo.skillLevel}, luz disponível: ${userInfo.sunlight}.

Crie uma resposta EM JSON com a seguinte estrutura estrita:
{
  "title": "Título criativo para o jardim",
  "summary": "Resumo curto e inspirador do projeto (max 2 frases)",
  "placements": [
    {
       "plant": "Nome da Planta",
       "location": "Onde plantar (ex: Fundo, Frente, Vaso)",
       "reason": "Por que aqui? (Estética/Funcional)",
       "care_tip": "Dica vital de cuidado"
    }
  ],
  "cautions": [
     "Aviso importante 1 (ex: planta tóxica ou invasora)",
     "Aviso importante 2"
  ]
}

Se houver plantas incompatíveis com o espaço (${spaceDesc}) ou temCrianças for true, NÃO coloque plantas tóxicas em 'placements'; coloque em 'cautions' com uma dica de segurança.
Retorne apenas JSON, sem texto adicional.`;

        const jsonInstruction = "Responda APENAS com o JSON válido, sem blocos de código markdown (```json ... ```). Comece com { e termine com }.";
        const prompt = `${promptFinal}\n\n${jsonInstruction}`;

        console.log("Chamando API (JSON prompt) em:", `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=...`);
        // Nota: Em produção, NUNCA exponha a chave no front. Use um backend proxy.
        const finalUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY || ''}`;
        
        try {
            const apiKey = import.meta.env.VITE_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API;
            if (!apiKey) throw new Error("Chave de API ausente. Verifique VITE_API_KEY ou VITE_GEMINI_API_KEY no .env");

            const response = await fetch(finalUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            
            if (!response.ok) {
                const errText = await response.text().catch(() => null);
                console.error("Erro da API:", response.status, errText || response.statusText);
                throw new Error(`Erro na API (${response.status})`);
            }

            const data = await response.json();
            console.log("Resposta bruta da API:", data);
            
            const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!rawText) throw new Error("API retornou resposta vazia.");

            // Limpeza do JSON (caso venha com markdown)
            const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            const plan = JSON.parse(cleanJson);
            
            setAiAdvice(plan);
        } catch (error) {
            console.error("Erro ao gerar plano:", error);
            setAiAdvice({
                title: "Jardim Personalizado",
                summary: "Não foi possível gerar o plano com IA agora, mas suas plantas são ótimas!",
                placements: selectedPlants.map(p => ({
                    plant: p.Nome,
                    location: "A escolha é sua!",
                    reason: "Ótima escolha.",
                    care_tip: "Regue com carinho."
                })),
                cautions: ["Verifique a toxicidade das plantas se tiver pets ou crianças."]
            });
        } finally {
            setLoading(false);
        }
    };

    // Função para renderizar o plano gerado
    const renderPlan = () => {
        if (!aiAdvice) return null;

        // Verifica quais plantas selecionadas NÃO estão no plano (removidas pela IA por incompatibilidade)
        const placements = aiAdvice.placements || [];
        const recommendedNames = new Set(placements.map(p => String(p.plant).toLowerCase()));
        
        // Identificar plantas selecionadas que a IA ignorou/removeu
        const reMoved = selectedPlants.filter(p => !recommendedNames.has(p.Nome.toLowerCase()));
        
        // Gerar alertas para plantas incompatíveis
        const incompatibleWarnings = (Array.isArray(reMoved) ? reMoved : []).map(s => {
             const plantName = String(s.plant || '').toLowerCase();
             const plant = plantData.find(p => p.Nome.toLowerCase() === plantName);
             return {
                 plant: plant ? plant.Nome : s.plant,
                 reason: plant && Array.isArray(plant.Espacos) ? `Disponível em: ${plant.Espacos.join(', ')}. Você selecionou: ${userInfo.spaceSize}.` : `Não compatível com ${userInfo.spaceSize}.`
             };
        });

        // Construção do HTML do relatório
        let html = `<div class="animate-in fade-in slide-in-from-bottom-4 duration-700">`;
        
        // Cabeçalho do Plano
        html += `
            <div class="text-center mb-10">
                <div class="inline-block p-3 rounded-full bg-lime-100 text-lime-700 mb-4 shadow-sm border border-lime-200">
                   <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h2 class="text-3xl font-black text-emerald-900 mb-3 tracking-tight">${aiAdvice.title}</h2>
                <p class="text-lg text-emerald-700/80 max-w-2xl mx-auto leading-relaxed">${aiAdvice.summary}</p>
            </div>
        `;

        // Alerta de Incompatibilidade (se houver)
        if (incompatibleWarnings.length > 0) {
            html += `<div class="p-6 rounded-2xl bg-orange-50 border-2 border-orange-300 mb-6">
                <h3 class="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    Atenção: Plantas Ajustadas
                </h3>
                <ul class="space-y-2">
                    ${incompatibleWarnings.map(w => `<li class="text-orange-800 text-sm flex gap-2"><span class="font-bold">• ${w.plant}:</span> ${w.reason}</li>`).join('')}
                </ul>
            </div>`;
        }

        // Grid de Cards do Plano
        html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">`;
        
        placements.forEach(item => {
            html += `
                <div class="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="font-bold text-xl text-emerald-900">${item.plant}</h3>
                        <span class="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-lg uppercase tracking-wider">${item.location}</span>
                    </div>
                    <div class="space-y-3">
                        <div class="flex gap-3">
                             <div class="min-w-[4px] bg-lime-300 rounded-full"></div>
                             <p class="text-sm text-emerald-800 leading-relaxed"><span class="font-bold text-emerald-900">Por que:</span> ${item.reason}</p>
                        </div>
                        <div class="flex gap-3">
                             <div class="min-w-[4px] bg-sky-300 rounded-full"></div>
                             <p class="text-sm text-emerald-800 leading-relaxed"><span class="font-bold text-emerald-900">Dica:</span> ${item.care_tip}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        html += `</div>`;

        // Seção de Cuidados Gerais (Cautions)
        if (aiAdvice.cautions && aiAdvice.cautions.length > 0) {
            html += `
                <div class="bg-red-50/50 rounded-2xl p-6 border border-red-100">
                    <h3 class="text-sm font-bold text-red-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Recomendações de Segurança
                    </h3>
                    <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        ${aiAdvice.cautions.map(c => `<li class="text-red-700/80 text-sm flex gap-2 items-start"><span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>${c}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        html += `</div>`;
        return { __html: html }; // Retorna objeto para dangerouslySetInnerHTML
    };

    return (
        <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/50 relative overflow-hidden">
            {/* ... Conteúdo do GardenPlan (formulário e renderização) ... */}
            <div className="relative z-10">
                <div className="text-center mb-10">
                   <h2 className="text-3xl md:text-4xl font-black text-emerald-900 mb-4 tracking-tight">
                       Seu Jardim dos Sonhos
                   </h2>
                   <p className="text-lg text-emerald-800/60 max-w-xl mx-auto">
                       Configure seu perfil e deixe nossa IA organizar o plantio perfeito para você.
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-emerald-800 uppercase tracking-wider ml-1">Espaço</label>
                        <select 
                            value={userInfo.spaceSize}
                            onChange={(e) => setUserInfo({...userInfo, spaceSize: e.target.value})}
                            className="w-full bg-white/60 border border-white/60 rounded-xl px-4 py-3 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-lime-400 font-medium"
                        >
                             <option>Pequeno (Varanda)</option>
                             <option>Médio (Jardim)</option>
                             <option>Grande (Quintal)</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-emerald-800 uppercase tracking-wider ml-1">Iluminação</label>
                        <select 
                            value={userInfo.sunlight}
                            onChange={(e) => setUserInfo({...userInfo, sunlight: e.target.value})}
                            className="w-full bg-white/60 border border-white/60 rounded-xl px-4 py-3 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-lime-400 font-medium"
                        >
                             <option>Sombra</option>
                             <option>Meia Sombra</option>
                             <option>Sol Pleno</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-emerald-800 uppercase tracking-wider ml-1">Experiência</label>
                        <select 
                            value={userInfo.skillLevel}
                            onChange={(e) => setUserInfo({...userInfo, skillLevel: e.target.value})}
                            className="w-full bg-white/60 border border-white/60 rounded-xl px-4 py-3 text-emerald-900 focus:outline-none focus:ring-2 focus:ring-lime-400 font-medium"
                        >
                             <option>Iniciante</option>
                             <option>Intermediário</option>
                             <option>Especialista</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-center mb-12">
                    <button 
                        onClick={generatePlan}
                        disabled={loading || selectedPlants.length === 0}
                        className="group relative bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative flex items-center gap-2">
                            {loading ? (
                                <>
                                    <Loader className="animate-spin" /> Gerando...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="text-lime-300" /> Gerar Plano com IA
                                </>
                            )}
                        </span>
                    </button>
                </div>
            
                {/* Resultado Renderizado */}
                {aiAdvice && (
                   <div dangerouslySetInnerHTML={renderPlan()} />
                )}
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
export default function FloraApp() {
  const [search, setSearch] = useState('');
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [filters, setFilters] = useState({
    luz: '',
    espaco: '',
    dificuldade: '',
    origem: '',
    grupo: '',
    frutifera: false
  });

  // --- LÓGICA DE FILTRAGEM E BUSCA ---
  const filteredPlants = useMemo(() => {
    let result = plantData.filter(plant => {
        // Filtro de Texto (Nome ou Descrição)
        const matchesSearch = 
            plant["Nome"].toLowerCase().includes(search.toLowerCase()) ||
            plant["Nome Científico"].toLowerCase().includes(search.toLowerCase()) ||
            plant["Tags"].toLowerCase().includes(search.toLowerCase());

        // Filtros de Categoria
        const matchesLuz = filters.luz ? plant["Luz Solar"] === filters.luz : true;
        
        // --- ALTERAÇÃO: Espaço agora NÃO remove a planta, apenas afeta a flag visual ---
        // const matchesEspaco = filters.espaco ? plant.Espacos.includes(filters.espaco) : true; 
        
        const matchesDificuldade = filters.dificuldade ? plant["Dificuldade"] === filters.dificuldade : true;
        const matchesOrigem = filters.origem ? plant["Origem"] === filters.origem : true;
        const matchesGrupo = filters.grupo ? plant.Grupo === filters.grupo : true;
        const matchesFrutifera = filters.frutifera ? plant.Frutifera === true : true;

        return matchesSearch && matchesLuz && matchesDificuldade && matchesOrigem && matchesGrupo && matchesFrutifera;
    });

    // --- ORDENAÇÃO INTELIGENTE ---
    // Se um espaço estiver selecionado, joga as incompatíveis para o final da lista
    if (filters.espaco) {
        result.sort((a, b) => {
            const aCompatible = a.Espacos.includes(filters.espaco);
            const bCompatible = b.Espacos.includes(filters.espaco);
            
            if (aCompatible && !bCompatible) return -1; // a vem primeiro
            if (!aCompatible && bCompatible) return 1;  // b vem primeiro
            return 0;
        });
    }

    return result;
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
            <div className="flex items-center gap-3 mb-8">
               <div className="bg-lime-400 p-2.5 rounded-2xl shadow-lg shadow-lime-300/50">
                  <Leaf size={24} className="text-white" fill="currentColor" />
               </div>
               <div>
                  <h1 className="text-2xl font-black text-emerald-900 leading-none tracking-tight">Flora</h1>
                  <span className="text-xs font-bold text-emerald-600 tracking-[0.2em] uppercase">Ilhéus</span>
               </div>
            </div>

            <div className="relative mb-8 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 group-focus-within:text-lime-500 transition-colors" size={20} />
                <input 
                    type="text" 
                    placeholder="Buscar plantas..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/60 rounded-2xl text-emerald-900 placeholder:text-emerald-900/40 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition-all shadow-sm font-bold"
                />
            </div>
          </div>

          <div className="px-6 flex-1 space-y-6">
            <div className="space-y-4">
               <h3 className="text-xs font-black text-emerald-900/40 uppercase tracking-widest px-1 flex items-center gap-2">
                   <Filter size={12} /> Filtros
               </h3>
               
               <FilterSelect label="Ambiente (Luz)" icon={Sun} options={["Sol Pleno", "Meia Sombra", "Sombra"]} selected={filters.luz} onChange={(v) => setFilters({...filters, luz: v})} />
               <FilterSelect label="Espaço Disponível" icon={Maximize} options={["Apartamento/Varanda", "Jardim (Médio)", "Quintal (Grande)"]} selected={filters.espaco} onChange={(v) => setFilters({...filters, espaco: v})} />
               <FilterSelect label="Nível de Cuidado" icon={Activity} options={["Fácil", "Moderada", "Difícil"]} selected={filters.dificuldade} onChange={(v) => setFilters({...filters, dificuldade: v})} />
               <FilterSelect label="Origem" icon={Globe} options={["Nativa", "Exótica"]} selected={filters.origem} onChange={(v) => setFilters({...filters, origem: v})} />
               <FilterSelect label="Tipo de Planta" icon={Sprout} options={["Árvore", "Arbusto", "Herbácea", "Trepadeira", "Palmeira", "Suculenta", "Gramado"]} selected={filters.grupo} onChange={(v) => setFilters({...filters, grupo: v})} />
               
               <label className="flex items-center gap-3 p-3 rounded-xl bg-white/40 border border-white/60 cursor-pointer hover:bg-white/60 transition-colors group">
                   <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${filters.frutifera ? 'bg-lime-500 border-lime-500' : 'border-emerald-200 bg-white'}`}>
                       {filters.frutifera && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                   </div>
                   <input type="checkbox" checked={filters.frutifera} onChange={(e) => setFilters({...filters, frutifera: e.target.checked})} className="hidden" />
                   <span className="text-sm font-bold text-emerald-800 group-hover:text-emerald-900">Apenas Frutíferas</span>
               </label>
            </div>
          </div>

          <div className="p-6 mt-auto bg-white/30 border-t border-white/40 backdrop-blur-md">
             <button onClick={() => {setFilters({luz: '', espaco: '', dificuldade: '', origem: '', grupo: '', frutifera: false}); setSearch('')}} className="w-full py-3 mt-4 text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100 flex items-center justify-center gap-2">
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-lime-300/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

                    <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-[10px] font-bold uppercase tracking-widest mb-6 border border-emerald-200/50 shadow-sm">
                            <Sparkles size={12} className="text-lime-600" /> 
                            Catálogo Digital 2024
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black text-emerald-950 mb-6 tracking-tight leading-tight">
                            Descubra a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-600">Flora Nativa</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-emerald-800/70 max-w-2xl mx-auto font-medium leading-relaxed">
                            Explore, filtre e planeje seu jardim ideal com plantas adaptadas ao clima de Ilhéus.
                        </p>
                    </div>
                </header>

                <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-16 pb-32">
                    
                    {/* LISTA DE PLANTAS */}
                    <div id="catalogo">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-emerald-900 flex items-center gap-2">
                                <Flower className="text-lime-500" /> Plantas Disponíveis
                                <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full ml-2 align-middle">{filteredPlants.length}</span>
                            </h3>
                            <div className="text-xs font-bold text-emerald-600/60 uppercase tracking-widest hidden md:block">
                                Mostrando resultados filtrados
                            </div>
                        </div>

                        {filteredPlants.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPlants.map((plant, index) => {
                                    // Verifica compatibilidade individualmente para exibir aviso
                                    const isSpaceCompatible = !filters.espaco || plant.Espacos.includes(filters.espaco);
                                    
                                    const isSelected = selectedPlants.find(p => p.Nome === plant.Nome);

                                    return (
                                        <div 
                                            key={index} 
                                            className={`group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-emerald-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden ${!isSpaceCompatible ? 'opacity-80 grayscale-[0.3]' : ''}`}
                                        >
                                            {/* --- AVISO DE INCOMPATIBILIDADE --- */}
                                            {!isSpaceCompatible && (
                                                <div className="absolute top-4 right-4 z-20 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-amber-200 shadow-sm animate-in fade-in">
                                                    <AlertTriangle size={12} />
                                                    Espaço Incompatível
                                                </div>
                                            )}

                                            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 relative bg-emerald-50">
                                                <img 
                                                    src={getPlantImage(plant.Nome)} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    alt={plant.Nome}
                                                    onError={(e) => {
                                                        e.target.src = `https://placehold.co/400x300/e2e8f0/1e293b?text=${encodeURIComponent(plant.Nome)}`;
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                                    <p className="text-white text-sm font-medium line-clamp-2">{plant.Descrição}</p>
                                                </div>
                                                
                                                {/* Botão de Adicionar (Overlay) */}
                                                <div className="absolute top-3 right-3">
                                                    <button 
                                                        onClick={() => togglePlant(plant)}
                                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${isSelected ? 'bg-red-500 text-white rotate-90' : 'bg-white/30 text-white hover:bg-white hover:text-emerald-700 backdrop-blur-md'}`}
                                                    >
                                                        {isSelected ? <Minus size={18} /> : <Plus size={18} />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex-1 flex flex-col">
                                                {/* 1. LINHA DE METADADOS: Grupo */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg backdrop-blur-md border border-slate-200 bg-slate-100 text-slate-600 flex items-center gap-1 shadow-sm w-fit">
                                                        <Leaf size={10} /> {plant.Grupo}
                                                    </span>
                                                </div>

                                                {/* 2. LINHA DE TAGS FUNCIONAIS: Sol, Água */}
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {plant["Luz Solar"] === "Sol Pleno" && <Tag text="☀️ Sol" color="bg-amber-100 text-amber-800 border-amber-200" />}
                                                    {plant["Luz Solar"] === "Meia Sombra" && <Tag text="⛅ Meia Sombra" color="bg-orange-100 text-orange-800 border-orange-200" />}
                                                    {plant["Luz Solar"] === "Sombra" && <Tag text="☁️ Sombra" color="bg-blue-100 text-blue-800 border-blue-200" />}
                                                    <Tag text={`💧 ${plant["Necessidade de Água"]}`} color="bg-sky-100 text-sky-800 border-sky-200" />
                                                </div>

                                                <div className="mt-auto">
                                                    <h4 className="font-black text-emerald-900 text-xl mb-1">{plant.Nome}</h4>
                                                    <p className="text-xs font-serif italic text-emerald-600/70 mb-4">{plant["Nome Científico"]}</p>
                                                    
                                                    {/* Warning Tags (Tóxica, etc) */}
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {plant.Tags.includes("Tóxica") && (
                                                            <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full border border-red-100">
                                                                <AlertTriangle size={10} /> Tóxica
                                                            </span>
                                                        )}
                                                        {plant.Origem === "Nativa" && (
                                                            <span className="flex items-center gap-1 text-[10px] font-bold text-lime-700 bg-lime-100 px-2 py-1 rounded-full border border-lime-200">
                                                                <Globe size={10} /> Nativa
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-20 text-center bg-white/20 backdrop-blur-md rounded-[2.5rem] border-2 border-dashed border-white/40 flex flex-col items-center justify-center">
                                <div className="bg-white/40 p-4 rounded-full mb-4">
                                    <Leaf size={40} className="text-emerald-400 opacity-50" />
                                </div>
                                <p className="text-emerald-900 text-2xl font-black mb-2">Nenhuma planta encontrada.</p>
                                <p className="text-emerald-700/60 font-medium">Tente ajustar os filtros na barra lateral.</p>
                            </div>
                        )}
                    </div>
                
                    {/* BARRA DE PLANEJAMENTO FLUTUANTE (Se houver selecionados) */}
                    {selectedPlants.length > 0 ? (
                        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <GardenPlan selectedPlants={selectedPlants} onRemove={(p) => togglePlant(p)} />
                        </div>
                    ) : (
                        <div className="hidden"></div>
                    )}

                    {/* LISTA DE PLANTAS SELECIONADAS (MINI-CARTÕES) */}
                     {selectedPlants.length > 0 && (
                        <div className="fixed bottom-0 right-0 p-4 w-full md:w-auto md:max-w-md z-40 pointer-events-none">
                            <div className="bg-white/90 backdrop-blur-xl border border-emerald-100 p-4 rounded-3xl shadow-2xl pointer-events-auto max-h-[60vh] overflow-y-auto custom-scrollbar">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-emerald-900 text-sm uppercase tracking-wider flex items-center gap-2">
                                        <Leaf size={14} className="text-lime-500"/> Minha Lista ({selectedPlants.length})
                                    </h3>
                                    <button onClick={() => setSelectedPlants([])} className="text-[10px] font-bold text-red-400 hover:text-red-600 uppercase tracking-wider">Limpar</button>
                                </div>
                                <div className="space-y-3">
                                    {selectedPlants.map((plant, i) => (
                                        <div key={i} className="flex items-center bg-white p-2 rounded-xl shadow-sm border border-slate-100 relative group">
                                            <img src={getPlantImage(plant.Nome)} className="w-12 h-12 rounded-lg object-cover" alt="" />
                                            <div className="ml-3">
                                                <p className="text-sm font-bold text-emerald-900 leading-tight">{plant.Nome}</p>
                                                <p className="text-[10px] text-emerald-600">{plant.Grupo}</p>
                                            </div>
                                            <button onClick={() => togglePlant(plant)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-red-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
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
      `}</style>
    </div>
  );
}