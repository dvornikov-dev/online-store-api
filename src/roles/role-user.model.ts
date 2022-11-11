import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { Role } from './roles.model';

@Table({ tableName: 'role_user' })
export class RoleUser extends Model<RoleUser> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Role)
    @Column
    roleId: number;

    @ForeignKey(() => User)
    @Column
    userId: number;
}
