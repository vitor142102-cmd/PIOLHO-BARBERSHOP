import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { EASE } from './ui'

const slide = {
  entra: (d) => ({ x: d === 0 ? 0 : d > 0 ? 90 : -90, opacity: 0, scale: d === 0 ? 0.94 : 1 }),
  centro: { x: 0, opacity: 1, scale: 1 },
  sai: (d) => ({ x: d > 0 ? -90 : 90, opacity: 0 }),
}

/* Fotos ampliadas: setas, teclado, arrastar/deslizar e miniaturas. Foco preso dentro e devolvido ao fechar. */
export default function Lightbox({ fotos, indice, setIndice, fechar }) {
  const aberto = fotos.length > 0
  const reduz = useReducedMotion()
  const [dir, setDir] = useState(0)
  const caixa = useRef(null)
  const fecharRef = useRef(null)
  const origem = useRef(null)
  const vai = (d) => { setDir(d); setIndice((i) => (i + d + fotos.length) % fotos.length) }

  useEffect(() => {
    if (!aberto) return
    origem.current = document.activeElement
    document.body.style.overflow = 'hidden'
    setDir(0)
    setTimeout(() => fecharRef.current?.focus(), 40)
    const tecla = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); fechar() }
      else if (e.key === 'ArrowRight') { e.preventDefault(); vai(1) }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); vai(-1) }
      else if (e.key === 'Tab' && caixa.current) {
        const f = caixa.current.querySelectorAll('button')
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus() }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus() }
      }
    }
    document.addEventListener('keydown', tecla)
    return () => {
      document.removeEventListener('keydown', tecla)
      document.body.style.overflow = ''
      origem.current?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberto])

  const foto = fotos[indice]
  const btn = 'inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-white/10 px-4 font-bold text-parede transition hover:bg-white/20 active:scale-95'

  return (
    <AnimatePresence>
      {aberto && foto && (
        <motion.div ref={caixa} role="dialog" aria-modal="true" aria-label="Fotos ampliadas"
          className="em-cor fixed inset-0 z-[80] grid grid-rows-[minmax(0,1fr)_auto] bg-tinta/96 text-parede backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <div className="relative grid min-h-0 place-items-center overflow-hidden px-[clamp(12px,3vw,40px)] pt-[clamp(12px,3vw,40px)]"
            onClick={(e) => { if (e.target === e.currentTarget) fechar() }}>
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.img key={foto.src} src={foto.src} alt={foto.alt}
                custom={dir} variants={slide} initial="entra" animate="centro" exit="sai"
                transition={{ duration: reduz ? 0 : 0.4, ease: EASE }}
                drag={reduz ? false : 'x'} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.5}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70 || info.velocity.x < -500) vai(1)
                  else if (info.offset.x > 70 || info.velocity.x > 500) vai(-1)
                }}
                draggable={false}
                className="max-h-full max-w-full cursor-grab select-none rounded-2xl object-contain active:cursor-grabbing" />
            </AnimatePresence>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 px-[clamp(12px,3vw,40px)] pb-[max(16px,env(safe-area-inset-bottom))] pt-4">
            <p className="m-0 text-xl font-extrabold [font-stretch:115%]" aria-live="polite">{indice + 1} <span className="text-parede/50">/ {fotos.length}</span></p>
            <div className="order-3 flex w-full gap-1.5 overflow-x-auto pb-1 md:order-none md:w-auto md:max-w-[50vw]">
              {fotos.map((f, i) => (
                <button key={f.src} type="button" onClick={() => { setDir(i > indice ? 1 : -1); setIndice(i) }}
                  aria-label={`Ver foto ${i + 1}`} aria-current={i === indice ? 'true' : undefined}
                  className={`size-11 shrink-0 overflow-hidden rounded-lg transition ${i === indice ? 'ring-2 ring-coral' : 'opacity-45 hover:opacity-100'}`}>
                  <img src={f.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => vai(-1)} aria-label="Foto anterior" className={btn}>←</button>
              <button type="button" onClick={() => vai(1)} aria-label="Próxima foto" className={btn}>→</button>
              <button ref={fecharRef} type="button" onClick={fechar} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brilho px-5 font-bold text-tinta transition hover:brightness-95 active:scale-95">
                Fechar <span aria-hidden="true">✕</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
