/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "@prisma/client" {
  export class PrismaClient {
    constructor(options?: unknown);
    player: {
      findMany(args?: Record<string, unknown>): Promise<any[]>;
      findUnique(args?: Record<string, unknown>): Promise<any | null>;
      create(args?: Record<string, unknown>): Promise<any>;
      upsert(args?: Record<string, unknown>): Promise<any>;
      deleteMany(args?: Record<string, unknown>): Promise<any>;
    };
    source: {
      findMany(args?: Record<string, unknown>): Promise<any[]>;
      create(args?: Record<string, unknown>): Promise<any>;
      deleteMany(args?: Record<string, unknown>): Promise<any>;
    };
    subscriber: {
      create(args?: Record<string, unknown>): Promise<any>;
      upsert(args?: Record<string, unknown>): Promise<any>;
    };
    contactSubmission: {
      create(args?: Record<string, unknown>): Promise<any>;
    };
    $queryRaw(query: unknown, ...values: unknown[]): Promise<unknown>;
    $disconnect(): Promise<void>;
  }
}
