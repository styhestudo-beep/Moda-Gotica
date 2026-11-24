import { useEffect, useState } from 'react';
import { X, Check, Ruler, Heart } from 'lucide-react';
import type { Product } from '../data/products';
import { formatBRL } from '../utils/format';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[Math.min(1, product.sizes.length - 1)] || product.sizes[0]);
      setShowSizeGuide(false);
      setAddedFeedback(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const isFootwear = product.id === 'bota-monolito-couro';
  const isOneSize = product.sizes.length === 1;
  const pixPrice = product.price * 0.95;

  const handleAdd = () => {
    const sizeToUse = selectedSize || product.sizes[0];
    onAddToCart(product, sizeToUse);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-[#111115] border border-white/[0.1] rounded-sm overflow-hidden shadow-2xl my-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes da peça"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-[#0B0B0D]/80 hover:bg-[#0B0B0D] text-zinc-300 hover:text-white border border-white/10 rounded-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="w-5 h-5" strokeWidth={1.75} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Left 3:4 Product Image */}
          <div className="md:col-span-6 bg-[#141418] border-b md:border-b-0 md:border-r border-white/[0.08]">
            <div className="aspect-[3/4] w-full h-full">
              <ResilientImage
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                containerClassName="w-full h-full"
              />
            </div>
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              {/* Unboxed Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 pr-10">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{product.sku}</span>
                <span aria-hidden="true">·</span>
                <span className="text-zinc-300">
                  <span className="tabular-nums">{product.stock}</span> em estoque
                </span>
              </div>

              <div>
                <h2
                  id="pdp-title"
                  className="font-display text-3xl font-semibold text-[#F4F4F5] leading-tight"
                >
                  {product.name}
                </h2>
                <div className="mt-3 flex flex-wrap items-baseline gap-3">
                  <span className="text-2xl font-semibold text-[#F4F4F5] tabular-nums">
                    {formatBRL(product.price)}
                  </span>
                  <span className="text-xs text-zinc-400 tabular-nums">
                    ou {formatBRL(pixPrice)} no Pix · Conserto gratuito vitalício
                  </span>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-300">
                    Selecione o tamanho:{' '}
                    <span className="text-white tabular-nums">{selectedSize}</span>
                  </span>
                  {!isOneSize && (
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white underline underline-offset-4 cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" strokeWidth={1.75} />
                      <span>{showSizeGuide ? 'Ocultar medidas' : 'Guia de medidas'}</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const active = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[44px] h-11 px-3 text-xs font-medium rounded-sm border transition-colors duration-150 tabular-nums cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                          active
                            ? 'bg-[#F4F4F5] text-[#0B0B0D] border-[#F4F4F5]'
                            : 'bg-[#18181D] text-zinc-300 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {showSizeGuide && !isOneSize && (
                  <div className="mt-3 p-3.5 bg-[#16161B] border border-white/[0.08] rounded-sm text-xs text-zinc-300">
                    {isFootwear ? (
                      <table className="w-full text-left tabular-nums">
                        <thead>
                          <tr className="border-b border-white/10 text-zinc-400">
                            <th className="py-1.5 font-medium">Numeração BR</th>
                            <th className="py-1.5 font-medium">Palmilha (cm)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                          <tr>
                            <td className="py-1.5">34 — 35</td>
                            <td className="py-1.5">22,8 — 23,5 cm</td>
                          </tr>
                          <tr>
                            <td className="py-1.5">36 — 37</td>
                            <td className="py-1.5">24,2 — 24,8 cm</td>
                          </tr>
                          <tr>
                            <td className="py-1.5">38 — 39</td>
                            <td className="py-1.5">25,5 — 26,2 cm</td>
                          </tr>
                          <tr>
                            <td className="py-1.5">40 — 41</td>
                            <td className="py-1.5">26,8 — 27,5 cm</td>
                          </tr>
                          <tr>
                            <td className="py-1.5">42 — 43</td>
                            <td className="py-1.5">28,2 — 28,9 cm</td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <table className="w-full text-left tabular-nums">
                        <thead>
                          <tr className="border-b border-white/10 text-zinc-400">
                            <th className="py-1.5 font-medium">Tam.</th>
                            <th className="py-1.5 font-medium">Busto/Tórax</th>
                            <th className="py-1.5 font-medium">Cintura</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                          <tr>
                            <td className="py-1.5">PP</td>
                            <td className="py-1.5">82–86 cm</td>
                            <td className="py-1.5">64–68 cm</td>
                          </tr>
                          <tr>
                            <td className="py-1.5">P</td>
                            <td className="py-1.5">87–92 cm</td>
                            <td className="py-1.5">69–74 cm</td>
                          </tr>
                          <tr>
                            <td className="py-1.5">M</td>
                            <td className="py-1.5">93–98 cm</td>
                            <td className="py-1.5">75–80 cm</td>
                          </tr>
                          <tr>
                            <td className="py-1.5">G</td>
                            <td className="py-1.5">99–105 cm</td>
                            <td className="py-1.5">81–88 cm</td>
                          </tr>
                          <tr>
                            <td className="py-1.5">GG</td>
                            <td className="py-1.5">106–114 cm</td>
                            <td className="py-1.5">89–98 cm</td>
                          </tr>
                          <tr>
                            <td className="py-1.5">XG / XGG</td>
                            <td className="py-1.5">115–132 cm</td>
                            <td className="py-1.5">99–116 cm</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>

              {/* Materials & Care */}
              <div className="pt-3 border-t border-white/[0.08] space-y-2 text-xs text-zinc-400">
                <div>
                  <span className="text-zinc-200 font-medium">Composição: </span>
                  <span>{product.fabric}</span>
                </div>
                <div>
                  <span className="text-zinc-200 font-medium">Cuidados: </span>
                  <span>{product.care}</span>
                </div>
              </div>
            </div>

            {/* Purchase Actions */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium rounded-sm transition-colors duration-150 cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  addedFeedback
                    ? 'bg-[#F4F4F5] text-[#0B0B0D]'
                    : 'bg-[#9F1239] hover:bg-[#BE123C] text-white'
                }`}
              >
                {addedFeedback && <Check className="w-4 h-4" strokeWidth={2} />}
                <span>
                  {addedFeedback ? 'Adicionado à Sacola' : 'Adicionar à Sacola'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onToggleFavorite(product.id)}
                aria-label={isFavorite ? 'Remover dos salvos' : 'Salvar peça'}
                aria-pressed={isFavorite}
                className={`w-12 h-12 flex items-center justify-center rounded-sm border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  isFavorite
                    ? 'bg-[#9F1239] border-[#9F1239] text-white'
                    : 'bg-[#18181D] border-white/10 text-zinc-300 hover:text-white'
                }`}
              >
                <Heart
                  className="w-4 h-4"
                  fill={isFavorite ? 'currentColor' : 'none'}
                  strokeWidth={1.75}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
