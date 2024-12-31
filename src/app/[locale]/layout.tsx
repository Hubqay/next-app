// /app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import React from 'react'
import Navigate from '@/components/Navigate/Navigate'

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	const { locale } = await params
	const messages = await getMessages()

	if (!routing.locales.includes(locale as 'en' | 'ru')) {
		notFound()
	}

	return (
		<div className='app'>
			<Navigate />
			<main>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</main>
		</div>
	)
}
