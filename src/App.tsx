import { useEffect, useMemo, useState } from 'react';
import { AtelierSection } from './components/AtelierSection';
import { CartDrawer, type CartItem } from './components/CartDrawer';
import { CatalogSection, type SortOption } from './components/CatalogSection';
import { DesfilesSection } from './components/DesfilesSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductDetailModal } from './components/ProductDetailModal';
import {
  PRODUCTS,
  STORE_TABS,
  type Product,
  type StoreTab,
} from './data/products';

const CART_STORAGE_KEY = 'umbra_atelier_cart_v1';
const FAVORITES_STORAGE_KEY = 'umbra_atelier_favorites_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<StoreTab>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore storage quota errors
    }
  }, [favorites]);

  const totalCartItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const isCatalogTab =
    activeTab !== 'Desfiles' && activeTab !== 'Sobre Nós';

  const filteredProducts = useMemo(() => {
    if (!isCatalogTab) return [];

    const query = searchQuery.trim().toLowerCase();

    const matches = PRODUCTS.filter((product) => {
      const categoryOk =
        activeTab === 'Todas' || product.category === activeTab;
      const favOk = !showFavoritesOnly || favorites.includes(product.id);
      const queryOk =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.fabric.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return categoryOk && favOk && queryOk;
    });

    if (sortBy === 'price-asc') {
      return [...matches].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...matches].sort((a, b) => b.price - a.price);
    }
    return matches;
  }, [activeTab, isCatalogTab, searchQuery, sortBy, showFavoritesOnly, favorites]);

  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prev, { product, size, quantity: 1 }];
    });
  };

  const handleQuickAdd = (product: Product) => {
    const defaultSize =
      product.sizes[Math.min(1, product.sizes.length - 1)] || product.sizes[0];
    handleAddToCart(product, defaultSize);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1200);
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const scrollToTabs = () => {
    const el = document.getElementById('abas-loja');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTab = (tab: StoreTab) => {
    setActiveTab(tab);
    if (tab !== 'Desfiles' && tab !== 'Sobre Nós') {
      setShowFavoritesOnly(false);
    }
    scrollToTabs();
  };

  const handleResetFilters = () => {
    setActiveTab('Todas');
    setSearchQuery('');
    setShowFavoritesOnly(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0D] text-[#F4F4F5]">
      <Header
        cartCount={totalCartItems}
        activeTab={activeTab}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectTab={handleSelectTab}
      />

      <main className="flex-1">
        <Hero
          onExploreCatalog={() => handleSelectTab('Todas')}
          onExploreAtelier={() => handleSelectTab('Sobre Nós')}
        />

        {/* Primary Store Tabs Bar */}
        <div
          id="abas-loja"
          className="border-b border-white/[0.08] bg-[#0F0F12] scroll-mt-16"
        >
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-4">
            <div
              role="tablist"
              aria-label="Seções e categorias da loja"
              className="flex flex-wrap items-center gap-2"
            >
              {STORE_TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => handleSelectTab(tab)}
                    className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE123C] ${
                      isActive
                        ? 'bg-[#F4F4F5] text-[#0B0B0D]'
                        : 'bg-[#16161B] text-zinc-300 hover:text-white border border-white/[0.08]'
                    }`}
                  >
                    {tab === 'Todas' ? 'Todas as Peças' : tab}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Tab Content */}
        {activeTab === 'Desfiles' && (
          <DesfilesSection
            onOpenProduct={setActiveProduct}
            onExploreCatalog={() => handleSelectTab('Todas')}
          />
        )}

        {activeTab === 'Sobre Nós' && (
          <AtelierSection
            onExploreCatalog={() => handleSelectTab('Todas')}
            onOpenDesfiles={() => handleSelectTab('Desfiles')}
          />
        )}

        {isCatalogTab && (
          <>
            <CatalogSection
              products={filteredProducts}
              activeTab={activeTab}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              showFavoritesOnly={showFavoritesOnly}
              onToggleFavoritesOnly={() => setShowFavoritesOnly((prev) => !prev)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onOpenProduct={setActiveProduct}
              onQuickAdd={handleQuickAdd}
              onResetFilters={handleResetFilters}
              justAddedId={justAddedId}
            />

            {activeTab === 'Todas' && (
              <AtelierSection
                onOpenDesfiles={() => handleSelectTab('Desfiles')}
              />
            )}
          </>
        )}
      </main>

      <Footer onSelectTab={handleSelectTab} />

      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
        isFavorite={activeProduct ? favorites.includes(activeProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
      />
    </div>
  );
}
