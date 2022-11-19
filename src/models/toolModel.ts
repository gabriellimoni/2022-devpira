import { Model, QueryContext, StaticHookArguments } from "objection";

export class Tool extends Model {
  name?: string;
  tags?: string[] | string;

  static get tableName() {
    return "tools";
  }

  $beforeInsert(_: QueryContext): void | Promise<any> {
    if (this.tags) this.tags = JSON.stringify(this.tags);
  }
}
