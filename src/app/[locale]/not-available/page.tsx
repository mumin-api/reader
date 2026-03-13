import { getTranslations } from 'next-intl/server';
import { SpiritGate } from '@/components/SpiritGate';
import { GlobalPanels } from '@/components/GlobalPanels';

export default async function NotAvailablePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'Errors' });

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="max-w-md w-full p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-500/20 text-red-500 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-playfair font-bold text-emerald-950 dark:text-emerald-50 mb-4">
          Service Unavailable
        </h1>
        
        <p className="text-emerald-800/80 dark:text-emerald-200/80 leading-relaxed font-inter">
          We apologize, but Mumin Hadith Reader is currently not available in your region due to local regulations or service restrictions.
        </p>
      </div>
    </div>
  );
}
