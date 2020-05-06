import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';

@Component({
    selector: 'app-product-details-dialog',
    templateUrl: './product-details-dialog.component.html',
    styleUrls: ['./product-details-dialog.component.css']
})
export class ProductDetailsDialogComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public product: Product,
                public dialogRef: MatDialogRef<ProductDetailsDialogComponent>) { }

    ngOnInit(): void {
    }

}
