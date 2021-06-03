import search from './search.js'

describe('search', () => {
  test('search an application', async () => {
    try {
      const results = await search({ term: 'facebook' })
      expect(results).toBeInstanceOf(Array)
      expect(results[0].appId).toEqual('com.facebook.Facebook')
    } catch (error) {
      expect(error).toBeUndefined()
    }
  })

  test('should throw an error on invalid country', async () => {
    try {
      const results = await search({
        term: 'facebook',
        country: 'laba daba lup lup',
      })
      expect(results).toBeUndefined()
      throw new Error(`Invalid`)
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toEqual('Invalid country id')
    }
  })

  test('should set request options', async () => {
    try {
      await search({ term: 'facebook' }, { method: 'DELETE' })
      throw new Error(`Invalid`)
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message.includes('Invalid')).toBeFalsy()
    }
  })
})
