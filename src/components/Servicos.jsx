import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react'
import { SERVICOS, CTA, LINKS } from '../data'
import { Titulo, Rotulo, EASE, useLinkApp, Seta } from './ui'

// posição de cada serviço na grade (desktop): corte grande, curso em faixa larga
const LUGAR = {
  corte: 'lg:col-span-2 lg:row-span-2 min-h-[460px] lg:min-h-0',
  cor: 'lg:col-span-2 min-h-[300px]',
  protese: 'min-h-[300px]',
  planos: 'min-h-[300px]',
  curso: 'sm:col-span-2 lg:col-span-4 min-h-[300px] lg:min-h-[280px]',
}

function Cartao({ s, i, destaque }) {
  const reduz = useReducedMotion()
  const ref = useRef(null)
  const app = useLinkApp(LINKS.appIos, LINKS.appAndroid)
  const cta = CTA[s.cta]
  // luz suave que acompanha o ponteiro sobre a foto
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const smx = useSpring(mx, { stiffness: 120, damping: 20 })
  const smy = useSpring(my, { stiffness: 120, damping: 20 })
  const luz = useMotionTemplate`radial-gradient(380px circle at ${smx}% ${smy}%, rgba(255,138,107,.18), transparent 65%)`

  useEffect(() => {
    if (destaque && ref.current) ref.current.scrollIntoView({ behavior: reduz ? 'auto' : 'smooth', block: 'center' })
  }, [destaque, reduz])

  return (
    <motion.article ref={ref} id={`servico-${s.id}`}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE, delay: i * 0.07 }}
      onPointerMove={(e) => {
        if (reduz || e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width) * 100); my.set(((e.clientY - r.top) / r.height) * 100)
      }}
      className={`group relative isolate flex flex-col justify-end overflow-hidden rounded-[28px] bg-carvao ${LUGAR[s.id]} ${destaque ? 'ring-2 ring-coral ring-offset-4 ring-offset-tinta' : 'ring-1 ring-parede/[.08]'}`}>
      <img src={s.foto} alt={s.alt} loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70 transition-[transform,opacity] duration-[1.2s] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06] group-hover:opacity-85" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(20,14,15,.15)_0%,rgba(20,14,15,.55)_45%,rgba(20,14,15,.96)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(20,14,15,.55)_0%,rgba(20,14,15,.82)_35%,rgba(20,14,15,.96)_100%)]" />
      <motion.div aria-hidden="true" className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: luz }} />

      {/* gatilho verdadeiro do serviço */}
      <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-parede/15 bg-tinta/50 px-3 py-1.5 text-[.75rem] font-semibold text-parede backdrop-blur-md">
        <span className="size-1.5 rounded-full bg-coral" aria-hidden="true" />{s.curto}
      </span>
      <span aria-hidden="true" className="absolute right-6 top-5 font-serif text-[.95rem] italic text-parede/40">0{i + 1}</span>

      <div className="p-[clamp(20px,2.6vw,32px)] pt-[76px]">
        <h3 className={`letreiro m-0 text-parede ${s.id === 'protese' || s.id === 'planos' ? 'text-[clamp(1.75rem,2.4vw,2.25rem)]' : 'text-[clamp(1.9rem,3vw,2.75rem)]'}`}>{s.nome}</h3>
        {/* traço coral que cresce no hover */}
        <span aria-hidden="true" className="mt-4 block h-px w-12 origin-left bg-coral transition-transform duration-500 group-hover:scale-x-[3]" />
        <p className="mt-4 max-w-[34em] text-[.9375rem] leading-relaxed text-parede/75">{s.texto}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={cta.href} target="_blank" rel="noopener"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-parede px-5 text-[.9375rem] font-semibold text-tinta no-underline transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-white active:scale-95">
            {cta.txt} <Seta className="transition-transform group-hover:translate-x-0.5" />
          </a>
          {s.id === 'corte' && <a href={app} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center text-[.9375rem] font-semibold text-parede underline decoration-coral/70 decoration-1 underline-offset-[6px] hover:decoration-coral">ou pelo App Barber</a>}
          {s.secao !== '#servicos' && <a href={s.secao} className="inline-flex min-h-11 items-center text-[.9375rem] font-semibold text-parede/80 underline decoration-parede/30 decoration-1 underline-offset-[6px] hover:text-parede hover:decoration-parede">Saiba mais</a>}
        </div>
      </div>
    </motion.article>
  )
}

export default function Servicos({ servico }) {
  // quando a pessoa clica num atalho do hero, o cartão do serviço é destacado por alguns segundos
  const [destaque, setDestaque] = useState(null)
  const primeira = useRef(true)
  useEffect(() => {
    if (primeira.current) { primeira.current = false; return }
    setDestaque(servico)
    const t = setTimeout(() => setDestaque(null), 2600)
    return () => clearTimeout(t)
  }, [servico])

  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="em-cor relative bg-tinta pb-[clamp(72px,10vw,140px)] pt-[clamp(24px,4vw,56px)] text-parede">
      <div className="wrap">
        <div className="mb-12 grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,.8fr)]">
          <div>
            <Rotulo>Serviços</Rotulo>
            <Titulo id="servicos-titulo" className="titulo mt-6" texto={'O que você\nencontra na *Piolho*'} />
          </div>
          <p className="m-0 max-w-[30em] text-parede/60 lg:justify-self-end">
            Cada botão abre o WhatsApp com o assunto certo. Você não precisa explicar nada: é só enviar.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:[grid-auto-rows:minmax(300px,auto)]">
          {SERVICOS.map((s, i) => <Cartao key={s.id} s={s} i={i} destaque={destaque === s.id} />)}
        </div>
      </div>
    </section>
  )
}
