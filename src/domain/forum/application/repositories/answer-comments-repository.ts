import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  create(answercomment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  delete(answercomment: AnswerComment): Promise<void>
}
