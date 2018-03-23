import {defineSupportCode} from 'cucumber';
import {NavigationActions} from '../actions/navigation';

const MockServer = require('mockserver-client');

defineSupportCode(({Before}) => {

    Before(function (): Promise<void> {

        let World = this;

        World.MockServerClient = MockServer.mockServerClient('api.manage-hotels.co.uk', 1080);

        return Promise.resolve()
                      .then(() => NavigationActions.onPage('logout'))
                      .then(() => World.MockServerClient.clear());
    });
});
