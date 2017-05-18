import { Table, Model, PrimaryKey, Column, ForeignKey, IsUUID, DataType } from 'sequelize-typescript';
import { Property } from './property.model';

@Table
export class ForSale extends Model<ForSale> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  start_time: Date;

  @Column
  end_time: Date;

  @Column
  reserve: number;

  @ForeignKey(() => Property)
  propertyId: number;
}
