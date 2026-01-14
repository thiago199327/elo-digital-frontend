import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Search, Filter, X, Plus, Minus, CreditCard } from 'lucide-react';

interface StoreViewProps {
  onBack: () => void;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const products: Product[] = [
  { id: '1', name: 'Elo Premium Mensal', price: 29.90, category: 'Assinaturas', image: '💎', description: 'Acesso ilimitado a todas as funcionalidades por 1 mês.' },
  { id: '2', name: 'Elo Premium Anual', price: 299.90, category: 'Assinaturas', image: '👑', description: 'Economize 20% com o plano anual.' },
  { id: '3', name: 'Pacote 100 Créditos', price: 19.90, category: 'Serviços IA', image: '🪙', description: 'Créditos para gerar imagens ou mensagens especiais.' },
  { id: '4', name: 'Camiseta Elo', price: 59.90, category: 'Itens Físicos', image: '👕', description: 'Mostre seu estilo com a camiseta oficial.' },
  { id: '5', name: 'Caneca Elo', price: 34.90, category: 'Itens Físicos', image: '☕', description: 'Sua companhia perfeita para o café.' },
  { id: '6', name: 'Boost de Perfil', price: 9.90, category: 'Serviços IA', image: '🚀', description: 'Fique em destaque na descoberta por 24h.' },
];

const categories = ['Todos', 'Assinaturas', 'Itens Físicos', 'Serviços IA'];

export default function StoreView({ onBack }: StoreViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setSelectedProduct(null); // Close modal if open
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
      setCart(prev => prev.map(item => {
          if (item.product.id === productId) {
              const newQuantity = Math.max(1, item.quantity + delta);
              return { ...item, quantity: newQuantity };
          }
          return item;
      }));
  };

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="h-full bg-gray-50 flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm z-10">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ArrowLeft size={24} className="text-gray-600" />
                </button>
                <h1 className="text-xl font-bold">Loja</h1>
            </div>
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {cart.reduce((a, b) => a + b.quantity, 0)}
                    </span>
                )}
            </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
                type="text" 
                placeholder="Buscar produtos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === cat 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map(product => (
                <div 
                    key={product.id} 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl">
                        {product.image}
                    </div>
                    <div className="p-3">
                        <p className="text-xs text-purple-600 font-semibold mb-1">{product.category}</p>
                        <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{product.name}</h3>
                        <div className="flex items-center justify-between mt-2">
                            <span className="font-bold text-gray-900">R$ {product.price.toFixed(2)}</span>
                            <button 
                                onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                className="p-1.5 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="absolute inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10">
                <div className="relative h-48 bg-gray-100 flex items-center justify-center text-8xl">
                    <button 
                        onClick={() => setSelectedProduct(null)}
                        className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white"
                    >
                        <X size={20} />
                    </button>
                    {selectedProduct.image}
                </div>
                <div className="p-6">
                    <span className="text-sm text-purple-600 font-semibold">{selectedProduct.category}</span>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                    <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
                    
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-2xl font-bold text-gray-900">R$ {selectedProduct.price.toFixed(2)}</span>
                    </div>

                    <button 
                        onClick={() => addToCart(selectedProduct)}
                        className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={20} />
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="absolute inset-0 z-50 bg-black/50 flex justify-end">
            <div className="bg-white w-full max-w-xs h-full shadow-2xl flex flex-col animate-in slide-in-from-right-10">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="font-bold text-lg">Seu Carrinho</h2>
                    <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="text-center text-gray-500 mt-10">
                            <ShoppingCart size={48} className="mx-auto mb-4 opacity-20" />
                            <p>Seu carrinho está vazio.</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.product.id} className="flex gap-3">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                    {item.product.image}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-sm">{item.product.name}</h4>
                                    <p className="text-gray-500 text-xs">R$ {item.product.price.toFixed(2)}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 bg-gray-100 rounded-md">
                                            <Minus size={12} />
                                        </button>
                                        <span className="text-sm font-medium">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 bg-gray-100 rounded-md">
                                            <Plus size={12} />
                                        </button>
                                        <button onClick={() => removeFromCart(item.product.id)} className="ml-auto text-red-500 text-xs hover:underline">
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 border-t bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-gray-600">Total</span>
                        <span className="font-bold text-xl text-gray-900">R$ {total.toFixed(2)}</span>
                    </div>
                    <button disabled={cart.length === 0} className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        <CreditCard size={20} />
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
