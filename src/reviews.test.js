import reviews from './reviews.js'

describe('reviews', () => {
  test('should return proper reviews list', async (done) => {
    try {
      const results = await reviews({ id: 284882215, country: 'us', page: 1 })
      expect(results).toBeInstanceOf(Array)
      expect(results.length).toEqual(50)
    } catch (error) {
      expect(error).toBeUndefined()
    } finally {
      done()
    }
  })
})
