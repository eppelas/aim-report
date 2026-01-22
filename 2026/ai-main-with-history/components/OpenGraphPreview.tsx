import React, { useEffect, useState } from 'react';

interface OGData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

interface OpenGraphPreviewProps {
  url: string;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export const OpenGraphPreview: React.FC<OpenGraphPreviewProps> = ({ url, onClose, theme }) => {
  const [ogData, setOgData] = useState<OGData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOG = async () => {
      try {
        const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        if (data.status === 'success') {
          setOgData({
            title: data.data.title,
            description: data.data.description,
            image: data.data.image?.url || data.data.logo?.url,
            url: data.data.url
          });
        }
      } catch (error) {
        console.error('Failed to fetch OG data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOG();
  }, [url]);

  const isDark = theme === 'dark';
  const bgMain = isDark ? 'bg-neutral-900' : 'bg-white';
  const textMain = isDark ? 'text-white' : 'text-black';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const borderColor = isDark ? 'border-neutral-800' : 'border-neutral-300';

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className={`relative w-full max-w-2xl ${bgMain} ${borderColor} border rounded-xl overflow-hidden shadow-2xl z-10`}>
        <div className={`flex justify-between items-center p-4 border-b ${borderColor}`}>
          <span className={`text-sm font-mono ${textSecondary}`}>Preview</span>
          <button onClick={onClose} className={`p-2 ${textSecondary} hover:${textMain} transition-colors`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC2626]"></div>
          </div>
        ) : ogData ? (
          <div className="p-8">
            {ogData.image && (
              <div className="mb-6 rounded-lg overflow-hidden">
                <img src={ogData.image} alt={ogData.title} className="w-full h-64 object-cover" />
              </div>
            )}
            
            <h2 className={`text-2xl font-bold mb-3 ${textMain}`}>{ogData.title || 'Untitled'}</h2>
            <p className={`text-base mb-6 ${textSecondary} leading-relaxed`}>{ogData.description || 'No description available'}</p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => window.open(url, '_blank')} 
                className="flex-1 px-6 py-3 bg-[#DC2626] text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
              >
                Read Full Article
              </button>
              <button 
                onClick={onClose}
                className={`px-6 py-3 border ${borderColor} ${textSecondary} rounded-lg font-bold hover:${textMain} transition-colors`}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="p-20 text-center">
            <p className={`${textSecondary} mb-6`}>Could not load preview</p>
            <button 
              onClick={() => window.open(url, '_blank')} 
              className="px-6 py-3 bg-[#DC2626] text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
            >
              Open Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
