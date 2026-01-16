/**
 * Client
 **/

import * as runtime from "./runtime/library.js";
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Ride
 *
 */
export type Ride = $Result.DefaultSelection<Prisma.$RidePayload>;
/**
 * Model RideMember
 *
 */
export type RideMember = $Result.DefaultSelection<Prisma.$RideMemberPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const RideService: {
    UBER: "UBER";
    OLA: "OLA";
  };

  export type RideService = (typeof RideService)[keyof typeof RideService];

  export const RideStatus: {
    ACTIVE: "ACTIVE";
    COMPLETED: "COMPLETED";
    CANCELLED: "CANCELLED";
  };

  export type RideStatus = (typeof RideStatus)[keyof typeof RideStatus];

  export const MemberStatus: {
    PENDING: "PENDING";
    ACCEPTED: "ACCEPTED";
    DECLINED: "DECLINED";
    CANCELLED: "CANCELLED";
  };

  export type MemberStatus = (typeof MemberStatus)[keyof typeof MemberStatus];
}

export type RideService = $Enums.RideService;

export const RideService: typeof $Enums.RideService;

export type RideStatus = $Enums.RideStatus;

export const RideStatus: typeof $Enums.RideStatus;

export type MemberStatus = $Enums.MemberStatus;

export const MemberStatus: typeof $Enums.MemberStatus;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = "log" extends keyof ClientOptions
    ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions["log"]>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    "extends",
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ride`: Exposes CRUD operations for the **Ride** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Rides
   * const rides = await prisma.ride.findMany()
   * ```
   */
  get ride(): Prisma.RideDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rideMember`: Exposes CRUD operations for the **RideMember** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more RideMembers
   * const rideMembers = await prisma.rideMember.findMany()
   * ```
   */
  get rideMember(): Prisma.RideMemberDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? "Please either choose `select` or `include`."
    : T extends SelectAndOmit
      ? "Please either choose `select` or `omit`."
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends bigint
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<"OR", K>, Extends<"AND", K>>,
      Extends<"NOT", K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    User: "User";
    Ride: "Ride";
    RideMember: "RideMember";
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<
      this["params"]["extArgs"],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps: "user" | "ride" | "rideMember";
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      Ride: {
        payload: Prisma.$RidePayload<ExtArgs>;
        fields: Prisma.RideFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.RideFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RidePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.RideFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RidePayload>;
          };
          findFirst: {
            args: Prisma.RideFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RidePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.RideFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RidePayload>;
          };
          findMany: {
            args: Prisma.RideFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RidePayload>[];
          };
          create: {
            args: Prisma.RideCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RidePayload>;
          };
          createMany: {
            args: Prisma.RideCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.RideCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RidePayload>[];
          };
          delete: {
            args: Prisma.RideDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RidePayload>;
          };
          update: {
            args: Prisma.RideUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RidePayload>;
          };
          deleteMany: {
            args: Prisma.RideDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.RideUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.RideUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RidePayload>[];
          };
          upsert: {
            args: Prisma.RideUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RidePayload>;
          };
          aggregate: {
            args: Prisma.RideAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateRide>;
          };
          groupBy: {
            args: Prisma.RideGroupByArgs<ExtArgs>;
            result: $Utils.Optional<RideGroupByOutputType>[];
          };
          count: {
            args: Prisma.RideCountArgs<ExtArgs>;
            result: $Utils.Optional<RideCountAggregateOutputType> | number;
          };
        };
      };
      RideMember: {
        payload: Prisma.$RideMemberPayload<ExtArgs>;
        fields: Prisma.RideMemberFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.RideMemberFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RideMemberPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.RideMemberFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RideMemberPayload>;
          };
          findFirst: {
            args: Prisma.RideMemberFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RideMemberPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.RideMemberFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RideMemberPayload>;
          };
          findMany: {
            args: Prisma.RideMemberFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RideMemberPayload>[];
          };
          create: {
            args: Prisma.RideMemberCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RideMemberPayload>;
          };
          createMany: {
            args: Prisma.RideMemberCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.RideMemberCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RideMemberPayload>[];
          };
          delete: {
            args: Prisma.RideMemberDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RideMemberPayload>;
          };
          update: {
            args: Prisma.RideMemberUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RideMemberPayload>;
          };
          deleteMany: {
            args: Prisma.RideMemberDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.RideMemberUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.RideMemberUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RideMemberPayload>[];
          };
          upsert: {
            args: Prisma.RideMemberUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RideMemberPayload>;
          };
          aggregate: {
            args: Prisma.RideMemberAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateRideMember>;
          };
          groupBy: {
            args: Prisma.RideMemberGroupByArgs<ExtArgs>;
            result: $Utils.Optional<RideMemberGroupByOutputType>[];
          };
          count: {
            args: Prisma.RideMemberCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<RideMemberCountAggregateOutputType>
              | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    "define",
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
  }
  export type GlobalOmitConfig = {
    user?: UserOmit;
    ride?: RideOmit;
    rideMember?: RideMemberOmit;
  };

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T["level"] : T
  >;

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findUniqueOrThrow"
    | "findMany"
    | "findFirst"
    | "findFirstOrThrow"
    | "create"
    | "createMany"
    | "createManyAndReturn"
    | "update"
    | "updateMany"
    | "updateManyAndReturn"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw"
    | "groupBy";

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    ridesOwned: number;
    memberships: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    ridesOwned?: boolean | UserCountOutputTypeCountRidesOwnedArgs;
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRidesOwnedArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RideWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembershipsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RideMemberWhereInput;
  };

  /**
   * Count Type RideCountOutputType
   */

  export type RideCountOutputType = {
    members: number;
  };

  export type RideCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    members?: boolean | RideCountOutputTypeCountMembersArgs;
  };

  // Custom InputTypes
  /**
   * RideCountOutputType without action
   */
  export type RideCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RideCountOutputType
     */
    select?: RideCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * RideCountOutputType without action
   */
  export type RideCountOutputTypeCountMembersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RideMemberWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserAvgAggregateOutputType = {
    rating: number | null;
  };

  export type UserSumAggregateOutputType = {
    rating: number | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    clerkId: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string | null;
    name: string | null;
    phone: string | null;
    rating: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    clerkId: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string | null;
    name: string | null;
    phone: string | null;
    rating: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    clerkId: number;
    email: number;
    firstName: number;
    lastName: number;
    imageUrl: number;
    name: number;
    phone: number;
    rating: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserAvgAggregateInputType = {
    rating?: true;
  };

  export type UserSumAggregateInputType = {
    rating?: true;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    clerkId?: true;
    email?: true;
    firstName?: true;
    lastName?: true;
    imageUrl?: true;
    name?: true;
    phone?: true;
    rating?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    clerkId?: true;
    email?: true;
    firstName?: true;
    lastName?: true;
    imageUrl?: true;
    name?: true;
    phone?: true;
    rating?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    clerkId?: true;
    email?: true;
    firstName?: true;
    lastName?: true;
    imageUrl?: true;
    name?: true;
    phone?: true;
    rating?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: UserAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: UserSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput;
    orderBy?:
      | UserOrderByWithAggregationInput
      | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: string;
    clerkId: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string | null;
    name: string;
    phone: string | null;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      clerkId?: boolean;
      email?: boolean;
      firstName?: boolean;
      lastName?: boolean;
      imageUrl?: boolean;
      name?: boolean;
      phone?: boolean;
      rating?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      ridesOwned?: boolean | User$ridesOwnedArgs<ExtArgs>;
      memberships?: boolean | User$membershipsArgs<ExtArgs>;
      _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      clerkId?: boolean;
      email?: boolean;
      firstName?: boolean;
      lastName?: boolean;
      imageUrl?: boolean;
      name?: boolean;
      phone?: boolean;
      rating?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      clerkId?: boolean;
      email?: boolean;
      firstName?: boolean;
      lastName?: boolean;
      imageUrl?: boolean;
      name?: boolean;
      phone?: boolean;
      rating?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectScalar = {
    id?: boolean;
    clerkId?: boolean;
    email?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    imageUrl?: boolean;
    name?: boolean;
    phone?: boolean;
    rating?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "clerkId"
    | "email"
    | "firstName"
    | "lastName"
    | "imageUrl"
    | "name"
    | "phone"
    | "rating"
    | "createdAt"
    | "updatedAt",
    ExtArgs["result"]["user"]
  >;
  export type UserInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    ridesOwned?: boolean | User$ridesOwnedArgs<ExtArgs>;
    memberships?: boolean | User$membershipsArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type UserIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "User";
    objects: {
      ridesOwned: Prisma.$RidePayload<ExtArgs>[];
      memberships: Prisma.$RideMemberPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        clerkId: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        imageUrl: string | null;
        name: string;
        phone: string | null;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["user"]
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> =
    $Result.GetResult<Prisma.$UserPayload, S>;

  type UserCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<UserFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["User"];
      meta: { name: "User" };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs["orderBy"] }
        : { orderBy?: UserGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ridesOwned<T extends User$ridesOwnedArgs<ExtArgs> = {}>(
      args?: Subset<T, User$ridesOwnedArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$RidePayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    memberships<T extends User$membershipsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$membershipsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$RideMemberPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", "String">;
    readonly clerkId: FieldRef<"User", "String">;
    readonly email: FieldRef<"User", "String">;
    readonly firstName: FieldRef<"User", "String">;
    readonly lastName: FieldRef<"User", "String">;
    readonly imageUrl: FieldRef<"User", "String">;
    readonly name: FieldRef<"User", "String">;
    readonly phone: FieldRef<"User", "String">;
    readonly rating: FieldRef<"User", "Float">;
    readonly createdAt: FieldRef<"User", "DateTime">;
    readonly updatedAt: FieldRef<"User", "DateTime">;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User.ridesOwned
   */
  export type User$ridesOwnedArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null;
    where?: RideWhereInput;
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[];
    cursor?: RideWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: RideScalarFieldEnum | RideScalarFieldEnum[];
  };

  /**
   * User.memberships
   */
  export type User$membershipsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RideMember
     */
    select?: RideMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideMember
     */
    omit?: RideMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideMemberInclude<ExtArgs> | null;
    where?: RideMemberWhereInput;
    orderBy?:
      | RideMemberOrderByWithRelationInput
      | RideMemberOrderByWithRelationInput[];
    cursor?: RideMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: RideMemberScalarFieldEnum | RideMemberScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
  };

  /**
   * Model Ride
   */

  export type AggregateRide = {
    _count: RideCountAggregateOutputType | null;
    _avg: RideAvgAggregateOutputType | null;
    _sum: RideSumAggregateOutputType | null;
    _min: RideMinAggregateOutputType | null;
    _max: RideMaxAggregateOutputType | null;
  };

  export type RideAvgAggregateOutputType = {
    fromLat: number | null;
    fromLng: number | null;
    toLat: number | null;
    toLng: number | null;
    seatsTotal: number | null;
    seatsAvailable: number | null;
    estTotalFare: number | null;
    perSeatPrice: number | null;
  };

  export type RideSumAggregateOutputType = {
    fromLat: number | null;
    fromLng: number | null;
    toLat: number | null;
    toLng: number | null;
    seatsTotal: number | null;
    seatsAvailable: number | null;
    estTotalFare: number | null;
    perSeatPrice: number | null;
  };

  export type RideMinAggregateOutputType = {
    id: string | null;
    ownerId: string | null;
    service: $Enums.RideService | null;
    shareUrlHash: string | null;
    shareUrlEnc: string | null;
    fromText: string | null;
    toText: string | null;
    fromLat: number | null;
    fromLng: number | null;
    toLat: number | null;
    toLng: number | null;
    departureAt: Date | null;
    seatsTotal: number | null;
    seatsAvailable: number | null;
    estTotalFare: number | null;
    perSeatPrice: number | null;
    isVerified: boolean | null;
    status: $Enums.RideStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type RideMaxAggregateOutputType = {
    id: string | null;
    ownerId: string | null;
    service: $Enums.RideService | null;
    shareUrlHash: string | null;
    shareUrlEnc: string | null;
    fromText: string | null;
    toText: string | null;
    fromLat: number | null;
    fromLng: number | null;
    toLat: number | null;
    toLng: number | null;
    departureAt: Date | null;
    seatsTotal: number | null;
    seatsAvailable: number | null;
    estTotalFare: number | null;
    perSeatPrice: number | null;
    isVerified: boolean | null;
    status: $Enums.RideStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type RideCountAggregateOutputType = {
    id: number;
    ownerId: number;
    service: number;
    shareUrlHash: number;
    shareUrlEnc: number;
    fromText: number;
    toText: number;
    fromLat: number;
    fromLng: number;
    toLat: number;
    toLng: number;
    departureAt: number;
    seatsTotal: number;
    seatsAvailable: number;
    estTotalFare: number;
    perSeatPrice: number;
    isVerified: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type RideAvgAggregateInputType = {
    fromLat?: true;
    fromLng?: true;
    toLat?: true;
    toLng?: true;
    seatsTotal?: true;
    seatsAvailable?: true;
    estTotalFare?: true;
    perSeatPrice?: true;
  };

  export type RideSumAggregateInputType = {
    fromLat?: true;
    fromLng?: true;
    toLat?: true;
    toLng?: true;
    seatsTotal?: true;
    seatsAvailable?: true;
    estTotalFare?: true;
    perSeatPrice?: true;
  };

  export type RideMinAggregateInputType = {
    id?: true;
    ownerId?: true;
    service?: true;
    shareUrlHash?: true;
    shareUrlEnc?: true;
    fromText?: true;
    toText?: true;
    fromLat?: true;
    fromLng?: true;
    toLat?: true;
    toLng?: true;
    departureAt?: true;
    seatsTotal?: true;
    seatsAvailable?: true;
    estTotalFare?: true;
    perSeatPrice?: true;
    isVerified?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type RideMaxAggregateInputType = {
    id?: true;
    ownerId?: true;
    service?: true;
    shareUrlHash?: true;
    shareUrlEnc?: true;
    fromText?: true;
    toText?: true;
    fromLat?: true;
    fromLng?: true;
    toLat?: true;
    toLng?: true;
    departureAt?: true;
    seatsTotal?: true;
    seatsAvailable?: true;
    estTotalFare?: true;
    perSeatPrice?: true;
    isVerified?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type RideCountAggregateInputType = {
    id?: true;
    ownerId?: true;
    service?: true;
    shareUrlHash?: true;
    shareUrlEnc?: true;
    fromText?: true;
    toText?: true;
    fromLat?: true;
    fromLng?: true;
    toLat?: true;
    toLng?: true;
    departureAt?: true;
    seatsTotal?: true;
    seatsAvailable?: true;
    estTotalFare?: true;
    perSeatPrice?: true;
    isVerified?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type RideAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Ride to aggregate.
     */
    where?: RideWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rides to fetch.
     */
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: RideWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rides from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rides.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Rides
     **/
    _count?: true | RideCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: RideAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: RideSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: RideMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: RideMaxAggregateInputType;
  };

  export type GetRideAggregateType<T extends RideAggregateArgs> = {
    [P in keyof T & keyof AggregateRide]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRide[P]>
      : GetScalarType<T[P], AggregateRide[P]>;
  };

  export type RideGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RideWhereInput;
    orderBy?:
      | RideOrderByWithAggregationInput
      | RideOrderByWithAggregationInput[];
    by: RideScalarFieldEnum[] | RideScalarFieldEnum;
    having?: RideScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RideCountAggregateInputType | true;
    _avg?: RideAvgAggregateInputType;
    _sum?: RideSumAggregateInputType;
    _min?: RideMinAggregateInputType;
    _max?: RideMaxAggregateInputType;
  };

  export type RideGroupByOutputType = {
    id: string;
    ownerId: string;
    service: $Enums.RideService;
    shareUrlHash: string | null;
    shareUrlEnc: string | null;
    fromText: string;
    toText: string;
    fromLat: number;
    fromLng: number;
    toLat: number;
    toLng: number;
    departureAt: Date;
    seatsTotal: number;
    seatsAvailable: number;
    estTotalFare: number;
    perSeatPrice: number;
    isVerified: boolean;
    status: $Enums.RideStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: RideCountAggregateOutputType | null;
    _avg: RideAvgAggregateOutputType | null;
    _sum: RideSumAggregateOutputType | null;
    _min: RideMinAggregateOutputType | null;
    _max: RideMaxAggregateOutputType | null;
  };

  type GetRideGroupByPayload<T extends RideGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RideGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof RideGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], RideGroupByOutputType[P]>
          : GetScalarType<T[P], RideGroupByOutputType[P]>;
      }
    >
  >;

  export type RideSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      ownerId?: boolean;
      service?: boolean;
      shareUrlHash?: boolean;
      shareUrlEnc?: boolean;
      fromText?: boolean;
      toText?: boolean;
      fromLat?: boolean;
      fromLng?: boolean;
      toLat?: boolean;
      toLng?: boolean;
      departureAt?: boolean;
      seatsTotal?: boolean;
      seatsAvailable?: boolean;
      estTotalFare?: boolean;
      perSeatPrice?: boolean;
      isVerified?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      owner?: boolean | UserDefaultArgs<ExtArgs>;
      members?: boolean | Ride$membersArgs<ExtArgs>;
      _count?: boolean | RideCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["ride"]
  >;

  export type RideSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      ownerId?: boolean;
      service?: boolean;
      shareUrlHash?: boolean;
      shareUrlEnc?: boolean;
      fromText?: boolean;
      toText?: boolean;
      fromLat?: boolean;
      fromLng?: boolean;
      toLat?: boolean;
      toLng?: boolean;
      departureAt?: boolean;
      seatsTotal?: boolean;
      seatsAvailable?: boolean;
      estTotalFare?: boolean;
      perSeatPrice?: boolean;
      isVerified?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      owner?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["ride"]
  >;

  export type RideSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      ownerId?: boolean;
      service?: boolean;
      shareUrlHash?: boolean;
      shareUrlEnc?: boolean;
      fromText?: boolean;
      toText?: boolean;
      fromLat?: boolean;
      fromLng?: boolean;
      toLat?: boolean;
      toLng?: boolean;
      departureAt?: boolean;
      seatsTotal?: boolean;
      seatsAvailable?: boolean;
      estTotalFare?: boolean;
      perSeatPrice?: boolean;
      isVerified?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      owner?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["ride"]
  >;

  export type RideSelectScalar = {
    id?: boolean;
    ownerId?: boolean;
    service?: boolean;
    shareUrlHash?: boolean;
    shareUrlEnc?: boolean;
    fromText?: boolean;
    toText?: boolean;
    fromLat?: boolean;
    fromLng?: boolean;
    toLat?: boolean;
    toLng?: boolean;
    departureAt?: boolean;
    seatsTotal?: boolean;
    seatsAvailable?: boolean;
    estTotalFare?: boolean;
    perSeatPrice?: boolean;
    isVerified?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type RideOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "ownerId"
    | "service"
    | "shareUrlHash"
    | "shareUrlEnc"
    | "fromText"
    | "toText"
    | "fromLat"
    | "fromLng"
    | "toLat"
    | "toLng"
    | "departureAt"
    | "seatsTotal"
    | "seatsAvailable"
    | "estTotalFare"
    | "perSeatPrice"
    | "isVerified"
    | "status"
    | "createdAt"
    | "updatedAt",
    ExtArgs["result"]["ride"]
  >;
  export type RideInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    owner?: boolean | UserDefaultArgs<ExtArgs>;
    members?: boolean | Ride$membersArgs<ExtArgs>;
    _count?: boolean | RideCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type RideIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    owner?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type RideIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    owner?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $RidePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Ride";
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>;
      members: Prisma.$RideMemberPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        ownerId: string;
        service: $Enums.RideService;
        shareUrlHash: string | null;
        shareUrlEnc: string | null;
        fromText: string;
        toText: string;
        fromLat: number;
        fromLng: number;
        toLat: number;
        toLng: number;
        departureAt: Date;
        seatsTotal: number;
        seatsAvailable: number;
        estTotalFare: number;
        perSeatPrice: number;
        isVerified: boolean;
        status: $Enums.RideStatus;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["ride"]
    >;
    composites: {};
  };

  type RideGetPayload<S extends boolean | null | undefined | RideDefaultArgs> =
    $Result.GetResult<Prisma.$RidePayload, S>;

  type RideCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<RideFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: RideCountAggregateInputType | true;
  };

  export interface RideDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Ride"];
      meta: { name: "Ride" };
    };
    /**
     * Find zero or one Ride that matches the filter.
     * @param {RideFindUniqueArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RideFindUniqueArgs>(
      args: SelectSubset<T, RideFindUniqueArgs<ExtArgs>>,
    ): Prisma__RideClient<
      $Result.GetResult<
        Prisma.$RidePayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Ride that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RideFindUniqueOrThrowArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RideFindUniqueOrThrowArgs>(
      args: SelectSubset<T, RideFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__RideClient<
      $Result.GetResult<
        Prisma.$RidePayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Ride that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideFindFirstArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RideFindFirstArgs>(
      args?: SelectSubset<T, RideFindFirstArgs<ExtArgs>>,
    ): Prisma__RideClient<
      $Result.GetResult<
        Prisma.$RidePayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Ride that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideFindFirstOrThrowArgs} args - Arguments to find a Ride
     * @example
     * // Get one Ride
     * const ride = await prisma.ride.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RideFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RideFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__RideClient<
      $Result.GetResult<
        Prisma.$RidePayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Rides that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rides
     * const rides = await prisma.ride.findMany()
     *
     * // Get first 10 Rides
     * const rides = await prisma.ride.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const rideWithIdOnly = await prisma.ride.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RideFindManyArgs>(
      args?: SelectSubset<T, RideFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RidePayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Ride.
     * @param {RideCreateArgs} args - Arguments to create a Ride.
     * @example
     * // Create one Ride
     * const Ride = await prisma.ride.create({
     *   data: {
     *     // ... data to create a Ride
     *   }
     * })
     *
     */
    create<T extends RideCreateArgs>(
      args: SelectSubset<T, RideCreateArgs<ExtArgs>>,
    ): Prisma__RideClient<
      $Result.GetResult<
        Prisma.$RidePayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Rides.
     * @param {RideCreateManyArgs} args - Arguments to create many Rides.
     * @example
     * // Create many Rides
     * const ride = await prisma.ride.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RideCreateManyArgs>(
      args?: SelectSubset<T, RideCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Rides and returns the data saved in the database.
     * @param {RideCreateManyAndReturnArgs} args - Arguments to create many Rides.
     * @example
     * // Create many Rides
     * const ride = await prisma.ride.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Rides and only return the `id`
     * const rideWithIdOnly = await prisma.ride.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RideCreateManyAndReturnArgs>(
      args?: SelectSubset<T, RideCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RidePayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Ride.
     * @param {RideDeleteArgs} args - Arguments to delete one Ride.
     * @example
     * // Delete one Ride
     * const Ride = await prisma.ride.delete({
     *   where: {
     *     // ... filter to delete one Ride
     *   }
     * })
     *
     */
    delete<T extends RideDeleteArgs>(
      args: SelectSubset<T, RideDeleteArgs<ExtArgs>>,
    ): Prisma__RideClient<
      $Result.GetResult<
        Prisma.$RidePayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Ride.
     * @param {RideUpdateArgs} args - Arguments to update one Ride.
     * @example
     * // Update one Ride
     * const ride = await prisma.ride.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RideUpdateArgs>(
      args: SelectSubset<T, RideUpdateArgs<ExtArgs>>,
    ): Prisma__RideClient<
      $Result.GetResult<
        Prisma.$RidePayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Rides.
     * @param {RideDeleteManyArgs} args - Arguments to filter Rides to delete.
     * @example
     * // Delete a few Rides
     * const { count } = await prisma.ride.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RideDeleteManyArgs>(
      args?: SelectSubset<T, RideDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Rides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rides
     * const ride = await prisma.ride.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RideUpdateManyArgs>(
      args: SelectSubset<T, RideUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Rides and returns the data updated in the database.
     * @param {RideUpdateManyAndReturnArgs} args - Arguments to update many Rides.
     * @example
     * // Update many Rides
     * const ride = await prisma.ride.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Rides and only return the `id`
     * const rideWithIdOnly = await prisma.ride.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends RideUpdateManyAndReturnArgs>(
      args: SelectSubset<T, RideUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RidePayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Ride.
     * @param {RideUpsertArgs} args - Arguments to update or create a Ride.
     * @example
     * // Update or create a Ride
     * const ride = await prisma.ride.upsert({
     *   create: {
     *     // ... data to create a Ride
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ride we want to update
     *   }
     * })
     */
    upsert<T extends RideUpsertArgs>(
      args: SelectSubset<T, RideUpsertArgs<ExtArgs>>,
    ): Prisma__RideClient<
      $Result.GetResult<
        Prisma.$RidePayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Rides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideCountArgs} args - Arguments to filter Rides to count.
     * @example
     * // Count the number of Rides
     * const count = await prisma.ride.count({
     *   where: {
     *     // ... the filter for the Rides we want to count
     *   }
     * })
     **/
    count<T extends RideCountArgs>(
      args?: Subset<T, RideCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], RideCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Ride.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends RideAggregateArgs>(
      args: Subset<T, RideAggregateArgs>,
    ): Prisma.PrismaPromise<GetRideAggregateType<T>>;

    /**
     * Group by Ride.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends RideGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RideGroupByArgs["orderBy"] }
        : { orderBy?: RideGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, RideGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetRideGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Ride model
     */
    readonly fields: RideFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ride.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RideClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    members<T extends Ride$membersArgs<ExtArgs> = {}>(
      args?: Subset<T, Ride$membersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$RideMemberPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Ride model
   */
  interface RideFieldRefs {
    readonly id: FieldRef<"Ride", "String">;
    readonly ownerId: FieldRef<"Ride", "String">;
    readonly service: FieldRef<"Ride", "RideService">;
    readonly shareUrlHash: FieldRef<"Ride", "String">;
    readonly shareUrlEnc: FieldRef<"Ride", "String">;
    readonly fromText: FieldRef<"Ride", "String">;
    readonly toText: FieldRef<"Ride", "String">;
    readonly fromLat: FieldRef<"Ride", "Float">;
    readonly fromLng: FieldRef<"Ride", "Float">;
    readonly toLat: FieldRef<"Ride", "Float">;
    readonly toLng: FieldRef<"Ride", "Float">;
    readonly departureAt: FieldRef<"Ride", "DateTime">;
    readonly seatsTotal: FieldRef<"Ride", "Int">;
    readonly seatsAvailable: FieldRef<"Ride", "Int">;
    readonly estTotalFare: FieldRef<"Ride", "Int">;
    readonly perSeatPrice: FieldRef<"Ride", "Int">;
    readonly isVerified: FieldRef<"Ride", "Boolean">;
    readonly status: FieldRef<"Ride", "RideStatus">;
    readonly createdAt: FieldRef<"Ride", "DateTime">;
    readonly updatedAt: FieldRef<"Ride", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Ride findUnique
   */
  export type RideFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null;
    /**
     * Filter, which Ride to fetch.
     */
    where: RideWhereUniqueInput;
  };

  /**
   * Ride findUniqueOrThrow
   */
  export type RideFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null;
    /**
     * Filter, which Ride to fetch.
     */
    where: RideWhereUniqueInput;
  };

  /**
   * Ride findFirst
   */
  export type RideFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null;
    /**
     * Filter, which Ride to fetch.
     */
    where?: RideWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rides to fetch.
     */
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Rides.
     */
    cursor?: RideWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rides from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rides.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Rides.
     */
    distinct?: RideScalarFieldEnum | RideScalarFieldEnum[];
  };

  /**
   * Ride findFirstOrThrow
   */
  export type RideFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null;
    /**
     * Filter, which Ride to fetch.
     */
    where?: RideWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rides to fetch.
     */
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Rides.
     */
    cursor?: RideWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rides from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rides.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Rides.
     */
    distinct?: RideScalarFieldEnum | RideScalarFieldEnum[];
  };

  /**
   * Ride findMany
   */
  export type RideFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null;
    /**
     * Filter, which Rides to fetch.
     */
    where?: RideWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rides to fetch.
     */
    orderBy?: RideOrderByWithRelationInput | RideOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Rides.
     */
    cursor?: RideWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rides from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rides.
     */
    skip?: number;
    distinct?: RideScalarFieldEnum | RideScalarFieldEnum[];
  };

  /**
   * Ride create
   */
  export type RideCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null;
    /**
     * The data needed to create a Ride.
     */
    data: XOR<RideCreateInput, RideUncheckedCreateInput>;
  };

  /**
   * Ride createMany
   */
  export type RideCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Rides.
     */
    data: RideCreateManyInput | RideCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Ride createManyAndReturn
   */
  export type RideCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null;
    /**
     * The data used to create many Rides.
     */
    data: RideCreateManyInput | RideCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Ride update
   */
  export type RideUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null;
    /**
     * The data needed to update a Ride.
     */
    data: XOR<RideUpdateInput, RideUncheckedUpdateInput>;
    /**
     * Choose, which Ride to update.
     */
    where: RideWhereUniqueInput;
  };

  /**
   * Ride updateMany
   */
  export type RideUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Rides.
     */
    data: XOR<RideUpdateManyMutationInput, RideUncheckedUpdateManyInput>;
    /**
     * Filter which Rides to update
     */
    where?: RideWhereInput;
    /**
     * Limit how many Rides to update.
     */
    limit?: number;
  };

  /**
   * Ride updateManyAndReturn
   */
  export type RideUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null;
    /**
     * The data used to update Rides.
     */
    data: XOR<RideUpdateManyMutationInput, RideUncheckedUpdateManyInput>;
    /**
     * Filter which Rides to update
     */
    where?: RideWhereInput;
    /**
     * Limit how many Rides to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Ride upsert
   */
  export type RideUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null;
    /**
     * The filter to search for the Ride to update in case it exists.
     */
    where: RideWhereUniqueInput;
    /**
     * In case the Ride found by the `where` argument doesn't exist, create a new Ride with this data.
     */
    create: XOR<RideCreateInput, RideUncheckedCreateInput>;
    /**
     * In case the Ride was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RideUpdateInput, RideUncheckedUpdateInput>;
  };

  /**
   * Ride delete
   */
  export type RideDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null;
    /**
     * Filter which Ride to delete.
     */
    where: RideWhereUniqueInput;
  };

  /**
   * Ride deleteMany
   */
  export type RideDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Rides to delete
     */
    where?: RideWhereInput;
    /**
     * Limit how many Rides to delete.
     */
    limit?: number;
  };

  /**
   * Ride.members
   */
  export type Ride$membersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RideMember
     */
    select?: RideMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideMember
     */
    omit?: RideMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideMemberInclude<ExtArgs> | null;
    where?: RideMemberWhereInput;
    orderBy?:
      | RideMemberOrderByWithRelationInput
      | RideMemberOrderByWithRelationInput[];
    cursor?: RideMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: RideMemberScalarFieldEnum | RideMemberScalarFieldEnum[];
  };

  /**
   * Ride without action
   */
  export type RideDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ride
     */
    select?: RideSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ride
     */
    omit?: RideOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideInclude<ExtArgs> | null;
  };

  /**
   * Model RideMember
   */

  export type AggregateRideMember = {
    _count: RideMemberCountAggregateOutputType | null;
    _avg: RideMemberAvgAggregateOutputType | null;
    _sum: RideMemberSumAggregateOutputType | null;
    _min: RideMemberMinAggregateOutputType | null;
    _max: RideMemberMaxAggregateOutputType | null;
  };

  export type RideMemberAvgAggregateOutputType = {
    fareShare: number | null;
  };

  export type RideMemberSumAggregateOutputType = {
    fareShare: number | null;
  };

  export type RideMemberMinAggregateOutputType = {
    id: string | null;
    rideId: string | null;
    userId: string | null;
    status: $Enums.MemberStatus | null;
    fareShare: number | null;
    createdAt: Date | null;
  };

  export type RideMemberMaxAggregateOutputType = {
    id: string | null;
    rideId: string | null;
    userId: string | null;
    status: $Enums.MemberStatus | null;
    fareShare: number | null;
    createdAt: Date | null;
  };

  export type RideMemberCountAggregateOutputType = {
    id: number;
    rideId: number;
    userId: number;
    status: number;
    fareShare: number;
    createdAt: number;
    _all: number;
  };

  export type RideMemberAvgAggregateInputType = {
    fareShare?: true;
  };

  export type RideMemberSumAggregateInputType = {
    fareShare?: true;
  };

  export type RideMemberMinAggregateInputType = {
    id?: true;
    rideId?: true;
    userId?: true;
    status?: true;
    fareShare?: true;
    createdAt?: true;
  };

  export type RideMemberMaxAggregateInputType = {
    id?: true;
    rideId?: true;
    userId?: true;
    status?: true;
    fareShare?: true;
    createdAt?: true;
  };

  export type RideMemberCountAggregateInputType = {
    id?: true;
    rideId?: true;
    userId?: true;
    status?: true;
    fareShare?: true;
    createdAt?: true;
    _all?: true;
  };

  export type RideMemberAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which RideMember to aggregate.
     */
    where?: RideMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RideMembers to fetch.
     */
    orderBy?:
      | RideMemberOrderByWithRelationInput
      | RideMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: RideMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RideMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RideMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RideMembers
     **/
    _count?: true | RideMemberCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: RideMemberAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: RideMemberSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: RideMemberMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: RideMemberMaxAggregateInputType;
  };

  export type GetRideMemberAggregateType<T extends RideMemberAggregateArgs> = {
    [P in keyof T & keyof AggregateRideMember]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRideMember[P]>
      : GetScalarType<T[P], AggregateRideMember[P]>;
  };

  export type RideMemberGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RideMemberWhereInput;
    orderBy?:
      | RideMemberOrderByWithAggregationInput
      | RideMemberOrderByWithAggregationInput[];
    by: RideMemberScalarFieldEnum[] | RideMemberScalarFieldEnum;
    having?: RideMemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RideMemberCountAggregateInputType | true;
    _avg?: RideMemberAvgAggregateInputType;
    _sum?: RideMemberSumAggregateInputType;
    _min?: RideMemberMinAggregateInputType;
    _max?: RideMemberMaxAggregateInputType;
  };

  export type RideMemberGroupByOutputType = {
    id: string;
    rideId: string;
    userId: string;
    status: $Enums.MemberStatus;
    fareShare: number;
    createdAt: Date;
    _count: RideMemberCountAggregateOutputType | null;
    _avg: RideMemberAvgAggregateOutputType | null;
    _sum: RideMemberSumAggregateOutputType | null;
    _min: RideMemberMinAggregateOutputType | null;
    _max: RideMemberMaxAggregateOutputType | null;
  };

  type GetRideMemberGroupByPayload<T extends RideMemberGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<RideMemberGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof RideMemberGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RideMemberGroupByOutputType[P]>
            : GetScalarType<T[P], RideMemberGroupByOutputType[P]>;
        }
      >
    >;

  export type RideMemberSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      rideId?: boolean;
      userId?: boolean;
      status?: boolean;
      fareShare?: boolean;
      createdAt?: boolean;
      ride?: boolean | RideDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["rideMember"]
  >;

  export type RideMemberSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      rideId?: boolean;
      userId?: boolean;
      status?: boolean;
      fareShare?: boolean;
      createdAt?: boolean;
      ride?: boolean | RideDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["rideMember"]
  >;

  export type RideMemberSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      rideId?: boolean;
      userId?: boolean;
      status?: boolean;
      fareShare?: boolean;
      createdAt?: boolean;
      ride?: boolean | RideDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["rideMember"]
  >;

  export type RideMemberSelectScalar = {
    id?: boolean;
    rideId?: boolean;
    userId?: boolean;
    status?: boolean;
    fareShare?: boolean;
    createdAt?: boolean;
  };

  export type RideMemberOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "rideId" | "userId" | "status" | "fareShare" | "createdAt",
    ExtArgs["result"]["rideMember"]
  >;
  export type RideMemberInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    ride?: boolean | RideDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type RideMemberIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    ride?: boolean | RideDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type RideMemberIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    ride?: boolean | RideDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $RideMemberPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "RideMember";
    objects: {
      ride: Prisma.$RidePayload<ExtArgs>;
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        rideId: string;
        userId: string;
        status: $Enums.MemberStatus;
        fareShare: number;
        createdAt: Date;
      },
      ExtArgs["result"]["rideMember"]
    >;
    composites: {};
  };

  type RideMemberGetPayload<
    S extends boolean | null | undefined | RideMemberDefaultArgs,
  > = $Result.GetResult<Prisma.$RideMemberPayload, S>;

  type RideMemberCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    RideMemberFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: RideMemberCountAggregateInputType | true;
  };

  export interface RideMemberDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["RideMember"];
      meta: { name: "RideMember" };
    };
    /**
     * Find zero or one RideMember that matches the filter.
     * @param {RideMemberFindUniqueArgs} args - Arguments to find a RideMember
     * @example
     * // Get one RideMember
     * const rideMember = await prisma.rideMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RideMemberFindUniqueArgs>(
      args: SelectSubset<T, RideMemberFindUniqueArgs<ExtArgs>>,
    ): Prisma__RideMemberClient<
      $Result.GetResult<
        Prisma.$RideMemberPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one RideMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RideMemberFindUniqueOrThrowArgs} args - Arguments to find a RideMember
     * @example
     * // Get one RideMember
     * const rideMember = await prisma.rideMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RideMemberFindUniqueOrThrowArgs>(
      args: SelectSubset<T, RideMemberFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__RideMemberClient<
      $Result.GetResult<
        Prisma.$RideMemberPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first RideMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideMemberFindFirstArgs} args - Arguments to find a RideMember
     * @example
     * // Get one RideMember
     * const rideMember = await prisma.rideMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RideMemberFindFirstArgs>(
      args?: SelectSubset<T, RideMemberFindFirstArgs<ExtArgs>>,
    ): Prisma__RideMemberClient<
      $Result.GetResult<
        Prisma.$RideMemberPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first RideMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideMemberFindFirstOrThrowArgs} args - Arguments to find a RideMember
     * @example
     * // Get one RideMember
     * const rideMember = await prisma.rideMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RideMemberFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RideMemberFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__RideMemberClient<
      $Result.GetResult<
        Prisma.$RideMemberPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more RideMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RideMembers
     * const rideMembers = await prisma.rideMember.findMany()
     *
     * // Get first 10 RideMembers
     * const rideMembers = await prisma.rideMember.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const rideMemberWithIdOnly = await prisma.rideMember.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RideMemberFindManyArgs>(
      args?: SelectSubset<T, RideMemberFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RideMemberPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a RideMember.
     * @param {RideMemberCreateArgs} args - Arguments to create a RideMember.
     * @example
     * // Create one RideMember
     * const RideMember = await prisma.rideMember.create({
     *   data: {
     *     // ... data to create a RideMember
     *   }
     * })
     *
     */
    create<T extends RideMemberCreateArgs>(
      args: SelectSubset<T, RideMemberCreateArgs<ExtArgs>>,
    ): Prisma__RideMemberClient<
      $Result.GetResult<
        Prisma.$RideMemberPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many RideMembers.
     * @param {RideMemberCreateManyArgs} args - Arguments to create many RideMembers.
     * @example
     * // Create many RideMembers
     * const rideMember = await prisma.rideMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RideMemberCreateManyArgs>(
      args?: SelectSubset<T, RideMemberCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many RideMembers and returns the data saved in the database.
     * @param {RideMemberCreateManyAndReturnArgs} args - Arguments to create many RideMembers.
     * @example
     * // Create many RideMembers
     * const rideMember = await prisma.rideMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RideMembers and only return the `id`
     * const rideMemberWithIdOnly = await prisma.rideMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RideMemberCreateManyAndReturnArgs>(
      args?: SelectSubset<T, RideMemberCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RideMemberPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a RideMember.
     * @param {RideMemberDeleteArgs} args - Arguments to delete one RideMember.
     * @example
     * // Delete one RideMember
     * const RideMember = await prisma.rideMember.delete({
     *   where: {
     *     // ... filter to delete one RideMember
     *   }
     * })
     *
     */
    delete<T extends RideMemberDeleteArgs>(
      args: SelectSubset<T, RideMemberDeleteArgs<ExtArgs>>,
    ): Prisma__RideMemberClient<
      $Result.GetResult<
        Prisma.$RideMemberPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one RideMember.
     * @param {RideMemberUpdateArgs} args - Arguments to update one RideMember.
     * @example
     * // Update one RideMember
     * const rideMember = await prisma.rideMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RideMemberUpdateArgs>(
      args: SelectSubset<T, RideMemberUpdateArgs<ExtArgs>>,
    ): Prisma__RideMemberClient<
      $Result.GetResult<
        Prisma.$RideMemberPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more RideMembers.
     * @param {RideMemberDeleteManyArgs} args - Arguments to filter RideMembers to delete.
     * @example
     * // Delete a few RideMembers
     * const { count } = await prisma.rideMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RideMemberDeleteManyArgs>(
      args?: SelectSubset<T, RideMemberDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more RideMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RideMembers
     * const rideMember = await prisma.rideMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RideMemberUpdateManyArgs>(
      args: SelectSubset<T, RideMemberUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more RideMembers and returns the data updated in the database.
     * @param {RideMemberUpdateManyAndReturnArgs} args - Arguments to update many RideMembers.
     * @example
     * // Update many RideMembers
     * const rideMember = await prisma.rideMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more RideMembers and only return the `id`
     * const rideMemberWithIdOnly = await prisma.rideMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends RideMemberUpdateManyAndReturnArgs>(
      args: SelectSubset<T, RideMemberUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RideMemberPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one RideMember.
     * @param {RideMemberUpsertArgs} args - Arguments to update or create a RideMember.
     * @example
     * // Update or create a RideMember
     * const rideMember = await prisma.rideMember.upsert({
     *   create: {
     *     // ... data to create a RideMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RideMember we want to update
     *   }
     * })
     */
    upsert<T extends RideMemberUpsertArgs>(
      args: SelectSubset<T, RideMemberUpsertArgs<ExtArgs>>,
    ): Prisma__RideMemberClient<
      $Result.GetResult<
        Prisma.$RideMemberPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of RideMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideMemberCountArgs} args - Arguments to filter RideMembers to count.
     * @example
     * // Count the number of RideMembers
     * const count = await prisma.rideMember.count({
     *   where: {
     *     // ... the filter for the RideMembers we want to count
     *   }
     * })
     **/
    count<T extends RideMemberCountArgs>(
      args?: Subset<T, RideMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], RideMemberCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a RideMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends RideMemberAggregateArgs>(
      args: Subset<T, RideMemberAggregateArgs>,
    ): Prisma.PrismaPromise<GetRideMemberAggregateType<T>>;

    /**
     * Group by RideMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RideMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends RideMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RideMemberGroupByArgs["orderBy"] }
        : { orderBy?: RideMemberGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, RideMemberGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetRideMemberGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RideMember model
     */
    readonly fields: RideMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RideMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RideMemberClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ride<T extends RideDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, RideDefaultArgs<ExtArgs>>,
    ): Prisma__RideClient<
      | $Result.GetResult<
          Prisma.$RidePayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the RideMember model
   */
  interface RideMemberFieldRefs {
    readonly id: FieldRef<"RideMember", "String">;
    readonly rideId: FieldRef<"RideMember", "String">;
    readonly userId: FieldRef<"RideMember", "String">;
    readonly status: FieldRef<"RideMember", "MemberStatus">;
    readonly fareShare: FieldRef<"RideMember", "Int">;
    readonly createdAt: FieldRef<"RideMember", "DateTime">;
  }

  // Custom InputTypes
  /**
   * RideMember findUnique
   */
  export type RideMemberFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RideMember
     */
    select?: RideMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideMember
     */
    omit?: RideMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideMemberInclude<ExtArgs> | null;
    /**
     * Filter, which RideMember to fetch.
     */
    where: RideMemberWhereUniqueInput;
  };

  /**
   * RideMember findUniqueOrThrow
   */
  export type RideMemberFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RideMember
     */
    select?: RideMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideMember
     */
    omit?: RideMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideMemberInclude<ExtArgs> | null;
    /**
     * Filter, which RideMember to fetch.
     */
    where: RideMemberWhereUniqueInput;
  };

  /**
   * RideMember findFirst
   */
  export type RideMemberFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RideMember
     */
    select?: RideMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideMember
     */
    omit?: RideMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideMemberInclude<ExtArgs> | null;
    /**
     * Filter, which RideMember to fetch.
     */
    where?: RideMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RideMembers to fetch.
     */
    orderBy?:
      | RideMemberOrderByWithRelationInput
      | RideMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RideMembers.
     */
    cursor?: RideMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RideMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RideMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RideMembers.
     */
    distinct?: RideMemberScalarFieldEnum | RideMemberScalarFieldEnum[];
  };

  /**
   * RideMember findFirstOrThrow
   */
  export type RideMemberFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RideMember
     */
    select?: RideMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideMember
     */
    omit?: RideMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideMemberInclude<ExtArgs> | null;
    /**
     * Filter, which RideMember to fetch.
     */
    where?: RideMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RideMembers to fetch.
     */
    orderBy?:
      | RideMemberOrderByWithRelationInput
      | RideMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RideMembers.
     */
    cursor?: RideMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RideMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RideMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RideMembers.
     */
    distinct?: RideMemberScalarFieldEnum | RideMemberScalarFieldEnum[];
  };

  /**
   * RideMember findMany
   */
  export type RideMemberFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RideMember
     */
    select?: RideMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideMember
     */
    omit?: RideMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideMemberInclude<ExtArgs> | null;
    /**
     * Filter, which RideMembers to fetch.
     */
    where?: RideMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RideMembers to fetch.
     */
    orderBy?:
      | RideMemberOrderByWithRelationInput
      | RideMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RideMembers.
     */
    cursor?: RideMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RideMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RideMembers.
     */
    skip?: number;
    distinct?: RideMemberScalarFieldEnum | RideMemberScalarFieldEnum[];
  };

  /**
   * RideMember create
   */
  export type RideMemberCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RideMember
     */
    select?: RideMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideMember
     */
    omit?: RideMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideMemberInclude<ExtArgs> | null;
    /**
     * The data needed to create a RideMember.
     */
    data: XOR<RideMemberCreateInput, RideMemberUncheckedCreateInput>;
  };

  /**
   * RideMember createMany
   */
  export type RideMemberCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many RideMembers.
     */
    data: RideMemberCreateManyInput | RideMemberCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * RideMember createManyAndReturn
   */
  export type RideMemberCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RideMember
     */
    select?: RideMemberSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RideMember
     */
    omit?: RideMemberOmit<ExtArgs> | null;
    /**
     * The data used to create many RideMembers.
     */
    data: RideMemberCreateManyInput | RideMemberCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideMemberIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * RideMember update
   */
  export type RideMemberUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RideMember
     */
    select?: RideMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideMember
     */
    omit?: RideMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideMemberInclude<ExtArgs> | null;
    /**
     * The data needed to update a RideMember.
     */
    data: XOR<RideMemberUpdateInput, RideMemberUncheckedUpdateInput>;
    /**
     * Choose, which RideMember to update.
     */
    where: RideMemberWhereUniqueInput;
  };

  /**
   * RideMember updateMany
   */
  export type RideMemberUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update RideMembers.
     */
    data: XOR<
      RideMemberUpdateManyMutationInput,
      RideMemberUncheckedUpdateManyInput
    >;
    /**
     * Filter which RideMembers to update
     */
    where?: RideMemberWhereInput;
    /**
     * Limit how many RideMembers to update.
     */
    limit?: number;
  };

  /**
   * RideMember updateManyAndReturn
   */
  export type RideMemberUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RideMember
     */
    select?: RideMemberSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RideMember
     */
    omit?: RideMemberOmit<ExtArgs> | null;
    /**
     * The data used to update RideMembers.
     */
    data: XOR<
      RideMemberUpdateManyMutationInput,
      RideMemberUncheckedUpdateManyInput
    >;
    /**
     * Filter which RideMembers to update
     */
    where?: RideMemberWhereInput;
    /**
     * Limit how many RideMembers to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideMemberIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * RideMember upsert
   */
  export type RideMemberUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RideMember
     */
    select?: RideMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideMember
     */
    omit?: RideMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideMemberInclude<ExtArgs> | null;
    /**
     * The filter to search for the RideMember to update in case it exists.
     */
    where: RideMemberWhereUniqueInput;
    /**
     * In case the RideMember found by the `where` argument doesn't exist, create a new RideMember with this data.
     */
    create: XOR<RideMemberCreateInput, RideMemberUncheckedCreateInput>;
    /**
     * In case the RideMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RideMemberUpdateInput, RideMemberUncheckedUpdateInput>;
  };

  /**
   * RideMember delete
   */
  export type RideMemberDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RideMember
     */
    select?: RideMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideMember
     */
    omit?: RideMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideMemberInclude<ExtArgs> | null;
    /**
     * Filter which RideMember to delete.
     */
    where: RideMemberWhereUniqueInput;
  };

  /**
   * RideMember deleteMany
   */
  export type RideMemberDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which RideMembers to delete
     */
    where?: RideMemberWhereInput;
    /**
     * Limit how many RideMembers to delete.
     */
    limit?: number;
  };

  /**
   * RideMember without action
   */
  export type RideMemberDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RideMember
     */
    select?: RideMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RideMember
     */
    omit?: RideMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RideMemberInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: "ReadUncommitted";
    ReadCommitted: "ReadCommitted";
    RepeatableRead: "RepeatableRead";
    Serializable: "Serializable";
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum: {
    id: "id";
    clerkId: "clerkId";
    email: "email";
    firstName: "firstName";
    lastName: "lastName";
    imageUrl: "imageUrl";
    name: "name";
    phone: "phone";
    rating: "rating";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const RideScalarFieldEnum: {
    id: "id";
    ownerId: "ownerId";
    service: "service";
    shareUrlHash: "shareUrlHash";
    shareUrlEnc: "shareUrlEnc";
    fromText: "fromText";
    toText: "toText";
    fromLat: "fromLat";
    fromLng: "fromLng";
    toLat: "toLat";
    toLng: "toLng";
    departureAt: "departureAt";
    seatsTotal: "seatsTotal";
    seatsAvailable: "seatsAvailable";
    estTotalFare: "estTotalFare";
    perSeatPrice: "perSeatPrice";
    isVerified: "isVerified";
    status: "status";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type RideScalarFieldEnum =
    (typeof RideScalarFieldEnum)[keyof typeof RideScalarFieldEnum];

  export const RideMemberScalarFieldEnum: {
    id: "id";
    rideId: "rideId";
    userId: "userId";
    status: "status";
    fareShare: "fareShare";
    createdAt: "createdAt";
  };

  export type RideMemberScalarFieldEnum =
    (typeof RideMemberScalarFieldEnum)[keyof typeof RideMemberScalarFieldEnum];

  export const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: "default";
    insensitive: "insensitive";
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: "first";
    last: "last";
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String"
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String[]"
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float"
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float[]"
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime"
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime[]"
  >;

  /**
   * Reference to a field of type 'RideService'
   */
  export type EnumRideServiceFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "RideService"
  >;

  /**
   * Reference to a field of type 'RideService[]'
   */
  export type ListEnumRideServiceFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "RideService[]">;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int"
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int[]"
  >;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Boolean"
  >;

  /**
   * Reference to a field of type 'RideStatus'
   */
  export type EnumRideStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "RideStatus"
  >;

  /**
   * Reference to a field of type 'RideStatus[]'
   */
  export type ListEnumRideStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "RideStatus[]"
  >;

  /**
   * Reference to a field of type 'MemberStatus'
   */
  export type EnumMemberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "MemberStatus"
  >;

  /**
   * Reference to a field of type 'MemberStatus[]'
   */
  export type ListEnumMemberStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "MemberStatus[]">;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<"User"> | string;
    clerkId?: StringFilter<"User"> | string;
    email?: StringFilter<"User"> | string;
    firstName?: StringNullableFilter<"User"> | string | null;
    lastName?: StringNullableFilter<"User"> | string | null;
    imageUrl?: StringNullableFilter<"User"> | string | null;
    name?: StringFilter<"User"> | string;
    phone?: StringNullableFilter<"User"> | string | null;
    rating?: FloatFilter<"User"> | number;
    createdAt?: DateTimeFilter<"User"> | Date | string;
    updatedAt?: DateTimeFilter<"User"> | Date | string;
    ridesOwned?: RideListRelationFilter;
    memberships?: RideMemberListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    clerkId?: SortOrder;
    email?: SortOrder;
    firstName?: SortOrderInput | SortOrder;
    lastName?: SortOrderInput | SortOrder;
    imageUrl?: SortOrderInput | SortOrder;
    name?: SortOrder;
    phone?: SortOrderInput | SortOrder;
    rating?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    ridesOwned?: RideOrderByRelationAggregateInput;
    memberships?: RideMemberOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      clerkId?: string;
      email?: string;
      phone?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      firstName?: StringNullableFilter<"User"> | string | null;
      lastName?: StringNullableFilter<"User"> | string | null;
      imageUrl?: StringNullableFilter<"User"> | string | null;
      name?: StringFilter<"User"> | string;
      rating?: FloatFilter<"User"> | number;
      createdAt?: DateTimeFilter<"User"> | Date | string;
      updatedAt?: DateTimeFilter<"User"> | Date | string;
      ridesOwned?: RideListRelationFilter;
      memberships?: RideMemberListRelationFilter;
    },
    "id" | "clerkId" | "email" | "phone"
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    clerkId?: SortOrder;
    email?: SortOrder;
    firstName?: SortOrderInput | SortOrder;
    lastName?: SortOrderInput | SortOrder;
    imageUrl?: SortOrderInput | SortOrder;
    name?: SortOrder;
    phone?: SortOrderInput | SortOrder;
    rating?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _avg?: UserAvgOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
    _sum?: UserSumOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"User"> | string;
    clerkId?: StringWithAggregatesFilter<"User"> | string;
    email?: StringWithAggregatesFilter<"User"> | string;
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null;
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null;
    imageUrl?: StringNullableWithAggregatesFilter<"User"> | string | null;
    name?: StringWithAggregatesFilter<"User"> | string;
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null;
    rating?: FloatWithAggregatesFilter<"User"> | number;
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
  };

  export type RideWhereInput = {
    AND?: RideWhereInput | RideWhereInput[];
    OR?: RideWhereInput[];
    NOT?: RideWhereInput | RideWhereInput[];
    id?: StringFilter<"Ride"> | string;
    ownerId?: StringFilter<"Ride"> | string;
    service?: EnumRideServiceFilter<"Ride"> | $Enums.RideService;
    shareUrlHash?: StringNullableFilter<"Ride"> | string | null;
    shareUrlEnc?: StringNullableFilter<"Ride"> | string | null;
    fromText?: StringFilter<"Ride"> | string;
    toText?: StringFilter<"Ride"> | string;
    fromLat?: FloatFilter<"Ride"> | number;
    fromLng?: FloatFilter<"Ride"> | number;
    toLat?: FloatFilter<"Ride"> | number;
    toLng?: FloatFilter<"Ride"> | number;
    departureAt?: DateTimeFilter<"Ride"> | Date | string;
    seatsTotal?: IntFilter<"Ride"> | number;
    seatsAvailable?: IntFilter<"Ride"> | number;
    estTotalFare?: IntFilter<"Ride"> | number;
    perSeatPrice?: IntFilter<"Ride"> | number;
    isVerified?: BoolFilter<"Ride"> | boolean;
    status?: EnumRideStatusFilter<"Ride"> | $Enums.RideStatus;
    createdAt?: DateTimeFilter<"Ride"> | Date | string;
    updatedAt?: DateTimeFilter<"Ride"> | Date | string;
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>;
    members?: RideMemberListRelationFilter;
  };

  export type RideOrderByWithRelationInput = {
    id?: SortOrder;
    ownerId?: SortOrder;
    service?: SortOrder;
    shareUrlHash?: SortOrderInput | SortOrder;
    shareUrlEnc?: SortOrderInput | SortOrder;
    fromText?: SortOrder;
    toText?: SortOrder;
    fromLat?: SortOrder;
    fromLng?: SortOrder;
    toLat?: SortOrder;
    toLng?: SortOrder;
    departureAt?: SortOrder;
    seatsTotal?: SortOrder;
    seatsAvailable?: SortOrder;
    estTotalFare?: SortOrder;
    perSeatPrice?: SortOrder;
    isVerified?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    owner?: UserOrderByWithRelationInput;
    members?: RideMemberOrderByRelationAggregateInput;
  };

  export type RideWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      shareUrlHash?: string;
      AND?: RideWhereInput | RideWhereInput[];
      OR?: RideWhereInput[];
      NOT?: RideWhereInput | RideWhereInput[];
      ownerId?: StringFilter<"Ride"> | string;
      service?: EnumRideServiceFilter<"Ride"> | $Enums.RideService;
      shareUrlEnc?: StringNullableFilter<"Ride"> | string | null;
      fromText?: StringFilter<"Ride"> | string;
      toText?: StringFilter<"Ride"> | string;
      fromLat?: FloatFilter<"Ride"> | number;
      fromLng?: FloatFilter<"Ride"> | number;
      toLat?: FloatFilter<"Ride"> | number;
      toLng?: FloatFilter<"Ride"> | number;
      departureAt?: DateTimeFilter<"Ride"> | Date | string;
      seatsTotal?: IntFilter<"Ride"> | number;
      seatsAvailable?: IntFilter<"Ride"> | number;
      estTotalFare?: IntFilter<"Ride"> | number;
      perSeatPrice?: IntFilter<"Ride"> | number;
      isVerified?: BoolFilter<"Ride"> | boolean;
      status?: EnumRideStatusFilter<"Ride"> | $Enums.RideStatus;
      createdAt?: DateTimeFilter<"Ride"> | Date | string;
      updatedAt?: DateTimeFilter<"Ride"> | Date | string;
      owner?: XOR<UserScalarRelationFilter, UserWhereInput>;
      members?: RideMemberListRelationFilter;
    },
    "id" | "shareUrlHash"
  >;

  export type RideOrderByWithAggregationInput = {
    id?: SortOrder;
    ownerId?: SortOrder;
    service?: SortOrder;
    shareUrlHash?: SortOrderInput | SortOrder;
    shareUrlEnc?: SortOrderInput | SortOrder;
    fromText?: SortOrder;
    toText?: SortOrder;
    fromLat?: SortOrder;
    fromLng?: SortOrder;
    toLat?: SortOrder;
    toLng?: SortOrder;
    departureAt?: SortOrder;
    seatsTotal?: SortOrder;
    seatsAvailable?: SortOrder;
    estTotalFare?: SortOrder;
    perSeatPrice?: SortOrder;
    isVerified?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: RideCountOrderByAggregateInput;
    _avg?: RideAvgOrderByAggregateInput;
    _max?: RideMaxOrderByAggregateInput;
    _min?: RideMinOrderByAggregateInput;
    _sum?: RideSumOrderByAggregateInput;
  };

  export type RideScalarWhereWithAggregatesInput = {
    AND?:
      | RideScalarWhereWithAggregatesInput
      | RideScalarWhereWithAggregatesInput[];
    OR?: RideScalarWhereWithAggregatesInput[];
    NOT?:
      | RideScalarWhereWithAggregatesInput
      | RideScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Ride"> | string;
    ownerId?: StringWithAggregatesFilter<"Ride"> | string;
    service?: EnumRideServiceWithAggregatesFilter<"Ride"> | $Enums.RideService;
    shareUrlHash?: StringNullableWithAggregatesFilter<"Ride"> | string | null;
    shareUrlEnc?: StringNullableWithAggregatesFilter<"Ride"> | string | null;
    fromText?: StringWithAggregatesFilter<"Ride"> | string;
    toText?: StringWithAggregatesFilter<"Ride"> | string;
    fromLat?: FloatWithAggregatesFilter<"Ride"> | number;
    fromLng?: FloatWithAggregatesFilter<"Ride"> | number;
    toLat?: FloatWithAggregatesFilter<"Ride"> | number;
    toLng?: FloatWithAggregatesFilter<"Ride"> | number;
    departureAt?: DateTimeWithAggregatesFilter<"Ride"> | Date | string;
    seatsTotal?: IntWithAggregatesFilter<"Ride"> | number;
    seatsAvailable?: IntWithAggregatesFilter<"Ride"> | number;
    estTotalFare?: IntWithAggregatesFilter<"Ride"> | number;
    perSeatPrice?: IntWithAggregatesFilter<"Ride"> | number;
    isVerified?: BoolWithAggregatesFilter<"Ride"> | boolean;
    status?: EnumRideStatusWithAggregatesFilter<"Ride"> | $Enums.RideStatus;
    createdAt?: DateTimeWithAggregatesFilter<"Ride"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Ride"> | Date | string;
  };

  export type RideMemberWhereInput = {
    AND?: RideMemberWhereInput | RideMemberWhereInput[];
    OR?: RideMemberWhereInput[];
    NOT?: RideMemberWhereInput | RideMemberWhereInput[];
    id?: StringFilter<"RideMember"> | string;
    rideId?: StringFilter<"RideMember"> | string;
    userId?: StringFilter<"RideMember"> | string;
    status?: EnumMemberStatusFilter<"RideMember"> | $Enums.MemberStatus;
    fareShare?: IntFilter<"RideMember"> | number;
    createdAt?: DateTimeFilter<"RideMember"> | Date | string;
    ride?: XOR<RideScalarRelationFilter, RideWhereInput>;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type RideMemberOrderByWithRelationInput = {
    id?: SortOrder;
    rideId?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    fareShare?: SortOrder;
    createdAt?: SortOrder;
    ride?: RideOrderByWithRelationInput;
    user?: UserOrderByWithRelationInput;
  };

  export type RideMemberWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      rideId_userId?: RideMemberRideIdUserIdCompoundUniqueInput;
      AND?: RideMemberWhereInput | RideMemberWhereInput[];
      OR?: RideMemberWhereInput[];
      NOT?: RideMemberWhereInput | RideMemberWhereInput[];
      rideId?: StringFilter<"RideMember"> | string;
      userId?: StringFilter<"RideMember"> | string;
      status?: EnumMemberStatusFilter<"RideMember"> | $Enums.MemberStatus;
      fareShare?: IntFilter<"RideMember"> | number;
      createdAt?: DateTimeFilter<"RideMember"> | Date | string;
      ride?: XOR<RideScalarRelationFilter, RideWhereInput>;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    "id" | "rideId_userId"
  >;

  export type RideMemberOrderByWithAggregationInput = {
    id?: SortOrder;
    rideId?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    fareShare?: SortOrder;
    createdAt?: SortOrder;
    _count?: RideMemberCountOrderByAggregateInput;
    _avg?: RideMemberAvgOrderByAggregateInput;
    _max?: RideMemberMaxOrderByAggregateInput;
    _min?: RideMemberMinOrderByAggregateInput;
    _sum?: RideMemberSumOrderByAggregateInput;
  };

  export type RideMemberScalarWhereWithAggregatesInput = {
    AND?:
      | RideMemberScalarWhereWithAggregatesInput
      | RideMemberScalarWhereWithAggregatesInput[];
    OR?: RideMemberScalarWhereWithAggregatesInput[];
    NOT?:
      | RideMemberScalarWhereWithAggregatesInput
      | RideMemberScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"RideMember"> | string;
    rideId?: StringWithAggregatesFilter<"RideMember"> | string;
    userId?: StringWithAggregatesFilter<"RideMember"> | string;
    status?:
      | EnumMemberStatusWithAggregatesFilter<"RideMember">
      | $Enums.MemberStatus;
    fareShare?: IntWithAggregatesFilter<"RideMember"> | number;
    createdAt?: DateTimeWithAggregatesFilter<"RideMember"> | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    clerkId: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    name: string;
    phone?: string | null;
    rating?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ridesOwned?: RideCreateNestedManyWithoutOwnerInput;
    memberships?: RideMemberCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    clerkId: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    name: string;
    phone?: string | null;
    rating?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ridesOwned?: RideUncheckedCreateNestedManyWithoutOwnerInput;
    memberships?: RideMemberUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clerkId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    rating?: FloatFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ridesOwned?: RideUpdateManyWithoutOwnerNestedInput;
    memberships?: RideMemberUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clerkId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    rating?: FloatFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ridesOwned?: RideUncheckedUpdateManyWithoutOwnerNestedInput;
    memberships?: RideMemberUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    clerkId: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    name: string;
    phone?: string | null;
    rating?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clerkId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    rating?: FloatFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clerkId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    rating?: FloatFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RideCreateInput = {
    id?: string;
    service: $Enums.RideService;
    shareUrlHash?: string | null;
    shareUrlEnc?: string | null;
    fromText: string;
    toText: string;
    fromLat: number;
    fromLng: number;
    toLat: number;
    toLng: number;
    departureAt: Date | string;
    seatsTotal: number;
    seatsAvailable: number;
    estTotalFare: number;
    perSeatPrice: number;
    isVerified?: boolean;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: UserCreateNestedOneWithoutRidesOwnedInput;
    members?: RideMemberCreateNestedManyWithoutRideInput;
  };

  export type RideUncheckedCreateInput = {
    id?: string;
    ownerId: string;
    service: $Enums.RideService;
    shareUrlHash?: string | null;
    shareUrlEnc?: string | null;
    fromText: string;
    toText: string;
    fromLat: number;
    fromLng: number;
    toLat: number;
    toLng: number;
    departureAt: Date | string;
    seatsTotal: number;
    seatsAvailable: number;
    estTotalFare: number;
    perSeatPrice: number;
    isVerified?: boolean;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: RideMemberUncheckedCreateNestedManyWithoutRideInput;
  };

  export type RideUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    service?: EnumRideServiceFieldUpdateOperationsInput | $Enums.RideService;
    shareUrlHash?: NullableStringFieldUpdateOperationsInput | string | null;
    shareUrlEnc?: NullableStringFieldUpdateOperationsInput | string | null;
    fromText?: StringFieldUpdateOperationsInput | string;
    toText?: StringFieldUpdateOperationsInput | string;
    fromLat?: FloatFieldUpdateOperationsInput | number;
    fromLng?: FloatFieldUpdateOperationsInput | number;
    toLat?: FloatFieldUpdateOperationsInput | number;
    toLng?: FloatFieldUpdateOperationsInput | number;
    departureAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    seatsTotal?: IntFieldUpdateOperationsInput | number;
    seatsAvailable?: IntFieldUpdateOperationsInput | number;
    estTotalFare?: IntFieldUpdateOperationsInput | number;
    perSeatPrice?: IntFieldUpdateOperationsInput | number;
    isVerified?: BoolFieldUpdateOperationsInput | boolean;
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: UserUpdateOneRequiredWithoutRidesOwnedNestedInput;
    members?: RideMemberUpdateManyWithoutRideNestedInput;
  };

  export type RideUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    ownerId?: StringFieldUpdateOperationsInput | string;
    service?: EnumRideServiceFieldUpdateOperationsInput | $Enums.RideService;
    shareUrlHash?: NullableStringFieldUpdateOperationsInput | string | null;
    shareUrlEnc?: NullableStringFieldUpdateOperationsInput | string | null;
    fromText?: StringFieldUpdateOperationsInput | string;
    toText?: StringFieldUpdateOperationsInput | string;
    fromLat?: FloatFieldUpdateOperationsInput | number;
    fromLng?: FloatFieldUpdateOperationsInput | number;
    toLat?: FloatFieldUpdateOperationsInput | number;
    toLng?: FloatFieldUpdateOperationsInput | number;
    departureAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    seatsTotal?: IntFieldUpdateOperationsInput | number;
    seatsAvailable?: IntFieldUpdateOperationsInput | number;
    estTotalFare?: IntFieldUpdateOperationsInput | number;
    perSeatPrice?: IntFieldUpdateOperationsInput | number;
    isVerified?: BoolFieldUpdateOperationsInput | boolean;
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    members?: RideMemberUncheckedUpdateManyWithoutRideNestedInput;
  };

  export type RideCreateManyInput = {
    id?: string;
    ownerId: string;
    service: $Enums.RideService;
    shareUrlHash?: string | null;
    shareUrlEnc?: string | null;
    fromText: string;
    toText: string;
    fromLat: number;
    fromLng: number;
    toLat: number;
    toLng: number;
    departureAt: Date | string;
    seatsTotal: number;
    seatsAvailable: number;
    estTotalFare: number;
    perSeatPrice: number;
    isVerified?: boolean;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RideUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    service?: EnumRideServiceFieldUpdateOperationsInput | $Enums.RideService;
    shareUrlHash?: NullableStringFieldUpdateOperationsInput | string | null;
    shareUrlEnc?: NullableStringFieldUpdateOperationsInput | string | null;
    fromText?: StringFieldUpdateOperationsInput | string;
    toText?: StringFieldUpdateOperationsInput | string;
    fromLat?: FloatFieldUpdateOperationsInput | number;
    fromLng?: FloatFieldUpdateOperationsInput | number;
    toLat?: FloatFieldUpdateOperationsInput | number;
    toLng?: FloatFieldUpdateOperationsInput | number;
    departureAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    seatsTotal?: IntFieldUpdateOperationsInput | number;
    seatsAvailable?: IntFieldUpdateOperationsInput | number;
    estTotalFare?: IntFieldUpdateOperationsInput | number;
    perSeatPrice?: IntFieldUpdateOperationsInput | number;
    isVerified?: BoolFieldUpdateOperationsInput | boolean;
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RideUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    ownerId?: StringFieldUpdateOperationsInput | string;
    service?: EnumRideServiceFieldUpdateOperationsInput | $Enums.RideService;
    shareUrlHash?: NullableStringFieldUpdateOperationsInput | string | null;
    shareUrlEnc?: NullableStringFieldUpdateOperationsInput | string | null;
    fromText?: StringFieldUpdateOperationsInput | string;
    toText?: StringFieldUpdateOperationsInput | string;
    fromLat?: FloatFieldUpdateOperationsInput | number;
    fromLng?: FloatFieldUpdateOperationsInput | number;
    toLat?: FloatFieldUpdateOperationsInput | number;
    toLng?: FloatFieldUpdateOperationsInput | number;
    departureAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    seatsTotal?: IntFieldUpdateOperationsInput | number;
    seatsAvailable?: IntFieldUpdateOperationsInput | number;
    estTotalFare?: IntFieldUpdateOperationsInput | number;
    perSeatPrice?: IntFieldUpdateOperationsInput | number;
    isVerified?: BoolFieldUpdateOperationsInput | boolean;
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RideMemberCreateInput = {
    id?: string;
    status?: $Enums.MemberStatus;
    fareShare: number;
    createdAt?: Date | string;
    ride: RideCreateNestedOneWithoutMembersInput;
    user: UserCreateNestedOneWithoutMembershipsInput;
  };

  export type RideMemberUncheckedCreateInput = {
    id?: string;
    rideId: string;
    userId: string;
    status?: $Enums.MemberStatus;
    fareShare: number;
    createdAt?: Date | string;
  };

  export type RideMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    fareShare?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ride?: RideUpdateOneRequiredWithoutMembersNestedInput;
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput;
  };

  export type RideMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    rideId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    fareShare?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RideMemberCreateManyInput = {
    id?: string;
    rideId: string;
    userId: string;
    status?: $Enums.MemberStatus;
    fareShare: number;
    createdAt?: Date | string;
  };

  export type RideMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    fareShare?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RideMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    rideId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    fareShare?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type RideListRelationFilter = {
    every?: RideWhereInput;
    some?: RideWhereInput;
    none?: RideWhereInput;
  };

  export type RideMemberListRelationFilter = {
    every?: RideMemberWhereInput;
    some?: RideMemberWhereInput;
    none?: RideMemberWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type RideOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type RideMemberOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    clerkId?: SortOrder;
    email?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    imageUrl?: SortOrder;
    name?: SortOrder;
    phone?: SortOrder;
    rating?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserAvgOrderByAggregateInput = {
    rating?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    clerkId?: SortOrder;
    email?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    imageUrl?: SortOrder;
    name?: SortOrder;
    phone?: SortOrder;
    rating?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    clerkId?: SortOrder;
    email?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    imageUrl?: SortOrder;
    name?: SortOrder;
    phone?: SortOrder;
    rating?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserSumOrderByAggregateInput = {
    rating?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type EnumRideServiceFilter<$PrismaModel = never> = {
    equals?: $Enums.RideService | EnumRideServiceFieldRefInput<$PrismaModel>;
    in?: $Enums.RideService[] | ListEnumRideServiceFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.RideService[]
      | ListEnumRideServiceFieldRefInput<$PrismaModel>;
    not?: NestedEnumRideServiceFilter<$PrismaModel> | $Enums.RideService;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type EnumRideStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RideStatus | EnumRideStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumRideStatusFilter<$PrismaModel> | $Enums.RideStatus;
  };

  export type UserScalarRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type RideCountOrderByAggregateInput = {
    id?: SortOrder;
    ownerId?: SortOrder;
    service?: SortOrder;
    shareUrlHash?: SortOrder;
    shareUrlEnc?: SortOrder;
    fromText?: SortOrder;
    toText?: SortOrder;
    fromLat?: SortOrder;
    fromLng?: SortOrder;
    toLat?: SortOrder;
    toLng?: SortOrder;
    departureAt?: SortOrder;
    seatsTotal?: SortOrder;
    seatsAvailable?: SortOrder;
    estTotalFare?: SortOrder;
    perSeatPrice?: SortOrder;
    isVerified?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RideAvgOrderByAggregateInput = {
    fromLat?: SortOrder;
    fromLng?: SortOrder;
    toLat?: SortOrder;
    toLng?: SortOrder;
    seatsTotal?: SortOrder;
    seatsAvailable?: SortOrder;
    estTotalFare?: SortOrder;
    perSeatPrice?: SortOrder;
  };

  export type RideMaxOrderByAggregateInput = {
    id?: SortOrder;
    ownerId?: SortOrder;
    service?: SortOrder;
    shareUrlHash?: SortOrder;
    shareUrlEnc?: SortOrder;
    fromText?: SortOrder;
    toText?: SortOrder;
    fromLat?: SortOrder;
    fromLng?: SortOrder;
    toLat?: SortOrder;
    toLng?: SortOrder;
    departureAt?: SortOrder;
    seatsTotal?: SortOrder;
    seatsAvailable?: SortOrder;
    estTotalFare?: SortOrder;
    perSeatPrice?: SortOrder;
    isVerified?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RideMinOrderByAggregateInput = {
    id?: SortOrder;
    ownerId?: SortOrder;
    service?: SortOrder;
    shareUrlHash?: SortOrder;
    shareUrlEnc?: SortOrder;
    fromText?: SortOrder;
    toText?: SortOrder;
    fromLat?: SortOrder;
    fromLng?: SortOrder;
    toLat?: SortOrder;
    toLng?: SortOrder;
    departureAt?: SortOrder;
    seatsTotal?: SortOrder;
    seatsAvailable?: SortOrder;
    estTotalFare?: SortOrder;
    perSeatPrice?: SortOrder;
    isVerified?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RideSumOrderByAggregateInput = {
    fromLat?: SortOrder;
    fromLng?: SortOrder;
    toLat?: SortOrder;
    toLng?: SortOrder;
    seatsTotal?: SortOrder;
    seatsAvailable?: SortOrder;
    estTotalFare?: SortOrder;
    perSeatPrice?: SortOrder;
  };

  export type EnumRideServiceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RideService | EnumRideServiceFieldRefInput<$PrismaModel>;
    in?: $Enums.RideService[] | ListEnumRideServiceFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.RideService[]
      | ListEnumRideServiceFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumRideServiceWithAggregatesFilter<$PrismaModel>
      | $Enums.RideService;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRideServiceFilter<$PrismaModel>;
    _max?: NestedEnumRideServiceFilter<$PrismaModel>;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type EnumRideStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RideStatus | EnumRideStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumRideStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.RideStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRideStatusFilter<$PrismaModel>;
    _max?: NestedEnumRideStatusFilter<$PrismaModel>;
  };

  export type EnumMemberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.MemberStatus[]
      | ListEnumMemberStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.MemberStatus[]
      | ListEnumMemberStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumMemberStatusFilter<$PrismaModel> | $Enums.MemberStatus;
  };

  export type RideScalarRelationFilter = {
    is?: RideWhereInput;
    isNot?: RideWhereInput;
  };

  export type RideMemberRideIdUserIdCompoundUniqueInput = {
    rideId: string;
    userId: string;
  };

  export type RideMemberCountOrderByAggregateInput = {
    id?: SortOrder;
    rideId?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    fareShare?: SortOrder;
    createdAt?: SortOrder;
  };

  export type RideMemberAvgOrderByAggregateInput = {
    fareShare?: SortOrder;
  };

  export type RideMemberMaxOrderByAggregateInput = {
    id?: SortOrder;
    rideId?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    fareShare?: SortOrder;
    createdAt?: SortOrder;
  };

  export type RideMemberMinOrderByAggregateInput = {
    id?: SortOrder;
    rideId?: SortOrder;
    userId?: SortOrder;
    status?: SortOrder;
    fareShare?: SortOrder;
    createdAt?: SortOrder;
  };

  export type RideMemberSumOrderByAggregateInput = {
    fareShare?: SortOrder;
  };

  export type EnumMemberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.MemberStatus[]
      | ListEnumMemberStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.MemberStatus[]
      | ListEnumMemberStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumMemberStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.MemberStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumMemberStatusFilter<$PrismaModel>;
    _max?: NestedEnumMemberStatusFilter<$PrismaModel>;
  };

  export type RideCreateNestedManyWithoutOwnerInput = {
    create?:
      | XOR<RideCreateWithoutOwnerInput, RideUncheckedCreateWithoutOwnerInput>
      | RideCreateWithoutOwnerInput[]
      | RideUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?:
      | RideCreateOrConnectWithoutOwnerInput
      | RideCreateOrConnectWithoutOwnerInput[];
    createMany?: RideCreateManyOwnerInputEnvelope;
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[];
  };

  export type RideMemberCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          RideMemberCreateWithoutUserInput,
          RideMemberUncheckedCreateWithoutUserInput
        >
      | RideMemberCreateWithoutUserInput[]
      | RideMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | RideMemberCreateOrConnectWithoutUserInput
      | RideMemberCreateOrConnectWithoutUserInput[];
    createMany?: RideMemberCreateManyUserInputEnvelope;
    connect?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
  };

  export type RideUncheckedCreateNestedManyWithoutOwnerInput = {
    create?:
      | XOR<RideCreateWithoutOwnerInput, RideUncheckedCreateWithoutOwnerInput>
      | RideCreateWithoutOwnerInput[]
      | RideUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?:
      | RideCreateOrConnectWithoutOwnerInput
      | RideCreateOrConnectWithoutOwnerInput[];
    createMany?: RideCreateManyOwnerInputEnvelope;
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[];
  };

  export type RideMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          RideMemberCreateWithoutUserInput,
          RideMemberUncheckedCreateWithoutUserInput
        >
      | RideMemberCreateWithoutUserInput[]
      | RideMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | RideMemberCreateOrConnectWithoutUserInput
      | RideMemberCreateOrConnectWithoutUserInput[];
    createMany?: RideMemberCreateManyUserInputEnvelope;
    connect?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type RideUpdateManyWithoutOwnerNestedInput = {
    create?:
      | XOR<RideCreateWithoutOwnerInput, RideUncheckedCreateWithoutOwnerInput>
      | RideCreateWithoutOwnerInput[]
      | RideUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?:
      | RideCreateOrConnectWithoutOwnerInput
      | RideCreateOrConnectWithoutOwnerInput[];
    upsert?:
      | RideUpsertWithWhereUniqueWithoutOwnerInput
      | RideUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: RideCreateManyOwnerInputEnvelope;
    set?: RideWhereUniqueInput | RideWhereUniqueInput[];
    disconnect?: RideWhereUniqueInput | RideWhereUniqueInput[];
    delete?: RideWhereUniqueInput | RideWhereUniqueInput[];
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[];
    update?:
      | RideUpdateWithWhereUniqueWithoutOwnerInput
      | RideUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?:
      | RideUpdateManyWithWhereWithoutOwnerInput
      | RideUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: RideScalarWhereInput | RideScalarWhereInput[];
  };

  export type RideMemberUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          RideMemberCreateWithoutUserInput,
          RideMemberUncheckedCreateWithoutUserInput
        >
      | RideMemberCreateWithoutUserInput[]
      | RideMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | RideMemberCreateOrConnectWithoutUserInput
      | RideMemberCreateOrConnectWithoutUserInput[];
    upsert?:
      | RideMemberUpsertWithWhereUniqueWithoutUserInput
      | RideMemberUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: RideMemberCreateManyUserInputEnvelope;
    set?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    disconnect?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    delete?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    connect?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    update?:
      | RideMemberUpdateWithWhereUniqueWithoutUserInput
      | RideMemberUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | RideMemberUpdateManyWithWhereWithoutUserInput
      | RideMemberUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: RideMemberScalarWhereInput | RideMemberScalarWhereInput[];
  };

  export type RideUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?:
      | XOR<RideCreateWithoutOwnerInput, RideUncheckedCreateWithoutOwnerInput>
      | RideCreateWithoutOwnerInput[]
      | RideUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?:
      | RideCreateOrConnectWithoutOwnerInput
      | RideCreateOrConnectWithoutOwnerInput[];
    upsert?:
      | RideUpsertWithWhereUniqueWithoutOwnerInput
      | RideUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: RideCreateManyOwnerInputEnvelope;
    set?: RideWhereUniqueInput | RideWhereUniqueInput[];
    disconnect?: RideWhereUniqueInput | RideWhereUniqueInput[];
    delete?: RideWhereUniqueInput | RideWhereUniqueInput[];
    connect?: RideWhereUniqueInput | RideWhereUniqueInput[];
    update?:
      | RideUpdateWithWhereUniqueWithoutOwnerInput
      | RideUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?:
      | RideUpdateManyWithWhereWithoutOwnerInput
      | RideUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: RideScalarWhereInput | RideScalarWhereInput[];
  };

  export type RideMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          RideMemberCreateWithoutUserInput,
          RideMemberUncheckedCreateWithoutUserInput
        >
      | RideMemberCreateWithoutUserInput[]
      | RideMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | RideMemberCreateOrConnectWithoutUserInput
      | RideMemberCreateOrConnectWithoutUserInput[];
    upsert?:
      | RideMemberUpsertWithWhereUniqueWithoutUserInput
      | RideMemberUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: RideMemberCreateManyUserInputEnvelope;
    set?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    disconnect?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    delete?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    connect?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    update?:
      | RideMemberUpdateWithWhereUniqueWithoutUserInput
      | RideMemberUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | RideMemberUpdateManyWithWhereWithoutUserInput
      | RideMemberUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: RideMemberScalarWhereInput | RideMemberScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutRidesOwnedInput = {
    create?: XOR<
      UserCreateWithoutRidesOwnedInput,
      UserUncheckedCreateWithoutRidesOwnedInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutRidesOwnedInput;
    connect?: UserWhereUniqueInput;
  };

  export type RideMemberCreateNestedManyWithoutRideInput = {
    create?:
      | XOR<
          RideMemberCreateWithoutRideInput,
          RideMemberUncheckedCreateWithoutRideInput
        >
      | RideMemberCreateWithoutRideInput[]
      | RideMemberUncheckedCreateWithoutRideInput[];
    connectOrCreate?:
      | RideMemberCreateOrConnectWithoutRideInput
      | RideMemberCreateOrConnectWithoutRideInput[];
    createMany?: RideMemberCreateManyRideInputEnvelope;
    connect?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
  };

  export type RideMemberUncheckedCreateNestedManyWithoutRideInput = {
    create?:
      | XOR<
          RideMemberCreateWithoutRideInput,
          RideMemberUncheckedCreateWithoutRideInput
        >
      | RideMemberCreateWithoutRideInput[]
      | RideMemberUncheckedCreateWithoutRideInput[];
    connectOrCreate?:
      | RideMemberCreateOrConnectWithoutRideInput
      | RideMemberCreateOrConnectWithoutRideInput[];
    createMany?: RideMemberCreateManyRideInputEnvelope;
    connect?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
  };

  export type EnumRideServiceFieldUpdateOperationsInput = {
    set?: $Enums.RideService;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type EnumRideStatusFieldUpdateOperationsInput = {
    set?: $Enums.RideStatus;
  };

  export type UserUpdateOneRequiredWithoutRidesOwnedNestedInput = {
    create?: XOR<
      UserCreateWithoutRidesOwnedInput,
      UserUncheckedCreateWithoutRidesOwnedInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutRidesOwnedInput;
    upsert?: UserUpsertWithoutRidesOwnedInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutRidesOwnedInput,
        UserUpdateWithoutRidesOwnedInput
      >,
      UserUncheckedUpdateWithoutRidesOwnedInput
    >;
  };

  export type RideMemberUpdateManyWithoutRideNestedInput = {
    create?:
      | XOR<
          RideMemberCreateWithoutRideInput,
          RideMemberUncheckedCreateWithoutRideInput
        >
      | RideMemberCreateWithoutRideInput[]
      | RideMemberUncheckedCreateWithoutRideInput[];
    connectOrCreate?:
      | RideMemberCreateOrConnectWithoutRideInput
      | RideMemberCreateOrConnectWithoutRideInput[];
    upsert?:
      | RideMemberUpsertWithWhereUniqueWithoutRideInput
      | RideMemberUpsertWithWhereUniqueWithoutRideInput[];
    createMany?: RideMemberCreateManyRideInputEnvelope;
    set?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    disconnect?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    delete?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    connect?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    update?:
      | RideMemberUpdateWithWhereUniqueWithoutRideInput
      | RideMemberUpdateWithWhereUniqueWithoutRideInput[];
    updateMany?:
      | RideMemberUpdateManyWithWhereWithoutRideInput
      | RideMemberUpdateManyWithWhereWithoutRideInput[];
    deleteMany?: RideMemberScalarWhereInput | RideMemberScalarWhereInput[];
  };

  export type RideMemberUncheckedUpdateManyWithoutRideNestedInput = {
    create?:
      | XOR<
          RideMemberCreateWithoutRideInput,
          RideMemberUncheckedCreateWithoutRideInput
        >
      | RideMemberCreateWithoutRideInput[]
      | RideMemberUncheckedCreateWithoutRideInput[];
    connectOrCreate?:
      | RideMemberCreateOrConnectWithoutRideInput
      | RideMemberCreateOrConnectWithoutRideInput[];
    upsert?:
      | RideMemberUpsertWithWhereUniqueWithoutRideInput
      | RideMemberUpsertWithWhereUniqueWithoutRideInput[];
    createMany?: RideMemberCreateManyRideInputEnvelope;
    set?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    disconnect?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    delete?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    connect?: RideMemberWhereUniqueInput | RideMemberWhereUniqueInput[];
    update?:
      | RideMemberUpdateWithWhereUniqueWithoutRideInput
      | RideMemberUpdateWithWhereUniqueWithoutRideInput[];
    updateMany?:
      | RideMemberUpdateManyWithWhereWithoutRideInput
      | RideMemberUpdateManyWithWhereWithoutRideInput[];
    deleteMany?: RideMemberScalarWhereInput | RideMemberScalarWhereInput[];
  };

  export type RideCreateNestedOneWithoutMembersInput = {
    create?: XOR<
      RideCreateWithoutMembersInput,
      RideUncheckedCreateWithoutMembersInput
    >;
    connectOrCreate?: RideCreateOrConnectWithoutMembersInput;
    connect?: RideWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<
      UserCreateWithoutMembershipsInput,
      UserUncheckedCreateWithoutMembershipsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput;
    connect?: UserWhereUniqueInput;
  };

  export type EnumMemberStatusFieldUpdateOperationsInput = {
    set?: $Enums.MemberStatus;
  };

  export type RideUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<
      RideCreateWithoutMembersInput,
      RideUncheckedCreateWithoutMembersInput
    >;
    connectOrCreate?: RideCreateOrConnectWithoutMembersInput;
    upsert?: RideUpsertWithoutMembersInput;
    connect?: RideWhereUniqueInput;
    update?: XOR<
      XOR<
        RideUpdateToOneWithWhereWithoutMembersInput,
        RideUpdateWithoutMembersInput
      >,
      RideUncheckedUpdateWithoutMembersInput
    >;
  };

  export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<
      UserCreateWithoutMembershipsInput,
      UserUncheckedCreateWithoutMembershipsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput;
    upsert?: UserUpsertWithoutMembershipsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutMembershipsInput,
        UserUpdateWithoutMembershipsInput
      >,
      UserUncheckedUpdateWithoutMembershipsInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedEnumRideServiceFilter<$PrismaModel = never> = {
    equals?: $Enums.RideService | EnumRideServiceFieldRefInput<$PrismaModel>;
    in?: $Enums.RideService[] | ListEnumRideServiceFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.RideService[]
      | ListEnumRideServiceFieldRefInput<$PrismaModel>;
    not?: NestedEnumRideServiceFilter<$PrismaModel> | $Enums.RideService;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedEnumRideStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RideStatus | EnumRideStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumRideStatusFilter<$PrismaModel> | $Enums.RideStatus;
  };

  export type NestedEnumRideServiceWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: $Enums.RideService | EnumRideServiceFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.RideService[]
        | ListEnumRideServiceFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.RideService[]
        | ListEnumRideServiceFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumRideServiceWithAggregatesFilter<$PrismaModel>
        | $Enums.RideService;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumRideServiceFilter<$PrismaModel>;
      _max?: NestedEnumRideServiceFilter<$PrismaModel>;
    };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedEnumRideStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RideStatus | EnumRideStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RideStatus[] | ListEnumRideStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumRideStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.RideStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRideStatusFilter<$PrismaModel>;
    _max?: NestedEnumRideStatusFilter<$PrismaModel>;
  };

  export type NestedEnumMemberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.MemberStatus[]
      | ListEnumMemberStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.MemberStatus[]
      | ListEnumMemberStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumMemberStatusFilter<$PrismaModel> | $Enums.MemberStatus;
  };

  export type NestedEnumMemberStatusWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?:
        | $Enums.MemberStatus
        | EnumMemberStatusFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.MemberStatus[]
        | ListEnumMemberStatusFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.MemberStatus[]
        | ListEnumMemberStatusFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumMemberStatusWithAggregatesFilter<$PrismaModel>
        | $Enums.MemberStatus;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumMemberStatusFilter<$PrismaModel>;
      _max?: NestedEnumMemberStatusFilter<$PrismaModel>;
    };

  export type RideCreateWithoutOwnerInput = {
    id?: string;
    service: $Enums.RideService;
    shareUrlHash?: string | null;
    shareUrlEnc?: string | null;
    fromText: string;
    toText: string;
    fromLat: number;
    fromLng: number;
    toLat: number;
    toLng: number;
    departureAt: Date | string;
    seatsTotal: number;
    seatsAvailable: number;
    estTotalFare: number;
    perSeatPrice: number;
    isVerified?: boolean;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: RideMemberCreateNestedManyWithoutRideInput;
  };

  export type RideUncheckedCreateWithoutOwnerInput = {
    id?: string;
    service: $Enums.RideService;
    shareUrlHash?: string | null;
    shareUrlEnc?: string | null;
    fromText: string;
    toText: string;
    fromLat: number;
    fromLng: number;
    toLat: number;
    toLng: number;
    departureAt: Date | string;
    seatsTotal: number;
    seatsAvailable: number;
    estTotalFare: number;
    perSeatPrice: number;
    isVerified?: boolean;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: RideMemberUncheckedCreateNestedManyWithoutRideInput;
  };

  export type RideCreateOrConnectWithoutOwnerInput = {
    where: RideWhereUniqueInput;
    create: XOR<
      RideCreateWithoutOwnerInput,
      RideUncheckedCreateWithoutOwnerInput
    >;
  };

  export type RideCreateManyOwnerInputEnvelope = {
    data: RideCreateManyOwnerInput | RideCreateManyOwnerInput[];
    skipDuplicates?: boolean;
  };

  export type RideMemberCreateWithoutUserInput = {
    id?: string;
    status?: $Enums.MemberStatus;
    fareShare: number;
    createdAt?: Date | string;
    ride: RideCreateNestedOneWithoutMembersInput;
  };

  export type RideMemberUncheckedCreateWithoutUserInput = {
    id?: string;
    rideId: string;
    status?: $Enums.MemberStatus;
    fareShare: number;
    createdAt?: Date | string;
  };

  export type RideMemberCreateOrConnectWithoutUserInput = {
    where: RideMemberWhereUniqueInput;
    create: XOR<
      RideMemberCreateWithoutUserInput,
      RideMemberUncheckedCreateWithoutUserInput
    >;
  };

  export type RideMemberCreateManyUserInputEnvelope = {
    data: RideMemberCreateManyUserInput | RideMemberCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type RideUpsertWithWhereUniqueWithoutOwnerInput = {
    where: RideWhereUniqueInput;
    update: XOR<
      RideUpdateWithoutOwnerInput,
      RideUncheckedUpdateWithoutOwnerInput
    >;
    create: XOR<
      RideCreateWithoutOwnerInput,
      RideUncheckedCreateWithoutOwnerInput
    >;
  };

  export type RideUpdateWithWhereUniqueWithoutOwnerInput = {
    where: RideWhereUniqueInput;
    data: XOR<
      RideUpdateWithoutOwnerInput,
      RideUncheckedUpdateWithoutOwnerInput
    >;
  };

  export type RideUpdateManyWithWhereWithoutOwnerInput = {
    where: RideScalarWhereInput;
    data: XOR<
      RideUpdateManyMutationInput,
      RideUncheckedUpdateManyWithoutOwnerInput
    >;
  };

  export type RideScalarWhereInput = {
    AND?: RideScalarWhereInput | RideScalarWhereInput[];
    OR?: RideScalarWhereInput[];
    NOT?: RideScalarWhereInput | RideScalarWhereInput[];
    id?: StringFilter<"Ride"> | string;
    ownerId?: StringFilter<"Ride"> | string;
    service?: EnumRideServiceFilter<"Ride"> | $Enums.RideService;
    shareUrlHash?: StringNullableFilter<"Ride"> | string | null;
    shareUrlEnc?: StringNullableFilter<"Ride"> | string | null;
    fromText?: StringFilter<"Ride"> | string;
    toText?: StringFilter<"Ride"> | string;
    fromLat?: FloatFilter<"Ride"> | number;
    fromLng?: FloatFilter<"Ride"> | number;
    toLat?: FloatFilter<"Ride"> | number;
    toLng?: FloatFilter<"Ride"> | number;
    departureAt?: DateTimeFilter<"Ride"> | Date | string;
    seatsTotal?: IntFilter<"Ride"> | number;
    seatsAvailable?: IntFilter<"Ride"> | number;
    estTotalFare?: IntFilter<"Ride"> | number;
    perSeatPrice?: IntFilter<"Ride"> | number;
    isVerified?: BoolFilter<"Ride"> | boolean;
    status?: EnumRideStatusFilter<"Ride"> | $Enums.RideStatus;
    createdAt?: DateTimeFilter<"Ride"> | Date | string;
    updatedAt?: DateTimeFilter<"Ride"> | Date | string;
  };

  export type RideMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: RideMemberWhereUniqueInput;
    update: XOR<
      RideMemberUpdateWithoutUserInput,
      RideMemberUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      RideMemberCreateWithoutUserInput,
      RideMemberUncheckedCreateWithoutUserInput
    >;
  };

  export type RideMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: RideMemberWhereUniqueInput;
    data: XOR<
      RideMemberUpdateWithoutUserInput,
      RideMemberUncheckedUpdateWithoutUserInput
    >;
  };

  export type RideMemberUpdateManyWithWhereWithoutUserInput = {
    where: RideMemberScalarWhereInput;
    data: XOR<
      RideMemberUpdateManyMutationInput,
      RideMemberUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type RideMemberScalarWhereInput = {
    AND?: RideMemberScalarWhereInput | RideMemberScalarWhereInput[];
    OR?: RideMemberScalarWhereInput[];
    NOT?: RideMemberScalarWhereInput | RideMemberScalarWhereInput[];
    id?: StringFilter<"RideMember"> | string;
    rideId?: StringFilter<"RideMember"> | string;
    userId?: StringFilter<"RideMember"> | string;
    status?: EnumMemberStatusFilter<"RideMember"> | $Enums.MemberStatus;
    fareShare?: IntFilter<"RideMember"> | number;
    createdAt?: DateTimeFilter<"RideMember"> | Date | string;
  };

  export type UserCreateWithoutRidesOwnedInput = {
    id?: string;
    clerkId: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    name: string;
    phone?: string | null;
    rating?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: RideMemberCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutRidesOwnedInput = {
    id?: string;
    clerkId: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    name: string;
    phone?: string | null;
    rating?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    memberships?: RideMemberUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutRidesOwnedInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutRidesOwnedInput,
      UserUncheckedCreateWithoutRidesOwnedInput
    >;
  };

  export type RideMemberCreateWithoutRideInput = {
    id?: string;
    status?: $Enums.MemberStatus;
    fareShare: number;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutMembershipsInput;
  };

  export type RideMemberUncheckedCreateWithoutRideInput = {
    id?: string;
    userId: string;
    status?: $Enums.MemberStatus;
    fareShare: number;
    createdAt?: Date | string;
  };

  export type RideMemberCreateOrConnectWithoutRideInput = {
    where: RideMemberWhereUniqueInput;
    create: XOR<
      RideMemberCreateWithoutRideInput,
      RideMemberUncheckedCreateWithoutRideInput
    >;
  };

  export type RideMemberCreateManyRideInputEnvelope = {
    data: RideMemberCreateManyRideInput | RideMemberCreateManyRideInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithoutRidesOwnedInput = {
    update: XOR<
      UserUpdateWithoutRidesOwnedInput,
      UserUncheckedUpdateWithoutRidesOwnedInput
    >;
    create: XOR<
      UserCreateWithoutRidesOwnedInput,
      UserUncheckedCreateWithoutRidesOwnedInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutRidesOwnedInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutRidesOwnedInput,
      UserUncheckedUpdateWithoutRidesOwnedInput
    >;
  };

  export type UserUpdateWithoutRidesOwnedInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clerkId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    rating?: FloatFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: RideMemberUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutRidesOwnedInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clerkId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    rating?: FloatFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    memberships?: RideMemberUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type RideMemberUpsertWithWhereUniqueWithoutRideInput = {
    where: RideMemberWhereUniqueInput;
    update: XOR<
      RideMemberUpdateWithoutRideInput,
      RideMemberUncheckedUpdateWithoutRideInput
    >;
    create: XOR<
      RideMemberCreateWithoutRideInput,
      RideMemberUncheckedCreateWithoutRideInput
    >;
  };

  export type RideMemberUpdateWithWhereUniqueWithoutRideInput = {
    where: RideMemberWhereUniqueInput;
    data: XOR<
      RideMemberUpdateWithoutRideInput,
      RideMemberUncheckedUpdateWithoutRideInput
    >;
  };

  export type RideMemberUpdateManyWithWhereWithoutRideInput = {
    where: RideMemberScalarWhereInput;
    data: XOR<
      RideMemberUpdateManyMutationInput,
      RideMemberUncheckedUpdateManyWithoutRideInput
    >;
  };

  export type RideCreateWithoutMembersInput = {
    id?: string;
    service: $Enums.RideService;
    shareUrlHash?: string | null;
    shareUrlEnc?: string | null;
    fromText: string;
    toText: string;
    fromLat: number;
    fromLng: number;
    toLat: number;
    toLng: number;
    departureAt: Date | string;
    seatsTotal: number;
    seatsAvailable: number;
    estTotalFare: number;
    perSeatPrice: number;
    isVerified?: boolean;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: UserCreateNestedOneWithoutRidesOwnedInput;
  };

  export type RideUncheckedCreateWithoutMembersInput = {
    id?: string;
    ownerId: string;
    service: $Enums.RideService;
    shareUrlHash?: string | null;
    shareUrlEnc?: string | null;
    fromText: string;
    toText: string;
    fromLat: number;
    fromLng: number;
    toLat: number;
    toLng: number;
    departureAt: Date | string;
    seatsTotal: number;
    seatsAvailable: number;
    estTotalFare: number;
    perSeatPrice: number;
    isVerified?: boolean;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RideCreateOrConnectWithoutMembersInput = {
    where: RideWhereUniqueInput;
    create: XOR<
      RideCreateWithoutMembersInput,
      RideUncheckedCreateWithoutMembersInput
    >;
  };

  export type UserCreateWithoutMembershipsInput = {
    id?: string;
    clerkId: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    name: string;
    phone?: string | null;
    rating?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ridesOwned?: RideCreateNestedManyWithoutOwnerInput;
  };

  export type UserUncheckedCreateWithoutMembershipsInput = {
    id?: string;
    clerkId: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    name: string;
    phone?: string | null;
    rating?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ridesOwned?: RideUncheckedCreateNestedManyWithoutOwnerInput;
  };

  export type UserCreateOrConnectWithoutMembershipsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutMembershipsInput,
      UserUncheckedCreateWithoutMembershipsInput
    >;
  };

  export type RideUpsertWithoutMembersInput = {
    update: XOR<
      RideUpdateWithoutMembersInput,
      RideUncheckedUpdateWithoutMembersInput
    >;
    create: XOR<
      RideCreateWithoutMembersInput,
      RideUncheckedCreateWithoutMembersInput
    >;
    where?: RideWhereInput;
  };

  export type RideUpdateToOneWithWhereWithoutMembersInput = {
    where?: RideWhereInput;
    data: XOR<
      RideUpdateWithoutMembersInput,
      RideUncheckedUpdateWithoutMembersInput
    >;
  };

  export type RideUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    service?: EnumRideServiceFieldUpdateOperationsInput | $Enums.RideService;
    shareUrlHash?: NullableStringFieldUpdateOperationsInput | string | null;
    shareUrlEnc?: NullableStringFieldUpdateOperationsInput | string | null;
    fromText?: StringFieldUpdateOperationsInput | string;
    toText?: StringFieldUpdateOperationsInput | string;
    fromLat?: FloatFieldUpdateOperationsInput | number;
    fromLng?: FloatFieldUpdateOperationsInput | number;
    toLat?: FloatFieldUpdateOperationsInput | number;
    toLng?: FloatFieldUpdateOperationsInput | number;
    departureAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    seatsTotal?: IntFieldUpdateOperationsInput | number;
    seatsAvailable?: IntFieldUpdateOperationsInput | number;
    estTotalFare?: IntFieldUpdateOperationsInput | number;
    perSeatPrice?: IntFieldUpdateOperationsInput | number;
    isVerified?: BoolFieldUpdateOperationsInput | boolean;
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: UserUpdateOneRequiredWithoutRidesOwnedNestedInput;
  };

  export type RideUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    ownerId?: StringFieldUpdateOperationsInput | string;
    service?: EnumRideServiceFieldUpdateOperationsInput | $Enums.RideService;
    shareUrlHash?: NullableStringFieldUpdateOperationsInput | string | null;
    shareUrlEnc?: NullableStringFieldUpdateOperationsInput | string | null;
    fromText?: StringFieldUpdateOperationsInput | string;
    toText?: StringFieldUpdateOperationsInput | string;
    fromLat?: FloatFieldUpdateOperationsInput | number;
    fromLng?: FloatFieldUpdateOperationsInput | number;
    toLat?: FloatFieldUpdateOperationsInput | number;
    toLng?: FloatFieldUpdateOperationsInput | number;
    departureAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    seatsTotal?: IntFieldUpdateOperationsInput | number;
    seatsAvailable?: IntFieldUpdateOperationsInput | number;
    estTotalFare?: IntFieldUpdateOperationsInput | number;
    perSeatPrice?: IntFieldUpdateOperationsInput | number;
    isVerified?: BoolFieldUpdateOperationsInput | boolean;
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUpsertWithoutMembershipsInput = {
    update: XOR<
      UserUpdateWithoutMembershipsInput,
      UserUncheckedUpdateWithoutMembershipsInput
    >;
    create: XOR<
      UserCreateWithoutMembershipsInput,
      UserUncheckedCreateWithoutMembershipsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutMembershipsInput,
      UserUncheckedUpdateWithoutMembershipsInput
    >;
  };

  export type UserUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clerkId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    rating?: FloatFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ridesOwned?: RideUpdateManyWithoutOwnerNestedInput;
  };

  export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clerkId?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    rating?: FloatFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ridesOwned?: RideUncheckedUpdateManyWithoutOwnerNestedInput;
  };

  export type RideCreateManyOwnerInput = {
    id?: string;
    service: $Enums.RideService;
    shareUrlHash?: string | null;
    shareUrlEnc?: string | null;
    fromText: string;
    toText: string;
    fromLat: number;
    fromLng: number;
    toLat: number;
    toLng: number;
    departureAt: Date | string;
    seatsTotal: number;
    seatsAvailable: number;
    estTotalFare: number;
    perSeatPrice: number;
    isVerified?: boolean;
    status?: $Enums.RideStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RideMemberCreateManyUserInput = {
    id?: string;
    rideId: string;
    status?: $Enums.MemberStatus;
    fareShare: number;
    createdAt?: Date | string;
  };

  export type RideUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string;
    service?: EnumRideServiceFieldUpdateOperationsInput | $Enums.RideService;
    shareUrlHash?: NullableStringFieldUpdateOperationsInput | string | null;
    shareUrlEnc?: NullableStringFieldUpdateOperationsInput | string | null;
    fromText?: StringFieldUpdateOperationsInput | string;
    toText?: StringFieldUpdateOperationsInput | string;
    fromLat?: FloatFieldUpdateOperationsInput | number;
    fromLng?: FloatFieldUpdateOperationsInput | number;
    toLat?: FloatFieldUpdateOperationsInput | number;
    toLng?: FloatFieldUpdateOperationsInput | number;
    departureAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    seatsTotal?: IntFieldUpdateOperationsInput | number;
    seatsAvailable?: IntFieldUpdateOperationsInput | number;
    estTotalFare?: IntFieldUpdateOperationsInput | number;
    perSeatPrice?: IntFieldUpdateOperationsInput | number;
    isVerified?: BoolFieldUpdateOperationsInput | boolean;
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    members?: RideMemberUpdateManyWithoutRideNestedInput;
  };

  export type RideUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string;
    service?: EnumRideServiceFieldUpdateOperationsInput | $Enums.RideService;
    shareUrlHash?: NullableStringFieldUpdateOperationsInput | string | null;
    shareUrlEnc?: NullableStringFieldUpdateOperationsInput | string | null;
    fromText?: StringFieldUpdateOperationsInput | string;
    toText?: StringFieldUpdateOperationsInput | string;
    fromLat?: FloatFieldUpdateOperationsInput | number;
    fromLng?: FloatFieldUpdateOperationsInput | number;
    toLat?: FloatFieldUpdateOperationsInput | number;
    toLng?: FloatFieldUpdateOperationsInput | number;
    departureAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    seatsTotal?: IntFieldUpdateOperationsInput | number;
    seatsAvailable?: IntFieldUpdateOperationsInput | number;
    estTotalFare?: IntFieldUpdateOperationsInput | number;
    perSeatPrice?: IntFieldUpdateOperationsInput | number;
    isVerified?: BoolFieldUpdateOperationsInput | boolean;
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    members?: RideMemberUncheckedUpdateManyWithoutRideNestedInput;
  };

  export type RideUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string;
    service?: EnumRideServiceFieldUpdateOperationsInput | $Enums.RideService;
    shareUrlHash?: NullableStringFieldUpdateOperationsInput | string | null;
    shareUrlEnc?: NullableStringFieldUpdateOperationsInput | string | null;
    fromText?: StringFieldUpdateOperationsInput | string;
    toText?: StringFieldUpdateOperationsInput | string;
    fromLat?: FloatFieldUpdateOperationsInput | number;
    fromLng?: FloatFieldUpdateOperationsInput | number;
    toLat?: FloatFieldUpdateOperationsInput | number;
    toLng?: FloatFieldUpdateOperationsInput | number;
    departureAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    seatsTotal?: IntFieldUpdateOperationsInput | number;
    seatsAvailable?: IntFieldUpdateOperationsInput | number;
    estTotalFare?: IntFieldUpdateOperationsInput | number;
    perSeatPrice?: IntFieldUpdateOperationsInput | number;
    isVerified?: BoolFieldUpdateOperationsInput | boolean;
    status?: EnumRideStatusFieldUpdateOperationsInput | $Enums.RideStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RideMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    fareShare?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ride?: RideUpdateOneRequiredWithoutMembersNestedInput;
  };

  export type RideMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    rideId?: StringFieldUpdateOperationsInput | string;
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    fareShare?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RideMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    rideId?: StringFieldUpdateOperationsInput | string;
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    fareShare?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RideMemberCreateManyRideInput = {
    id?: string;
    userId: string;
    status?: $Enums.MemberStatus;
    fareShare: number;
    createdAt?: Date | string;
  };

  export type RideMemberUpdateWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string;
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    fareShare?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput;
  };

  export type RideMemberUncheckedUpdateWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    fareShare?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RideMemberUncheckedUpdateManyWithoutRideInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    fareShare?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
