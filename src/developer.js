import got from 'got'
import iso from 'iso-3166-1'
import { application } from './library/normalize.js'

/**
 * @param {Object} param0
 * @param {String|Number} param0.id - Application id
 * @param {String} [param0.country] - Country
 * @param {String} [param0.language=en] - Country
 * @param {import("got").Options} [options={}] - Got package options.
 */
export default async function developer(
  { id, country = 'US', language = 'en' },
  options = {},
) {
  const iso_normalized = iso.whereAlpha2(country)

  if (!iso_normalized) {
    throw new Error(`Invalid country id`)
  }

  if (!id) {
    throw new Error(`Id is required`)
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

  if (body.length === 0) {
    throw new Error(`Developer not found`)
  }

  return {
    account: body.results[0],
    applications:
      body.resultCount === 0
        ? []
        : body.results.slice(1, body.results.length - 1).map(application),
  }
}
