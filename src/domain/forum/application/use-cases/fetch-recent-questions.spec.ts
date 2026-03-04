import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2026, 0, 13) }))
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2026, 0, 26) }))
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2026, 1, 13) }))

    const result = await sut.execute({
      page: 1
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2026, 1, 13) }),
      expect.objectContaining({ createdAt: new Date(2026, 0, 26) }),
      expect.objectContaining({ createdAt: new Date(2026, 0, 13) })
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2026, 0, i) }))
    }

    const result = await sut.execute({
      page: 2
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questions).toHaveLength(2)
  })
})
