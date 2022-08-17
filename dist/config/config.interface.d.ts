export interface RedisConfig {
    host: string;
    port: string;
    ttl: number;
}
export interface ConfigData {
    env: string;
    port: number;
    logLevel?: string;
}
