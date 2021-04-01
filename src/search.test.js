import search from './search.js'

describe('search', () => {
  test('search an application', async (done) => {
    try {
      const results = await search({ term: 'facebook' })
      expect(results).toBeInstanceOf(Array)
      expect(results[0].appId).toEqual('com.facebook.Facebook')
      done()
    } catch (error) {
      expect(error).toBeUndefined()
      done(error)
    }
  })

  test('should throw an error on invalid country', async (done) => {
    try {
      const results = await search({
        term: 'facebook',
        country: 'laba daba lup lup',
      })
      expect(results).toBeUndefined()
      done(new Error(`Country should have throwed an error`))
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toEqual('Invalid country id')
      done()
    }
  })

  test('should set request options', async (done) => {
    try {
      await search({ term: 'facebook' }, { method: 'DELETE' })
      done(new Error(`Invalid`))
    } catch (error) {
      expect(error).toBeDefined()
      done()
    }
  })
})
