import { NgModule, Component } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductDetailsDialogComponent } from './product-details-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Noop component is only a workaround to trigger change detection
@Component({
    template: ''
})
class NoopComponent { }

@NgModule({
    imports: [MatDialogModule, NoopAnimationsModule],
    exports: [ProductDetailsDialogComponent, NoopComponent],
    declarations: [ProductDetailsDialogComponent, NoopComponent],
    entryComponents: [ProductDetailsDialogComponent]
})
class DialogTestModule { }

describe('ProductDetailsDialogComponent', () => {
    let dialog: MatDialog;
    let overlayContainerElement: HTMLElement;

    let noop: ComponentFixture<NoopComponent>;

    // beforeEach(() => {
    //     TestBed.configureTestingModule({
    //         imports: [DialogTestModule],
    //         providers: [
    //             {
    //                 provide: OverlayContainer, useFactory: () => {
    //                     overlayContainerElement = document.createElement('div');
    //                     return { getContainerElement: () => overlayContainerElement };
    //                 }
    //             }
    //         ]
    //     });

    //     dialog = TestBed.inject(MatDialog);

    //     noop = TestBed.createComponent(NoopComponent);

    //     const config = {
    //         data: {
    //             _id: '5eacc1de57d570ddacde193f',
    //             name: '18-Volt ONE+ Cordless 1/2 in. Hammer Drill/Driver (Tool Only) with Handle',
    //             description: '600 in./lbs. torque to power through the toughest applications',
    //             price: 69,
    //             imgUrl: 'https://images.homedepot-static.com/productImages/9658de57-408c-4741-87c4-d6faad7f844f/svn/ryobi-hammer-drills-p214-64_1000.jpg'
    //         }
    //     };
    //     dialog.open(ProductDetailsDialogComponent, config);
    //     noop.detectChanges(); // Updates the dialog in the overlay
    // });

    // it('should create', () => {
    //     expect(dialog).toBeTruthy();
    // });

    // it('should display the product name, description, and formatted price', () => {
    //     const productName = overlayContainerElement.querySelector('.product-name').textContent;
    //     const productDesctiption = overlayContainerElement.querySelector('.product-description').textContent;
    //     const productPrice = overlayContainerElement.querySelector('.product-price').textContent;

    //     expect(productName).toEqual('18-Volt ONE+ Cordless 1/2 in. Hammer Drill/Driver (Tool Only) with Handle');
    //     expect(productDesctiption).toEqual('600 in./lbs. torque to power through the toughest applications');
    //     expect(productPrice).toEqual('$69.00');
    // });

    // it('should add 1 to the current quantity if add button is clicked', fakeAsync(() => {
    //     const addButton: HTMLElement = overlayContainerElement.querySelector('.qty-add');
    //     addButton.click();
    //     tick();
    //     noop.detectChanges();

    //     const currentQty = overlayContainerElement.querySelector('.current-qty').textContent;
    //     expect(currentQty).toEqual('2');
    // }));

    // it('should subtract 1 to the current quantity if "-" is clicked', () => {
    //     expect(dialog).toBeTruthy();
    // });

    // it('should not subtract 1 to the current quantity is 1', () => {
    //     expect(dialog).toBeTruthy();
    // });

    // it('should add product to cart with current quantity', () => {
    //     expect(dialog).toBeTruthy();
    // });
});
