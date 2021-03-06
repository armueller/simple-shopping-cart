import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/products/products.reducer';
import { AddItem } from 'src/app/store/cart/cart.actions';
import { OrderItem } from 'src/app/models/OrderItem';

@Component({
    selector: 'app-product-details-dialog',
    templateUrl: './product-details-dialog.component.html',
    styleUrls: ['./product-details-dialog.component.css']
})
export class ProductDetailsDialogComponent implements OnInit {
    quantity = 1;

    constructor(
        @Inject(MAT_DIALOG_DATA) public product: Product,
        public dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
        private productStore: Store<{productsState: State}>) { }

    ngOnInit(): void {
    }

    onDismiss(): void {
        this.dialogRef.close();
    }

    onRemove(): void {
        this.quantity -= 1;
        if (this.quantity < 1) {
            this.quantity = 1;
        }
    }

    onAdd(): void {
        this.quantity += 1;
    }

    onAddToCart(): void {
        this.productStore.dispatch(new AddItem(new OrderItem(this.product, this.quantity)));
        this.dialogRef.close();
    }
}
