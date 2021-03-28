import app from './app.js'

describe('app', () => {
  test('get a single application', async (done) => {
    try {
      const application = await app({ id: 284882215, include_ratings: false })
      expect(application.id).toEqual(284882215)
      expect(application.title).toEqual('Facebook')
      done()
    } catch (error) {
      expect(error).toBeUndefined()
      done(error)
    }
  })

  test('should throw error on not found', async (done) => {
    try {
      await app({ id: '123456789' })
      done(new Error(`Invalid`))
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toEqual('Application not found')
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
      done()
    } catch (error) {
      expect(error).toBeUndefined()
      done(error)
    }
  })

  test('should set request options', async (done) => {
    try {
      await app({ id: 284882215 }, { method: 'DELETE' })
      done(new Error(`Invalid`))
    } catch (error) {
      expect(error).toBeDefined()
      done()
    }
  })
})
