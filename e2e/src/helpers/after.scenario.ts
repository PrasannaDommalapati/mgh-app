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
        const fileName = `${Date.now()}.${featureName}.png`;

        world.attach(screenshot, 'image/png');

        saveScreenshot(screenshot, fileName);

        return Promise.resolve();
    }

    /**
     * Save a screenshot
     */
    function saveScreenshot(screenshot: string, fileName: string) {
        const screenshotPath = path.resolve(process.cwd(), browser.params.buildResultsDir + '/screenshots');
        const filepath = path.resolve(screenshotPath, fileName);

        let stream: WriteStream;

        ensureDirSync(screenshotPath);
        stream = createWriteStream(filepath);
        stream.write(new Buffer(screenshot, 'base64'));
        stream.end();
    }
});
