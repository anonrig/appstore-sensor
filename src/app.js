import got from 'got/dist/source'
import { application } from './library/normalize.js'
import ratings from './ratings.js'

export default async function app({
  id,
  country = 'US',
  language = 'en',
  include_ratings = false,
}) {
  const { body } = await got.get('https://itunes.apple.com/lookup', {
    searchParams: {
      id,
      country,
      entity: 'software',
      lang: language,
    },
    responseType: 'json',
  })

  if (body.resultCount === 0) {
    throw new Error(`Application not found`)
  }

  if (!Array.isArray(body.results)) {
    throw new Error(`Response expectation failed from Apple servers.`)
  }

  const normalized = application(body.results[0])

  if (include_ratings) {
    return Object.assign({}, normalized, await ratings({ id, country }))
  }

  return normalized
}
