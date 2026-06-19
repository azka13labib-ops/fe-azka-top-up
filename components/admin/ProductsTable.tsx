import React, { useState } from 'react';
import { Product } from '@/types';
import { Toggle } from '@/components/ui/Toggle';
import { formatRupiah } from '@/lib/utils';
import { Save } from 'lucide-react';

interface ProductsTableProps {
  products: Product[];
  onToggleActive: (productId: number, active: boolean) => void;
  onUpdatePrice: (productId: number, price: number) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onToggleActive,
  onUpdatePrice,
}) => {
  const [editingPrices, setEditingPrices] = useState<Record<number, number>>({});

  const handlePriceChange = (id: number, val: string) => {
    const numeric = parseInt(val.replace(/\D/g, '')) || 0;
    setEditingPrices((prev) => ({ ...prev, [id]: numeric }));
  };

  const savePrice = (productId: number) => {
    const newPrice = editingPrices[productId];
    if (newPrice !== undefined) {
      onUpdatePrice(productId, newPrice);
      setEditingPrices((prev) => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
    }
  };

  return (
    <div className="bg-surface-card border border-border-default rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-subtle border-b border-border-default text-xs text-ink-muted font-medium uppercase tracking-wider">
              <th className="p-4">SKU / Code</th>
              <th className="p-4">Nama Item</th>
              <th className="p-4">Harga Jual</th>
              <th className="p-4">Status Aktif</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-xs sm:text-sm text-ink-secondary divide-y divide-border-default">
            {products.map((product) => {
              const currentPrice = editingPrices[product.id] ?? product.selling_price;
              const hasPriceChanged = editingPrices[product.id] !== undefined && editingPrices[product.id] !== product.selling_price;

              return (
                <tr key={product.id} className="hover:bg-surface-subtle/50 transition-colors">
                  <td className="p-4 font-mono font-medium text-ink-primary">
                    {product.digiflazz_sku}
                  </td>
                  <td className="p-4 font-medium text-ink-primary">
                    {product.name}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 max-w-[150px]">
                      <span className="text-ink-muted">Rp</span>
                      <input
                        type="text"
                        value={currentPrice.toLocaleString('id-ID')}
                        onChange={(e) => handlePriceChange(product.id, e.target.value)}
                        className="w-full bg-surface-input border border-border-default rounded px-2 py-1 text-xs text-ink-primary font-mono outline-none focus:border-brand-navy"
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <Toggle
                      checked={product.is_active}
                      onChange={(checked) => onToggleActive(product.id, checked)}
                    />
                  </td>
                  <td className="p-4 text-center">
                    <button
                      disabled={!hasPriceChanged}
                      onClick={() => savePrice(product.id)}
                      className="p-1 text-brand-navy hover:bg-brand-navy-light rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer inline-flex items-center justify-center"
                      title="Simpan Harga"
                    >
                      <Save size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
