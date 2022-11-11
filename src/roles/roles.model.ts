import { Column, Model, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { RoleUser } from './role-user.model';

@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
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
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    description: string;

    @BelongsToMany(() => User, () => RoleUser)
    users: User[];
}
