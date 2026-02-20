import { expect, it } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

it('should be able to answer a question', () => {
  const answerQuestion = new AnswerQuestionUseCase()

  const answer = answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'New answer',
  })

  expect(answer.content).toEqual('New answer')
})
