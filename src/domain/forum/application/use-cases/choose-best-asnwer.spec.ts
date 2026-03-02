import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ChooseBestAnswerUseCase } from './choose-best-answer'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseBestAnswerUseCase

describe('Choose Best Answer for a question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new ChooseBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswersRepository)
  })

  it('should be able to choose the best answer for a question', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString()
    })

    expect(inMemoryQuestionsRepository.items[0]?.bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose another user answer as best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    })

    const answer = makeAnswer({
      questionId: question.id,
      authorId: new UniqueEntityId('author-2')
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: 'answer-1'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
