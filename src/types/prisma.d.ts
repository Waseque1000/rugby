declare module "@prisma/client" {
  export class PrismaClient {
    constructor(options?: unknown);
    player: {
      findMany(args?: unknown): Promise<any[]>;
      findUnique(args?: unknown): Promise<any | null>;
      create(args?: unknown): Promise<any>;
      upsert(args?: unknown): Promise<any>;
      deleteMany(args?: unknown): Promise<any>;
    };
    source: {
      findMany(args?: unknown): Promise<any[]>;
      create(args?: unknown): Promise<any>;
      deleteMany(args?: unknown): Promise<any>;
    };
    subscriber: {
      create(args?: unknown): Promise<any>;
      upsert(args?: unknown): Promise<any>;
    };
    contactSubmission: {
      create(args?: unknown): Promise<any>;
    };
    $queryRaw(query: any, ...values: any[]): Promise<any>;
    $disconnect(): Promise<void>;
  }
}
