'user_strict';

export class Utils {
    static calculatePercent(value: number, total: number) {
        return (total > 0) ? (value / total) * 100 : 0;
    }
}

export class Logger {
    static log(data: any) {
        console.log('[Info]', data);
    }
}