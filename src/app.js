import got from 'got'
import { application } from './library/normalize.js'
import ratings from './ratings.js'
import iso from 'iso-3166-1'

/**
 * @param {Object} param0
 * @param {String|Number} param0.id - Application id
 * @param {String} [param0.country] - Country
 * @param {String} [param0.language=en] - Country
 * @param {Boolean} [param0.include_ratings=false] - Should include ratings
 * @param {import("got").Options} [options={}] - Got package options.
 */
export default async function app(
  { id, country = 'US', language = 'en', include_ratings = false },
  options = {},
) {
  const iso_normalized = iso.whereAlpha2(country)

  if (!iso_normalized) {
    throw new Error(`Invalid country id`)
  }

  const { body } = await got('https://itunes.apple.com/lookup', {
    method: 'GET',
    searchParams: {
      id,
      country: iso_normalized.alpha2,
      entity: 'software',
      lang: language,
    },
    responseType: 'json',
    ...options,
  })

  if (body.resultCount === 0) {
    throw new Error(`Application not found`)
  }

  if (!Array.isArray(body.results)) {
    throw new Error(`Response expectation failed from Apple servers.`)
  }

  const normalized = application(body.results[0])

  if (include_ratings) {
    return Object.assign(
      {},
      normalized,
      await ratings({ id, country: iso_normalized.alpha2 }),
    )
  }

  return normalized
}
