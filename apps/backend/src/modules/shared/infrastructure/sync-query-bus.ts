import {
  Query,
  QueryBus,
  QueryHandler,
} from "@/modules/shared/domain/cqrs/query-bus";
import { Class } from "@/pkg/types/types";

export class SyncQueryBus implements QueryBus {
  private handlers: Map<string, QueryHandler<Query>>;

  constructor() {
    this.handlers = new Map();
  }

  register<Q extends Query>(
    query: Class<Q>,
    handler: QueryHandler<Q>,
  ): QueryBus {
    if (this.handlers.has(query.name)) {
      throw new Error("query handler already registered");
    }
    this.handlers.set(query.name, handler);
    return this;
  }

  async ask<R>(query: Query): Promise<R> {
    const handler = this.handlers.get(query.name) as QueryHandler<Query>;
    if (!handler) {
      throw new Error("query handler not found");
    }
    return handler.handle(query.data) as R;
  }
}
