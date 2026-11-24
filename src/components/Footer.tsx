import type { StoreTab } from '../data/products';

interface FooterProps {
  onSelectTab: (tab: StoreTab) => void;
}

export function Footer({ onSelectTab }: FooterProps) {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0B0B0D]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          <div className="md:col-span-5 space-y-3">
            <div className="font-display text-2xl font-semibold tracking-[0.06em] text-[#F4F4F5]">
              UMBRA ATELIER
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Oficina independente e brechó gótico em São Paulo. Contra o consumismo e preços abusivos: upcycling, grade do PP ao XGG e conserto gratuito vitalício.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold text-zinc-200 tracking-wide">
              Abas da Loja
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              {(
                [
                  'Todas',
                  'Vestidos e Saias',
                  'Acessórios',
                  'Calças',
                  'Blusas',
                  'Desfiles',
                  'Sobre Nós',
                ] as StoreTab[]
              ).map((tab) => (
                <li key={tab}>
                  <button
                    type="button"
                    onClick={() => onSelectTab(tab)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {tab === 'Todas' ? 'Catálogo Completo' : tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold text-zinc-200 tracking-wide">
              Oficina de Reparo &amp; Retirada
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Rua Bela Cintra, 980 — Jardins, São Paulo</li>
              <li>Segunda a Sábado, das 11h às 19h</li>
              <li>contato@umbraatelier.com.br</li>
              <li className="pt-1">
                <button
                  type="button"
                  onClick={() => onSelectTab('Sobre Nós')}
                  className="text-zinc-200 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Sobre Nós &amp; Reparo Grátis
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <span>© 2026 Umbra Atelier · Moda Gótica Acessível &amp; Anticonsumista.</span>
          <span>Frete solidário R$ 12 · Conserto vitalício gratuito</span>
        </div>
      </div>
    </footer>
  );
}
