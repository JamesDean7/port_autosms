
export type TInterfaceToStringUnion<T> = keyof T;

export type TMappedTypeGenerics<T> = {
    [P in keyof T] : T[P] | string
}
