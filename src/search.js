import got from 'got'
import { application } from './library/normalize.js'
import iso from 'iso-3166-1'

/**
 * @param {Object} param0
 * @param {String} param0.term - Search text
 * @param {String} [param0.country] - Country
 * @param {import("got").Options} [options={}] - Got package options.
 */
export default async function search({ term, country = 'US' }, options = {}) {
  const iso_normalized = iso.whereAlpha2(country)

  if (!iso_normalized) {
    throw new Error(`Invalid country id`)
  }

  const { body } = await got('https://itunes.apple.com/search', {
    method: 'GET',
    searchParams: {
      term,
      country: iso_normalized.alpha2,
      entity: 'software',
    },
    responseType: 'json',
    ...options,
  })

  if (body.resultCount === 0) {
    return []
  }

  if (!Array.isArray(body.results)) {
    throw new Error(`Response expectation failed from Apple servers.`)
  }

  return body.results.map(application)
}
