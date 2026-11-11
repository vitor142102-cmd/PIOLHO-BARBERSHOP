import { useCallback } from 'react'
import { FOTOS, LINKS } from '../data'
import { Titulo, Surge, Rotulo } from './ui'
import { Component as ImageAutoSlider } from '@/components/ui/image-auto-slider'

/* Fotos de corte e cor que passam no carrossel. */
const CORTES_IDS = [
  'crazy-color-perfil', 'crazy-color-sorriso', 'crazy-color-lateral', 'crazy-color-olhar',
  'crazy-color-tres-quartos', 'crazy-color-palco', 'palco-contraluz', 'crazy-color-pb',
]
const nome = (f) => f.src.split('/').pop().replace('.jpg', '')
const CORTES = FOTOS.filter((f) => CORTES_IDS.includes(nome(f)))
/* O resto: o salão, o palco e o Piolho. */
const CASA = FOTOS.filter((f) => !CORTES_IDS.includes(nome(f)))

export default function Fotos({ abrir }) {
  const abrirCorte = useCallback((i) => abrir(CORTES, i), [abrir])

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

        {/* carrossel dos cortes */}
        <div className="mt-16">
          <Rotulo>Cortes e cor</Rotulo>
          <p className="mt-3 mb-0 max-w-[32em] text-parede/65">
            Trabalhos de corte e cor feitos na Piolho. Toque numa foto para ampliar.
          </p>
        </div>
        <Surge className="mt-4">
          <ImageAutoSlider
            images={CORTES}
            duration={40}
            onSelect={abrirCorte}
            selectLabel="Ampliar foto"
            className="bg-transparent"
          />
        </Surge>
        <div className="mt-2 flex flex-wrap items-center justify-end gap-3">
          <a href={LINKS.instagram} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center font-semibold underline decoration-coral decoration-2 underline-offset-4 hover:text-coral">
            Mais trabalhos no Instagram
          </a>
        </div>

        {/* a casa */}
        <div className="mt-20">
          <Rotulo>Por dentro da casa</Rotulo>
          <ul className="mt-6 grid grid-cols-2 gap-3 [grid-auto-rows:clamp(120px,40vw,220px)] md:grid-cols-4 md:[grid-auto-rows:clamp(140px,18vw,240px)]">
            {CASA.map((f, i) => (
              <li key={f.src} className={f.larga ? 'col-span-2' : ''}>
                <button type="button" onClick={() => abrir(CASA, i)} aria-label={`Ampliar foto: ${f.alt}`}
                  className="foto group relative block h-full w-full cursor-zoom-in" style={{ borderRadius: 18 }}>
                  <img src={f.src} alt="" loading="lazy" className="group-hover:scale-[1.04] group-focus-visible:scale-[1.04]" />
                  <span aria-hidden="true" className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-parede text-xl font-bold text-tinta opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:size-8 [@media(hover:none)]:opacity-100">+</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

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
