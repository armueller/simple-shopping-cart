import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from 'src/app/models/Order';

@Component({
    selector: 'app-order-details-dialog',
    templateUrl: './order-details-dialog.component.html',
    styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public order: Order,
        public dialogRef: MatDialogRef<OrderDetailsDialogComponent>) { }

    ngOnInit(): void {
    }

    onDismiss(): void {
        this.dialogRef.close();
    }

}
