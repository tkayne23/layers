import { Table, Model, PrimaryKey, Column, ForeignKey, IsUUID, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  email: string;

  @Column
  display_name: string;

  @Column
  contact_address: string;

  @Column
  password: string;

  @Column
  company: string;

  @Column
  phone: string;

  @Column
  mfa: string;
}
