import React, { useEffect, useState } from 'react';

type ToastItem = { id: number; message: string; type?: 'success' | 'error' };

export function showToast(message: string, type: 'success' | 'error' = 'success') {
  window.dispatchEvent(new CustomEvent('app:toast', { detail: { message, type } }));
}

const Toast: React.FC = () => {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    let id = 0;
    function onToast(e: Event) {
      const detail: any = (e as CustomEvent).detail;
      id++;
      const item: ToastItem = { id, message: detail.message, type: detail.type };
      setItems(prev => [...prev, item]);
      setTimeout(() => {
        setItems(prev => prev.filter(i => i.id !== item.id));
      }, 4000);
    }

    window.addEventListener('app:toast', onToast as EventListener);
    return () => window.removeEventListener('app:toast', onToast as EventListener);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3">
      {items.map(item => (
        <div
          key={item.id}
          className={`px-4 py-2 rounded-md shadow-md max-w-xs text-sm ${
            item.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
          }`}
        >
          {item.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
