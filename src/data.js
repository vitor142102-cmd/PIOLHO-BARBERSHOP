// Dados confirmados nas fontes oficiais: minisite piolhobarbershop.com.br, Linktree,
// Instagram @piolhobarbershop e a ficha da Piolho no Google Maps.
// Preços, regras de planos e detalhes do curso não estão publicados: ficam para consulta no WhatsApp.

const WA = 'https://wa.me/5547997718257?text='

export const LINKS = {
  whatsapp: 'https://wa.me/5547997718257',
  instagram: 'https://www.instagram.com/piolhobarbershop/',
  facebook: 'https://www.facebook.com/piolhobarbershop',
  maps: 'https://www.google.com/maps/place/Piolho+Barber+Shop/@-26.4808207,-49.0630857,15z/data=!4m2!3m1!1s0x0:0x679d390ce9ebe81c',
  mapaEmbed: 'https://www.google.com/maps?q=Piolho+Barber+Shop,+R.+Bernardo+Dornbusch,+1611,+Vila+Baependi,+Jaragu%C3%A1+do+Sul+-+SC&output=embed',
  appIos: 'https://apps.apple.com/us/app/appbarber-cliente/id6450795073',
  appAndroid: 'https://play.google.com/store/apps/details?id=br.com.starapp.appbarbercli',
  video: 'https://res.cloudinary.com/dgprjv8ni/video/upload/q_auto/f_auto/v1780515446/01_gzjqy9.mp4',
}

// mensagens iguais às do minisite oficial
export const CTA = {
  agendar: { txt: 'Agendar pelo WhatsApp', href: WA + 'Ol%C3%A1!%20Quero%20agendar%20um%20hor%C3%A1rio%20de%20corte.' },
  cor: { txt: 'Conversar sobre cor', href: WA + 'Ol%C3%A1!%20Quero%20conversar%20sobre%20um%20trabalho%20de%20crazy%20color.' },
  protese: { txt: 'Conversar sobre prótese', href: WA + 'Ol%C3%A1!%20Tenho%20interesse%20em%20saber%20sobre%20pr%C3%B3tese%20capilar.' },
  planos: { txt: 'Consultar os planos', href: WA + 'Ol%C3%A1!%20Quero%20saber%20sobre%20os%20planos%20mensais.' },
  curso: { txt: 'Saber do curso', href: WA + 'Ol%C3%A1!%20Tenho%20interesse%20no%20curso%20Barbeiro%20de%20Sucesso%20-%20Presencial.' },
}

// horários do minisite (0 = domingo)
export const HORARIOS = [
  { dias: [1, 2, 3, 4, 5], rotulo: 'Segunda a sexta', curto: 'Seg a sex', hora: '9h às 20h' },
  { dias: [6], rotulo: 'Sábado', curto: 'Sáb', hora: '8h às 17h' },
  { dias: [0], rotulo: 'Domingo', curto: 'Dom', hora: 'Fechado' },
]

export const ENDERECO = {
  rua: 'Rua Bernardo Dornbusch, 1611',
  complemento: 'Sala 02 · Vila Baependi',
  cidade: 'Jaraguá do Sul, SC',
}

const img = (n) => `assets/img/${n}.jpg`

// cada serviço: foto real, um gatilho verdadeiro ("curto") e a conversa certa no WhatsApp
export const SERVICOS = [
  {
    id: 'corte', nome: 'Corte & barba', cor: 'vermelho', cta: 'agendar', secao: '#servicos',
    foto: img('salao-cadeiras'), alt: 'Duas cadeiras de barbeiro em vermelho e preto com o nome Piolho Barber Shop bordado; ao fundo, os lavatórios.',
    curto: 'Seg a sáb · WhatsApp ou app',
    texto: 'Corte, barba e acabamento, com lavatório para fechar o serviço. Marque pelo WhatsApp ou escolha o horário você mesmo no App Barber.',
  },
  {
    id: 'cor', nome: 'Crazy Color', cor: 'coral', cta: 'cor', secao: '#fotos',
    foto: img('crazy-color-perfil'), alt: 'Modelo de perfil com cabelo curto espetado em vermelho, laranja, rosa e amarelo.',
    curto: 'A assinatura do Piolho',
    texto: 'Vermelho, laranja, rosa e amarelo no mesmo cabelo, com o corte desenhado junto. É o trabalho que o Piolho leva para palcos de eventos de beleza.',
  },
  {
    id: 'protese', nome: 'Prótese capilar', cor: 'areia', cta: 'protese', secao: '#protese',
    foto: img('lavatorio'), alt: 'Área de lavatório da barbearia, com poltronas de couro preto e parede grafitada com flores.',
    curto: 'Atendimento reservado',
    texto: 'Para quem convive com calvície ou falhas. Começa com uma conversa no WhatsApp, sem pressa e só entre você e a equipe.',
  },
  {
    id: 'planos', nome: 'Planos mensais', cor: 'vinho', cta: 'planos', secao: '#planos',
    foto: img('salao-corredor'), alt: 'Corredor do salão com cadeiras pretas e vermelhas enfileiradas e parede grafitada.',
    curto: 'Cortes ilimitados',
    texto: 'Cortes ilimitados no mês, com vantagens para quem é da casa. Valores e o que cada plano inclui, a equipe passa pelo WhatsApp.',
  },
  {
    id: 'curso', nome: 'Curso de barbeiro', cor: 'tinta', cta: 'curso', secao: '#curso',
    foto: img('palco-demonstracao'), alt: 'Piolho de microfone na mão, no palco, ao lado de uma modelo de cabelo colorido sentada numa cadeira de barbeiro.',
    curto: 'Vagas limitadas',
    texto: 'Formação presencial, com vagas limitadas. Datas, conteúdo e inscrição são passados pelo WhatsApp.',
  },
]

// todas as fotos são da própria @piolhobarbershop
export const FOTOS = [
  { src: img('salao-panoramica'), grupo: 'salao', larga: true, alt: 'Vista panorâmica do salão: cadeiras sob o teto de LED, poltronas vermelhas, letreiro Piolho Barber Shop e mesa de sinuca.' },
  { src: img('crazy-color-perfil'), grupo: 'cor', alt: 'Modelo de perfil com cabelo curto espetado em vermelho, laranja, rosa e amarelo e tatuagens no pescoço.' },
  { src: img('salao-bancadas'), grupo: 'salao', alt: 'Parede inteira grafitada em vermelho e azul, linhas de LED no teto e fileira de cadeiras diante dos espelhos.' },
  { src: img('piolho-e-modelo'), grupo: 'cor', alt: 'Piolho, de óculos escuros e camiseta preta, ao lado da modelo com o cabelo em tons de fogo.' },
  { src: img('palco-garden'), grupo: 'palco', alt: 'Piolho no palco de um evento da Garden for Men, de microfone na mão, diante de um telão com seus trabalhos de cor.' },
  { src: img('crazy-color-sorriso'), grupo: 'cor', alt: 'A modelo sorrindo de cabeça inclinada, com a franja curta em laranja e amarelo.' },
  { src: img('salao-cadeiras'), grupo: 'salao', alt: 'Cadeiras de barbeiro vermelhas e pretas com o nome da casa bordado; ao fundo, lavatórios e grafite colorido.' },
  { src: img('crazy-color-lateral'), grupo: 'cor', alt: 'Lateral do corte: nuca raspada com tatuagem de flores e cabelo em degradê de amarelo a rosa.' },
  { src: img('palco-demonstracao'), grupo: 'palco', alt: 'Piolho no palco, ao lado da modelo de cabelo colorido sentada numa cadeira de barbeiro.' },
  { src: img('lavatorio'), grupo: 'salao', alt: 'Lavatórios com poltronas de couro preto capitonê, estante de produtos e parede grafitada com flores.' },
  { src: img('crazy-color-olhar'), grupo: 'cor', alt: 'A modelo de olhar baixo, com o topete espetado em vermelho, laranja e verde-amarelado.' },
  { src: img('salao-corredor'), grupo: 'salao', alt: 'Corredor do salão com cadeiras pretas e vermelhas enfileiradas e poltronas vermelhas ao fundo.' },
  { src: img('crazy-color-palco'), grupo: 'palco', alt: 'A modelo em fundo escuro, de perfil, com o cabelo vermelho e rosa sob luz de palco.' },
  { src: img('crazy-color-tres-quartos'), grupo: 'cor', alt: 'Vista de três quartos do cabelo colorido, com a lateral raspada e brincos na orelha.' },
  { src: img('palco-contraluz'), grupo: 'palco', alt: 'Modelo de costas sob luz de palco, com o cabelo espetado contra a contraluz laranja e azul.' },
  { src: img('crazy-color-pb'), grupo: 'palco', alt: 'Foto em preto e branco da modelo de costas no palco, com o cabelo espetado contra as luzes.' },
]

export const GRUPOS_FOTO = [
  { id: 'todas', rotulo: 'Todas' },
  { id: 'salao', rotulo: 'O salão' },
  { id: 'cor', rotulo: 'Crazy Color' },
  { id: 'palco', rotulo: 'No palco' },
]

export const NAV = [
  { id: 'servicos', rotulo: 'Serviços' },
  { id: 'fotos', rotulo: 'Fotos' },
  { id: 'protese', rotulo: 'Prótese' },
  { id: 'planos', rotulo: 'Planos' },
  { id: 'curso', rotulo: 'Curso' },
  { id: 'visita', rotulo: 'Endereço' },
]

// chamada da barra fixa do celular de acordo com a seção em vista
export const CTA_DA_SECAO = {
  agenda: 'agendar', fotos: 'cor', protese: 'protese', planos: 'planos', curso: 'curso', visita: 'agendar',
}
