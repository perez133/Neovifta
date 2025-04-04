import { createTranslator } from 'next-intl';

export function generateMetadata(namespace: string) {
  return async function ({ params: { locale } }: { params: { locale: string } }) {
    const messages = (await import(`../messages/${locale}.json`)).default;
    const t = createTranslator({ locale, messages });

    return {
      title: t(`${namespace}.metadata.title`),
      description: t(`${namespace}.metadata.description`),
    };
  };
}