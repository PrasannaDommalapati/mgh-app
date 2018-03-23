<<<<<<< HEAD
import {defineSupportCode} from 'cucumber';
import * as path from 'path';
import {browser} from 'protractor';
import {WriteStream, ensureDirSync, createWriteStream} from 'fs-extra';
import {World} from "../interfaces/world";
import {TestCase} from "../interfaces/test-case";
import {logging} from "selenium-webdriver";
import Entry = logging.Entry;

defineSupportCode(({After}) => {

    After(function (testCase: TestCase): Promise<void> {
        const world = <World>this;

        return Promise.resolve()
            .then(() => browserLogs(world))
            .then(() => doScreenShot(testCase, world))
            .then(() => cleanUp());

    });

    async function browserLogs(world: World) {

        const browserLogs = await(browser.manage().logs().get('browser'));
        const logString = browserLogs.map((log: Entry) => `${log.level.name}: ${log.message.trim()}`);

        world.attach(JSON.stringify(logString), 'text/json');

        return Promise.resolve();
    }

    function doScreenShot(testCase: TestCase, world: any) {

        return (testCase.result.status === 'failed') ? saveFailedScenarioScreenshot(world, testCase) : Promise.resolve();
    }

    function cleanUp() {

        return Promise.resolve()
            .then(() => browser.executeScript('window.location.hostname'))
            .then((hostname: string) => {

                let script = !!hostname ? 'window.localStorage.clear();' : '';

                return browser.executeScript(script);
            })
            .then(() => Promise.resolve());
    }

=======
import {defineSupportCode, HookScenarioResult} from 'cucumber';
import * as path from 'path';
import {browser} from 'protractor';
import {WriteStream, ensureDirSync, createWriteStream} from 'fs-extra';

interface World {
    'attach': ((arg1: string | Buffer, arg2: string) => void);
}

/**
 * In CucumberJS version 3 the `HookScenarioResult` has been brought down from an object with all the
 * feature / scenario / step data in it to a bare minimum.
 * Because `@types/cucumber` is not compatible with CucumberJS 3 I've extended the `HookScenarioResult`
 * with the new interface
 */
interface TestCase extends HookScenarioResult {
    sourceLocation: ({
        uri: string;
        line: number
    });
    result: ({
        duration: number;
        status: string
    });
}

defineSupportCode(({After}) => {
    After(function (testCase: TestCase): Promise<void> {
        const world = this;
        return (testCase.result.status === 'failed') ? saveFailedScenarioScreenshot(<World> world, testCase) : Promise.resolve();
    });

>>>>>>> a08ef9f175e29eda5ba4819e205ccd74acd73b6a
    /**
     * Save a screenshot when a scenario failed
     */
    async function saveFailedScenarioScreenshot(world: World, testCase: TestCase) {
        const screenshot = await(browser.takeScreenshot());

        // Because the scenario name isn't available in CucumberJS 3 we now use the format
        // `${Date.now()}.${featureName}.${browserName}.png`
        const featureName = testCase.sourceLocation.uri.match(/([^\/]+)(?=\.\w+$)/)[0]
            .replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s/g, '-')
            .toLowerCase().substr(0, 100);
<<<<<<< HEAD
        const fileName = `${Date.now()}.${featureName}.png`;
=======
        const fileName    = `${Date.now()}.${featureName}.png`;
>>>>>>> a08ef9f175e29eda5ba4819e205ccd74acd73b6a

        world.attach(screenshot, 'image/png');

        saveScreenshot(screenshot, fileName);

        return Promise.resolve();
    }

    /**
     * Save a screenshot
     */
    function saveScreenshot(screenshot: string, fileName: string) {
        const screenshotPath = path.resolve(process.cwd(), browser.params.buildResultsDir + '/screenshots');
<<<<<<< HEAD
        const filepath = path.resolve(screenshotPath, fileName);
=======
        const filepath       = path.resolve(screenshotPath, fileName);
>>>>>>> a08ef9f175e29eda5ba4819e205ccd74acd73b6a

        let stream: WriteStream;

        ensureDirSync(screenshotPath);
        stream = createWriteStream(filepath);
        stream.write(new Buffer(screenshot, 'base64'));
        stream.end();
    }
});
