/**
 * ステータスチェックレスポンス
 */
export interface CheckResponse {
  status: 'red' | 'green' | 'yellow'
  message: string | null
  detailUrl?: string
}

/**
 * ステータスチェック
 */
export abstract class BaseCheck {
  abstract execute(): Promise<CheckResponse>
}
