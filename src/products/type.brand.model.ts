import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Brand } from './brands.model';
import { Type } from './types.model';

@Table({ tableName: 'type_brand', createdAt: false, updatedAt: false })
export class TypeBrand extends Model<TypeBrand> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Type)
    @Column
    typeId: number;

    @ForeignKey(() => Brand)
    @Column
    brandId: number;
}
