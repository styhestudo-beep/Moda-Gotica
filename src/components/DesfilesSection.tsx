import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { DESFILES, PRODUCTS, type Product } from '../data/products';
import { formatBRL } from '../utils/format';
import { ResilientImage } from './ResilientImage';

interface DesfilesSectionProps {
  onOpenProduct: (product: Product) => void;
  onExploreCatalog: () => void;
}

export function DesfilesSection({
  onOpenProduct,
  onExploreCatalog,
}: DesfilesSectionProps) {
  return (
    <section
      id="desfiles"
      className="mx-auto max-w-[1280px] px-6 lg:px-10 py-14 lg:py-20"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
        <div className="space-y-2">
          <p className="text-xs text-zinc-400 tracking-wide">
            Arquivo Comunitário · <span className="tabular-nums">{DESFILES.length}</span> desfiles realizados
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F4F5] tracking-[-0.01em]">
            Desfiles Já Realizados
          </h2>
        </div>

        <p className="text-sm text-zinc-400 max-w-md">
          Apresentações abertas e gratuitas em espaços culturais de São Paulo, sem patrocínio corporativo e com roupas feitas para a vida real.
        </p>
      </div>

      {/* Desfiles List */}
      <div className="divide-y divide-white/[0.08]">
        {DESFILES.map((desfile) => {
          const runwayProducts = desfile.featuredProductIds
            .map((id) => PRODUCTS.find((p) => p.id === id))
            .filter((p): p is Product => Boolean(p));

          return (
            <article
              key={desfile.id}
              className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              {/* 16:9 Documentary Runway Photo */}
              <div className="lg:col-span-7">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-sm border border-white/[0.08] bg-[#141418]">
                  <ResilientImage
                    src={desfile.image}
                    alt={desfile.imageAlt}
                    className="w-full h-full object-cover object-center"
                    containerClassName="w-full h-full"
                  />
                </div>
              </div>

              {/* Runway Info & Linked Pieces */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                    <span className="text-zinc-200 font-medium">{desfile.edition}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{desfile.date}</span>
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F4F4F5] leading-tight">
                    {desfile.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{desfile.location}</span>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {desfile.summary}
                </p>

                <ul className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-white/[0.06]">
                  {desfile.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-zinc-500">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Pieces featured in this runway */}
                {runwayProducts.length > 0 && (
                  <div className="pt-4 border-t border-white/[0.08] space-y-3">
                    <div className="text-xs font-medium text-zinc-300">
                      Peças da passarela disponíveis na oficina:
                    </div>
                    <div className="flex flex-col gap-2">
                      {runwayProducts.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => onOpenProduct(product)}
                          className="flex items-center justify-between gap-3 px-3.5 py-2.5 bg-[#141418] hover:bg-[#1B1B21] border border-white/[0.08] rounded-sm text-left transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-medium text-[#F4F4F5] truncate group-hover:text-white">
                              {product.name}
                            </div>
                            <div className="text-[11px] text-zinc-400 tabular-nums">
                              {formatBRL(product.price)} · {product.collectionTag}
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="pt-8 border-t border-white/[0.08] flex justify-center">
        <button
          type="button"
          onClick={onExploreCatalog}
          className="px-6 py-3 text-xs font-medium bg-[#9F1239] hover:bg-[#BE123C] text-white rounded-sm transition-colors cursor-pointer min-h-[44px]"
        >
          Ver Todas as Peças do Catálogo
        </button>
      </div>
    </section>
  );
}
