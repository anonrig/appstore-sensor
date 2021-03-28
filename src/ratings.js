import got from 'got'
import iso from 'iso-3166-1'

/**
 * @param {Object} param0
 * @param {String|Number} param0.id - Application id
 * @param {String} [param0.country] - Country
 * @param {import("got").Options} [options={}] - Got package options.
 */
export default async function ratings({ id, country }, options = {}) {
  const iso_normalized = iso.whereAlpha2(country ?? 'US')

  if (!iso_normalized) {
    throw new Error(`Invalid country id`)
  }

  const url = `https://apps.apple.com/${iso_normalized.alpha2}/app/id${id}`
  const { body } = await got(url, {
    method: 'GET',
    searchParams: {
      dataOnly: true,
    },
    responseType: 'json',
    ...options,
  })

  if (body.length === 0) {
    throw new Error(`Application not found`)
  }

  // eslint-disable-next-line security/detect-object-injection
  const { ratingCount, ratingCountList } = body.storePlatformData[
    'webexp-product'
  ].results[id].userRating

  return {
    ratings: ratingCount,
    histogram: ratingCountList,
  }
}
