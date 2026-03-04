import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  create(answercomment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(answerId: string, params: PaginationParams): Promise<AnswerComment[]>
  delete(answercomment: AnswerComment): Promise<void>
}
