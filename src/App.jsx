import { useCallback, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { CTA, CTA_DA_SECAO, SERVICOS } from './data'
import { useSecaoAtiva } from './components/ui'
import Header from './components/Header'
import Hero from './components/Hero'
import Prova from './components/Prova'
import Agenda from './components/Agenda'
import Servicos from './components/Servicos'
import Fotos from './components/Fotos'
import { Protese, Planos, Curso, Visita, Rodape, BarraMovel } from './components/Secoes'
import Lightbox from './components/Lightbox'

export default function App() {
  const [menuAberto, setMenuAberto] = useState(false)
  const [servico, setServico] = useState(SERVICOS[0].id)
  const [galeria, setGaleria] = useState({ fotos: [], i: 0 })
  const { ativa, heroVisivel, fimVisivel } = useSecaoAtiva()

  const abrir = useCallback((fotos, i) => setGaleria({ fotos, i }), [])
  const fechar = useCallback(() => setGaleria({ fotos: [], i: 0 }), [])
  const setIndice = useCallback((fn) => setGaleria((g) => ({ ...g, i: typeof fn === 'function' ? fn(g.i) : fn })), [])

  // a barra do celular acompanha a seção; nos serviços, o serviço aberto
  const chave = ativa === 'servicos'
    ? (SERVICOS.find((s) => s.id === servico)?.cta || 'agendar')
    : CTA_DA_SECAO[ativa] || 'agendar'

  return (
    <MotionConfig reducedMotion="user">
      <Header ativa={ativa} menuAberto={menuAberto} setMenuAberto={setMenuAberto} />
      <main id="conteudo">
        <Hero abrirServico={setServico} />
        <Prova />
        <Agenda />
        <Servicos servico={servico} setServico={setServico} />
        <Fotos abrir={abrir} />
        <Protese />
        <Planos />
        <Curso />
        <Visita />
      </main>
      <Rodape />
      <BarraMovel visivel={!heroVisivel && !fimVisivel && !menuAberto && galeria.fotos.length === 0} cta={CTA[chave]} />
      <Lightbox fotos={galeria.fotos} indice={galeria.i} setIndice={setIndice} fechar={fechar} />
    </MotionConfig>
  )
}
