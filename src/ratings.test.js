import ratings from './ratings.js'

describe('ratings', () => {
  it('should get ratings properly', async () => {
    try {
      const r = await ratings({ id: 284882215, country: 'US' })
      expect(r.ratings).toBeDefined()
      expect(r.histogram).toBeInstanceOf(Object)
      expect(Object.keys(r.histogram).length).toEqual(5)
    } catch (error) {
      expect(error).toBeUndefined()
    }
  })

  test('should set request options', async () => {
    try {
      await ratings({ id: 284882215, country: 'us' }, { method: 'DELETE' })
      throw new Error(`Invalid`)
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message.includes('Invalid')).toBeFalsy()
    }
  })
})
