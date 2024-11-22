type UnionStringKeys<U> = U extends U ? {
    [K in keyof U]-?: U[K] extends string | undefined ? K : never;
}[keyof U] : never;
type UnionRequiredKeys<U> = U extends U ? {
    [K in UnionStringKeys<U>]: ({} extends Pick<U, K> ? never : K);
}[UnionStringKeys<U>] : never;
type UnionOptionalKeys<U> = Exclude<UnionStringKeys<U>, UnionRequiredKeys<U>>;
export type MergeClassNames<Tuple extends any[]> = Exclude<Tuple[number], number | string | null | undefined | any[] | boolean> extends infer Union ? {
    [K in UnionRequiredKeys<Union>]: string;
} & {
    [K in UnionOptionalKeys<Union>]?: string;
} : never;
/**
 * Merges two sets of classnames.
 *
 * The function expects to pass an array of objects with values that could be passed to
 * the `classNames` function.
 * @returns An object with keys from all objects with merged values.
 * @see classNames
 */
export declare function mergeClassNames<T extends any[]>(...partials: T): MergeClassNames<T>;
export {};
