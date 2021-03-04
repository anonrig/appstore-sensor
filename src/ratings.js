import got from 'got'
import iso from 'iso-3166-1'
import { markets } from './library/fixtures.js'
import { parseRatings } from './library/parser.js'

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

  const storeId = markets[iso_normalized.alpha2.toUpperCase()] || '143441'
  const url = `https://itunes.apple.com/${iso_normalized.alpha2}/customer-reviews/id${id}`
  const { body } = await got(url, {
    method: 'GET',
    searchParams: {
      'displayable-kind': 11,
    },
    headers: {
      'X-Apple-Store-Front': `${storeId},12`,
    },
    ...options,
  })

  if (body.length === 0) {
    throw new Error(`Application not found`)
  }

  return parseRatings(body)
}
