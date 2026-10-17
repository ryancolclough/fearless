import { artists, confirm, shop } from '../data/shop';
import { productionOrigin } from '../config';

export function parlorJsonLd(imageUrl: string) {
  const saturday = {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Saturday',
    opens: '12:00',
    closes: '19:00',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'TattooParlor',
    '@id': `${productionOrigin}/#shop`,
    name: shop.name,
    url: `${productionOrigin}/`,
    telephone: shop.phoneTel,
    email: shop.email,
    image: imageUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: confirm.street,
      addressLocality: 'Ottawa',
      addressRegion: 'ON',
      postalCode: confirm.postal,
      addressCountry: 'CA',
    },
    areaServed: shop.area,
    openingHoursSpecification: [saturday],
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Weekday closing time', value: confirm.weekdayClose },
      { '@type': 'PropertyValue', name: 'Sunday hours', value: confirm.sunday },
      { '@type': 'PropertyValue', name: 'Walk-in minimum', value: shop.walkInMinimum },
    ],
    sameAs: [shop.instagram, shop.facebook],
    employee: artists.map((artist) => ({
      '@type': 'Person',
      name: artist.aka ? `${artist.name} (${artist.aka})` : artist.name,
      jobTitle: artist.role,
      worksFor: { '@id': `${productionOrigin}/#shop` },
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
