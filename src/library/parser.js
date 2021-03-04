import cheerio from 'cheerio'

export function parseRatings(html) {
  const $ = cheerio.load(html)
  const ratingsMatch = $('.rating-count').text().match(/\d+/)
  const ratings = Array.isArray(ratingsMatch) ? parseInt(ratingsMatch[0]) : 0
  const ratingsByStar = $('.vote .total')
    .map((i, el) => parseInt($(el).text()))
    .get()

  const histogram = ratingsByStar.reduce((acc, ratingsForStar, index) => {
    return Object.assign(acc, { [5 - index]: ratingsForStar })
  }, {})

  return { ratings, histogram }
}
