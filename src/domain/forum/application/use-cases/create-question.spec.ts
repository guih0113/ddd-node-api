import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'New question',
      content: 'Question content',
      attachmentsIds: ['1', '2', '3']
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
    expect(inMemoryQuestionsRepository.items[0]?.attachments).toHaveLength(3)
    expect(inMemoryQuestionsRepository.items[0]?.attachments).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityId('1')
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityId('2')
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityId('3')
      })
    ])
  })
})
