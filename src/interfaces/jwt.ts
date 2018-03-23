export interface Jwt {
    build: number,
    capabilities: {
        groups: string[]
    },
    hash: string,
    id: number,
    timestamp: number
    userData?: {}
}
