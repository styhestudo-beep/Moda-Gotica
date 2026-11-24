export type ProductCategory =
  | 'Blusas'
  | 'Calças'
  | 'Vestidos e Saias'
  | 'Acessórios'
  | 'Casacos';

export type StoreTab =
  | 'Todas'
  | ProductCategory
  | 'Desfiles'
  | 'Sobre Nós';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  collectionTag: string;
  price: number;
  image: string;
  description: string;
  fabric: string;
  care: string;
  sizes: string[];
  stock: number;
  featured?: boolean;
}

export interface Desfile {
  id: string;
  edition: string;
  title: string;
  date: string;
  location: string;
  image: string;
  imageAlt: string;
  summary: string;
  highlights: string[];
  featuredProductIds: string[];
}

export const HERO_IMAGE = '/src/assets/images/hero_gothic_coat_1795543455364.jpg';
export const ATELIER_IMAGE = '/src/assets/images/atelier_craft_detail_1795543459088.jpg';

export const STORE_TABS: StoreTab[] = [
  'Todas',
  'Vestidos e Saias',
  'Calças',
  'Blusas',
  'Acessórios',
  'Casacos',
  'Desfiles',
  'Sobre Nós',
];

export const DESFILES: Desfile[] = [
  {
    id: 'desfile-viaduto-2024',
    edition: 'Desfile 01',
    title: 'Ocupação Concreto & Lã: Primeiro Ato',
    date: 'Outubro de 2024',
    location: 'Galeria Olido / Centro, São Paulo',
    image: '/src/assets/images/desfile_viaduto_cha_1795544284220.jpg',
    imageAlt: 'Modelos desfilando em passarela de concreto com sobretudos de lã reaproveitada e saias assimétricas diante de público sentado',
    summary:
      'Nosso primeiro desfile independente reuniu 14 conjuntos confeccionados integralmente a partir de lã industrial parada e peças de garimpo reconstruídas. A entrada foi gratuita mediante doação de agasalhos para coletivos do centro.',
    highlights: [
      '14 looks em upcycling e sarja pesada',
      'Zero patrocínio corporativo · Entrada gratuita',
      'Banda pós-punk local ao vivo na trilha sonora',
    ],
    featuredProductIds: ['sobretudo-corvo-la', 'saia-assimetrica-argolas', 'bota-monolito-couro'],
  },
  {
    id: 'desfile-galpao-2025',
    edition: 'Desfile 02',
    title: 'Galpão Barra Funda: Reuso & Costura Aberta',
    date: 'Maio de 2025',
    location: 'Galpão Cultural, Barra Funda, São Paulo',
    image: '/src/assets/images/desfile_galpao_reuso_1795544284057.jpg',
    imageAlt: 'Desfile comunitário em galpão de tijolos com modelos usando tule, corsets de veludo e calças cargo pretas',
    summary:
      'Apresentação de 18 looks voltados para o uso cotidiano e durável: blusas segunda pele de tule resistente, calças cargo reforçadas e corsets ajustáveis. Após a passarela, montamos 6 máquinas de costura para ensinar reparo e customização gratuita ao público.',
    highlights: [
      '18 looks com foco em conforto e durabilidade',
      'Oficina aberta de conserto e customização pós-desfile',
      'Peças vendidas no local pelo preço de custo da oficina',
    ],
    featuredProductIds: ['calca-cargo-wide-leg', 'corset-noctis-veludo', 'blusa-tule-segunda-pele'],
  },
  {
    id: 'desfile-casa-povo-2026',
    edition: 'Desfile 03',
    title: 'Moda Sem Rótulo: Grade Inclusiva PP ao XGG',
    date: 'Março de 2026',
    location: 'Espaço Bom Retiro, São Paulo',
    image: '/src/assets/images/hero_gothic_coat_1795543455364.jpg',
    imageAlt: 'Apresentação de alfaiataria gótica inclusiva entre arcos de concreto com modelo vestindo sobretudo preto e bolsa estruturada',
    summary:
      'Desfile dedicado à acessibilidade de corpos e preços, com elenco comunitário vestindo do PP ao XGG. Mostramos peças modulares com fivelas ajustáveis, bolsas de lona encerada e vestidos atemporais sem distinção de estação.',
    highlights: [
      '22 looks com elenco voluntário da cena gótica paulistana',
      'Lançamento oficial da grade completa PP ao XGG',
      'Compromisso público de conserto vitalício gratuito',
    ],
    featuredProductIds: ['calca-alfaiataria-pregas', 'bolsa-carteiro-lona', 'vestido-chantilly-plissado'],
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'manguito-choker-veludo',
    sku: 'UA-ACE-001',
    name: 'Kit Manguitos Tricô & Choker Veludo',
    category: 'Acessórios',
    collectionTag: 'Upcycling · Feito à Mão',
    price: 35,
    image: '/src/assets/images/product_choker_armwarmers_1795543873305.jpg',
    description:
      'Par de manguitos canelados sem dedos feitos com sobras de fio de algodão, acompanhado de choker de veludo reaproveitado com argola metálica simples e durável.',
    fabric: 'Fio de Algodão Reaproveitado · Veludo de Retalho · Argola em Aço',
    care: 'Lavar à mão em água fria para prolongar a vida útil do fio.',
    sizes: ['Único Ajustável'],
    stock: 28,
    featured: true,
  },
  {
    id: 'camiseta-oversized-lavada',
    sku: 'UA-BLU-004',
    name: 'Camiseta Oversized Carvão Lavada',
    category: 'Blusas',
    collectionTag: 'Básico Durável',
    price: 49,
    image: '/src/assets/images/product_oversized_tee_1795543871861.jpg',
    description:
      'Modelagem ampla unissex pensada para uso contínuo sem deformar na gola. Malha grossa de ponta de estoque tingida em lote único com costura reforçada.',
    fabric: '100% Algodão Penteado 220 g/m² · Tingimento Carvão',
    care: 'Lavar à máquina no ciclo suave e secar à sombra.',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG'],
    stock: 34,
    featured: true,
  },
  {
    id: 'blusa-tule-segunda-pele',
    sku: 'UA-BLU-009',
    name: 'Blusa Gola Alta Tule & Ribana',
    category: 'Blusas',
    collectionTag: 'Sobras Industriais',
    price: 59,
    image: '/src/assets/images/product_mesh_longsleeve_1795543872310.jpg',
    description:
      'Segunda pele versátil para sobrepor com camisetas ou vestidos que você já tem. Feita com rolos remanescentes de ribana e tule resistente que não desfia fácil.',
    fabric: 'Ribana Algodão/Elastano · Tule Poliamida Resistente de Reuso',
    care: 'Lavar à mão ou em saquinho protetor. Dura anos sem esgarçar.',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG'],
    stock: 22,
    featured: true,
  },
  {
    id: 'saia-pregueada-corrente',
    sku: 'UA-SAI-007',
    name: 'Saia Pregueada Twill com Corrente',
    category: 'Vestidos e Saias',
    collectionTag: 'Oficina Local',
    price: 75,
    image: '/src/assets/images/product_mini_skirt_chain_1795543873529.jpg',
    description:
      'Saia evasê de sarja encorpada com short interno embutido e corrente simples removível que você pode transferir para calças e bolsas.',
    fabric: 'Sarja 100% Algodão · Corrente Removível em Aço Inox',
    care: 'Remover a corrente antes de lavar. Costura reforçada na barra.',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG'],
    stock: 19,
  },
  {
    id: 'saia-assimetrica-argolas',
    sku: 'UA-SAI-011',
    name: 'Saia Midi Plissada Assimétrica',
    category: 'Vestidos e Saias',
    collectionTag: 'Upcycling · Oficina',
    price: 85,
    image: '/src/assets/images/product_pleated_skirt_1795543457657.jpg',
    description:
      'Saia midi construída a partir de painéis de sarja reaproveitada, com tiras reguláveis e argolas metálicas pensadas para fácil ajuste conforme o corpo muda.',
    fabric: 'Sarja Pesada de Reuso 300 g/m² · Ferragens em Aço Reutilizáveis',
    care: 'Lavar a frio e passar no sentido das pregas.',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG'],
    stock: 16,
  },
  {
    id: 'corset-noctis-veludo',
    sku: 'UA-COR-008',
    name: 'Corset Noctis em Veludo Cotelê',
    category: 'Blusas',
    collectionTag: 'Ajustável · PP ao XGG',
    price: 89,
    image: '/src/assets/images/product_velvet_corset_1795543455209.jpg',
    description:
      'Corpete confortável sem rigidez excessiva, com ilhoses reforçados e cordão frontal que permite regular a largura em até 10 cm para durar muitos anos.',
    fabric: 'Veludo Cotelê Macio · Forro 100% Algodão · Ilhoses Inoxidáveis',
    care: 'Limpeza localizada ou lavagem suave à mão.',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG'],
    stock: 18,
    featured: true,
  },
  {
    id: 'bolsa-carteiro-lona',
    sku: 'UA-ACE-015',
    name: 'Bolsa Carteiro Lona Encerada',
    category: 'Acessórios',
    collectionTag: 'Oficina · Resistente',
    price: 92,
    image: '/src/assets/images/product_crossbody_bag_1795544284811.jpg',
    description:
      'Bolsa transversal espaçosa em lona grossa impermeável com fivelas metálicas substituíveis e alça acolchoada para acompanhar trabalho, shows e faculdade.',
    fabric: 'Lona 100% Algodão Encerada · Ferragens em Metal Escurecido',
    care: 'Limpar com pano úmido e escova macia. Não colocar na máquina.',
    sizes: ['Único (Comporta notebook 15")'],
    stock: 17,
  },
  {
    id: 'calca-cargo-wide-leg',
    sku: 'UA-CAL-012',
    name: 'Calça Cargo Wide Leg Argolas',
    category: 'Calças',
    collectionTag: 'Uso Diário · Durável',
    price: 95,
    image: '/src/assets/images/product_cargo_pants_1795543872796.jpg',
    description:
      'Calça larga e resistente feita com sarja grossa de trabalho, seis bolsos reais profundos e argolas presas com costura tripla.',
    fabric: 'Sarja Profissional 100% Algodão 290 g/m² · Ferragens em Metal',
    care: 'Lavar do avesso. Tecido criado para aguentar uso intenso.',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG'],
    stock: 25,
    featured: true,
  },
  {
    id: 'calca-alfaiataria-pregas',
    sku: 'UA-CAL-018',
    name: 'Calça Ampla Pregas & Fivelas Laterais',
    category: 'Calças',
    collectionTag: 'Cós Ajustável · PP ao XGG',
    price: 98,
    image: '/src/assets/images/product_tailored_trousers_1795544284279.jpg',
    description:
      'Calça reta de pregas duplas com fivelas laterais no cós que dispensam cinto e permitem ajustar a cintura com conforto ao longo do dia.',
    fabric: 'Sarja de Algodão Encorpada · Fivelas Laterais em Metal',
    care: 'Lavar à máquina em água fria. Fácil de passar.',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG'],
    stock: 20,
  },
  {
    id: 'moletom-zip-capuz',
    sku: 'UA-CAS-006',
    name: 'Moletom Canguru Zíper Duplo',
    category: 'Casacos',
    collectionTag: 'Ponta de Estoque',
    price: 99,
    image: '/src/assets/images/product_ribbed_hoodie_1795543872379.jpg',
    description:
      'Casaco de moletom grosso sem estampa datada, com zíper metálico de reposição fácil e punhos duplos para atravessar vários invernos.',
    fabric: 'Moletom 3 Cabos 75% Algodão, 25% Poliéster Reciclado',
    care: 'Lavar em água fria. Reparo gratuito de zíper na oficina.',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG'],
    stock: 21,
  },
  {
    id: 'camisa-harness-couro',
    sku: 'UA-BLU-019',
    name: 'Camisa Social Preta & Harness Modular',
    category: 'Blusas',
    collectionTag: 'Garimpo & Upcycling',
    price: 115,
    image: '/src/assets/images/product_leather_harness_1795543456685.jpg',
    description:
      'Camisa social preta higienizada de garimpo ou ponta de estoque combinada a um harness modular artesanal que pode ser usado sobre qualquer outra roupa.',
    fabric: 'Algodão Tricoline · Harness Vegano de Longa Duração (removível)',
    care: 'Retirar o harness antes de lavar a camisa.',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG'],
    stock: 14,
  },
  {
    id: 'vestido-chantilly-plissado',
    sku: 'UA-VES-021',
    name: 'Vestido Longo Renda & Chiffon',
    category: 'Vestidos e Saias',
    collectionTag: 'Oficina · Sem Sazonalidade',
    price: 135,
    image: '/src/assets/images/product_lace_dress_1795543456168.jpg',
    description:
      'Vestido longo atemporal feito com tecido de fim de rolo e renda resistente, com cintura regulável por faixa de veludo para vestir diferentes silhuetas.',
    fabric: 'Chiffon Fosco de Reuso · Renda Resistente · Forro em Malha',
    care: 'Lavar à mão com sabão neutro e secar à sombra.',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG'],
    stock: 12,
    featured: true,
  },
  {
    id: 'bota-monolito-couro',
    sku: 'UA-ACE-003',
    name: 'Coturno Monolito Fivelas',
    category: 'Acessórios',
    collectionTag: 'Sola Costurada · Reparável',
    price: 149,
    image: '/src/assets/images/product_platform_boots_1795543457930.jpg',
    description:
      'Coturno com sola blaqueada (costurada, não apenas colada) para que possa ser ressolado em qualquer sapateiro de bairro quando gastar.',
    fabric: 'Material Sintético Fosco Reforçado · Sola Costurada Reparável',
    care: 'Limpar com pano úmido. Sola compatível com troca em sapateiro.',
    sizes: ['34', '35', '36', '37', '38', '39', '40', '41', '42', '43'],
    stock: 15,
  },
  {
    id: 'sobretudo-corvo-la',
    sku: 'UA-CAS-014',
    name: 'Sobretudo Corvo de Lã Reaproveitada',
    category: 'Casacos',
    collectionTag: 'Upcycling · Peça Durável',
    price: 159,
    image: '/src/assets/images/product_wool_cloak_1795543455884.jpg',
    description:
      'Sobretudo atemporal produzido com lã batida de estoque industrial parado, fechos metálicos substituíveis e forro reforçado para durar décadas.',
    fabric: 'Lã Batida de Reuso 400 g/m² · Forro em Sarja de Algodão',
    care: 'Escovar a seco e arejar após o uso; evita lavagens frequentes.',
    sizes: ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG'],
    stock: 10,
    featured: true,
  },
];
