import got from 'got'
import { sort } from './library/fixtures.js'
import { reviewList } from './library/normalize.js'

/**
 * @param {Object} param0
 * @param {String|Number} param0.id - Application id
 * @param {Number} [param0.page] - Page number
 * @param {String} [param0.sort_by] - Sort by field; ie. sort.RECENT
 * @param {String} [param0.country] - Country
 * @param {import("got").Options} [options={}] - Got package options.
 */
export default async function reviews(
  { id, page = 1, sort_by = sort.RECENT, country = 'us' },
  options = {},
) {
  if (!id) {
    throw new Error(`Id should be defined`)
  }

  if (page < 0 || page > 10) {
    throw new Error(`Page should be between 1 and 10.`)
  }

  if (!Object.values(sort).includes(sort_by)) {
    throw new Error(
      `Invalid sort field. Proper fields are ${Object.values(sort).join(', ')}`,
    )
  }

  const { body } = await got(
    `https://itunes.apple.com/${country.toUpperCase()}/rss/customerreviews/page=${page}/id=${id}/sortby=${sort_by}/json`,
    {
      method: 'GET',
      responseType: 'json',
      ...options,
    },
  )

  return reviewList(body)
}
