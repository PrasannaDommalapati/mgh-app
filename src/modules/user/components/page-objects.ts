import {by, element} from 'protractor';

const faker      = require('faker');
const MockServer = require('mockserver-client');

const emailInput    = element(by.css('[formcontrolname="email"]'));
const passwordInput = element(by.css('[formcontrolname="password"]'));
const loginButton   = element(by.css('[type="submit"]'));

export class UserLoginPageObjects {

    loginAs(userType: string): Promise<any> {

        return this.setupApi(userType)
                   .then(() => emailInput.sendKeys(faker.internet.email()))
                   .then(() => passwordInput.sendKeys(faker.internet.password()))
                   .then(() => loginButton.click());
    }

    private setupApi(userType: string) {

        const server = MockServer.mockServerClient('api.hotels.co.uk', 1080);

        const mock = {
            httpRequest:  {
                method: 'POST',
                path:   '/json/Login',
            },
            httpResponse: {
                statusCode: 200,
                headers:    [
                    {
                        name:   'Access-Control-Allow-Headers',
                        values: ['Authorization'],
                    },
                    {
                        name:   'Access-Control-Allow-Methods',
                        values: ['*'],
                    },
                    {
                        name:   'Access-Control-Allow-Origin',
                        values: ['*'],
                    },
                    {
                        name:   'Access-Control-Expose-Headers',
                        values: ['Authorization'],
                    },
                    {
                        name:   'Content-Type',
                        values: ['application/json; charset=utf-8'],
                    },
                    {
                        name:   'Authorization',
                        values: [this.getJwt(userType)],
                    },
                ],
                body:       JSON.stringify(
                    {
                        status:  true,
                        data:    null,
                        message: 'Login Success',
                    },
                ),
            },
        };

        return server
            .clear()
            .then(() => server.mockAnyResponse(mock));
    }

    private getJwt(userType: string) {

        return 'eyJpZCI6MSwiY2FwYWJpbGl0aWVzIjp7Imdyb3VwcyI6WyJvcmdhbmlzYXRpb24tYWRtaW4iLCJwYXJ0bmVyc2hpcC1jbGF5LXBpZ2Vvbi1jbHViIiwicGFydG5lcnNoaXAta2FydC1jbHViIiwicGFydG5lcnNoaXAtbWlsaXRhcnktaGlzdG9yeS1pbnRlcmVzdC1ncm91cCIsInBhcnRuZXJzaGlwLW11c2ljLXNvY2lldHkiLCJwYXJ0bmVyc2hpcC1waG90b2dyYXBoeS1jbHViIiwicGFydG5lcnNoaXAtcG9rZXItY2x1YiIsInBhcnRuZXJzaGlwLXJ1bm5pbmctY2x1YiIsInBhcnRuZXJzaGlwLXNhYmVlbWEtYXJ0cy1jcmFmdHMtY2x1YiIsInBhcnRuZXJzaGlwLXNhaWxpbmctY2x1YiIsInBhcnRuZXJzaGlwLXdpbmUtY2x1YiIsInJlZ2lzdGVyZWQiLCJzdXBlcmFkbWluIiwid29ya2luZy1wYXJlbnRzLW5ldHdvcmsiXX0sInRpbWVzdGFtcCI6MTUxMDY1MDc0NiwiYnVpbGQiOiIxNTEwMTM5MTc3ODU3IiwiaGFzaCI6IjY5ZDMwOGY4MWUyNWNlYTJmODc2NjMxNTY5MjdjYzYxNjc1YzllZGVhNDBkYTMwMzk1ZWNjZjY3Njk3ZWUwYjkiLCJ1c2VyRGF0YSI6bnVsbH0=';
    }
}
