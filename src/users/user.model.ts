import { Column, Model, Table, DataType, HasOne, BelongsToMany } from 'sequelize-typescript';
import { Basket } from 'src/baskets/baskets.model';
import { RoleUser } from 'src/roles/role-user.model';
import { Role } from 'src/roles/roles.model';

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

    @BelongsToMany(() => Role, () => RoleUser)
    roles: Role[];

    @HasOne(() => Basket)
    bakset: Basket;
}
