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
      const { totalDocs: fleetCount } = await payload.count({ collection: 'fleet' })
      if (fleetCount === 0) {
        await seedDatabase(payload)
      }
    } catch (seedErr) {
      console.warn('Auto-seed check error:', seedErr)
    }

    // 1. Fetch SiteSettings
    let settings = defaultSettings
    try {
      const dbSettings = await payload.findGlobal({ slug: 'site-settings' })
      if (dbSettings) {
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
    } catch (e) {
      console.warn('Could not load site-settings from DB, using fallback:', e)
    }

    // 2. Fetch Fleet
    let fleet: FleetItem[] = defaultFleet
    try {
      const dbFleet = await payload.find({
        collection: 'fleet',
        sort: 'order',
        limit: 100,
      })
      if (dbFleet.docs.length > 0) {
        fleet = dbFleet.docs.map((doc: any) => ({
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
    } catch (e) {
      console.warn('Could not load fleet from DB, using fallback:', e)
    }

    // 3. Fetch Steps
    let steps: StepItem[] = defaultSteps
    try {
      const dbSteps = await payload.find({
        collection: 'steps',
        sort: 'stepNumber',
        limit: 100,
      })
      if (dbSteps.docs.length > 0) {
        steps = dbSteps.docs.map((doc: any) => ({
          number: doc.stepNumber,
          title: doc.title,
          badge: doc.badge || '',
          description: doc.description,
          icon: doc.icon || 'Compass',
        }))
      }
    } catch (e) {
      console.warn('Could not load steps from DB, using fallback:', e)
    }

    // 4. Fetch Routes
    let routes: RouteItem[] = defaultRoutes
    try {
      const dbRoutes = await payload.find({
        collection: 'routes',
        sort: 'order',
        limit: 100,
      })
      if (dbRoutes.docs.length > 0) {
        routes = dbRoutes.docs.map((doc: any) => {
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
    } catch (e) {
      console.warn('Could not load routes from DB, using fallback:', e)
    }

    // 5. Fetch Reviews
    let reviews: ReviewItem[] = defaultReviews
    try {
      const dbReviews = await payload.find({
        collection: 'reviews',
        sort: '-createdAt',
        limit: 100,
      })
      if (dbReviews.docs.length > 0) {
        const bgGradients = [
          'from-orange-500 to-amber-600',
          'from-emerald-500 to-teal-600',
          'from-blue-500 to-indigo-600',
          'from-purple-500 to-pink-600',
        ]
        reviews = dbReviews.docs.map((doc: any, idx: number) => ({
          author: doc.author,
          rating: doc.rating || 5,
          text: doc.text,
          date: doc.date || 'Нещодавно',
          verified: doc.verified ?? true,
          avatarBg: bgGradients[idx % bgGradients.length],
        }))
      }
    } catch (e) {
      console.warn('Could not load reviews from DB, using fallback:', e)
    }

    // 6. Fetch FAQs
    let faqs: FaqItem[] = defaultFaqs
    try {
      const dbFaqs = await payload.find({
        collection: 'faqs',
        sort: 'order',
        limit: 100,
      })
      if (dbFaqs.docs.length > 0) {
        faqs = dbFaqs.docs.map((doc: any) => ({
          q: doc.question,
          a: doc.answer,
          isArticle: Boolean(doc.isArticle),
          articleBadge: doc.articleBadge || '',
        }))
      }
    } catch (e) {
      console.warn('Could not load faqs from DB, using fallback:', e)
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
