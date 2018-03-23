import {AppPage} from "../pages/app";

export namespace AppActions {

    import menuIcon = AppPage.menuIcon;
    import logoutButton = AppPage.logoutButton;

    export function openMenu() {

        return new Promise((resolve) => menuIcon.click().then(() => resolve()));
    }

    export function clickLogout() {

        return new Promise((resolve) => logoutButton.click().then(() => resolve()));
    }
}
