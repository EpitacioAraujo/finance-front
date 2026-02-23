export type BaseError<TData = Record<string, any>> = {
    "statusCode": number,
    "timestamp": string,
    "message": string,
    "data"?: TData,
    "path"?: string,
    "method"?: string,
    "error"?: string,
    "details"?: any,
    "debug"?: {
        "stack"?: string,
        "name"?: string,
        "originalMessage"?: string,
        "location"?: string,
        "properties"?: {
            "statusCode"?: number,
            "details"?: any,
        }
    }
}