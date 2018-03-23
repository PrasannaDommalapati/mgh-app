import {ApiMockEndpoint} from "./api/mock-endpoint";

export interface MockServerClient {

    clear(): Promise<void>;

    mockAnyResponse(ApiMockEndpoint: ApiMockEndpoint): Promise<any>;
}
