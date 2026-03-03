import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  create(questioncomment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  findManyByQuestionId(questionId: string, params: PaginationParams): Promise<QuestionComment[]>
  delete(questioncomment: QuestionComment): Promise<void>
}
