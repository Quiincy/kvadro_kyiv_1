import type { Payload } from 'payload'
import path from 'path'
import fs from 'fs'
import {
  defaultFleet,
  defaultSteps,
  defaultRoutes,
  defaultReviews,
  defaultSettings,
} from './defaultData'

export const defaultFaqItems = [
  {
    question: 'Чи можна орендувати квадроцикл без водійських прав?',
    answer:
      'Так, на наших закритих лісових трасах посвідчення водія не обов’язкове. Маршрути проходять лісовими спецтрасами. Перед виїздом інструктор навчає безпечному керуванню за 10 хвилин, чого достатньо для легкого старту.',
    order: 1,
    isArticle: true,
    articleBadge: 'Гід для початківців',
  },
  {
    question: 'Що одягнути на заїзд лісовими трасами?',
    answer:
      'Одягайте зручний закритий одяг та кросівки. Ми безкоштовно надаємо чисте фірмове захисне джерсі, шолом, підшоломник, захисні окуляри та рукавички.',
    order: 2,
    isArticle: true,
    articleBadge: 'Безпека та екіп',
  },
  {
    question: 'Чи можна кататися вдвох на одному квадроциклі?',
    answer:
      'Так, наші квадроцикли та баггі розраховані на двох пасажирів (загальна вага до 160-180 кг). Доплата за пасажира становить від 400 до 500 грн/година залежно від техніки.',
    order: 3,
    isArticle: true,
    articleBadge: 'Двомісні тури',
  },
  {
    question: 'Чи проводите ви заїзди під час дощу?',
    answer:
      'Дощ робить трасу ще більш екстремальною та веселою! У дощову погоду ми безкоштовно надаємо спеціальні водонепроникні дощовики та бахіли.',
    order: 4,
    isArticle: false,
    articleBadge: '',
  },
  {
    question: 'Як працює знижка -10% у подарункових сертифікатах?',
    answer:
      'У кожному нашому подарунковому сертифікаті міститься персональна картка з довічною знижкою -10% на всі наступні заїзди для власника та його компанії!',
    order: 5,
    isArticle: false,
    articleBadge: '',
  },
]

export async function seedDatabase(payload: Payload, force = false) {
  const results = {
    media: 0,
    fleet: 0,
    steps: 0,
    routes: 0,
    reviews: 0,
    faqs: 0,
    settings: false,
  }

  // 0. Media Collection
  try {
    const galleryFiles = [
      { file: '1p.webp', alt: 'Спортивне 2-місне баггі в лісі (Баггі експедиції)', caption: 'Потужні заїзди на баггі по бездоріжжю' },
      { file: '6j.webp', alt: 'Лінійка кросових мотоциклів Kayo (Ендуро мото треки)', caption: 'Ендуро мото треки та піщані кар\'єри' },
      { file: '16j.webp', alt: 'Колона квадроциклів на лісовому маршруті (Групові заїзди)', caption: 'Лісовий масив Дарницького лісництва' },
      { file: 'img2.webp', alt: 'Корпоративна група на базі KVADRO KYIV1', caption: 'Незабутні свята та драйвовий тімбілдінг' },
      { file: '5j.webp', alt: 'Фотосесія на квадроциклах у золотому лісі', caption: 'Яскраві фотозони на схилах Бортничів' },
      { file: '13j.webp', alt: 'Романтична прогулянка на квадроциклі', caption: 'Заходи сонця над сосновим бором' },
      { file: '3j.webp', alt: 'Сімейне катання на баггі', caption: 'Сімейні поїздки на безпечному баггі' },
      { file: 'img11.webp', alt: 'Ендуро треки на піщаному кар\'єрі', caption: 'Екстремальний ендуро маршрут' },
      { file: '14j.webp', alt: 'Команда друзів на квадроциклах', caption: 'Драйвові покатушки з друзями' },
      { file: '15j.webp', alt: 'Райдер на пітбайку в сосновому бору', caption: 'Одиночні тренування на мотоциклі' },
      { file: 'img3.webp', alt: 'Лісова стежка з колоною техніки', caption: 'Мальовничі лісові просіки' },
      { file: 'img5.webp', alt: 'Стартова лінійка квадроциклів біля бази', caption: 'Підготовка до виїзду на базу' },
    ]

    const galleryDir = path.resolve(process.cwd(), 'public/assets/gallery')
    for (const item of galleryFiles) {
      const filePath = path.join(galleryDir, item.file)
      if (!fs.existsSync(filePath)) continue

      const existing = await payload.find({
        collection: 'media',
        where: {
          filename: {
            equals: item.file,
          },
        },
      })

      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'media',
          data: {
            alt: item.alt,
            caption: item.caption,
          },
          filePath,
        })
        results.media++
      }
    }
  } catch (err) {
    console.error('Error seeding media:', err)
  }

  // 1. Site Settings Global
  try {
    const existingSettings = await payload.findGlobal({
      slug: 'site-settings',
    })
    if (!existingSettings || !existingSettings.phone || force) {
      await payload.updateGlobal({
        slug: 'site-settings',
        data: {
          phone: defaultSettings.phone,
          phoneRaw: defaultSettings.phoneRaw,
          telegram: defaultSettings.telegram,
          telegramUsername: defaultSettings.telegramUsername,
          instagram: defaultSettings.instagram,
          instagramUsername: defaultSettings.instagramUsername,
          address: defaultSettings.address,
          addressShort: defaultSettings.addressShort,
          googleMapsUrl: defaultSettings.googleMapsUrl,
          workingHours: defaultSettings.workingHours,
          individualSurchargePerHour: defaultSettings.individualSurchargePerHour,
          freeDrinksText: defaultSettings.freeDrinksText,
        },
      })
      results.settings = true
    }
  } catch (err) {
    console.error('Error seeding site-settings:', err)
  }

  // 2. Fleet Collection
  try {
    for (let i = 0; i < defaultFleet.length; i++) {
      const item = defaultFleet[i]
      const existing = await payload.find({
        collection: 'fleet',
        where: { slug: { equals: item.id } },
        limit: 1,
      })
      if (existing.totalDocs > 0) {
        // Always sync price2h for buggy or if force
        if (force || item.id === 'buggy') {
          await payload.update({
            collection: 'fleet',
            id: existing.docs[0].id,
            data: {
              price1h: item.price1h || null,
              price2h: item.price2h,
              price3h: item.price3h || null,
              passengerPrice: item.passengerPrice || null,
            },
          })
          results.fleet++
        }
      } else {
        await payload.create({
          collection: 'fleet',
          data: {
            slug: item.id,
            title: item.title,
            badge: item.badge,
            description: item.description,
            order: i + 1,
            isPopular: Boolean(item.isPopular),
            icon: item.icon as any,
            price1h: item.price1h || null,
            price2h: item.price2h,
            price3h: item.price3h || null,
            passengerPrice: item.passengerPrice || null,
            features: item.features.map((f) => ({ text: f })),
            specs: item.specs.map((s) => ({ text: s })),
          },
        })
        results.fleet++
      }
    }

    // Clear any stale locks from the database
    if (payload.collections?.['payload-locked-documents']) {
      await payload.delete({
        collection: 'payload-locked-documents',
        where: { id: { exists: true } },
      })
    }
  } catch (err) {
    console.error('Error seeding fleet:', err)
  }

  // 3. Steps Collection
  try {
    const { totalDocs: stepsCount } = await payload.count({
      collection: 'steps',
    })
    if (stepsCount === 0 || force) {
      if (force && stepsCount > 0) {
        await payload.delete({
          collection: 'steps',
          where: { id: { exists: true } },
        })
      }
      for (const step of defaultSteps) {
        await payload.create({
          collection: 'steps',
          data: {
            stepNumber: step.number,
            title: step.title,
            badge: step.badge,
            description: step.description,
            icon: step.icon,
          },
        })
        results.steps++
      }
    }
  } catch (err) {
    console.error('Error seeding steps:', err)
  }

  // 4. Routes Collection
  try {
    const { totalDocs: routesCount } = await payload.count({
      collection: 'routes',
    })
    if (routesCount === 0 || force) {
      if (force && routesCount > 0) {
        await payload.delete({
          collection: 'routes',
          where: { id: { exists: true } },
        })
      }
      for (let i = 0; i < defaultRoutes.length; i++) {
        const route = defaultRoutes[i]
        const filename = path.basename(route.image)
        let mediaId: number | undefined
        const foundMedia = await payload.find({
          collection: 'media',
          where: { filename: { equals: filename } },
        })
        if (foundMedia.docs.length > 0) {
          mediaId = foundMedia.docs[0].id as number
        }

        await payload.create({
          collection: 'routes',
          data: {
            title: route.title,
            category: route.category,
            categoryLabel: route.categoryLabel,
            description: route.description,
            imageUrl: route.image,
            ...(mediaId ? { imageMedia: mediaId } : {}),
            order: i + 1,
          },
        })
        results.routes++
      }
    }
  } catch (err) {
    console.error('Error seeding routes:', err)
  }

  // 5. Reviews Collection
  try {
    const { totalDocs: reviewsCount } = await payload.count({
      collection: 'reviews',
    })
    if (reviewsCount === 0 || force) {
      if (force && reviewsCount > 0) {
        await payload.delete({
          collection: 'reviews',
          where: { id: { exists: true } },
        })
      }
      for (const rev of defaultReviews) {
        await payload.create({
          collection: 'reviews',
          data: {
            author: rev.author,
            rating: rev.rating,
            text: rev.text,
            verified: rev.verified,
            date: rev.date,
          },
        })
        results.reviews++
      }
    }
  } catch (err) {
    console.error('Error seeding reviews:', err)
  }

  // 6. Faqs Collection
  try {
    const { totalDocs: faqsCount } = await payload.count({
      collection: 'faqs',
    })
    if (faqsCount === 0 || force) {
      if (force && faqsCount > 0) {
        await payload.delete({
          collection: 'faqs',
          where: { id: { exists: true } },
        })
      }
      for (const faq of defaultFaqItems) {
        await payload.create({
          collection: 'faqs',
          data: {
            question: faq.question,
            answer: faq.answer,
            order: faq.order,
            isArticle: faq.isArticle,
            articleBadge: faq.articleBadge,
          },
        })
        results.faqs++
      }
    }
  } catch (err) {
    console.error('Error seeding faqs:', err)
  }

  return results
}
