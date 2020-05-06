import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-product-list-item',
    templateUrl: './product-list-item.component.html',
    styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {
    @Input() product: Product;
    @Output() clicked$ = new Subject<void>();

    constructor() { }

    ngOnInit(): void {
    }

    onClick() {
        this.clicked$.next();
    }
}
