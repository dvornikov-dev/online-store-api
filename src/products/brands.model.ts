import { Column, Model, Table, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Product } from './products.model';
import { TypeBrand } from './type.brand.model';
import { Type } from './types.model';

@Table({ tableName: 'brands' })
export class Brand extends Model<Brand> {
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

    @HasMany(() => Product)
    products: Product;

    @BelongsToMany(() => Type, () => TypeBrand)
    brands: Type[];
}
