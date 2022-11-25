import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from 'src/products/products.model';
import { Basket } from './baskets.model';

@Table({ tableName: 'basket_product' })
export class BasketProduct extends Model<BasketProduct> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Product)
    @Column
    productId: number;

    @ForeignKey(() => Basket)
    @Column
    basketId: number;

    @BelongsTo(() => Basket)
    basket: Basket;
}
