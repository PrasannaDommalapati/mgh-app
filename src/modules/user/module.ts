import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthGuard} from './services/auth-guard';
import {AuthService} from './services/auth';
import {GuestGuard} from './services/guest-guard';
// import {VerifyModal} from './components/verify/component';
import {LoginModal} from './components/login/modal/component';
import {Login} from './components/login/component';
import {Registration} from './components/register/component';
import {ForgotPasswordModal} from './components/password/forgot/component';
import {LoginForm} from './components/login/form/component';
import {HotelsMaterialModule} from '../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {UserService} from './services/user-api';
import {UserMenu} from './components/menu/component';
import {routing} from '../../app/routing.module';
import {Api} from '../../app/services/api';
import {CompleteRegistrationModal} from './components/password/complete-registration/component';
import {ChangePasswordModal} from './components/password/change/component';
import {ResetPasswordModal} from './components/password/reset/component';
import {VerifyModal} from './components/verify/component';

@NgModule(
    {
        imports:         [
            CommonModule,
            routing,
            HotelsMaterialModule,
            ReactiveFormsModule,
        ],
        declarations:    [
            UserMenu,

            Login,
            LoginForm,

            Registration,
            VerifyModal,

            LoginModal,
            ForgotPasswordModal,
            CompleteRegistrationModal,
            ChangePasswordModal,
            ResetPasswordModal,
        ],
        entryComponents: [
            VerifyModal,

            LoginModal,
            ForgotPasswordModal,
            CompleteRegistrationModal,
            ChangePasswordModal,
            ResetPasswordModal,
        ],
        providers:       [
            Api,
            AuthGuard,
            AuthService,
            GuestGuard,
            UserService,
        ],
        exports:         [
            UserMenu,
        ],
    },
)
export class UserModule {
}