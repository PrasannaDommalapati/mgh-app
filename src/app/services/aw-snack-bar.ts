import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable()
export class AwSnackBar extends MatSnackBar {

    public handleSuccess(message: string) {

        let config: MatSnackBarConfig = new MatSnackBarConfig();

        config.extraClasses = ['success'];

        return this.snackBar(config, message);
    }

    public handleError(error: Error) {

        let config: MatSnackBarConfig = new MatSnackBarConfig();

        config.extraClasses = ['error'];

        return this.snackBar(config, error.toString());
    }

    private snackBar(config:MatSnackBarConfig, message:string) {

        config.duration     = 2000 + (message.length * 50);

        return new Promise(
            resolve => this
                .open(message, 'close', config)
                .afterOpened()
                .subscribe(() => resolve()),
        );
    }
}