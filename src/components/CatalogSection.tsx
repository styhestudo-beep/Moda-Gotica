import { Heart, Search, SlidersHorizontal, Eye, Plus } from 'lucide-react';
import { type Product, type StoreTab } from '../data/products';
import { formatBRL } from '../utils/format';
import { ResilientImage } from './ResilientImage';

export type SortOption = 'featured' | 'price-asc' | 'price-desc';

interface CatalogSectionProps {
  products: Product[];
  activeTab: StoreTab;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: SortOption;
  onSortChange: (s: SortOption) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onResetFilters: () => void;
  justAddedId: string | null;
}

export function CatalogSection({
  products,
  activeTab,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  favorites,
  onToggleFavorite,
  onOpenProduct,
  onQuickAdd,
  onResetFilters,
  justAddedId,
}: CatalogSectionProps) {
  const sectionTitle =
    activeTab === 'Todas' ? 'Roupas Feitas para Ficar' : activeTab;

  return (
    <section id="colecao" className="mx-auto max-w-[1280px] px-6 lg:px-10 py-14 lg:py-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
        <div className="space-y-2">
          <p className="text-xs text-zinc-400 tracking-wide">
            Catálogo Permanente · <span className="tabular-nums">{products.length}</span>{' '}
            {products.length === 1 ? 'peça disponível' : 'peças disponíveis'}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F4F4F5] tracking-[-0.01em]">
            {sectionTitle}
          </h2>
        </div>

        <p className="text-sm text-zinc-400 max-w-md">
          Compre apenas o que você realmente vai usar por anos. Valores entre R$ 29 e R$ 159, grade do PP ao XGG e conserto gratuito na oficina.
        </p>
      </div>

      {/* Search, Favorites & Sort Toolbar */}
      <div className="py-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06]">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search
            className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            strokeWidth={1.75}
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar peça, tecido ou modelagem..."
            aria-label="Buscar peça, tecido ou modelagem"
            className="w-full bg-[#141418] border border-white/[0.08] focus:border-white/30 rounded-sm pl-9 pr-3 py-2 text-sm text-[#F4F4F5] placeholder:text-zinc-500 focus:outline-none min-h-[40px]"
          />
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <button
            type="button"
            onClick={onToggleFavoritesOnly}
            aria-pressed={showFavoritesOnly}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-sm border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE123C] ${
              showFavoritesOnly
                ? 'bg-[#9F1239] border-[#9F1239] text-white'
                : 'bg-[#141418] border-white/[0.08] text-zinc-300 hover:text-white'
            }`}
          >
            <Heart
              className="w-3.5 h-3.5"
              fill={showFavoritesOnly ? 'currentColor' : 'none'}
              strokeWidth={1.75}
            />
            <span>
              Salvos (<span className="tabular-nums">{favorites.length}</span>)
            </span>
          </button>

          <div className="relative flex items-center">
            <SlidersHorizontal
              className="w-3.5 h-3.5 text-zinc-500 absolute left-3 pointer-events-none"
              strokeWidth={1.75}
            />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Ordenar peças"
              className="bg-[#141418] border border-white/[0.08] rounded-sm pl-8 pr-7 py-2 text-xs font-medium text-zinc-200 focus:outline-none focus:border-white/30 cursor-pointer min-h-[40px]"
            >
              <option value="featured">Ordenar: Destaques</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="py-20 text-center border-b border-white/[0.06]">
          <p className="font-display text-2xl text-[#F4F4F5] mb-2">
            Nenhuma peça encontrada
          </p>
          <p className="text-sm text-zinc-400 mb-6">
            Ajuste os filtros ou limpe a busca para visualizar todo o catálogo.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="px-5 py-2.5 text-xs font-medium bg-[#F4F4F5] text-[#0B0B0D] rounded-sm hover:bg-white transition-colors cursor-pointer min-h-[40px]"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => {
            const isFav = favorites.includes(product.id);
            const wasJustAdded = justAddedId === product.id;

            return (
              <article
                key={product.id}
                className="group flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div>
                  {/* 3:4 Studio Product Backdrop */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-[#141418] border border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => onOpenProduct(product)}
                      className="block w-full h-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE123C]"
                      aria-label={`Ver detalhes de ${product.name}`}
                    >
                      <ResilientImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                        containerClassName="w-full h-full"
                      />
                    </button>

                    {/* Favorite Toggle */}
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(product.id)}
                      aria-label={
                        isFav
                          ? `Remover ${product.name} dos salvos`
                          : `Salvar ${product.name}`
                      }
                      aria-pressed={isFav}
                      className={`absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-sm border transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        isFav
                          ? 'bg-[#9F1239] border-[#9F1239] text-white'
                          : 'bg-[#0B0B0D]/80 border-white/10 text-zinc-300 hover:text-white hover:bg-[#0B0B0D]'
                      }`}
                    >
                      <Heart
                        className="w-4 h-4"
                        fill={isFav ? 'currentColor' : 'none'}
                        strokeWidth={1.75}
                      />
                    </button>
                  </div>

                  {/* Clean Unboxed Metadata */}
                  <div className="pt-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span>{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.collectionTag}</span>
                    </div>

                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-base font-semibold text-[#F4F4F5] leading-snug">
                        <button
                          type="button"
                          onClick={() => onOpenProduct(product)}
                          className="text-left hover:text-zinc-300 transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline"
                        >
                          {product.name}
                        </button>
                      </h3>
                      <span className="text-[15px] font-medium text-[#F4F4F5] tabular-nums shrink-0">
                        {formatBRL(product.price)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenProduct(product)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-zinc-200 bg-[#141418] hover:bg-[#1C1C22] border border-white/[0.08] rounded-sm transition-colors duration-150 whitespace-nowrap cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Eye className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>Ver Peça</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onQuickAdd(product)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium rounded-sm transition-colors duration-150 whitespace-nowrap cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      wasJustAdded
                        ? 'bg-[#F4F4F5] text-[#0B0B0D]'
                        : 'bg-[#9F1239] hover:bg-[#BE123C] text-white'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                    <span>{wasJustAdded ? 'Adicionado' : 'Adicionar'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
