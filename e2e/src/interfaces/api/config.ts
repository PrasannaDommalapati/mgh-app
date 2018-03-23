import {ApiRequestConfig} from "./request-config";
import {ApiResponseConfig} from "./response-config";

export interface ApiConfig {
    Request: ApiRequestConfig,
    Response: ApiResponseConfig,
}
