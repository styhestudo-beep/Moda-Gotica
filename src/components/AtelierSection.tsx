import { ATELIER_IMAGE } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface AtelierSectionProps {
  onOpenDesfiles?: () => void;
  onExploreCatalog?: () => void;
}

export function AtelierSection({
  onOpenDesfiles,
  onExploreCatalog,
}: AtelierSectionProps) {
  return (
    <section
      id="sobre-nos"
      className="border-t border-white/[0.08] bg-[#0F0F12]"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Editorial Craft Photo */}
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-sm border border-white/[0.08] bg-[#141418]">
              <ResilientImage
                src={ATELIER_IMAGE}
                alt="Bancada da oficina com tecidos reaproveitados, tesoura de costura e ferragens duráveis"
                className="w-full h-full object-cover object-center"
                containerClassName="w-full h-full"
              />
            </div>
          </div>

          {/* Sobre Nós & Manifesto */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <p className="text-xs text-zinc-400 tracking-wide">
                Sobre Nós · Acessibilidade &amp; Anticonsumismo
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F4F5] leading-[1.12] text-balance">
                Vestuário gótico contra o descarte e a especulação de preço
              </h2>
              <p className="text-[15px] text-zinc-400 leading-[1.7]">
                Fundada em São Paulo por costureiras e frequentadores da cena subterrânea, a Umbra Atelier nasceu para devolver o vestuário gótico às suas raízes: DIY, brechó, reaproveitamento e recusa ao consumismo vazio. Trabalhamos com tecidos de ponta de estoque e garimpo curado, mantendo preços entre R$ 35 e R$ 159 e oferecendo conserto gratuito vitalício na nossa oficina.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
              <div>
                <div className="font-display text-2xl font-semibold text-[#F4F4F5] tabular-nums">
                  R$ 35 – 159
                </div>
                <div className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Sem margem de grife: preço honesto para tornar o estilo acessível.
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold text-[#F4F4F5]">
                  Reparo Grátis
                </div>
                <div className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Rasgou, descosturou ou soltou zíper? Consertamos sem custo.
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold text-[#F4F4F5]">
                  PP ao XGG
                </div>
                <div className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Peças ajustáveis pensadas para acompanhar o corpo real.
                </div>
              </div>
            </div>

            {(onExploreCatalog || onOpenDesfiles) && (
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {onExploreCatalog && (
                  <button
                    type="button"
                    onClick={onExploreCatalog}
                    className="px-5 py-3 text-xs font-medium bg-[#9F1239] hover:bg-[#BE123C] text-white rounded-sm transition-colors cursor-pointer min-h-[42px]"
                  >
                    Ver Peças do Catálogo
                  </button>
                )}
                {onOpenDesfiles && (
                  <button
                    type="button"
                    onClick={onOpenDesfiles}
                    className="px-5 py-3 text-xs font-medium bg-[#18181D] hover:bg-[#222229] text-zinc-200 border border-white/10 rounded-sm transition-colors cursor-pointer min-h-[42px]"
                  >
                    Ver Desfiles Realizados
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
