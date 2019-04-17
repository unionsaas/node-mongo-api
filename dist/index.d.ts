interface MongoDbConfig {
    [name: string]: string;
}
interface MongoDbMql {
    db: string;
    c: string;
    m: string;
    params: Array<any>;
    sort?: Array<any>;
    skip?: number;
    limit?: number;
    total?: boolean | number;
}
declare class MongoMql {
    static now(uris?: MongoDbConfig, options?: any): MongoMql;
    private dbs;
    constructor(uris?: MongoDbConfig, options?: any);
    db(name?: string): Promise<any>;
    exec(mql: MongoDbMql): Promise<any>;
}
export = MongoMql;
