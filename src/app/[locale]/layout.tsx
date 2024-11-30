import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import React from "react";
import Header from "@/components/Header/Header";

export default async function LocaleLayout(
  {children, params}: { children: React.ReactNode; params: {locale: string}; }
) {
  
  const { locale } = await params;
  const messages = await getMessages();
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  
  return (
    <div className="app">
      <Header />
      <main>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
      </main>
    </div>
  );
}