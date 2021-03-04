import { markets } from './library/fixtures.js'
import { parseRatings } from './library/parser.js'
import got from 'got'

export default async function ratings({ id, country }) {
  const storeId = (country && markets[country.toUpperCase()]) || '143441'
  const url = `https://itunes.apple.com/${country.toUpperCase()}/customer-reviews/id${id}`

  const { body } = await got.get(url, {
    searchParams: {
      'displayable-kind': 11,
    },
    headers: {
      'X-Apple-Store-Front': `${storeId},12`,
    },
  })

  if (body.length === 0) {
    throw new Error(`Application not found`)
  }

  return parseRatings(body)
}
