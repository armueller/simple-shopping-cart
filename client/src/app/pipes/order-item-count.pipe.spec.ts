import { OrderItemCountPipe } from './order-item-count.pipe';

describe('OrderItemCountPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderItemCountPipe();
    expect(pipe).toBeTruthy();
  });
});
