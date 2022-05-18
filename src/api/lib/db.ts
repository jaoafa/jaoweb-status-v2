import { Database } from 'sqlite3'

export default class DB {
  db: Database
  constructor(path: string) {
    this.db = new Database(path)

    this.initTable()
  }

  private initTable() {
    // カスタムステータステーブル

    // cid: カスタムステータス ID
    // sid: サービス ID (constants.ts SERVICES で定義)
    // title: タイトル
    // text: カスタムステータスの説明
    // detailUrl: 詳細情報へのリンクURL (nullable)
    // status: 状態 ('green', 'yellow', 'red' など)
    // register_ip: 登録 IP アドレス
    // started_at: カスタムステータスの開始日時
    // ended_at: カスタムステータスの終了日時 ※nullableにしない、必須
    // created_at: カスタムステータスの作成日時
    // updated_at: カスタムステータスの最終更新日時
    this.db.exec(
      `CREATE TABLE IF NOT EXISTS custom_statuses (
        cid INTEGER PRIMARY KEY AUTOINCREMENT,
        sid TEXT NOT NULL,
        title TEXT NOT NULL,
        text TEXT NOT NULL,
        detailUrl TEXT,
        status TEXT NOT NULL,
        register_ip TEXT NOT NULL,
        started_at TEXT NOT NULL,
        ended_at TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
        updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
      );`
    )
    this.db.exec(
      `CREATE TRIGGER IF NOT EXISTS trigger_custom_statuses_updated_at AFTER UPDATE ON custom_statuses
        BEGIN
          UPDATE custom_statuses SET updated_at = DATETIME('now', 'localtime') WHERE cid == NEW.cid;
        END;`
    )
  }

  public get(sql: string, params: any[]) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err: any, row: unknown) => {
        if (err) reject(err)
        resolve(row)
      })
    })
  }

  public all(sql: string, params: any[]) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err: any, rows: unknown) => {
        if (err) reject(err)
        resolve(rows)
      })
    })
  }

  public run(sql: string, params: any[]) {
    return new Promise<void>((resolve, reject) => {
      this.db.run(sql, params, (err: any) => {
        if (err) reject(err)
        resolve()
      })
    })
  }

  public close() {
    return new Promise<void>((resolve, reject) => {
      this.db.close((err: any) => {
        if (err) reject(err)
        resolve()
      })
    })
  }
}
