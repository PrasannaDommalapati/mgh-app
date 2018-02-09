// import {TestBed} from '@angular/core/testing';
// import {About} from './component';
// import {MaterialModule} from '@angular/material';
// import {UserService} from "../../services/user-api";
//
//
// describe('About component in hotels', () => {
//
//     let about: About;
//
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 MaterialModule
//             ],
//             declarations: [
//                 About
//             ],
//             providers: [UserService]
//         });
//     });
//
//     it('should render consignment note in a h1 tag', () => {
//         let fixture = TestBed.createComponent(About);
//         const compiled = fixture.debugElement.nativeElement;
//         expect(compiled.querySelector('h1').textContent).toContain('About');
//     });
//
//     it('should get the login status needed for about page', () => {
//         expect(document.getElementsByTagName('h1').length).not.toEqual(0);
//     });
//
//     it('should be loading content in the about page', () => {
//         let content = document.getElementsByClassName('content');
//         expect(content).not.toBeNull();
//     });
//
//     it('should show discover more button', () => {
//         let discoverMore = document.getElementsByClassName('discover-more');
//         expect(discoverMore).not.toBeNull();
//     });
// });
