import { Table, Model, PrimaryKey, Column, ForeignKey, IsUUID, DataType } from 'sequelize-typescript';
import { Township } from './township.model';

@Table({
  schema: 'app',
  timestamps: true
})
export class TypeCurveTownship extends Model<TypeCurveTownship> {
  @PrimaryKey
  @ForeignKey(() => Township)
  id_township: number;

  @Column
  month_num: number;

  @Column
  oil_forecast: number;

  @Column
  gas_forecast: number;
}
