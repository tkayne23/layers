import { Table, Model, PrimaryKey, Column, ForeignKey, DataType } from 'sequelize-typescript';
import { Township } from './township.model';

@Table({
  timestamps: true
})
export class TypeCurveTownshipGas extends Model<TypeCurveTownshipGas> {
  @PrimaryKey
  @ForeignKey(() => Township)
  @Column(DataType.UUIDV4)
  id_township: string;

  @PrimaryKey
  @Column
  month_num: number;

  @Column
  gas_forecast: number;
}
