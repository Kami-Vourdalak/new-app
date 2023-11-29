import { DBAdapterFilterOperator } from "./";

export type DBAdapterFilter2<T> = {
    field: keyof T;
    value: any;
    operator: DBAdapterFilterOperator;
}

export type DBAdapterFilter<T> = {
    [field in keyof T]?: {
        [operator in DBAdapterFilterOperator]?: T[field];
    }
}

export type DBAdapterProjection<T> = (keyof T)[]

export type DBAdapterQuery<T> = {
    projection?: DBAdapterProjection<T>;
    filters?: DBAdapterFilter<T>;
}

export interface DBAdapter<T> {
    query({ projection, filters }: DBAdapterQuery<T>): Promise<T[]>;
    insert(data: any): Promise<T>; // change this? cannot pass T it won't have id
    update(id: any, data: any): Promise<T>; // change this? pass a complete entity?
    delete(id: any): void;
}