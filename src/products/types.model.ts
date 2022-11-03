import { Column, Model, Table, DataType } from 'sequelize-typescript';

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

    // @ForeignKey(() => Type)
    // @Column
    // typeId: number;
}
