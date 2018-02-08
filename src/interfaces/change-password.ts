import {NewPassword} from './new-password';

export interface ChangePassword {
    oldPassword: string,
    newPassword: NewPassword
}