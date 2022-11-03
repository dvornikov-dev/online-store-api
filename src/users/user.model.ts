import { Column, Model, Table, DataType, HasOne } from 'sequelize-typescript';
import { Basket } from 'src/baskets/baskets.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    firstName: string;

    @Column({
        type: DataType.STRING,
    })
    lastName: string;

    @Column({
        type: DataType.STRING,
        unique: true,
    })
    email: string;

    @Column({
        type: DataType.STRING,
    })
    password: string;

    //TODO: change to roleid
    @Column({
        type: DataType.STRING,
        defaultValue: 'USER',
    })
    role: string;

    @HasOne(() => Basket)
    bakset: Basket;
}
