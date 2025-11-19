import React, { useEffect, useState } from 'react';

export function showLoading(show = true) {
  window.dispatchEvent(new CustomEvent('app:loading', { detail: { show } }));
}

const Loading: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onLoading(e: Event) {
      const detail: any = (e as CustomEvent).detail;
      setVisible(Boolean(detail.show));
    }
    window.addEventListener('app:loading', onLoading as EventListener);
    return () => window.removeEventListener('app:loading', onLoading as EventListener);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center pt-20 pointer-events-none">
      <div className="pointer-events-auto bg-white/60 backdrop-blur-sm rounded-md px-4 py-3 shadow-md flex items-center gap-3">
        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <div className="text-sm text-gray-700">Loading…</div>
      </div>
    </div>
  );
};

export default Loading;
