import type { ImageMetadata } from 'astro';

/**
 * Single source of shop facts for V2.
 * Seeded from the team's shop-info file, the June mockup, and the live site.
 * Strings that start with [CONFIRM: are unanswered and must stay visible.
 */

export const confirm = {
  street: '[CONFIRM: street address — it is not listed on the current site]',
  postal: '[CONFIRM: postal code]',
  sunday:
    '[CONFIRM: Sunday hours — the homepage lists 12–5pm as OPTIONAL, and the team page lists Sunday as CLOSED]',
  weekdayClose:
    '[CONFIRM: weekday closing time — the hours table lists weekdays 12–5pm, and the site also says to call ahead from 5–7pm]',
  lineup: '[CONFIRM: artist lineup and rates are still current]',
  legal: '[CONFIRM: Terms and privacy copied from the current site, reviewed by Ryan?]',
  annRole: '[CONFIRM: Ann\'s role — the live site says apprenticeship]',
  deposit:
    '[CONFIRM: deposit amount, and whether it comes off the final price. The current site only says deposits are based on the length of the session]',
  cancellation: '[CONFIRM: cancellation notice period, and whether the deposit is kept]',
  reschedule: '[CONFIRM: rescheduling policy]',
  age: '[CONFIRM: whether to state 18+. The current policies say legal age with photo ID, and do not print a number]',
  consentForm: '[CONFIRM: consent form link, or in-shop only]',
  aftercare: '[CONFIRM: these aftercare instructions are copied from the current site — confirm they are still what the artists tell clients]',
  googleReview: '[CONFIRM: Google Business Profile review link for the “Leave us a Google review” button]',
  googleMaps: '[CONFIRM: Google Maps listing link for the “Read all our Google reviews” button]',
  giftCard:
    '[CONFIRM: gift card amounts, how to buy, expiry, and which artists accept them. The current site does not list an offer]',
  anyArtist:
    '[CONFIRM: "Any artist / not sure" opens Coco\'s calendar until Ryan picks a default intake]',
  cocoPhotos:
    '[CONFIRM: which artist these photos belong to — on the current site they sit on Coco\'s page, and the file titles say "Surya5"]',
  bio: (name: string) => `[CONFIRM: bio for ${name}]`,
  styles: (name: string) => `[CONFIRM: styles ${name} is booked for]`,
} as const;

const portraits = import.meta.glob<ImageMetadata>('../assets/artists/*.jpg', {
  eager: true,
  import: 'default',
});

const work = import.meta.glob<ImageMetadata>('../assets/work/**/*.jpg', {
  eager: true,
  import: 'default',
});

function byId(map: Record<string, ImageMetadata>, id: string): ImageMetadata {
  const key = Object.keys(map).find((k) => k.endsWith(`/${id}.jpg`));
  if (!key) throw new Error(`Missing image ${id}`);
  return map[key];
}

export function portrait(id: string): ImageMetadata {
  return byId(portraits, id);
}

export function gallery(folder: string): ImageMetadata[] {
  return Object.entries(work)
    .filter(([key]) => key.includes(`/work/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, img]) => img);
}

export interface Artist {
  id: string;
  name: string;
  aka?: string;
  role: string;
  roleNote?: string;
  rateLabel: string;
  rateShort: string;
  bookable: boolean;
  slug: string;
  widget?: string;
  portraitAlt: string;
  bio: string;
  styles: string;
}

export const artists: Artist[] = [
  {
    id: 'coco',
    name: 'Coco',
    role: 'Owner & Artist',
    rateLabel: '$200/h',
    rateShort: '$200/h',
    bookable: true,
    slug: 'cocobookings',
    widget: 'https://link.aureliusgrow.com/widget/group/22vJhcRYmUxGw5A3qyrO',
    portraitAlt: 'Portrait of Coco, owner and artist at Fearless Tattoos',
    bio: confirm.bio('Coco'),
    styles: confirm.styles('Coco'),
  },
  {
    id: 'surya',
    name: 'Surya',
    role: 'Head Artist',
    rateLabel: '$175/h',
    rateShort: '$175/h',
    bookable: true,
    slug: 'suryabookings',
    widget: 'https://link.aureliusgrow.com/widget/group/SPBYrY9sCKgzo0kNzZw1',
    portraitAlt: 'Portrait of Surya, head artist at Fearless Tattoos',
    bio: confirm.bio('Surya'),
    styles: confirm.styles('Surya'),
  },
  {
    id: 'tristan',
    name: 'Tristan',
    aka: 'MoonDog',
    role: 'Senior Artist',
    rateLabel: '$150/h',
    rateShort: '$150/h',
    bookable: true,
    slug: 'tristanbookings',
    widget: 'https://link.aureliusgrow.com/widget/group/HvUKYv0N6RreXai8Impu',
    portraitAlt: 'Portrait of Tristan, also known as MoonDog, senior artist at Fearless Tattoos',
    bio: confirm.bio('Tristan'),
    styles: confirm.styles('Tristan'),
  },
  {
    id: 'emillia',
    name: 'Emillia',
    role: 'Junior Artist',
    rateLabel: '$100/h',
    rateShort: '$100/h',
    bookable: true,
    slug: 'emilliabookings',
    widget: 'https://link.aureliusgrow.com/widget/group/GEWumYuNrV5Ot4uzhd5n',
    portraitAlt: 'Portrait of Emillia, junior artist at Fearless Tattoos',
    bio: confirm.bio('Emillia'),
    styles: confirm.styles('Emillia'),
  },
  {
    id: 'ann',
    name: 'Ann',
    role: 'Apprentice',
    roleNote: confirm.annRole,
    rateLabel: 'Not accepting appointments',
    rateShort: 'Coming soon',
    bookable: false,
    slug: 'annbookings',
    portraitAlt: 'Portrait of Ann at Fearless Tattoos',
    bio: confirm.bio('Ann'),
    styles: confirm.styles('Ann'),
  },
];

export const bookableArtists = artists.filter((artist) => artist.bookable);

export const shop = {
  name: 'Fearless Tattoos',
  phoneDisplay: '613-900-5996',
  phoneTel: '+16139005996',
  email: 'coco@fearlesstattoos.com',
  area: 'Bells Corners, Ottawa, ON',
  walkInMinimum: '$100 + tax',
  walkInWindow: '12pm–5pm',
  averageHourly: '$150/h',
  averageNote: 'Artist dependent',
  callAhead: 'For walk-ins between 5pm and 7pm on weekdays and Saturdays, call ahead.',
  instagram: 'https://www.instagram.com/fearlesstattoosottawa',
  facebook: 'https://www.facebook.com/FearLessTattoosOttawa',
  instagramHandle: '@fearlesstattoosottawa',
};

export interface HourRow {
  day: string;
  time: string;
  note?: string;
}

export const shopHours: HourRow[] = [
  { day: 'Weekdays', time: 'Opens 12pm', note: confirm.weekdayClose },
  { day: 'Saturday', time: '12pm–7pm' },
  { day: 'Sunday', time: confirm.sunday },
];

export const walkInHours: HourRow[] = [
  { day: 'Walk-ins', time: '12pm–5pm' },
  { day: 'Minimum', time: '$100 + tax' },
  { day: 'Call ahead', time: '5pm–7pm on weekdays and Saturdays' },
];

export const reviews = [
  { text: 'Amazing artist and work. Great service and Coco is fantastic.', name: 'David Lavictoire' },
  { text: 'Very painless and good quality.', name: 'Gurlaal Randhawa' },
  { text: 'Clean, welcoming, professional, and the final result turned out better than I imagined.', name: 'Mark Davis' },
  { text: '10/10 would recommend.', name: 'Ashley Billings' },
];

export const bookingSteps = [
  { title: 'Send your idea', text: 'Tell us the idea, the placement, and share reference photos.' },
  { title: 'Get a quote within 48 hours', text: 'The artist replies with a quote for the piece.' },
  { title: 'Pay a deposit to lock the date', text: 'A deposit holds the appointment. The amount depends on the session.' },
];

/** Channel recipes for bios, QR codes, and auto-replies. They point at /book/. */
export const trackingRecipes = [
  { name: 'Instagram bio', query: 'utm_source=instagram&utm_medium=bio&utm_campaign=evergreen' },
  { name: 'Instagram post or flash day', query: 'utm_source=instagram&utm_medium=post&utm_campaign={post-or-flash-day-name}' },
  { name: 'Facebook page', query: 'utm_source=facebook&utm_medium=page&utm_campaign=evergreen' },
  { name: 'Google Business Profile', query: 'utm_source=google&utm_medium=business_profile&utm_campaign=evergreen' },
  { name: 'Instagram DM auto-reply', query: 'utm_source=instagram&utm_medium=dm_autoreply&utm_campaign=evergreen' },
  { name: 'Missed-call text', query: 'utm_source=sms&utm_medium=missed_call&utm_campaign=evergreen' },
  { name: 'Walk-in QR on the counter', query: 'utm_source=qr&utm_medium=print&utm_campaign=shop_counter' },
];

export const featuredWork: { folder: string; index: number; alt: string; path: string }[] = [
  { folder: 'coco', index: 0, path: '/cocobookings/', alt: 'Portfolio photo from Coco’s page at Fearless Tattoos in Ottawa' },
  { folder: 'surya', index: 0, path: '/suryabookings/', alt: 'Portfolio photo from Surya’s page at Fearless Tattoos in Ottawa' },
  { folder: 'tristan', index: 0, path: '/tristanbookings/', alt: 'Portfolio photo from Tristan’s page at Fearless Tattoos in Ottawa' },
  { folder: 'emillia', index: 0, path: '/emilliabookings/', alt: 'Portfolio photo from Emillia’s page at Fearless Tattoos in Ottawa' },
  { folder: 'coco', index: 1, path: '/cocobookings/', alt: 'Second portfolio photo from Coco’s page at Fearless Tattoos in Ottawa' },
  { folder: 'surya', index: 1, path: '/suryabookings/', alt: 'Second portfolio photo from Surya’s page at Fearless Tattoos in Ottawa' },
  { folder: 'tristan', index: 1, path: '/tristanbookings/', alt: 'Second portfolio photo from Tristan’s page at Fearless Tattoos in Ottawa' },
  { folder: 'emillia', index: 1, path: '/emilliabookings/', alt: 'Second portfolio photo from Emillia’s page at Fearless Tattoos in Ottawa' },
];

export function featuredImage(item: { folder: string; index: number }): ImageMetadata {
  const images = gallery(item.folder);
  const image = images[item.index];
  if (!image) throw new Error(`Missing featured image ${item.folder} ${item.index}`);
  return image;
}

export const aftercare = {
  intro:
    'Every artist and client may have a slightly different approach to healing, but in North America these are the three most widely used and trusted aftercare methods. Always follow the advice of your tattoo artist.',
  methods: [
    {
      title: '1. Second skin / Saniderm method',
      steps: [
        'Leave the medical adhesive bandage (Saniderm, Tegaderm, or similar) on for 24–48 hours.',
        'Remove gently under warm running water.',
        'Wash with mild, fragrance-free soap and pat dry.',
        'Apply a fresh piece of second skin for another 3–5 days.',
        'After removing the final bandage, moisturize lightly until fully healed.',
      ],
      pros: 'Waterproof, breathable, protects from bacteria, minimal maintenance.',
      cons: 'May cause irritation for sensitive skin, more costly.',
    },
    {
      title: '2. Traditional bandage (cling wrap)',
      bestFor: 'Larger tattoos, artists who prefer traditional aftercare.',
      steps: [
        'Keep the initial bandage on for 4–6 hours.',
        'Remove, wash gently with mild soap, pat dry.',
        'Apply a thin layer of aftercare ointment (Aquaphor, A&D ointment, or tattoo balm).',
        'Re-wrap with plastic wrap for the first 1–2 nights (to avoid sticking to sheets).',
        'After that, keep the tattoo clean, moisturized, and uncovered.',
      ],
      pros: 'Common, affordable, keeps the tattoo protected early on.',
      cons: 'Requires frequent cleaning and rewrapping, higher chance of over-moisturizing.',
    },
    {
      title: '3. Dry healing',
      bestFor: 'People with sensitive skin or who prefer a natural approach.',
      steps: [
        'Remove the bandage after 2–6 hours.',
        'Wash with fragrance-free soap, pat dry, and leave unwrapped.',
        'Do not apply ointment; allow the tattoo to heal naturally.',
        'Keep the tattoo clean, avoid scratching, and protect it from sun and friction.',
      ],
      pros: 'No products needed, avoids the risk of clogged pores.',
      cons: 'Higher chance of scabbing, more discomfort during healing.',
    },
  ],
  rules: [
    'Wash hands thoroughly before cleaning your tattoo.',
    'Clean the tattoo 2–3 times a day.',
    'Avoid soaking (baths, swimming, hot tubs) until fully healed.',
    'Wear loose clothing to prevent rubbing.',
    'Never pick, scratch, or peel scabs.',
    'Protect healed tattoos with sunscreen (SPF 30+).',
  ],
};

export const policies = {
  termsIntro:
    'Welcome to FearLess Tattoos! Before proceeding with any tattoo procedure at our studio, please carefully review the following terms of service:',
  terms: [
    {
      title: 'Assumption of risks',
      body: 'By receiving a tattoo at FearLess Tattoos, you acknowledge and accept the inherent risks associated with tattooing, including but not limited to infection, scarring, allergic reactions, and difficulties in melanoma detection. You understand that despite the utmost care taken by our artist/s, these risks exist and may vary depending on individual factors.',
    },
    {
      title: 'Waiver and release',
      body: 'You hereby release FearLess Tattoos and its artists from any and all liability for personal injury or damages resulting from the tattoo procedure, whether caused by negligence, inherent risks, or otherwise. This release extends to any claims or causes of action, including direct and consequential damages, that may arise from the procedure and application of your tattoo.',
    },
    {
      title: 'Informed consent',
      body: 'FearLess Tattoos provides ample opportunity for clients to ask questions regarding the tattoo procedure, ensuring that all queries are satisfactorily answered before proceeding. Our artist/s are committed to providing you with detailed information about the process, risks, aftercare, and any other aspects related to your tattoo.',
    },
    {
      title: 'Aftercare instructions',
      body: 'Clients agree to follow the aftercare instructions provided by FearLess Tattoos for proper healing of the tattoo. Any touch-up work required due to negligence on the client’s part will be at their own expense. It is crucial to adhere to these instructions to minimize the risk of infection and promote optimal healing.',
    },
    {
      title: 'Health conditions',
      body: 'Clients confirm that they do not have any medical or skin conditions that may interfere with the tattoo procedure or healing process. Additionally, clients declare that they are not under the influence of alcohol or drugs during the tattooing process, as it may compromise safety and judgment.',
    },
    {
      title: 'Permanent change',
      body: 'Clients understand that a tattoo is a permanent alteration to their appearance and can only be removed through laser or surgical means, which may be costly and may not fully restore the skin’s original appearance. It is essential to consider the permanence of tattoos and choose designs carefully.',
    },
    {
      title: 'Photographic consent',
      body: 'Clients grant FearLess Tattoos permission to take photographs of them and their tattoos, and consent to their reproduction in print or electronic form for promotional and portfolio purposes. However, clients have the option to decline photographic consent by notifying the studio in advance.',
    },
    {
      title: 'No refund policy',
      body: 'Clients acknowledge and agree to FearLess Tattoos’s no refund policy on tattoos, piercings, and retail sales. Once a service or product is rendered, refunds will not be provided, except as required by law.',
    },
    {
      title: 'Attorney’s fees',
      body: 'In the event of legal action against FearLess Tattoos or its artist/s, clients agree to reimburse them for any attorney’s fees and costs incurred, should they prevail. This provision aims to ensure fair compensation for any legal expenses arising from disputes.',
    },
    {
      title: 'Jurisdiction',
      body: 'Any disputes arising from this agreement shall be governed by the courts of Ontario, Canada, with exclusive jurisdiction in Ottawa. By receiving a tattoo at FearLess Tattoos, clients submit to the jurisdiction and venue of these courts for the resolution of any disputes.',
    },
    {
      title: 'Severability',
      body: 'If any provision of this agreement is deemed unenforceable, the remaining provisions shall remain valid and enforceable to the fullest extent permitted by law.',
    },
    {
      title: 'Legal capacity',
      body: 'By receiving a tattoo at FearLess Tattoos, clients confirm that they are of legal age, competent to sign this agreement, and have provided valid proof of age and identification. This ensures that clients have the legal capacity to enter into a binding contract for tattoo services.',
    },
  ],
  privacyIntro:
    'At FearLess Tattoos, we are committed to protecting your privacy. This privacy policy outlines how we collect, use, and safeguard your personal information:',
  privacy: [
    {
      title: 'Information collection',
      body: 'We may collect personal information from clients, including but not limited to full name, address, date of birth, telephone number, email address, and form of identification. This information is collected solely for the purpose of providing tattoo services and communicating with clients regarding appointments, aftercare instructions, and studio updates.',
    },
    {
      title: 'Use of information',
      body: 'Personal information collected is used solely for the purposes stated above and is not shared with third parties for marketing or advertising purposes. We take measures to ensure that your personal information is securely stored and protected from unauthorized access, alteration, disclosure, or destruction.',
    },
    {
      title: 'Photographic consent',
      body: 'Clients grant FearLess Tattoos permission to take photographs of them and their tattoos, and consent to their reproduction in print or electronic form for promotional and portfolio purposes, unless otherwise indicated. Clients have the option to decline photographic consent by notifying the studio in advance.',
    },
    {
      title: 'Retention of information',
      body: 'We retain client personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. Clients have the right to access, correct, or delete their personal information held by FearLess Tattoos. Requests for such actions can be made by contacting us directly.',
    },
    {
      title: 'Third-party disclosure',
      body: 'We do not sell, trade, or otherwise transfer client personal information to third parties unless required by law or for the purpose of legal proceedings. We may disclose personal information if necessary to comply with legal obligations, enforce our policies, or protect the rights, property, or safety of ourselves or others.',
    },
    {
      title: 'Changes to policy',
      body: 'FearLess Tattoos reserves the right to update or modify this privacy policy at any time. By receiving a tattoo at FearLess Tattoos, clients acknowledge and agree to the terms outlined in this privacy policy.',
    },
  ],
};

export interface Faq {
  question: string;
  answer: string;
  link?: string;
  linkLabel?: string;
}

export const faqs: Faq[] = [
  {
    question: 'How do I book a tattoo in Ottawa at Fearless?',
    answer:
      'Pick an artist, send your idea and reference photos, get a quote within 48 hours, then pay a deposit to lock the date. You can also call or text 613-900-5996.',
  },
  {
    question: 'Do you take walk-ins?',
    answer: 'Yes. The walk-in minimum is $100 plus tax. Shop hours and walk-in hours are in the hours table.',
    link: '/#hours',
    linkLabel: 'See the hours table',
  },
  {
    question: 'What are the Sunday hours?',
    answer: confirm.sunday,
  },
  {
    question: 'How do deposits work?',
    answer: `The current site says deposits are based on the length of the session. ${confirm.deposit}`,
  },
  {
    question: 'What is the age and ID policy?',
    answer: `The studio policies say you must be of legal age, competent to sign, and provide valid proof of age and identification. ${confirm.age}`,
  },
  {
    question: 'What is the cancellation policy?',
    answer: confirm.cancellation,
  },
  {
    question: 'Can I reschedule?',
    answer: confirm.reschedule,
  },
  {
    question: 'Do you refund tattoos?',
    answer:
      'The current terms say there are no refunds on tattoos, piercings, or retail sales once a service or product is rendered, except as required by law. Touch-up work caused by the client’s negligence is at the client’s expense.',
  },
];
