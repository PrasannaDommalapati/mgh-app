import {
    HttpClient,
    HttpHeaders,
    HttpResponse,
}                   from '@angular/common/http';
import {Injectable} from '@angular/core';

import {AuthService}         from '../../modules/user/services/auth';
import {
    Http,
    RequestOptions,
    Headers,
    Response,
}                            from '@angular/http';
import {Organisation}        from '../../interfaces/Organisation';
import {environment}         from '../constant/environment';
import {Observable}          from 'rxjs/Observable';
import {LocalStorageService} from 'angular-2-local-storage';

const UNORTHORIZED = 401;
const FORBIDDEN    = 403;
const ERROR        = 500;

@Injectable()
export class Api {

    private apiVersion: string;

    public constructor(private LocalStorageService: LocalStorageService,
                       private AuthService: AuthService,
                       public Http: Http,
                       private HttpClient: HttpClient,
    ) {

    }

    private checkApiVersion(apiVersion: string) {

        return new Promise((resolve, reject) => {

            try {

                this.setApiVersion();

                if (apiVersion !== this.apiVersion) {

                    this.LocalStorageService.set('ApiVersion', apiVersion);
                    window.location.reload();
                    return reject();
                }

                resolve();

            } catch (error) {

                reject(error);
            }
        });

    }

    private setApiVersion() {

        if ('undefined' === typeof this.apiVersion) {

            this.apiVersion = this.LocalStorageService.get('ApiVersion');
        }
    }

    public request(endpoint: string, options: RequestOptions) {

        return new Promise((resolve, reject) => {

            this.AuthService.getAuthToken()
                .then((authToken) => {

                    let headers = new Headers();
                    headers.append('Authorization', authToken);

                    console.log(headers);


                    this.Http
                        .request(endpoint, options.merge({headers:headers}))
                        .map((Response: Response) => {

                            return this.checkApiVersion(Response.headers.get('Content-Version'))
                                .then(() => Response.json(), () => Observable.throw(Response),);

                        })
                        .catch((Response: Response) => {

                            return Observable.throw(Response);
                        })
                        .subscribe(data => resolve(data), (Response:any) => reject(Response.json()),);
                }, (error:Error) => reject(error),);
        });
    }



    public s3PutObject(putUrl: string, putObject: Blob) {

        return new Promise((resolve, reject) => {

            try {

                this.Http
                    .put(putUrl, putObject)
                    .map((Response: Response) => {

                        if (Response.status >= 200 && Response.status < 300) {
                            // If everything went fine, return the response
                            return true;
                        }

                        reject('An error occurred.');
                    })
                    .catch((Response: Response) => {

                        let message = 'An error occurred';

                        if (UNORTHORIZED == Response.status) {

                            message = 'Unauthorised: Invalid user credentials.';
                        }

                        if (FORBIDDEN == Response.status) {

                            message = 'Forbidden: You do not have sufficient privileges.';
                        }

                        if (ERROR == Response.status) {

                            message = new Error(Response.statusText).toString();
                        }

                        return Observable.throw(message);
                    })
                    .subscribe(() => resolve(), (error:any) => reject(error),);

            } catch (error) {

                reject(error);
            }
        });
    }

    public getOrganisation() {

        return new Promise((resolve, reject) => {

            try {

                let endpoint = environment.endpoint.user.organisations('me');
                let options  = new RequestOptions({method:'GET'});

                this.request(endpoint, options)
                    .then((Organisation: Organisation) => resolve(Organisation), error => reject(new Error(error)),);

            } catch (error) {

                reject(new Error(error));
            }
        });

    }
}