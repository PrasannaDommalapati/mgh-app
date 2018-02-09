import {NewPassword} from './new-password';

export interface Register {
    given_name: string,
    family_name: string,
    email: string,
    newPassword: NewPassword
}