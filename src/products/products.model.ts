import {
    Column,
    Model,
    Table,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { Brand } from '../brands/brands.model';
import { ProductInfo } from './product.info.model';
import { Type } from '../types/types.model';

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    rating: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    img: string;

    @ForeignKey(() => Type)
    @Column
    typeId: number;

    @BelongsTo(() => Type)
    type: Type;

    @ForeignKey(() => Brand)
    @Column
    brandId: number;

    @BelongsTo(() => Brand)
    brand: Brand;

    @HasMany(() => ProductInfo)
    productInfo: ProductInfo;
}
