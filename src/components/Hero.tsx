import { ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import { HERO_IMAGE } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onExploreCatalog: () => void;
  onExploreAtelier: () => void;
}

export function Hero({ onExploreCatalog, onExploreAtelier }: HeroProps) {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <section id="topo" className="border-b border-white/[0.08]">
      {/* Slim, non-sticky dismissible announcement bar <= 40px */}
      {bannerVisible && (
        <div className="bg-[#131317] border-b border-white/[0.06] px-6 py-2">
          <div className="mx-auto max-w-[1280px] flex items-center justify-between gap-4 text-xs text-zinc-300">
            <span className="truncate">
              Oficina de upcycling e garimpo · Peças de R$ 35 a R$ 159 · Conserto gratuito vitalício
            </span>
            <button
              type="button"
              onClick={() => setBannerVisible(false)}
              aria-label="Fechar aviso"
              className="text-zinc-400 hover:text-white p-1 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-sm"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Editorial 2-Column Storefront Hero */}
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Copy Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 py-2">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs text-zinc-400 tracking-wide">
                <span>Lema: Acessibilidade &amp; Anticonsumismo</span>
                <span aria-hidden="true">·</span>
                <span>PP ao XGG</span>
              </div>

              <h1 className="font-display text-[clamp(2.5rem,4.2vw,4rem)] font-semibold leading-[1.06] tracking-[-0.015em] text-[#F4F4F5] text-balance">
                Gótico é permanecer, não pagar caro por rótulo
              </h1>

              <p className="text-[15px] sm:text-base text-zinc-400 leading-[1.65] max-w-[46ch]">
                Contra o fast fashion descartável e preços elitistas. Produzimos com tecidos reaproveitados, garimpo e sobras industriais — peças feitas para durar anos, com custo honesto.
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <button
                  type="button"
                  onClick={onExploreCatalog}
                  className="inline-flex items-center gap-2.5 bg-[#9F1239] hover:bg-[#BE123C] text-white text-sm font-medium px-6 py-3.5 rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[44px]"
                >
                  <span>Ver Peças Justas</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </button>

                <button
                  type="button"
                  onClick={onExploreAtelier}
                  className="text-sm font-medium text-zinc-300 hover:text-white underline underline-offset-4 decoration-white/25 hover:decoration-white transition-colors duration-150 whitespace-nowrap shrink-0 py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE123C] rounded-sm"
                >
                  Manifesto &amp; Reparo
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 text-xs text-zinc-400">
              <div>
                <div className="text-[#F4F4F5] font-medium tabular-nums">R$ 35 – R$ 159</div>
                <div className="mt-0.5 text-zinc-500">Preço justo real</div>
              </div>
              <div>
                <div className="text-[#F4F4F5] font-medium">Reparo Grátis</div>
                <div className="mt-0.5 text-zinc-500">Conserto vitalício</div>
              </div>
              <div>
                <div className="text-[#F4F4F5] font-medium">PP ao XGG · 34–43</div>
                <div className="mt-0.5 text-zinc-500">Grade inclusiva</div>
              </div>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-sm border border-white/[0.08] bg-[#141418] min-h-[300px] sm:min-h-[420px]">
            <ResilientImage
              src={HERO_IMAGE}
              alt="Modelo vestindo sobretudo gótico longo em lã preta com ferragens prateadas em colunata brutalista"
              loading="eager"
              className="w-full h-full object-cover object-center lg:h-full"
              containerClassName="w-full h-full min-h-[300px] sm:min-h-[420px]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/75 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-xs text-zinc-200">
              <span>Look 01 · Sobretudo Corvo em Lã Melton</span>
              <span className="text-zinc-400 hidden sm:inline">Arquivo Outono/Inverno</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
