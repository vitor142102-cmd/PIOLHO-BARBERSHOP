import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { NAV, CTA, LINKS } from '../data'
import { EASE } from './ui'

export function IconeInstagram({ className = 'size-[18px]' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}
export function IconeWhats({ className = 'size-[18px]' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.2a9.7 9.7 0 0 0-8.3 14.8L2.4 21.8l4.9-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.6a7.9 7.9 0 0 1-4-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A7.9 7.9 0 1 1 12 19.8Zm4.4-5.9c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2c0 1.2.9 2.3 1 2.5.1.2 1.7 2.6 4.2 3.7 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.6-.3Z" />
    </svg>
  )
}

export function Marca({ className = '', claro = true }) {
  return (
    <a href="#inicio" aria-label="Piolho Barber Shop, voltar ao início"
      className={`group inline-flex min-h-11 items-center no-underline ${claro ? 'text-parede' : 'text-tinta'} ${className}`}>
      {/* marca em texto: trocar pelo arquivo oficial do logotipo quando a Piolho enviar */}
      <span className="leading-none">
        <span className="block font-serif text-[1.7rem] italic tracking-[-.02em] [font-variation-settings:'opsz'_144]">
          Piolho<span className="not-italic text-coral transition-colors group-hover:text-vermelho">.</span>
        </span>
        <span className={`mt-0.5 block text-[.58rem] font-semibold uppercase tracking-[.42em] ${claro ? 'text-parede/55' : 'text-cinza'}`}>barber shop</span>
      </span>
    </a>
  )
}

export default function Header({ ativa, menuAberto, setMenuAberto }) {
  const { scrollY } = useScroll()
  const [rolou, setRolou] = useState(false)
  const [escondido, setEscondido] = useState(false)
  const ultimo = useRef(0)
  useMotionValueEvent(scrollY, 'change', (v) => {
    setRolou(v > 40)
    setEscondido(v > ultimo.current && v > 600)
    ultimo.current = v
  })
  const botaoRef = useRef(null)
  const primeiroLink = useRef(null)

  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : ''
    if (menuAberto) setTimeout(() => primeiroLink.current?.focus(), 60)
    const esc = (e) => { if (e.key === 'Escape' && menuAberto) { setMenuAberto(false); botaoRef.current?.focus() } }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [menuAberto, setMenuAberto])
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const f = (m) => { if (m.matches) setMenuAberto(false) }
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [setMenuAberto])

  return (
    <motion.header className="em-cor fixed inset-x-0 top-0 z-50 h-[var(--topo-h)] text-parede"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: escondido && !menuAberto ? '-110%' : '0%', opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}>
      <a href="#conteudo" className="fixed left-4 top-3 z-[100] -translate-y-[200%] rounded-full bg-parede px-5 py-3 font-semibold text-tinta transition-transform focus:translate-y-0">
        Pular para o conteúdo
      </a>
      {/* vidro escuro que aparece quando a página rola */}
      <div className={`absolute inset-0 transition-all duration-500 ${rolou || menuAberto ? 'bg-tinta/80 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,.06)]' : 'bg-transparent'}`}
        style={menuAberto ? { backdropFilter: 'none' } : undefined} />
      <div className="wrap relative grid h-full grid-cols-[auto_1fr_auto] items-center gap-6">
        <Marca className="relative z-20" />

        <nav aria-label="Seções da página" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-[clamp(14px,2vw,32px)]">
            {NAV.map((item) => {
              const atual = ativa === item.id
              return (
                <li key={item.id}>
                  <a href={`#${item.id}`} aria-current={atual ? 'true' : undefined}
                    className={`group relative inline-flex min-h-11 items-center text-[.72rem] font-semibold uppercase tracking-[.24em] no-underline transition-colors ${atual ? 'text-parede' : 'text-parede/70 hover:text-parede'}`}>
                    {item.rotulo}
                    {atual ? (
                      <motion.span layoutId="nav-traco" aria-hidden="true" className="absolute inset-x-0 bottom-2 h-px bg-coral" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                    ) : (
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-2 h-px origin-left scale-x-0 bg-parede/50 transition-transform duration-300 group-hover:scale-x-100" />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="relative z-20 flex items-center gap-2 justify-self-end">
          <motion.a href={LINKS.instagram} target="_blank" rel="noopener" aria-label="Instagram da Piolho Barber Shop" whileHover={{ rotate: -8 }} whileTap={{ scale: 0.92 }}
            className="grid size-11 place-items-center rounded-full border border-parede/25 text-parede transition-colors hover:border-parede/60 hover:bg-parede/10">
            <IconeInstagram />
          </motion.a>
          <motion.a href={CTA.agendar.href} target="_blank" rel="noopener" whileTap={{ scale: 0.96 }}
            className="hidden min-h-11 items-center gap-2 rounded-full bg-parede px-5 text-[.9rem] font-semibold text-tinta no-underline shadow-[0_8px_24px_-10px_rgba(0,0,0,.6)] transition-colors hover:bg-white sm:inline-flex">
            <IconeWhats className="size-[17px] text-[#1f9d55]" /> Agendar
          </motion.a>
          <button ref={botaoRef} type="button" aria-expanded={menuAberto} aria-controls="menu-movel" onClick={() => setMenuAberto(!menuAberto)}
            className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-parede/25 px-4 font-semibold text-parede lg:hidden">
            {menuAberto ? 'Fechar' : 'Menu'}
            <span aria-hidden="true" className="relative block h-3 w-4">
              <motion.span className="absolute left-0 top-0.5 block h-[1.5px] w-4 bg-current" animate={menuAberto ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} />
              <motion.span className="absolute left-0 top-2 block h-[1.5px] w-4 bg-current" animate={menuAberto ? { rotate: -45, y: -2 } : { rotate: 0, y: 0 }} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuAberto && (
          <motion.nav id="menu-movel" aria-label="Seções da página"
            className="fixed inset-0 z-10 flex flex-col justify-between overflow-y-auto bg-[radial-gradient(120%_80%_at_0%_100%,#5b1119_0%,#140e0f_60%)] px-[var(--gutter)] pb-8 pt-[calc(var(--topo-h)+24px)] text-parede lg:hidden"
            initial={{ clipPath: 'circle(0% at 90% 34px)' }} animate={{ clipPath: 'circle(150% at 90% 34px)' }}
            exit={{ clipPath: 'circle(0% at 90% 34px)', transition: { duration: 0.35, ease: EASE } }}
            transition={{ duration: 0.65, ease: EASE }}>
            <ul className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.li key={item.id} className="border-b border-parede/10"
                  initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.05, duration: 0.45, ease: EASE }}>
                  <a ref={i === 0 ? primeiroLink : undefined} href={`#${item.id}`} onClick={() => setMenuAberto(false)}
                    aria-current={ativa === item.id ? 'true' : undefined}
                    className={`letreiro flex min-h-16 items-center justify-between text-[clamp(2.1rem,9vw,3rem)] no-underline ${ativa === item.id ? 'text-coral' : ''}`}>
                    {item.rotulo}
                    <span aria-hidden="true" className="font-sans text-xs tracking-[.2em] text-parede/40">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a href={CTA.agendar.href} target="_blank" rel="noopener" className="btn btn-claro mt-10 w-full"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
              <IconeWhats className="size-[18px] text-[#1f9d55]" /> {CTA.agendar.txt}
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
