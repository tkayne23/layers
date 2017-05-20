import { Table, Model, PrimaryKey, Column, ForeignKey, DataType } from 'sequelize-typescript';
import { Township } from './township.model';

@Table({
  timestamps: true
})
export class TypeCurveTownshipOil extends Model<TypeCurveTownshipOil> {
  @PrimaryKey
  @ForeignKey(() => Township)
  @Column(DataType.UUIDV4)
  id_township: string;

  @PrimaryKey
  @Column
  month_num: number;

  @Column
  oil_forecast: number;
}
