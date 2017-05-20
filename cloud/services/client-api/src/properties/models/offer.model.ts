import { Table, Model, PrimaryKey, Column, ForeignKey, IsUUID, DataType } from 'sequelize-typescript';
import { User } from './user.model';
import { Property } from './property.model';

@Table({
  schema: 'app',
  timestamps: true
})
export class Offer extends Model<Offer> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  amount: number;

  @ForeignKey(() => User)
  userId: number;

  @ForeignKey(() => Property)
  propertyId: number;
}
