import ratings from './ratings.js'

describe('ratings', () => {
  it('should get ratings properly', async (done) => {
    try {
      const r = await ratings({ id: 284882215, country: 'us' })
      expect(r.ratings).toBeDefined()
      expect(r.histogram).toBeInstanceOf(Object)
      expect(Object.keys(r.histogram).length).toEqual(5)
    } catch (error) {
      expect(error).toBeUndefined()
    } finally {
      done()
    }
  })

  test('should set request options', async (done) => {
    try {
      await ratings({ id: 284882215, country: 'us' }, { method: 'DELETE' })
    } catch (error) {
      expect(error).toBeDefined()
    } finally {
      done()
    }
  })
})
