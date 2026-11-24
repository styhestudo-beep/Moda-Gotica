import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { StoreTab } from '../data/products';

interface HeaderProps {
  cartCount: number;
  activeTab: StoreTab;
  onOpenCart: () => void;
  onSelectTab: (tab: StoreTab) => void;
}

export function Header({
  cartCount,
  activeTab,
  onOpenCart,
  onSelectTab,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: StoreTab) => {
    setMobileMenuOpen(false);
    onSelectTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0B0B0D]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-6 lg:px-10">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleTabClick('Todas')}
          className="font-display text-xl sm:text-2xl font-semibold tracking-[0.06em] text-[#F4F4F5] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE123C] rounded-sm"
        >
          UMBRA ATELIER
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400"
        >
          {(
            [
              'Todas',
              'Vestidos e Saias',
              'Acessórios',
              'Desfiles',
              'Sobre Nós',
            ] as StoreTab[]
          ).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => handleTabClick(tab)}
                className={`transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE123C] rounded-sm py-1 ${
                  isActive
                    ? 'text-[#F4F4F5] underline underline-offset-8 decoration-[#BE123C]'
                    : 'hover:text-[#F4F4F5]'
                }`}
              >
                {tab === 'Todas' ? 'Catálogo' : tab}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Abrir sacola com ${cartCount} ${cartCount === 1 ? 'item' : 'itens'}`}
            className="inline-flex items-center gap-2.5 bg-[#9F1239] hover:bg-[#BE123C] text-white text-sm font-medium px-4 py-2.5 rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[40px]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" strokeWidth={1.75} />
            <span>
              Sacola (<span className="tabular-nums">{cartCount}</span>)
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-zinc-300 hover:text-white border border-white/10 rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE123C]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navegação mobile"
          className="md:hidden border-t border-white/[0.08] bg-[#111115] px-6 py-4 flex flex-col gap-1"
        >
          {(
            [
              'Todas',
              'Blusas',
              'Calças',
              'Vestidos e Saias',
              'Acessórios',
              'Casacos',
              'Desfiles',
              'Sobre Nós',
            ] as StoreTab[]
          ).map((tab, idx, arr) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabClick(tab)}
              className={`text-left py-3 text-sm font-medium cursor-pointer ${
                activeTab === tab ? 'text-white' : 'text-zinc-300 hover:text-white'
              } ${idx < arr.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
            >
              {tab === 'Todas' ? 'Todas as Peças' : tab}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
