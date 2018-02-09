export interface CompleteRegistration {
    given_name: string,
    family_name: string,
    newPassword: {
        password: string,
        confirmPassword: string,
    },
}