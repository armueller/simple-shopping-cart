import { TestBed } from '@angular/core/testing';

import { ScreenWidthService, ScreenSize } from './screen-width.service';

describe('ScreenWidthService', () => {
    let service: ScreenWidthService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ScreenWidthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have a screenSize of XXS if width < 375 and isMobile should be true', (done) => {
        service.setWidth(374);
        expect(service.screenWidth === ScreenSize.XXS).toBeTrue();
        service.setWidth(375);
        expect(service.screenWidth === ScreenSize.XXS).toBeFalse();

        service.setWidth(374);
        service.isMobile$.subscribe((isMobile) => {
            expect(isMobile).toBeTrue();
            done();
        });
    });

    it('should have a screenSize of XS if width >= 375 and width < 576 and isMobile should be true', (done) => {
        service.setWidth(375);
        expect(service.screenWidth === ScreenSize.XS).toBeTrue();
        service.setWidth(575);
        expect(service.screenWidth === ScreenSize.XS).toBeTrue();
        service.setWidth(576);
        expect(service.screenWidth === ScreenSize.XS).toBeFalse();

        service.setWidth(375);
        service.isMobile$.subscribe((isMobile) => {
            expect(isMobile).toBeTrue();
            done();
        });
    });

    it('should have a screenSize of SM if width >= 576 and width < 768 and isMobile should be true', (done) => {
        service.setWidth(576);
        expect(service.screenWidth === ScreenSize.SM).toBeTrue();
        service.setWidth(767);
        expect(service.screenWidth === ScreenSize.SM).toBeTrue();
        service.setWidth(768);
        expect(service.screenWidth === ScreenSize.SM).toBeFalse();

        service.setWidth(576);
        service.isMobile$.subscribe((isMobile) => {
            expect(isMobile).toBeTrue();
            done();
        });
    });

    it('should have a screenSize of MD if width >= 768 and width < 992 and isMobile should be false', (done) => {
        service.setWidth(768);
        expect(service.screenWidth === ScreenSize.MD).toBeTrue();
        service.setWidth(991);
        expect(service.screenWidth === ScreenSize.MD).toBeTrue();
        service.setWidth(992);
        expect(service.screenWidth === ScreenSize.MD).toBeFalse();

        service.setWidth(768);
        service.isMobile$.subscribe((isMobile) => {
            expect(isMobile).toBeFalse();
            done();
        });
    });

    it('should have a screenSize of LG if width >= 992 and width < 1200 and isMobile should be false', (done) => {
        service.setWidth(992);
        expect(service.screenWidth === ScreenSize.LG).toBeTrue();
        service.setWidth(1199);
        expect(service.screenWidth === ScreenSize.LG).toBeTrue();
        service.setWidth(1200);
        expect(service.screenWidth === ScreenSize.LG).toBeFalse();

        service.setWidth(992);
        service.isMobile$.subscribe((isMobile) => {
            expect(isMobile).toBeFalse();
            done();
        });
    });

    it('should have a screenSize of XL if width >= 1200 and isMobile should be false', (done) => {
        service.setWidth(1200);
        expect(service.screenWidth === ScreenSize.XL).toBeTrue();

        service.isMobile$.subscribe((isMobile) => {
            expect(isMobile).toBeFalse();
            done();
        });
    });
});
