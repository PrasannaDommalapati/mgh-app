import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './component';
import {UserService} from "../modules/user/services/user-api";

describe('Main Component', () => {

    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let valid: boolean;

    let AuthStub: any = {
        isLoggedIn: () => valid,
        isInGroup:  (group: string) => valid,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers:    [
                {provide: UserService, useValue: AuthStub},
            ],
            declarations: [AppComponent],
            schemas:      [NO_ERRORS_SCHEMA],
        });

        TestBed.compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;

        valid = true;

    });


    it('should pass through userApi.loggedIn() says true', () => {

        expect(component.userLoggedIn()).toBeTruthy();
    });

    it('should pass through userApi.loggedIn() says false', () => {

        valid = false;
        expect(component.userLoggedIn()).toBeFalsy();
    });


});