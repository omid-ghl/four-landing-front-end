import { ICommonApiResponse } from './CommonApiResponseTypes';

export interface IGetContentResponse extends ICommonApiResponse {
    result?: Result[];
    version?: Version;
}

export interface Result {
    id?: string;
    track_number?: string;
    key?: string;
    name?: string;
    value?: string;
    client?: string;
}

export interface Version {
    mobile?: string;
    web?: string;
}
