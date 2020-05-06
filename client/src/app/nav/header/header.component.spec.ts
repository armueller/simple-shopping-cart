import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
    let sidenavService: SidenavService;
    let screenWidthService: ScreenWidthService;
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [HeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        sidenavService = TestBed.inject(SidenavService);
        screenWidthService = TestBed.inject(ScreenWidthService);
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a menu button if mobile', () => {
        screenWidthService.setWidth(360);
        fixture.detectChanges();
        let compiled: HTMLElement = fixture.nativeElement;

        expect(compiled.querySelector('#menu')).toBeTruthy();

        screenWidthService.setWidth(768);
        fixture.detectChanges();
        compiled = fixture.nativeElement;

        expect(compiled.querySelector('#menu')).toBeFalsy();
    });

    it('should have a cart button if mobile', () => {
        screenWidthService.setWidth(360);
        fixture.detectChanges();
        let compiled: HTMLElement = fixture.nativeElement;

        expect(compiled.querySelector('#cart')).toBeTruthy();

        screenWidthService.setWidth(768);
        fixture.detectChanges();
        compiled = fixture.nativeElement;

        expect(compiled.querySelector('#cart')).toBeFalsy();
    });

    it('should have a page title given by the sidenav service if mobile', () => {
        screenWidthService.setWidth(360);
        sidenavService.setPageTitle('Testing');
        fixture.detectChanges();
        let compiled: HTMLElement = fixture.nativeElement;

        expect(compiled.querySelector('#title').textContent).toContain('Testing');

        screenWidthService.setWidth(768);
        fixture.detectChanges();
        compiled = fixture.nativeElement;

        expect(compiled.querySelector('#title')).toBeFalsy();
    });

    it('should have a product and order nav links if not mobile', () => {
        screenWidthService.setWidth(768);
        fixture.detectChanges();
        let compiled: HTMLElement = fixture.nativeElement;

        expect(compiled.querySelector('#products-link').textContent).toContain('Products');
        expect(compiled.querySelector('#orders-link').textContent).toContain('Orders');

        screenWidthService.setWidth(360);
        fixture.detectChanges();
        compiled = fixture.nativeElement;

        expect(compiled.querySelector('#products-link')).toBeFalsy();
        expect(compiled.querySelector('#orders-link')).toBeFalsy();
    });
});
