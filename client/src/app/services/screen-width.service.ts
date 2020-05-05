import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum ScreenSize {
    XXS,
    XS,
    SM,
    MD,
    LG,
    XL
}

@Injectable({
    providedIn: 'root'
})
export class ScreenWidthService {
    public isMobile$ = new BehaviorSubject<boolean>(true);
    public screenWidth: ScreenSize;

    constructor() {
        this.setWidth(window.innerWidth);
    }

    public setWidth(width: number) {
        if (width < 375) {
            this.screenWidth = ScreenSize.XXS;
            this.isMobile$.next(true);
        } else if (width >= 375 && width < 576) {
            this.screenWidth = ScreenSize.XS;
            this.isMobile$.next(true);
        } else if (width >= 576 && width < 768) {
            this.screenWidth = ScreenSize.SM;
            this.isMobile$.next(true);
        } else if (width >= 768 && width < 992) {
            this.screenWidth = ScreenSize.MD;
            this.isMobile$.next(false);
        } else if (width >= 992 && width < 1200) {
            this.screenWidth = ScreenSize.LG;
            this.isMobile$.next(false);
        } else {
            this.screenWidth = ScreenSize.XL;
            this.isMobile$.next(false);
        }
    }
}
