import { Column, Model, Table, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Brand } from './brands.model';
import { Product } from './products.model';
import { TypeBrand } from './type.brand.model';

@Table({ tableName: 'types' })
export class Type extends Model<Type> {
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

    @BelongsToMany(() => Brand, () => TypeBrand)
    brands: Brand[];
}
