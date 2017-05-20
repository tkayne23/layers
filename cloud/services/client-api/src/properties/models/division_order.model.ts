import { Table, Model, PrimaryKey, Column, ForeignKey, IsUUID, DataType } from 'sequelize-typescript';

@Table({
  schema: 'app',
  timestamps: true
})
export class DivisionOrder extends Model<DivisionOrder> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  document: string;

  @Column
  fractional_ownership: number;

  @Column
  decimal_interest: number;
}
