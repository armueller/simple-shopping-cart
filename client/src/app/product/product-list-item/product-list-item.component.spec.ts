import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListItemComponent } from './product-list-item.component';

describe('ProductListItemComponent', () => {
    let component: ProductListItemComponent;
    let fixture: ComponentFixture<ProductListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductListItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductListItemComponent);
        component = fixture.componentInstance;
        component.product = {
            _id: '5eacc1de57d570ddacde193f',
            name: '18-Volt ONE+ Cordless 1/2 in. Hammer Drill/Driver (Tool Only) with Handle',
            description: '600 in./lbs. torque to power through the toughest applications',
            price: 69,
            imgUrl: 'https://images.homedepot-static.com/productImages/9658de57-408c-4741-87c4-d6faad7f844f/svn/ryobi-hammer-drills-p214-64_1000.jpg'
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the product name', () => {
        const compiled: HTMLElement = fixture.nativeElement;

        expect(compiled.querySelector('.product-name').textContent).toContain('18-Volt ONE+');
    });
});
