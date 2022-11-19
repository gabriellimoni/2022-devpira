import { Model, QueryContext } from "objection";

export class Tool extends Model {
  id?: number;
  name?: string;
  tags?: string[] | string;

  static get tableName() {
    return "tools";
  }

  $beforeInsert(_: QueryContext): void | Promise<any> {
    if (this.tags) this.tags = JSON.stringify(this.tags);
  }
}
