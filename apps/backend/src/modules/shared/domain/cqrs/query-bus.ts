import { Class } from "@/pkg/types/types";

export interface Query<D = unknown> {
  readonly name: string;
  readonly data: D;
}

export interface QueryHandler<Q extends Query> {
  handle(data: Q["data"]): Promise<unknown>;
}

export interface QueryBus {
  /**
   * @throws Error
   */
  register<Q extends Query>(
    query: Class<Q>,
    handler: QueryHandler<Q>,
  ): QueryBus;

  /**
   * @throws Error
   */
  ask<R>(query: Query): Promise<R>;
}
