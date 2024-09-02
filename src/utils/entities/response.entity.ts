export interface IResponseEntity<T = unknown> {
    ok: boolean;
    message: string | object;
    data?: T;
}

export class ResponseEntity<T> {
    static ok<T>(message: string, data?: T): IResponseEntity<T> {
        return { ok: true, message, data };
    }

    static error(message: string | object): IResponseEntity {
        return { ok: false, message };
    }
}