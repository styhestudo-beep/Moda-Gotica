import { useEffect, useState } from 'react';
import { X, Minus, Plus, Trash2, CheckCircle2, ArrowLeft } from 'lucide-react';
import type { Product } from '../data/products';
import { formatBRL, generateOrderCode } from '../utils/format';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

type PaymentMethod = 'pix' | 'cartao' | 'entrega';

interface OrderReceipt {
  orderCode: string;
  customerName: string;
  customerEmail: string;
  addressSummary: string;
  paymentMethod: PaymentMethod;
  total: number;
  items: CartItem[];
}

const FREE_SHIPPING_THRESHOLD = 150;
const FLAT_SHIPPING_FEE = 12;

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [formError, setFormError] = useState('');
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && items.length === 0 && step === 'checkout') {
      setStep('bag');
    }
  }, [isOpen, items.length, step]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const qualifiesFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingCost = qualifiesFreeShipping ? 0 : FLAT_SHIPPING_FEE;
  const pixDiscount = paymentMethod === 'pix' ? subtotal * 0.05 : 0;
  const finalTotal = Math.max(0, subtotal - pixDiscount + shippingCost);

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim() || !cep.trim() || !address.trim()) {
      setFormError('Preencha todos os campos de entrega e contato para concluir o pedido.');
      return;
    }
    setFormError('');
    const newReceipt: OrderReceipt = {
      orderCode: generateOrderCode(),
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      addressSummary: `${address.trim()} · CEP ${cep.trim()}`,
      paymentMethod,
      total: finalTotal,
      items: [...items],
    };
    setReceipt(newReceipt);
    onClearCart();
    setStep('confirmed');
  };

  const handleCloseDrawer = () => {
    if (step === 'confirmed') {
      setStep('bag');
      setReceipt(null);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Sacola de compras"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCloseDrawer();
      }}
    >
      <aside className="w-full max-w-md bg-[#111115] border-l border-white/[0.1] h-full flex flex-col justify-between shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('bag')}
                aria-label="Voltar para a sacola"
                className="p-1.5 text-zinc-400 hover:text-white rounded-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-display text-2xl font-semibold text-[#F4F4F5]">
              {step === 'bag' && 'Sua Sacola'}
              {step === 'checkout' && 'Finalizar Pedido'}
              {step === 'confirmed' && 'Pedido Confirmado'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Fechar sacola"
            className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white border border-white/10 rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 'confirmed' && receipt ? (
            <div className="space-y-6">
              <div className="p-5 bg-[#16161B] border border-white/[0.08] rounded-sm space-y-3">
                <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Pedido #{receipt.orderCode} Confirmado — Preparando Envio</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Enviamos o resumo e o código de rastreamento para{' '}
                  <span className="text-zinc-200">{receipt.customerEmail}</span>.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="text-zinc-400 uppercase tracking-wider font-medium">
                  Dados da Entrega
                </div>
                <div className="p-4 bg-[#16161B] border border-white/[0.06] rounded-sm space-y-1.5 text-zinc-300">
                  <p className="font-medium text-white">{receipt.customerName}</p>
                  <p>{receipt.addressSummary}</p>
                  <p className="text-zinc-400">
                    Pagamento:{' '}
                    {receipt.paymentMethod === 'pix'
                      ? 'Pix (5% de desconto aplicado)'
                      : receipt.paymentMethod === 'cartao'
                      ? 'Cartão de Crédito'
                      : 'Pagamento na Entrega'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-medium">
                  Itens do Pedido
                </div>
                <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  {receipt.items.map((item) => (
                    <li
                      key={`${item.product.id}-${item.size}`}
                      className="py-3 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <p className="text-zinc-200 font-medium">{item.product.name}</p>
                        <p className="text-zinc-400 tabular-nums">
                          Tam. {item.size} · Qtd. {item.quantity}
                        </p>
                      </div>
                      <span className="text-zinc-200 font-medium tabular-nums">
                        {formatBRL(item.product.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-2 text-sm font-semibold text-white">
                  <span>Total Pago</span>
                  <span className="tabular-nums">{formatBRL(receipt.total)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseDrawer}
                className="w-full py-3.5 text-sm font-medium bg-[#F4F4F5] text-[#0B0B0D] rounded-sm hover:bg-white transition-colors cursor-pointer min-h-[44px]"
              >
                Continuar Navegando
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <p className="font-display text-2xl text-[#F4F4F5]">
                Sua sacola está vazia
              </p>
              <p className="text-sm text-zinc-400 max-w-xs">
                Explore os casacos, corsets, vestidos e botas do Umbra Atelier para montar sua seleção.
              </p>
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="px-6 py-3 text-xs font-medium bg-[#9F1239] hover:bg-[#BE123C] text-white rounded-sm transition-colors cursor-pointer min-h-[44px]"
              >
                Ver Coleção
              </button>
            </div>
          ) : step === 'bag' ? (
            <div className="space-y-6">
              {/* Mindful Anti-Consumerist Notice (No upsell bar) */}
              <div className="p-4 bg-[#16161B] border border-white/[0.06] rounded-sm space-y-1">
                <p className="text-xs text-zinc-200 font-medium">
                  Compre no seu tempo, sem pressão
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed tabular-nums">
                  Frete fixo solidário de R$ 12,00 (grátis acima de R$ 150,00 ou na retirada na oficina).
                </p>
              </div>

              {/* Cart Items */}
              <ul className="divide-y divide-white/[0.08]">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.size}`}
                    className="py-5 flex gap-4"
                  >
                    <div className="w-20 aspect-[3/4] bg-[#141418] border border-white/[0.06] rounded-sm overflow-hidden shrink-0">
                      <ResilientImage
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-medium text-[#F4F4F5] leading-snug">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-zinc-400 mt-1 tabular-nums">
                            Tamanho: {item.size}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          aria-label={`Remover ${item.product.name}`}
                          className="text-zinc-500 hover:text-zinc-200 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.75} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-3">
                        <div className="inline-flex items-center border border-white/10 rounded-sm bg-[#16161B]">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.size, -1)
                            }
                            aria-label="Diminuir quantidade"
                            className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-medium tabular-nums text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.size, 1)
                            }
                            aria-label="Aumentar quantidade"
                            className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-medium text-[#F4F4F5] tabular-nums">
                          {formatBRL(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            /* Checkout Verification Form */
            <form id="checkout-form" onSubmit={handleConfirmOrder} className="space-y-4">
              {formError && (
                <div
                  role="alert"
                  className="p-3 bg-[#9F1239]/20 border border-[#BE123C]/50 rounded-sm text-xs text-rose-200"
                >
                  {formError}
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="chk-name" className="block text-xs text-zinc-300">
                  Nome Completo
                </label>
                <input
                  id="chk-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ex.: Mariana Vasconcelos"
                  className="w-full bg-[#16161B] border border-white/10 focus:border-white/35 rounded-sm px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none min-h-[42px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label htmlFor="chk-email" className="block text-xs text-zinc-300">
                    E-mail
                  </label>
                  <input
                    id="chk-email"
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="voce@exemplo.com"
                    className="w-full bg-[#16161B] border border-white/10 focus:border-white/35 rounded-sm px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none min-h-[42px]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="chk-phone" className="block text-xs text-zinc-300">
                    Telefone / WhatsApp
                  </label>
                  <input
                    id="chk-phone"
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="(11) 99999-0000"
                    className="w-full bg-[#16161B] border border-white/10 focus:border-white/35 rounded-sm px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none min-h-[42px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1 space-y-1.5">
                  <label htmlFor="chk-cep" className="block text-xs text-zinc-300">
                    CEP
                  </label>
                  <input
                    id="chk-cep"
                    type="text"
                    required
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    placeholder="01310-100"
                    className="w-full bg-[#16161B] border border-white/10 focus:border-white/35 rounded-sm px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none tabular-nums min-h-[42px]"
                  />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label htmlFor="chk-address" className="block text-xs text-zinc-300">
                    Endereço e Número
                  </label>
                  <input
                    id="chk-address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Rua Augusta, 1420 - Apto 42"
                    className="w-full bg-[#16161B] border border-white/10 focus:border-white/35 rounded-sm px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none min-h-[42px]"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="block text-xs text-zinc-300">
                  Forma de Pagamento
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'pix' as const, label: 'Pix à vista (5% de desconto direto)' },
                    { id: 'cartao' as const, label: 'Cartão de Crédito ou Débito (sem acréscimo)' },
                    { id: 'entrega' as const, label: 'Retirada ou Pagamento na Oficina (São Paulo)' },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center gap-3 p-3 rounded-sm border text-xs cursor-pointer transition-colors ${
                        paymentMethod === option.id
                          ? 'bg-[#1A1A20] border-[#BE123C] text-white'
                          : 'bg-[#16161B] border-white/[0.08] text-zinc-300 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.id}
                        checked={paymentMethod === option.id}
                        onChange={() => setPaymentMethod(option.id)}
                        className="accent-[#BE123C]"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Drawer Footer Totals */}
        {items.length > 0 && step !== 'confirmed' && (
          <div className="px-6 py-5 border-t border-white/[0.08] bg-[#0D0D10] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="tabular-nums text-zinc-200">{formatBRL(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Frete</span>
                <span className="tabular-nums text-zinc-200">
                  {qualifiesFreeShipping ? 'Grátis' : formatBRL(shippingCost)}
                </span>
              </div>
              {step === 'checkout' && paymentMethod === 'pix' && (
                <div className="flex justify-between text-emerald-400">
                  <span>Desconto Pix (5%)</span>
                  <span className="tabular-nums">− {formatBRL(pixDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-white/[0.08] text-sm font-semibold text-white">
                <span>Total</span>
                <span className="tabular-nums">
                  {formatBRL(step === 'checkout' ? finalTotal : subtotal + shippingCost)}
                </span>
              </div>
            </div>

            {step === 'bag' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 text-sm font-medium bg-[#9F1239] hover:bg-[#BE123C] text-white rounded-sm transition-colors cursor-pointer min-h-[46px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Continuar para Entrega
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3.5 text-sm font-medium bg-[#9F1239] hover:bg-[#BE123C] text-white rounded-sm transition-colors cursor-pointer min-h-[46px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Confirmar Pedido
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
