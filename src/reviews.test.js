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

  test('should set request options', async (done) => {
    try {
      await reviews(
        { id: 284882215, country: 'us', page: 1 },
        { method: 'DELETE' },
      )
    } catch (error) {
      expect(error).toBeDefined()
    } finally {
      done()
    }
  })
})
