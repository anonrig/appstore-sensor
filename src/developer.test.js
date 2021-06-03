import developer from './developer.js'

describe('developer', () => {
  test('get developer', async () => {
    try {
      const { account, applications } = await developer({ id: 284882218 })
      expect(account).toBeDefined()
      expect(applications).toBeInstanceOf(Array)
      expect(applications.length > 0).toBeTruthy()
    } catch (error) {
      expect(error).toBeUndefined()
    }
  })

  test('should throw error on invalid id', async () => {
    try {
      await developer({ id: null })
      throw new Error(`Invalid`)
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toEqual('Id is required')
    }
  })

  test('should throw error on invalid country', async () => {
    try {
      await developer({ id: 284882215, country: 'HELLO' })
      throw new Error(`Invalid`)
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toEqual('Invalid country id')
    }
  })

  test('should set request options', async () => {
    try {
      await developer({ id: 284882215 }, { method: 'DELETE' })
      throw new Error(`Invalid`)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})
