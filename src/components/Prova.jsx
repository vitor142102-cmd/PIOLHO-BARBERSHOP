import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate, useReducedMotion } from 'motion/react'
import { LINKS } from '../data'
import { EASE } from './ui'

/* Número que conta até o valor quando entra na tela. */
function Conta({ valor, casas = 0, sufixo = '' }) {
  const ref = useRef(null)
  const visto = useInView(ref, { once: true, amount: 0.8 })
  const reduz = useReducedMotion()
  const fmt = (v) => v.toFixed(casas).replace('.', ',') + sufixo
  const [txt, setTxt] = useState(fmt(reduz ? valor : 0))
  useEffect(() => {
    if (!visto) return
    if (reduz) { setTxt(fmt(valor)); return }
    const c = animate(0, valor, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setTxt(fmt(v)) })
    return () => c.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visto, reduz])
  return <span ref={ref} aria-label={fmt(valor)}><span aria-hidden="true">{txt}</span></span>
}

/* Faixa de prova social logo depois do hero: só números e fatos verificáveis. */
export default function Prova() {
  const itens = [
    { num: <Conta valor={4.9} casas={1} />, sub: 'no Google', det: '254 avaliações', href: LINKS.maps, estrelas: true },
    { num: <Conta valor={15} sufixo=" mil" />, sub: 'seguidores', det: 'no Instagram', href: LINKS.instagram },
    { num: 'Educador', sub: 'Garden for Men', det: 'o Piolho é técnico educador da marca' },
    { num: 'Seg a sáb', sub: 'Vila Baependi', det: 'Jaraguá do Sul · SC', href: LINKS.maps },
  ]
  return (
    <section aria-label="A Piolho em números" className="em-cor relative overflow-hidden border-y border-parede/[.07] bg-carvao text-parede">
      <div className="wrap grid grid-cols-2 lg:grid-cols-4">
        {itens.map((it, i) => {
          const Comp = it.href ? motion.a : motion.div
          return (
            <Comp key={i} {...(it.href ? { href: it.href, target: '_blank', rel: 'noopener' } : {})}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className={`group relative flex flex-col justify-center gap-1 py-7 pr-4 no-underline ${i % 2 ? 'pl-5 lg:pl-8' : 'lg:pl-8'} ${i > 0 ? 'lg:border-l lg:border-parede/[.08]' : 'lg:pl-0'} ${i > 1 ? 'border-t border-parede/[.08] lg:border-t-0' : ''} ${i % 2 ? 'border-l border-parede/[.08]' : ''}`}>
              <span className="flex items-baseline gap-2">
                <span className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[-.02em] [font-variation-settings:'opsz'_144]">{it.num}</span>
                <span className="text-[.8125rem] font-semibold text-coral">{it.sub}</span>
              </span>
              <span className="flex items-center gap-2 text-[.8125rem] text-parede/55">
                {it.estrelas && (
                  <span aria-hidden="true" className="flex gap-0.5 text-coral">
                    {[0, 1, 2, 3, 4].map((k) => <svg key={k} viewBox="0 0 20 20" className="size-3" fill="currentColor"><path d="m10 1.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8Z" /></svg>)}
                  </span>
                )}
                {it.det}
                {it.href && <span aria-hidden="true" className="opacity-0 transition-opacity group-hover:opacity-100">↗</span>}
              </span>
            </Comp>
          )
        })}
      </div>
      <p className="wrap pb-3 text-right text-[.6875rem] text-parede/30">Números consultados em novembro de 2026.</p>
    </section>
  )
}
