import { NgModule, Component } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { OrderDetailsDialogComponent } from './order-details-dialog.component';
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
    exports: [OrderDetailsDialogComponent, NoopComponent],
    declarations: [OrderDetailsDialogComponent, NoopComponent],
    entryComponents: [OrderDetailsDialogComponent]
})
class DialogTestModule { }

describe('OrderDetailsDialogComponent', () => {
    let dialog: MatDialog;
    let overlayContainerElement: HTMLElement;

    let noop: ComponentFixture<NoopComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DialogTestModule],
            providers: [
                {
                    provide: OverlayContainer, useFactory: () => {
                        overlayContainerElement = document.createElement('div');
                        return { getContainerElement: () => overlayContainerElement };
                    }
                }
            ]
        });

        dialog = TestBed.inject(MatDialog);

        noop = TestBed.createComponent(NoopComponent);

        const config = {
            data: {
                _id: '5eacc0d257d570ddacde193c',
                createdAt: new Date('2020-04-17T18:24:00'),
                items: [
                    {
                        product: {
                            _id: '5eacc13c57d570ddacde193d',
                            name: '13 Amp 10 in. Professional Cast Iron Table Saw',
                            description: '13 Amp motor and 30 in. rip capacity make this ideal for jobsites.',
                            price: 699,
                            imgUrl: 'https://images.homedepot-static.com/productImages/fe07bc9b-db8d-45a5-b517-116bfcaf406a/svn/ridgid-stationary-table-saws-r4520-64_1000.jpg'
                        },
                        qty: 1
                    },
                    {
                        product: {
                            _id: '5eacc0d257d570ddacde193c',
                            name: '13 Amp Corded 7-1/4 in. Circular Saw',
                            description: '13 Amp motor for cutting a variety of lumber.',
                            price: 49.97,
                            imgUrl: 'https://images.homedepot-static.com/productImages/4765d0a8-ae24-4d61-bab3-eab8a454667f/svn/ryobi-circular-saws-csb125-64_1000.jpg'
                        },
                        qty: 2
                    }
                ],
                total: 798.94,
            }
        };
        dialog.open(OrderDetailsDialogComponent, config);
        noop.detectChanges(); // Updates the dialog in the overlay
    });

    it('should create', () => {
        expect(dialog).toBeTruthy();
    });

    it('should display the order date, formatted total, and ordered product names with quantity & price', () => {
        const orderDate = overlayContainerElement.querySelector('.order-date').textContent;
        const orderTotal = overlayContainerElement.querySelector('.order-total').textContent;
        const firstProductName = overlayContainerElement.querySelector('.product-name').textContent;
        const firstProductQtyWPrice = overlayContainerElement.querySelector('.product-qty-price').textContent;

        expect(orderDate).toEqual('Placed on: Apr 17, 2020, 6:24:00 PM');
        expect(orderTotal).toEqual('Total: $798.94');
        expect(firstProductName).toEqual('13 Amp 10 in. Professional Cast Iron Table Saw');
        expect(firstProductQtyWPrice).toEqual('1 x $699.00');
    });
});
