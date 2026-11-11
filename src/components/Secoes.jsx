import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring, useMotionTemplate, useMotionValueEvent } from 'motion/react'
import { CTA, LINKS, HORARIOS, ENDERECO } from '../data'
import { Titulo, Surge, Rotulo, Check, EASE, useHoje, Seta } from './ui'
import { Marca, IconeWhats, IconeInstagram } from './Header'

const vidro = 'rounded-[28px] border border-parede/10 bg-parede/[.04] backdrop-blur-xl'

function Lista({ itens, className = '' }) {
  return (
    <ul className={`grid gap-3 ${className}`}>
      {itens.map((f, i) => (
        <Surge as="li" key={f} atraso={0.07 * i} className="flex items-start gap-3 text-parede/85">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-coral/40 text-coral"><Check className="size-3" /></span>
          {f}
        </Surge>
      ))}
    </ul>
  )
}

/* Prótese capilar: discrição como argumento. Sem foto de "resultado", só o caminho do primeiro contato. */
export function Protese() {
  const ref = useRef(null)
  const reduz = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.55'] })
  const linha = useTransform(scrollYProgress, [0, 1], [0, 1])
  const [passo, setPasso] = useState(reduz ? 2 : -1)
  useMotionValueEvent(scrollYProgress, 'change', (v) => { if (!reduz) setPasso(v < 0.12 ? -1 : v < 0.45 ? 0 : v < 0.8 ? 1 : 2) })
  const passos = [
    ['Mande uma mensagem', 'O botão abre o WhatsApp da Piolho com o assunto já escrito.'],
    ['Tire suas dúvidas', 'Conte o que te incomoda e pergunte tudo antes de decidir.'],
    ['Combine uma avaliação', 'Só se fizer sentido para você. A decisão é sua.'],
  ]
  return (
    <section id="protese" aria-labelledby="protese-titulo"
      className="em-cor relative overflow-hidden bg-[radial-gradient(90%_80%_at_0%_100%,#4a0e16_0%,#1d1416_55%,#140e0f_100%)] py-[clamp(72px,10vw,140px)] text-parede">
      <div className="wrap grid items-center gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <Rotulo>Prótese capilar</Rotulo>
          <Titulo id="protese-titulo" className="titulo mt-6" texto={'Primeiro,\numa *conversa*.'} />
          <Surge as="p" className="mt-7 max-w-[30em] text-[1.0625rem] leading-relaxed text-parede/70">
            Calvície e falhas no cabelo são assunto pessoal. Por isso o primeiro contato sobre prótese capilar é reservado: só você e a equipe, no WhatsApp, sem plateia e sem pressa.
          </Surge>
          <Lista className="mt-8" itens={['Conversa privada, direto no WhatsApp', 'Tire todas as dúvidas antes de decidir', 'A avaliação é marcada só se você quiser']} />
          <Surge atraso={0.1} className="mt-9">
            <a href={CTA.protese.href} target="_blank" rel="noopener" className="btn btn-claro px-7 max-sm:w-full">
              <IconeWhats className="size-[18px] text-[#1f9d55]" /> Conversar em particular
            </a>
          </Surge>
        </div>

        {/* linha do tempo que acende conforme a rolagem */}
        <div ref={ref} className={`${vidro} relative p-[clamp(24px,3vw,40px)]`}>
          <p className="etiqueta text-parede/45">Como funciona</p>
          <ol className="relative m-0 mt-8 grid list-none gap-10 p-0">
            <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-parede/10" />
            <motion.span aria-hidden="true" className="absolute left-[19px] top-6 w-px origin-top bg-coral" style={{ bottom: 24, scaleY: reduz ? 1 : linha }} />
            {passos.map(([t, d], i) => {
              const aceso = passo >= i
              return (
                <li key={t} className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-5">
                  <motion.span className="relative z-10 grid size-10 place-items-center rounded-full border font-serif text-lg italic"
                    animate={{ backgroundColor: aceso ? '#ff8a6b' : '#1d1416', borderColor: aceso ? '#ff8a6b' : 'rgba(244,238,231,.18)', color: aceso ? '#140e0f' : 'rgba(244,238,231,.6)' }}
                    transition={{ duration: 0.4 }}>
                    {i + 1}
                  </motion.span>
                  <motion.div animate={{ opacity: aceso ? 1 : 0.45 }} transition={{ duration: 0.4 }}>
                    <p className="m-0 font-serif text-[1.5rem] leading-tight tracking-[-.01em]">{t}</p>
                    <p className="m-0 mt-1.5 text-parede/60">{d}</p>
                  </motion.div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* Planos: um "cartão de membro" que reage ao ponteiro, com só o que é confirmado. */
function CartaoPlano() {
  const reduz = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 18 })
  const sry = useSpring(ry, { stiffness: 150, damping: 18 })
  const bx = useMotionValue(30)
  const by = useMotionValue(20)
  const brilho = useMotionTemplate`radial-gradient(420px circle at ${bx}% ${by}%, rgba(255,214,196,.28), transparent 55%)`
  function move(e) {
    if (reduz || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    ry.set((x - 0.5) * 16); rx.set((0.5 - y) * 12)
    bx.set(x * 100); by.set(y * 100)
  }
  return (
    <div className="[perspective:1200px]" onPointerMove={move} onPointerLeave={() => { rx.set(0); ry.set(0) }}>
      <motion.div style={reduz ? undefined : { rotateX: srx, rotateY: sry }}
        initial={{ opacity: 0, y: 40, rotate: -4 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto aspect-[1.586] w-full max-w-[480px] overflow-hidden rounded-[26px] border border-parede/15 bg-[linear-gradient(135deg,#7a1622_0%,#4a0e16_45%,#1d0a0e_100%)] p-[clamp(20px,3vw,32px)] shadow-[0_50px_90px_-35px_rgba(0,0,0,.9)]">
        {/* linhas finas, no mesmo traço do círculo do hero */}
        <svg aria-hidden="true" viewBox="0 0 200 126" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <circle cx="170" cy="20" r="70" fill="none" stroke="rgba(246,199,180,.22)" strokeWidth=".4" />
          <circle cx="170" cy="20" r="48" fill="none" stroke="rgba(246,199,180,.14)" strokeWidth=".4" />
        </svg>
        <motion.div aria-hidden="true" className="absolute inset-0" style={{ background: brilho }} />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="leading-none">
              <span className="block font-serif text-[clamp(1.6rem,3vw,2.1rem)] italic">Piolho<span className="not-italic text-coral">.</span></span>
              <span className="mt-1 block text-[.55rem] font-semibold uppercase tracking-[.42em] text-parede/55">barber shop</span>
            </span>
            <span className="etiqueta rounded-full border border-parede/20 px-3 py-1 text-[.625rem] text-parede/80">Plano mensal</span>
          </div>
          <div>
            <p className="m-0 font-serif text-[clamp(1.5rem,3.2vw,2.25rem)] leading-none tracking-[-.02em]">Cortes <em className="text-brilho">ilimitados</em></p>
            <div className="mt-4 flex items-end justify-between gap-4 text-[.75rem] uppercase tracking-[.2em] text-parede/55">
              <span>Para quem é da casa</span>
              <span className="text-parede/80">Valor sob consulta</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function Planos() {
  return (
    <section id="planos" aria-labelledby="planos-titulo"
      className="em-cor relative overflow-hidden bg-[radial-gradient(70%_80%_at_100%_50%,#3d0c14_0%,#140e0f_65%)] py-[clamp(72px,10vw,140px)] text-parede">
      <div className="wrap grid items-center gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <Rotulo>Planos mensais</Rotulo>
          <Titulo id="planos-titulo" className="titulo mt-6" texto={'Cortou, cresceu,\n*cortou de novo*.'} />
          <Surge as="p" className="mt-7 max-w-[30em] text-[1.0625rem] leading-relaxed text-parede/70">
            Com cortes ilimitados no mês, você não precisa esperar o cabelo passar do ponto para voltar à cadeira. É só marcar.
          </Surge>
          <Lista className="mt-8" itens={['Cortes ilimitados no mês', 'Vantagens para quem é da casa', 'Valor e o que cada plano inclui, direto com a equipe']} />
          <Surge atraso={0.1} className="mt-9">
            <a href={CTA.planos.href} target="_blank" rel="noopener" className="btn btn-claro px-7 max-sm:w-full">
              Quero conhecer os planos <Seta />
            </a>
          </Surge>
        </div>
        <CartaoPlano />
      </div>
    </section>
  )
}

/* Curso: autoridade do Piolho + escassez real (vagas limitadas). */
export function Curso() {
  const ref = useRef(null)
  const reduz = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const fotoY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  return (
    <section ref={ref} id="curso" aria-labelledby="curso-titulo" className="em-cor relative isolate overflow-hidden bg-tinta text-parede">
      {/* foto de palco em tela cheia à esquerda, como no hero */}
      <motion.div className="absolute inset-y-0 left-0 -z-20 w-full lg:w-[58%]" style={reduz ? undefined : { y: fotoY }}>
        <img src="assets/img/palco-garden.jpg" alt="Piolho no palco de um evento da Garden for Men, de microfone na mão, diante de um telão com seus trabalhos de cor."
          loading="lazy" className="h-[112%] w-full object-cover object-[45%_40%] opacity-80" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(270deg,#140e0f_0%,rgba(20,14,15,.96)_42%,rgba(20,14,15,.45)_62%,rgba(20,14,15,.25)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(20,14,15,.3)_0%,rgba(20,14,15,.75)_35%,#140e0f_55%)]" />

      <div className="wrap grid min-h-[min(860px,100svh)] items-center gap-12 py-[clamp(72px,10vw,140px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div aria-hidden="true" className="hidden lg:block" />
        <div className="max-lg:mt-[28vh]">
          <motion.p className="inline-flex items-center gap-2.5 rounded-full border border-coral/40 bg-coral/10 px-4 py-2 text-[.8125rem] font-semibold text-brilho"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="relative flex size-2" aria-hidden="true">
              {!reduz && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-60" />}
              <span className="relative inline-flex size-2 rounded-full bg-coral" />
            </span>
            Curso presencial · vagas limitadas
          </motion.p>
          <Titulo id="curso-titulo" className="titulo mt-6" texto={'Barbeiro\nde *Sucesso*'} />
          <Surge as="p" className="mt-7 max-w-[32em] text-[1.0625rem] leading-relaxed text-parede/70">
            Barbeiro de Sucesso é o curso presencial da Piolho. Datas, conteúdo, valores e inscrição da próxima turma são passados pelo WhatsApp.
          </Surge>
          <Lista className="mt-8" itens={['O Piolho é técnico educador da Garden for Men', 'Experiência de palco em eventos de beleza', 'Formação presencial, com vagas limitadas']} />
          <Surge as="blockquote" atraso={0.08} className="mt-9 border-l border-coral/60 pl-5">
            <p className="m-0 font-serif text-[clamp(1.35rem,2vw,1.75rem)] italic leading-snug">“Nunca tive plano B. Foquei 100% no plano A.”</p>
            <cite className="mt-2 block text-sm not-italic text-parede/50">Piolho, no Instagram</cite>
          </Surge>
          <Surge atraso={0.12} className="mt-9">
            <a href={CTA.curso.href} target="_blank" rel="noopener" className="btn btn-vermelho px-7 max-sm:w-full">
              Quero saber da próxima turma <Seta />
            </a>
          </Surge>
        </div>
      </div>
    </section>
  )
}

/* Endereço, horários e mapa (o mapa só carrega quando a pessoa pede). */
export function Visita() {
  const { dia } = useHoje()
  const [mapa, setMapa] = useState(false)
  const canais = [
    { href: LINKS.maps, txt: 'Como chegar pelo Google Maps' },
    { href: LINKS.whatsapp, txt: 'WhatsApp (47) 99771-8257', icone: <IconeWhats className="size-4" /> },
    { href: LINKS.instagram, txt: 'Instagram @piolhobarbershop', icone: <IconeInstagram className="size-4" /> },
    { href: LINKS.facebook, txt: 'Facebook' },
  ]
  return (
    <section id="visita" aria-labelledby="visita-titulo" className="em-cor bg-carvao py-[clamp(72px,10vw,140px)] text-parede">
      <div className="wrap grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <Rotulo>Como chegar</Rotulo>
          <h2 id="visita-titulo" className="titulo mt-6">
            <Titulo as="span" className="block" texto={'Rua Bernardo\n*Dornbusch*, 1611'} />
          </h2>
          <p className="mt-4 text-[1.0625rem] text-parede/60">{ENDERECO.complemento} · {ENDERECO.cidade}</p>

          <dl className={`${vidro} mt-9 p-5`}>
            {HORARIOS.map((h) => {
              const hoje = h.dias.includes(dia)
              return (
                <div key={h.rotulo} className={`flex justify-between gap-4 rounded-xl px-3 py-2.5 ${hoje ? 'bg-parede/[.07]' : 'text-parede/55'}`}>
                  <dt>{h.rotulo}{hoje && <span className="ml-2 text-[.75rem] font-semibold uppercase tracking-wider text-coral">hoje</span>}</dt>
                  <dd className="m-0 font-semibold">{h.hora}</dd>
                </div>
              )
            })}
          </dl>
          <ul className="m-0 mt-6 list-none p-0">
            {canais.map((c) => (
              <li key={c.txt}>
                <a href={c.href} target="_blank" rel="noopener"
                  className="group flex min-h-14 items-center justify-between gap-4 border-b border-parede/10 py-3 no-underline transition-colors hover:text-coral">
                  <span className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-1.5">{c.icone}{c.txt}</span>
                  <span aria-hidden="true" className="text-parede/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[380px] overflow-hidden rounded-[28px] ring-1 ring-parede/10 lg:min-h-0">
          <AnimatePresence mode="wait">
            {mapa ? (
              <motion.iframe key="m" title="Mapa com a localização da Piolho Barber Shop" src={LINKS.mapaEmbed}
                className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
            ) : (
              <motion.div key="f" className="absolute inset-0" exit={{ opacity: 0 }}>
                <img src="assets/img/salao-bancadas.jpg" alt="" className="h-full w-full object-cover opacity-60" loading="lazy" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,14,15,.2)_0%,rgba(20,14,15,.85)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-[clamp(20px,3vw,32px)]">
                  <p className="m-0 max-w-[16em] font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] leading-tight">A casa grafitada da <em className="text-brilho">Vila Baependi</em>.</p>
                  <button type="button" onClick={() => setMapa(true)} className="btn btn-claro">Ver no mapa</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* Rodapé com o convite final, no tom da própria Piolho ("Eai Piolho..."). */
export function Rodape() {
  const outros = [['Crazy Color', CTA.cor], ['Prótese capilar', CTA.protese], ['Planos mensais', CTA.planos], ['Curso', CTA.curso]]
  return (
    <footer id="rodape" className="em-cor relative overflow-hidden bg-[radial-gradient(80%_90%_at_10%_100%,#4a0e16_0%,#140e0f_60%)] pb-10 pt-[clamp(64px,9vw,120px)] text-parede max-md:pb-28">
      <div className="wrap">
        <Rotulo className="mb-6">Bora?</Rotulo>
        <motion.a href={CTA.agendar.href} target="_blank" rel="noopener" initial="r" whileHover="h" whileTap={{ scale: 0.99 }}
          className="group block no-underline">
          <span className="letreiro block text-[clamp(2.75rem,8vw,7.5rem)]">
            E aí, Piolho,{' '}
            <span className="relative inline-block">
              <span className="relative z-10 italic transition-colors duration-300 group-hover:text-tinta">tem horário?</span>
              <motion.span aria-hidden="true" className="absolute -inset-x-2 bottom-[.04em] top-[.2em] origin-left rounded-lg bg-brilho"
                variants={{ r: { scaleX: 0 }, h: { scaleX: 1 } }} transition={{ duration: 0.45, ease: EASE }} />
            </span>
          </span>
          <span className="mt-8 inline-flex items-center gap-3 text-[1.0625rem] font-semibold">
            Agendar pelo WhatsApp
            <motion.span className="grid size-12 place-items-center rounded-full bg-vermelho text-white"
              variants={{ r: { x: 0 }, h: { x: 8 } }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}><Seta className="size-5" /></motion.span>
          </span>
        </motion.a>
        <p className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-1 text-parede/60">
          <span>Ou fale sobre</span>
          {outros.map(([t, c]) => (
            <a key={t} href={c.href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center font-semibold text-parede underline decoration-coral/70 decoration-1 underline-offset-[6px] hover:text-coral">{t}</a>
          ))}
        </p>
        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-8 text-[.875rem] text-parede/50">
          <Marca claro />
          <p className="m-0">{ENDERECO.rua}, sala 02 · Vila Baependi · Jaraguá do Sul, SC</p>
          <p className="m-0">© Piolho Barber Shop · Fotos e vídeo: @piolhobarbershop</p>
        </div>
      </div>
    </footer>
  )
}

/* Barra fixa no celular: a chamada muda conforme a seção ou o serviço clicado. */
export function BarraMovel({ visivel, cta }) {
  return (
    <AnimatePresence>
      {visivel && (
        <motion.a href={cta.href} target="_blank" rel="noopener"
          className="fixed inset-x-3 bottom-3 z-40 flex min-h-[56px] items-center justify-center gap-2.5 overflow-hidden rounded-full bg-parede px-5 font-semibold text-tinta no-underline shadow-[0_18px_40px_-12px_rgba(0,0,0,.65)] md:hidden"
          initial={{ y: '160%' }} animate={{ y: 0 }} exit={{ y: '160%' }} transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          whileTap={{ scale: 0.97 }}>
          <IconeWhats className="size-[18px] text-[#1f9d55]" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={cta.txt} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.18 }}>
              {cta.txt}
            </motion.span>
          </AnimatePresence>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
