import React from "react";

import { cn } from "@/lib/utils";

// Carrossel infinito de fotos (21st.dev "image-auto-slider"), adaptado para a Piolho:
// - as fotos chegam por props (aqui, os trabalhos reais da casa), cada uma com seu alt;
// - o <style> original mexia em html/body (fonte e overflow) e trocava a fonte do
//   site inteiro: agora tudo fica com nomes próprios, só dentro do componente;
// - pausa com o mouse em cima ou com o foco do teclado numa foto;
// - com "reduzir movimento" ligado não anda: vira uma faixa que rola com o dedo;
// - a segunda cópia (que fecha o loop) fica escondida de leitores de tela e do Tab;
// - `onSelect` transforma cada foto num botão (aqui, abre o ampliador).

export interface ImageAutoSliderItem {
  src: string;
  alt: string;
}

export interface ImageAutoSliderProps {
  images: ImageAutoSliderItem[];
  /** Segundos para uma volta completa. @default 20 */
  duration?: number;
  /** Chamado com o índice da foto clicada. */
  onSelect?: (index: number) => void;
  /** Texto do botão para leitores de tela. @default "Ampliar foto" */
  selectLabel?: string;
  className?: string;
}

const CSS = `
@keyframes ias-scroll-right {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.ias-track {
  animation: ias-scroll-right var(--ias-duration, 20s) linear infinite;
}
.ias-mask:hover .ias-track,
.ias-mask:focus-within .ias-track {
  animation-play-state: paused;
}
.ias-mask {
  mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
  -webkit-mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
}
.ias-item {
  transition: transform 0.3s ease, filter 0.3s ease;
}
.ias-item:hover,
.ias-item:focus-visible {
  transform: scale(1.05);
  filter: brightness(1.1);
}
@media (prefers-reduced-motion: reduce) {
  .ias-track { animation: none; }
  .ias-mask {
    overflow-x: auto; mask: none; -webkit-mask: none;
    scrollbar-width: thin; scrollbar-color: rgb(244 238 231 / .25) transparent;
  }
  .ias-copy { display: none; }
}
`;

export const Component = ({
  images,
  duration = 20,
  onSelect,
  selectLabel = "Ampliar foto",
  className,
}: ImageAutoSliderProps) => {
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{CSS}</style>

      <div
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden bg-black",
          className,
        )}
      >
        {/* Scrolling images container */}
        <div className="relative z-10 flex w-full items-center justify-center py-8">
          <div className="ias-mask w-full">
            <ul
              className="ias-track m-0 flex w-max list-none gap-6 p-0"
              style={{ "--ias-duration": `${duration}s` } as React.CSSProperties}
            >
              {duplicatedImages.map((image, index) => {
                const original = index % images.length;
                const copy = index >= images.length;
                const foto = (
                  <img
                    src={image.src}
                    alt={onSelect ? "" : image.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                );
                return (
                  <li
                    key={index}
                    aria-hidden={copy || undefined}
                    className={cn(
                      "size-48 shrink-0 md:size-64 lg:size-80",
                      copy && "ias-copy",
                    )}
                  >
                    {onSelect ? (
                      <button
                        type="button"
                        tabIndex={copy ? -1 : undefined}
                        onClick={() => onSelect(original)}
                        aria-label={`${selectLabel}: ${image.alt}`}
                        className="ias-item block size-full cursor-zoom-in overflow-hidden rounded-xl shadow-2xl"
                      >
                        {foto}
                      </button>
                    ) : (
                      <div className="ias-item size-full overflow-hidden rounded-xl shadow-2xl">
                        {foto}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
