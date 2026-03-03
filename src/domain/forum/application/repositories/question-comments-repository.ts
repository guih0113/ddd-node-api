import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  create(questioncomment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  delete(questioncomment: QuestionComment): Promise<void>
}
