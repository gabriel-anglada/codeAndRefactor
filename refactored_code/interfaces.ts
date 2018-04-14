'use_strict';

export interface IJSONAble {
    fromJSON(data: any)
    toJSON(): any;
}