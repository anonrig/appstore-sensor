import developer from './developer.js'

describe('developer', () => {
  test('get developer', async (done) => {
    try {
      const { account, applications } = await developer({ id: 284882218 })
      expect(account).toBeDefined()
      expect(applications).toBeInstanceOf(Array)
      expect(applications.length > 0).toBeTruthy()
    } catch (error) {
      expect(error).toBeUndefined()
    } finally {
      done()
    }
  })

  test('should throw error on invalid id', async (done) => {
    try {
      await developer({ id: null })
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toEqual('Id is required')
    } finally {
      done()
    }
  })

  test('should throw error on invalid country', async (done) => {
    try {
      await developer({ id: 284882215, country: 'HELLO' })
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toEqual('Invalid country id')
    } finally {
      done()
    }
  })

  test('should set request options', async (done) => {
    try {
      await developer({ id: 284882215 }, { method: 'DELETE' })
    } catch (error) {
      expect(error).toBeDefined()
    } finally {
      done()
    }
  })
})
