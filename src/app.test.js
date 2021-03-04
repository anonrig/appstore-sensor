import app from './app.js'

describe('app', () => {
  test('get a single application', async (done) => {
    try {
      const application = await app({ id: 284882215 })
      expect(application.id).toEqual(284882215)
      expect(application.title).toEqual('Facebook')
    } catch (error) {
      expect(error).toBeUndefined()
    } finally {
      done()
    }
  })

  test('should include ratings', async (done) => {
    try {
      const application = await app({ id: 284882215, include_ratings: true })
      expect(application.id).toEqual(284882215)
      expect(application.title).toEqual('Facebook')
      expect(application.score).toBeTruthy()
      expect(application.reviews).toBeTruthy()
      expect(application.histogram).toBeDefined()
      expect(application.ratings).toBeDefined()
    } catch (error) {
      expect(error).toBeUndefined()
    } finally {
      done()
    }
  })

  test('should set request options', async (done) => {
    try {
      await app({ id: 284882215 }, { method: 'DELETE' })
    } catch (error) {
      expect(error).toBeDefined()
    } finally {
      done()
    }
  })
})
