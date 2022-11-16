import {
    Column,
    Model,
    Table,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { BasketProduct } from './basket.product.model';

@Table({ tableName: 'baskets' })
export class Basket extends Model<Basket> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => BasketProduct)
    products: BasketProduct[];
}
