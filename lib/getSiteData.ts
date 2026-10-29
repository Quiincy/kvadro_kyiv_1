import { getPayload } from 'payload'
import config from '@payload-config'
import {
  defaultSettings,
  defaultFleet,
  defaultSteps,
  defaultRoutes,
  defaultReviews,
  defaultFaqs,
  FleetItem,
  StepItem,
  RouteItem,
  ReviewItem,
  FaqItem,
} from './defaultData'
import { seedDatabase } from './seed'

export type { FaqItem }

export interface SiteData {
  settings: typeof defaultSettings
  fleet: FleetItem[]
  steps: StepItem[]
  routes: RouteItem[]
  reviews: ReviewItem[]
  faqs: FaqItem[]
}

export async function getSiteData(): Promise<SiteData> {
  try {
    const payload = await getPayload({ config })

    // Auto-seed if fleet is empty
    try {
      const { totalDocs: fleetCount } = await payload.count({
        collection: 'fleet',
        overrideAccess: true,
      })
      if (fleetCount === 0) {
        await seedDatabase(payload)
      }
    } catch (seedErr) {
      console.warn('Auto-seed check error:', seedErr)
    }

    // Run all queries in parallel with overrideAccess: true for maximum performance and reliability
    const [settingsRes, fleetRes, stepsRes, routesRes, reviewsRes, faqsRes] =
      await Promise.allSettled([
        payload.findGlobal({
          slug: 'site-settings',
          overrideAccess: true,
        }),
        payload.find({
          collection: 'fleet',
          sort: 'order',
          limit: 100,
          overrideAccess: true,
        }),
        payload.find({
          collection: 'steps',
          sort: 'stepNumber',
          limit: 100,
          overrideAccess: true,
        }),
        payload.find({
          collection: 'routes',
          sort: 'order',
          limit: 100,
          overrideAccess: true,
        }),
        payload.find({
          collection: 'reviews',
          sort: '-createdAt',
          limit: 100,
          overrideAccess: true,
        }),
        payload.find({
          collection: 'faqs',
          sort: 'order',
          limit: 100,
          overrideAccess: true,
        }),
      ])

    // 1. Settings
    let settings = defaultSettings
    if (settingsRes.status === 'fulfilled' && settingsRes.value) {
      const dbSettings: any = settingsRes.value
      settings = {
        ...defaultSettings,
        phone: dbSettings.phone || defaultSettings.phone,
        phoneRaw: dbSettings.phoneRaw || defaultSettings.phoneRaw,
        telegram: dbSettings.telegram || defaultSettings.telegram,
        telegramUsername: dbSettings.telegramUsername || defaultSettings.telegramUsername,
        instagram: dbSettings.instagram || defaultSettings.instagram,
        instagramUsername: dbSettings.instagramUsername || defaultSettings.instagramUsername,
        address: dbSettings.address || defaultSettings.address,
        addressShort: dbSettings.addressShort || defaultSettings.addressShort,
        googleMapsUrl: dbSettings.googleMapsUrl || defaultSettings.googleMapsUrl,
        workingHours: dbSettings.workingHours || defaultSettings.workingHours,
        individualSurchargePerHour:
          dbSettings.individualSurchargePerHour ?? defaultSettings.individualSurchargePerHour,
        freeDrinksText: dbSettings.freeDrinksText || defaultSettings.freeDrinksText,
      }
    }

    // 2. Fleet
    let fleet: FleetItem[] = defaultFleet
    if (fleetRes.status === 'fulfilled' && fleetRes.value && fleetRes.value.docs.length > 0) {
      fleet = fleetRes.value.docs.map((doc: any) => ({
        id: doc.slug || String(doc.id),
        title: doc.title,
        badge: doc.badge || '',
        description: doc.description || '',
        price1h: doc.price1h ?? undefined,
        price2h: doc.price2h,
        price3h: doc.price3h ?? undefined,
        passengerPrice: doc.passengerPrice ?? undefined,
        isPopular: Boolean(doc.isPopular),
        icon: doc.icon || 'Compass',
        features: Array.isArray(doc.features)
          ? doc.features.map((f: any) => (typeof f === 'string' ? f : f.text)).filter(Boolean)
          : [],
        specs: Array.isArray(doc.specs)
          ? doc.specs.map((s: any) => (typeof s === 'string' ? s : s.text)).filter(Boolean)
          : [],
      }))
    }

    // 3. Steps
    let steps: StepItem[] = defaultSteps
    if (stepsRes.status === 'fulfilled' && stepsRes.value && stepsRes.value.docs.length > 0) {
      steps = stepsRes.value.docs.map((doc: any) => ({
        number: doc.stepNumber,
        title: doc.title,
        badge: doc.badge || '',
        description: doc.description,
        icon: doc.icon || 'Compass',
      }))
    }

    // 4. Routes
    let routes: RouteItem[] = defaultRoutes
    if (routesRes.status === 'fulfilled' && routesRes.value && routesRes.value.docs.length > 0) {
      routes = routesRes.value.docs.map((doc: any) => {
        let image = doc.imageUrl || ''
        if (doc.imageMedia && typeof doc.imageMedia === 'object' && doc.imageMedia.url) {
          image = doc.imageMedia.url
        }
        return {
          id: String(doc.id),
          title: doc.title,
          category: doc.category,
          categoryLabel: doc.categoryLabel || '',
          description: doc.description || '',
          image: image || '/assets/gallery/1p.webp',
        }
      })
    }

    // 5. Reviews
    let reviews: ReviewItem[] = defaultReviews
    if (reviewsRes.status === 'fulfilled' && reviewsRes.value && reviewsRes.value.docs.length > 0) {
      const bgGradients = [
        'from-orange-500 to-amber-600',
        'from-emerald-500 to-teal-600',
        'from-blue-500 to-indigo-600',
        'from-purple-500 to-pink-600',
      ]
      reviews = reviewsRes.value.docs.map((doc: any, idx: number) => ({
        author: doc.author,
        rating: doc.rating || 5,
        text: doc.text,
        date: doc.date || 'Нещодавно',
        verified: doc.verified ?? true,
        avatarBg: bgGradients[idx % bgGradients.length],
      }))
    }

    // 6. FAQs
    let faqs: FaqItem[] = defaultFaqs
    if (faqsRes.status === 'fulfilled' && faqsRes.value && faqsRes.value.docs.length > 0) {
      faqs = faqsRes.value.docs.map((doc: any) => ({
        q: doc.question,
        a: doc.answer,
        isArticle: Boolean(doc.isArticle),
        articleBadge: doc.articleBadge || '',
      }))
    }

    return {
      settings,
      fleet,
      steps,
      routes,
      reviews,
      faqs,
    }
  } catch (err) {
    console.error('getSiteData fallback to defaultData due to error:', err)
    return {
      settings: defaultSettings,
      fleet: defaultFleet,
      steps: defaultSteps,
      routes: defaultRoutes,
      reviews: defaultReviews,
      faqs: defaultFaqs,
    }
  }
}
