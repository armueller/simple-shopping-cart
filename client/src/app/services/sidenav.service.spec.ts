import { TestBed } from '@angular/core/testing';

import { SidenavService } from './sidenav.service';

describe('SidenavService', () => {
    let service: SidenavService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SidenavService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have a page title of "" on creation', (done) => {
        service.pageTitle$.subscribe((pageTitle) => {
            expect(pageTitle).toBe('');
            done();
        });
    });

    it('should have a page title of Test if setPageTitle is called with "Test"', (done) => {
        service.setPageTitle('Test');
        service.pageTitle$.subscribe((pageTitle) => {
            expect(pageTitle).toBe('Test');
            done();
        });
    });
});
