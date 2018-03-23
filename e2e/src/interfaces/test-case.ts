import {HookScenarioResult} from "cucumber";

/**
 * In CucumberJS version 3 the `HookScenarioResult` has been brought down from an object with all the
 * feature / scenario / step data in it to a bare minimum.
 * Because `@types/cucumber` is not compatible with CucumberJS 3 I've extended the `HookScenarioResult`
 * with the new interface
 */
export interface TestCase extends HookScenarioResult {
    sourceLocation: ({
        uri: string;
        line: number
    });
    result: ({
        duration: number;
        status: string
    });
}
