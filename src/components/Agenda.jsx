import { motion } from 'motion/react'
import { CTA, LINKS, HORARIOS } from '../data'
import { Titulo, Surge, Rotulo, Check, useHoje, Seta, EASE } from './ui'
import { IconeWhats } from './Header'

/* Agendamento: a decisão mais importante da página, num cartão só. */
export default function Agenda() {
  const { dia, horario } = useHoje()
  const facilidades = [
    'A mensagem já vai escrita: é só tocar em enviar',
    'Atendimento de segunda a sábado',
    'Prefere escolher sozinho? Tem o App Barber',
  ]
  return (
    <section id="agenda" aria-labelledby="agenda-titulo" className="em-cor relative isolate overflow-hidden bg-tinta py-[clamp(72px,10vw,140px)] text-parede">
      {/* o salão de fundo, bem escuro */}
      <img src="assets/img/salao-panoramica.jpg" alt="" aria-hidden="true" loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover opacity-[.22] blur-[2px]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_85%_50%,rgba(91,17,25,.55)_0%,transparent_70%),linear-gradient(90deg,#140e0f_10%,rgba(20,14,15,.82)_55%,rgba(20,14,15,.6)_100%)]" />

      <div className="wrap grid items-center gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,.95fr)]">
        <div>
          <Rotulo>Agendamento</Rotulo>
          <Titulo id="agenda-titulo" className="titulo mt-6" texto={'Seu horário em\n*uma mensagem*.'} />
          <Surge as="p" className="mt-7 max-w-[30em] text-[1.0625rem] leading-relaxed text-parede/70">
            Toque no botão e a conversa abre no WhatsApp da Piolho com o pedido de horário pronto. A equipe combina o dia e a hora com você por lá.
          </Surge>
          <ul className="mt-8 grid gap-3">
            {facilidades.map((f, i) => (
              <Surge as="li" key={f} atraso={0.08 * i} className="flex items-center gap-3 text-parede/85">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-coral/40 text-coral"><Check className="size-3.5" /></span>
                {f}
              </Surge>
            ))}
          </ul>
        </div>

        {/* cartão de conversão */}
        <Surge atraso={0.1}>
          <div className="relative rounded-[30px] border border-parede/10 bg-parede/[.05] p-[clamp(20px,3vw,36px)] shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)] backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="etiqueta text-parede/50">Agendar agora</p>
              {horario && (
                <p className="m-0 flex items-center gap-2 rounded-full bg-parede/[.07] px-3 py-1.5 text-[.8125rem]">
                  <span className="size-1.5 rounded-full bg-coral" aria-hidden="true" />
                  Hoje: <strong className="font-semibold">{horario.hora}</strong>
                </p>
              )}
            </div>

            <motion.a href={CTA.agendar.href} target="_blank" rel="noopener" initial="r" whileHover="h" whileTap={{ scale: 0.985 }}
              className="group relative mt-6 flex items-center justify-between gap-4 overflow-hidden rounded-[22px] bg-vermelho px-5 py-5 text-white no-underline shadow-[0_20px_40px_-18px_rgba(200,38,26,.9)] sm:px-6">
              {/* reflexo que atravessa o botão no hover */}
              <motion.span aria-hidden="true" className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/15"
                variants={{ r: { x: '0%' }, h: { x: '480%' } }} transition={{ duration: 0.9, ease: EASE }} />
              <span className="relative flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/15"><IconeWhats className="size-6" /></span>
                <span>
                  <span className="block text-[1.125rem] font-semibold">Agendar pelo WhatsApp</span>
                  <span className="block text-[.875rem] text-white/75">(47) 99771-8257 · mensagem pronta</span>
                </span>
              </span>
              <motion.span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-white text-vermelho"
                variants={{ r: { x: 0 }, h: { x: 4 } }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                <Seta className="size-5" />
              </motion.span>
            </motion.a>

            <div className="my-6 flex items-center gap-4 text-[.8125rem] text-parede/40">
              <span className="h-px flex-1 bg-parede/10" />ou escolha no App Barber<span className="h-px flex-1 bg-parede/10" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[['iPhone', LINKS.appIos], ['Android', LINKS.appAndroid]].map(([t, h]) => (
                <motion.a key={t} href={h} target="_blank" rel="noopener" whileTap={{ scale: 0.97 }}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-parede/15 text-[.9375rem] font-semibold text-parede no-underline transition-colors hover:border-parede/40 hover:bg-parede/[.06]">
                  {t}
                </motion.a>
              ))}
            </div>

            <dl className="mt-7 grid gap-1 border-t border-parede/10 pt-5 text-[.9375rem]">
              {HORARIOS.map((h) => {
                const hoje = h.dias.includes(dia)
                return (
                  <div key={h.rotulo} className={`flex justify-between gap-4 rounded-lg px-2 py-1.5 ${hoje ? 'bg-parede/[.06] text-parede' : 'text-parede/55'}`}>
                    <dt>{h.rotulo}{hoje && <span className="ml-2 text-[.75rem] font-semibold uppercase tracking-wider text-coral">hoje</span>}</dt>
                    <dd className="m-0 font-semibold">{h.hora}</dd>
                  </div>
                )
              })}
            </dl>

            <a href={LINKS.maps} target="_blank" rel="noopener"
              className="mt-4 flex min-h-11 items-center gap-2 text-[.8125rem] text-parede/55 no-underline transition-colors hover:text-parede">
              <span aria-hidden="true" className="tracking-[.1em] text-coral">★★★★★</span> Nota 4,9 no Google em 254 avaliações <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Surge>
      </div>
    </section>
  )
}
