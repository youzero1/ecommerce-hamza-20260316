import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  orderId!: number;

  @Column()
  productId!: number;

  @Column()
  quantity!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  priceAtPurchase!: number;

  @ManyToOne('Order', 'items')
  @JoinColumn({ name: 'orderId' })
  order!: any;

  @ManyToOne('Product')
  @JoinColumn({ name: 'productId' })
  product!: any;
}
