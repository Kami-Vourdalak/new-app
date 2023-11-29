import { DBAdapter, DBAdapterProjection } from "..";
import { UserEntity, UserRepository } from "./";


class MockDBAdapter implements DBAdapter<UserEntity> {
  query = vi.fn()
  insert = vi.fn()
  update = vi.fn()
  delete = vi.fn()
}

describe('user repository', () => {
  let mockDb = new MockDBAdapter()
  let uRepo = new UserRepository(mockDb);
  it('should be defined', () => {
    // Arrange
    // Act
    // Assert
    expect(UserRepository).toBeDefined()
  })


  beforeEach(() => {
    mockDb = new MockDBAdapter()
    uRepo = new UserRepository(mockDb)
  })

  describe('find', () => {
    it('should find users', () => {
      // Arrange
      // Act
      uRepo.find()

      // Assert
      expect(mockDb.query.mock.calls).toMatchInlineSnapshot(`
              [
                [
                  {
                    "filters": undefined,
                    "projection": undefined,
                  },
                ],
              ]
            `)
    })

    it('should find users with projection', () => {
      // Arrange
      const mockProjection: DBAdapterProjection<UserEntity> = ['id', 'name']

      // Act
      uRepo.find(mockProjection)

      // Assert
      expect(mockDb.query.mock.calls).toMatchInlineSnapshot(`
        [
          [
            {
              "filters": undefined,
              "projection": [
                "id",
                "name",
              ],
            },
          ],
        ]
      `)
    })

    it('should find user by id', () => {
      // Arrange
      mockDb.query.mockResolvedValue([{ id: 'mockId' }])

      const mockId = 'mockId'

      // Act
      uRepo.findById(mockId)

      // Assert
      expect(mockDb.query.mock.calls).toMatchInlineSnapshot(`
              [
                [
                  {
                    "filters": {
                      "id": {
                        "eq": "mockId",
                      },
                    },
                    "projection": undefined,
                  },
                ],
              ]
            `)
    })
  })
})