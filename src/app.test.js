import app from './app.js'

describe('app', () => {
  test('get a single application', async () => {
    try {
      const application = await app({ id: 284882215, include_ratings: false })
      expect(application.id).toEqual(284882215)
      expect(application.title).toEqual('Facebook')
    } catch (error) {
      expect(error).toBeUndefined()
    }
  })

  test('should throw error on not found', async () => {
    try {
      await app({ id: '123456789' })
      throw new Error(`Invalid`)
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toEqual('Application not found')
    }
  })

  test('should include ratings', async () => {
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
    }
  })

  test('should set request options', async () => {
    try {
      await app({ id: 284882215 }, { method: 'DELETE' })
      throw new Error(`Invalid`)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})
