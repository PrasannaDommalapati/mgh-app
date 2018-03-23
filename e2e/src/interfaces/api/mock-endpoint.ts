export interface ApiMockEndpoint {
    httpRequest: httpRequest,
    httpResponse: httpResponse
}

interface httpRequest {
    method: string,
    path: string
}

interface httpResponse {
    statusCode: number,
    headers: header[],
    body: {},
    delay?: {}
}

interface header {
    name: string,
    values: string[]
}


