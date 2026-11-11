import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { FOTOS, GRUPOS_FOTO, LINKS } from '../data'
import { Titulo, Surge, EASE } from './ui'

export default function Fotos({ abrir }) {
  const reduz = useReducedMotion()
  const [grupo, setGrupo] = useState('todas')
  const [tudo, setTudo] = useState(false)
  const lista = useMemo(() => FOTOS.filter((f) => grupo === 'todas' || f.grupo === grupo), [grupo])
  // no celular a grade começa com 6 fotos para não virar um corredor sem fim
  const [estreito, setEstreito] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const f = (e) => setEstreito(e.matches)
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])
  const visiveis = estreito && !tudo ? lista.slice(0, 6) : lista

  return (
    <section id="fotos" aria-labelledby="fotos-titulo" className="em-cor bg-carvao py-[clamp(72px,10vw,140px)] text-parede">
      <div className="wrap">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Titulo id="fotos-titulo" texto={'Começou na\n*garagem* de casa.'} />
          </div>
          <div className="lg:pt-3">
            <Surge as="p" className="m-0 text-[clamp(1.125rem,1.6vw,1.375rem)] leading-relaxed text-parede/85">
              Hoje é um salão inteiro na Vila Baependi: grafite do @diant de parede a parede, linhas de LED no teto, cadeiras vermelhas e pretas, lavatórios e uma mesa de sinuca logo na entrada.
            </Surge>
            <Surge as="blockquote" atraso={0.08} className="mt-6 border-l-4 border-coral pl-5">
              <p className="m-0 text-[1.125rem] font-semibold">“Essa é a Piolho, essa é nossa casa! Sejam todos bem-vindos.”</p>
              <cite className="mt-1 block text-sm not-italic text-parede/60">@piolhobarbershop, na inauguração do espaço</cite>
            </Surge>
          </div>
        </div>

        {/* filtros */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label="Filtrar fotos" className="flex flex-wrap gap-1 rounded-full bg-white/8 p-1">
            {GRUPOS_FOTO.map((g) => {
              const ativo = grupo === g.id
              const qtd = g.id === 'todas' ? FOTOS.length : FOTOS.filter((f) => f.grupo === g.id).length
              return (
                <button key={g.id} type="button" aria-pressed={ativo} onClick={() => setGrupo(g.id)}
                  className={`relative inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-semibold transition-colors ${ativo ? 'text-tinta' : 'text-parede hover:bg-white/10'}`}>
                  {ativo && <motion.span layoutId="filtro-ativo" aria-hidden="true" className="absolute inset-0 rounded-full bg-brilho" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                  <span className="relative">{g.rotulo}</span>
                  <span className={`relative text-[.8125rem] ${ativo ? 'text-tinta/70' : 'text-parede/50'}`}>{qtd}</span>
                </button>
              )
            })}
          </div>
          <p className="m-0 text-sm text-parede/60" aria-live="polite">{lista.length} fotos · toque para ampliar</p>
        </div>

        {/* grade que se reorganiza ao filtrar */}
        <motion.ul layout={!reduz} className="mt-6 grid grid-flow-dense grid-cols-2 gap-3 [grid-auto-rows:clamp(80px,22vw,170px)] md:grid-cols-4 md:[grid-auto-rows:clamp(80px,11vw,150px)] lg:grid-cols-6 lg:[grid-auto-rows:clamp(80px,7.4vw,112px)]">
          <AnimatePresence mode="popLayout" initial={false}>
            {visiveis.map((f) => {
              const i = FOTOS.indexOf(f)
              return (
                <motion.li key={f.src} layout={!reduz}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className={`${f.larga ? 'col-span-2' : ''} row-span-2`}>
                  <button type="button" onClick={(e) => abrir(lista, lista.indexOf(f), e.currentTarget)}
                    aria-label={`Ampliar foto: ${f.alt}`}
                    className="foto group relative block h-full w-full cursor-zoom-in" style={{ borderRadius: 18 }}>
                    <img src={f.src} alt="" loading="lazy" className="group-hover:scale-[1.05] group-focus-visible:scale-[1.05]" data-i={i} />
                    <span aria-hidden="true" className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-parede text-xl font-bold text-tinta opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100 [@media(hover:none)]:size-8">+</span>
                  </button>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>
        {estreito && !tudo && lista.length > 6 && (
          <button type="button" onClick={() => setTudo(true)} className="btn btn-claro mt-4 w-full">
            Mostrar mais {lista.length - 6} fotos
          </button>
        )}

        <div className="mt-10 grid items-center gap-6 md:grid-cols-[auto_minmax(0,1fr)]">
          <div className="foto aspect-[9/14] w-full max-w-[260px] bg-black" style={{ borderRadius: 18 }}>
            <video controls preload="none" playsInline poster="assets/img/video-capa.jpg" aria-label="Vídeo de apresentação da barbearia" className="h-full w-full object-cover">
              <source src={LINKS.video} type="video/mp4" />
            </video>
          </div>
          <div className="max-w-[34em]">
            <p className="m-0 text-[1.125rem] font-semibold">Um giro pela casa, em vídeo.</p>
            <p className="mt-2 text-parede/75">Mais trabalhos, eventos e bastidores estão no Instagram da Piolho.</p>
            <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              <a href={LINKS.instagram} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center font-bold underline decoration-coral decoration-2 underline-offset-4 hover:text-coral">Instagram @piolhobarbershop</a>
              <a href={LINKS.maps} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center font-bold underline decoration-coral decoration-2 underline-offset-4 hover:text-coral">Nota 4,9 no Google, 254 avaliações (nov. 2026)</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
