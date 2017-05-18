import { Table, Model, PrimaryKey, Column, IsUUID, DataType } from 'sequelize-typescript';
// import { Property } from './property.model';

@Table
export class Deed extends Model<Deed> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  document: any;

  @Column
  fractional_ownership: number;

  @Column
  legal_desc: string;

  @Column
  gross_acreage: number;
}
