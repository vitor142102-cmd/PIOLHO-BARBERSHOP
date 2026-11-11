import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { HORARIOS } from '../data'

export const EASE = [0.2, 0.7, 0.2, 1]
export const MOLA = { type: 'spring', stiffness: 380, damping: 32 }

/* "*palavra*" vira itálico (a palavra-chave do título). */
export function comItalico(txt) {
  return txt.split(/(\*[^*]+\*)/g).map((p, i) =>
    p.startsWith('*') && p.endsWith('*') ? <em key={i}>{p.slice(1, -1)}</em> : p)
}

/* Título que sobe linha por linha de trás de uma máscara ao entrar na tela. "\n" quebra a linha. */
export function Titulo({ texto, as = 'h2', className = 'titulo', id, atraso = 0 }) {
  const Tag = as
  return (
    <Tag className={className} id={id}>
      <motion.span className="block" initial="o" whileInView="v" viewport={{ once: true, amount: 0.6 }}
        transition={{ staggerChildren: 0.08, delayChildren: atraso }}>
        {texto.split('\n').map((linha, i) => (
          <span key={i} className="-mb-[.08em] -mt-[.16em] block overflow-hidden pb-[.08em] pt-[.16em]">
            <motion.span className="block" variants={{ o: { y: '110%' }, v: { y: '0%' } }} transition={{ duration: 0.85, ease: EASE }}>
              {comItalico(linha)}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

/* Bloco que sobe e aparece uma vez ao entrar na tela. */
export function Surge({ as = 'div', className = '', atraso = 0, children, ...props }) {
  const Comp = motion[as]
  return (
    <Comp className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: EASE, delay: atraso }} {...props}>
      {children}
    </Comp>
  )
}

/* Qual seção ocupa o meio da tela; também diz se o hero e o rodapé estão visíveis. */
export function useSecaoAtiva() {
  const [ativa, setAtiva] = useState(null)
  const [heroVisivel, setHero] = useState(true)
  const [fimVisivel, setFim] = useState(false)
  useEffect(() => {
    const secoes = Array.from(document.querySelectorAll('main > section[id]'))
    const meio = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setAtiva(e.target.id === 'inicio' ? null : e.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    secoes.forEach((s) => meio.observe(s))
    const oh = new IntersectionObserver(([e]) => setHero(e.isIntersecting), { threshold: 0.15 })
    const of = new IntersectionObserver(([e]) => setFim(e.isIntersecting))
    const hero = document.getElementById('inicio')
    const fim = document.getElementById('rodape')
    if (hero) oh.observe(hero)
    if (fim) of.observe(fim)
    return () => { meio.disconnect(); oh.disconnect(); of.disconnect() }
  }, [])
  return { ativa, heroVisivel, fimVisivel }
}

/* Horário de hoje, a partir dos horários publicados no minisite. */
export function useHoje() {
  const [dia, setDia] = useState(() => new Date().getDay())
  useEffect(() => {
    const t = setInterval(() => setDia(new Date().getDay()), 60_000)
    return () => clearInterval(t)
  }, [])
  const h = HORARIOS.find((x) => x.dias.includes(dia))
  return { dia, horario: h }
}

/* Link do App Barber: abre a loja certa para o aparelho, como o minisite oficial faz. */
export function useLinkApp(ios, android) {
  const [href, setHref] = useState(android)
  useEffect(() => { if (/iPad|iPhone|iPod/.test(navigator.userAgent)) setHref(ios) }, [ios])
  return href
}

export function Check({ className = 'size-4' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  )
}

/* Rótulo de seção no estilo do hero: traço coral + texto espaçado. */
export function Rotulo({ children, className = '' }) {
  return (
    <p className={`etiqueta !flex items-center gap-3 text-coral ${className}`}>
      <span aria-hidden="true" className="h-px w-8 bg-coral/70" />{children}
    </p>
  )
}

export function Seta({ className = '' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={`inline-block size-[1em] transition-transform duration-300 ${className}`}>
      <path d="M3 10h13M11 4.5 16.5 10 11 15.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
