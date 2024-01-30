export interface LlmAdaptor {
  askSql: (prompt: string) => Promise<string>;
}
