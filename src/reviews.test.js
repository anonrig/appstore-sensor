import reviews from './reviews.js'

describe('reviews', () => {
  test('should return proper reviews list', async () => {
    try {
      const results = await reviews({ id: 284882215, country: 'us', page: 1 })
      expect(results).toBeInstanceOf(Array)
      expect(results.length).toEqual(50)
      results.forEach((result) => {
        expect(result.id).toBeDefined()
        expect(result.text).toBeTruthy()
        expect(result.html).toBeTruthy()
        expect(result.updatedAt).toBeDefined()
        expect(typeof result.html).toBe('string')
        expect(typeof result.text).toBe('string')
        expect(result.html).toContain('table')
        expect(typeof result.score).toBe('number')
      })
    } catch (error) {
      expect(error).toBeUndefined()
    }
  })

  test('should throw error on missing id', async () => {
    try {
      await reviews({})
      throw new Error(`Invalid`)
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toEqual('Id should be defined')
    }
  })

  test('should throw error on invalid sort field', async () => {
    try {
      await reviews({ id: 284882215, sort_by: 'hello-world' })
      throw new Error(`Invalid`)
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toEqual(
        'Invalid sort field. Proper fields are mostRecent, mostHelpful.',
      )
    }
  })

  test('should throw error on invalid page', async () => {
    try {
      await reviews({ id: 284882215, page: 100 })
      throw new Error(`Invalid`)
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toEqual('Page should be between 1 and 10.')
    }
  })

  test('should set request options', async () => {
    try {
      await reviews(
        { id: 284882215, country: 'us', page: 1 },
        { method: 'DELETE' },
      )
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})
