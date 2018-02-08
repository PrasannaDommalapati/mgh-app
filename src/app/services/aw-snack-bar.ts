import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable()
export class AwSnackBar extends MdSnackBar {

    public handleSuccess(message: string) {

        let config: MdSnackBarConfig = new MdSnackBarConfig();

        config.extraClasses = ['success'];

        return this.snackBar(config, message);
    }

    public handleError(error: Error) {

        let config: MdSnackBarConfig = new MdSnackBarConfig();

        config.extraClasses = ['error'];

        return this.snackBar(config, error.toString());
    }

    private snackBar(config:MdSnackBarConfig, message:string) {

        config.duration     = 2000 + (message.length * 50);

        return new Promise(
            resolve => this
                .open(message, 'close', config)
                .afterOpened()
                .subscribe(() => resolve()),
        );
    }
}