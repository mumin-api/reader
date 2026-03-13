import { getTranslations } from 'next-intl/server';
import NotAvailableClient from './NotAvailableClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Unavailable | Mumin',
  robots: { index: false, follow: false },
};

export default async function NotAvailablePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'Errors' });

  // Fallbacks if translations are missing
  const title = t('serviceUnavailableTitle') || 'Service Unavailable';
  const description = t('serviceUnavailableDescription') || 'We apologize, but Mumin Hadith Reader is currently not available in your region due to local regulations or service restrictions.';
  const supportText = t('contactSupport') || 'If you believe this is an error, please contact support.';

  return (
    <NotAvailableClient 
      title={title} 
      description={description} 
      supportLinkText={supportText} 
    />
  );
}
