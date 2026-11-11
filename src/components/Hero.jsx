import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'motion/react'
import { CTA, LINKS, SERVICOS } from '../data'
import { EASE, useHoje, Seta } from './ui'
import { IconeWhats } from './Header'

// o título entra palavra por palavra, saindo do desfoque
const LINHAS = [['Corte,', 'barba'], ['e', '*arte*', 'na'], ['mesma', 'cadeira.']]

function Estrela() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5 text-coral" fill="currentColor"><path d="m10 1.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8Z" /></svg>
}
function Pino() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M10 18s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" /><circle cx="10" cy="8" r="2.2" /></svg>
}

export default function Hero({ abrirServico }) {
  const ref = useRef(null)
  const reduz = useReducedMotion()
  const { horario } = useHoje()

  // rolagem: a foto desce mais devagar e o texto se afasta
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const fotoY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const textoY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const textoOp = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // ponteiro: foto e círculo se deslocam de leve, em sentidos opostos (profundidade)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 18 })
  const sy = useSpring(py, { stiffness: 60, damping: 18 })
  const fotoX = useTransform(sx, (v) => v * -14)
  const fotoYp = useTransform(sy, (v) => v * -10)
  const anelX = useTransform(sx, (v) => v * 28)
  const anelY = useTransform(sy, (v) => v * 20)
  function move(e) {
    if (reduz || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  let n = 0
  return (
    <section ref={ref} id="inicio" aria-labelledby="hero-titulo" onPointerMove={move}
      className="em-cor relative isolate flex min-h-svh flex-col overflow-hidden bg-tinta text-parede">

      {/* fundo: carvão que esquenta até o vinho das cadeiras */}
      <div aria-hidden="true" className="absolute inset-0 -z-30 bg-[linear-gradient(115deg,#140e0f_0%,#1d0d10_45%,#3d0c14_100%)]" />

      {/* foto real: Piolho e um trabalho de crazy color */}
      <motion.div className="absolute inset-y-0 right-0 -z-20 w-full lg:w-[57%]" style={reduz ? undefined : { y: fotoY }}>
        <motion.div className="absolute inset-[-3%]" style={reduz ? undefined : { x: fotoX, y: fotoYp }}>
          <motion.img src="assets/img/piolho-e-modelo.jpg" width="1200" height="1200" fetchPriority="high"
            alt="Piolho, de óculos escuros e camiseta preta, ao lado de uma modelo com o cabelo em tons de fogo, num trabalho de crazy color."
            className="h-full w-full object-cover object-[62%_28%] lg:object-[38%_30%]"
            initial={reduz ? false : { scale: 1.18, opacity: 0, filter: 'blur(12px) brightness(.6)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px) brightness(.85)' }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }} />
        </motion.div>
      </motion.div>
      {/* véus: escurecem a foto à esquerda e acendem um vinho por baixo */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#140e0f_0%,rgba(20,14,15,.96)_40%,rgba(20,14,15,.5)_58%,rgba(20,14,15,.05)_82%)] max-lg:bg-[linear-gradient(180deg,rgba(20,14,15,.55)_0%,rgba(20,14,15,.35)_30%,rgba(20,14,15,.92)_62%,#140e0f_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_18%_105%,rgba(122,18,30,.85)_0%,rgba(91,17,25,.35)_40%,transparent_70%)]" />

      {/* círculo de linha fina que se desenha e gira devagar, com um ponto coral correndo */}
      <motion.div aria-hidden="true" className="pointer-events-none absolute -z-10 hidden lg:block"
        style={{ right: '6%', top: '-6%', width: 'min(46vw, 640px)', aspectRatio: '1', ...(reduz ? {} : { x: anelX, y: anelY }) }}>
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
          <motion.circle cx="100" cy="100" r="98" fill="none" stroke="rgba(246,199,180,.38)" strokeWidth=".35"
            initial={reduz ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1], delay: 0.6 }} />
          <motion.g style={{ originX: '100px', originY: '100px' }} animate={reduz ? undefined : { rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}>
            <motion.circle cx="2" cy="100" r="1.6" fill="#ff8a6b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }} />
            <motion.circle cx="2" cy="100" r="4.5" fill="none" stroke="#ff8a6b" strokeWidth=".3"
              animate={reduz ? undefined : { r: [1.6, 6], opacity: [0.8, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 2.6 }} />
          </motion.g>
        </svg>
      </motion.div>

      <motion.div className="wrap flex flex-1 flex-col justify-end pb-8 pt-[calc(var(--topo-h)+40px)] lg:justify-center lg:pb-24"
        style={reduz ? undefined : { y: textoY, opacity: textoOp }}>
        <div className="max-w-[640px] max-lg:mt-[22vh]">
          {/* selo com dado verificável */}
          <motion.a href={LINKS.maps} target="_blank" rel="noopener"
            className="inline-flex min-h-11 items-center gap-3 rounded-full border border-parede/15 bg-parede/[.06] px-4 text-[.8125rem] text-parede/85 no-underline backdrop-blur-md transition-colors hover:border-parede/35 hover:bg-parede/10"
            initial={reduz ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}>
            <span className="flex items-center gap-1.5"><Estrela /><strong className="font-semibold text-parede">4,9</strong> no Google</span>
            <span aria-hidden="true" className="h-3.5 w-px bg-parede/25" />
            <span className="flex items-center gap-1.5"><Pino /> Jaraguá do Sul · SC</span>
          </motion.a>

          <motion.p className="etiqueta mt-7 !flex text-coral"
            initial={reduz ? false : { opacity: 0, letterSpacing: '.6em' }} animate={{ opacity: 1, letterSpacing: '.2em' }} transition={{ duration: 1.2, ease: EASE, delay: 0.45 }}>
            Barbearia · Vila Baependi
          </motion.p>

          <h1 id="hero-titulo" className="letreiro mt-5 text-[clamp(3rem,6.6vw,6.4rem)] leading-[.98]">
            {LINHAS.map((linha, li) => (
              <span key={li} className="block">
                {linha.map((p, pi) => {
                  const i = n++
                  const it = p.startsWith('*')
                  const palavra = it ? p.slice(1, -1) : p
                  return (
                    <motion.span key={pi} className={`inline-block ${it ? 'pr-[.06em] italic text-brilho' : ''}`}
                      initial={reduz ? false : { opacity: 0, y: '0.35em', filter: 'blur(14px)' }}
                      animate={{ opacity: 1, y: '0em', filter: 'blur(0px)' }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.6 + i * 0.09 }}>
                      {palavra}{pi < linha.length - 1 ? ' ' : ''}
                    </motion.span>
                  )
                })}
              </span>
            ))}
          </h1>

          <motion.div initial={reduz ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 1.35 }}>
            <p className="mt-5 max-w-[30em] text-[clamp(1rem,1.25vw,1.1875rem)] leading-relaxed text-parede/75 lg:mt-7">
              Corte, barba e crazy color numa casa grafitada de parede a parede, em Jaraguá do Sul. Marque pelo WhatsApp ou pelo App Barber.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 max-sm:[&>a]:w-full lg:mt-9">
              <a href={CTA.agendar.href} target="_blank" rel="noopener" className="btn btn-claro px-7">
                <IconeWhats className="size-[18px] text-[#1f9d55]" /> Agendar horário
              </a>
              <a href="#servicos" className="btn btn-contorno px-7 text-parede">Conhecer os serviços <Seta /></a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* faixa inferior: atalhos para cada interesse + horário de hoje */}
      <motion.div className="relative border-t border-parede/10 bg-tinta/40 backdrop-blur-md"
        initial={reduz ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 1.6 }}>
        <div className="wrap flex items-center gap-6 overflow-x-auto py-1 [scrollbar-width:none]">
          {horario && (
            <p className="m-0 hidden shrink-0 items-center gap-2 py-3 pr-6 text-[.8125rem] text-parede/60 md:flex md:border-r md:border-parede/10">
              <span className="etiqueta text-parede/45">Hoje</span> <span className="font-semibold text-parede">{horario.hora}</span>
            </p>
          )}
          <ul className="flex shrink-0 items-center gap-1">
            {SERVICOS.map((s, i) => (
              <li key={s.id}>
                <a href="#servicos" onClick={() => abrirServico(s.id)}
                  className="group inline-flex min-h-12 items-center gap-2 rounded-full px-3 text-[.875rem] text-parede/70 no-underline transition-colors hover:bg-parede/[.07] hover:text-parede">
                  <span className="text-[.6875rem] tracking-[.15em] text-coral/80">0{i + 1}</span>
                  <span className="whitespace-nowrap">{s.nome}</span>
                  <Seta className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
