import { Table, Model, PrimaryKey, Column, ForeignKey, IsUUID, DataType } from 'sequelize-typescript';
import { Section } from './section.model';

@Table({
  schema: 'app',
  timestamps: true
})
export class TypeCurveSection extends Model<TypeCurveSection> {
  @PrimaryKey
  @ForeignKey(() => Section)
  id_section: number;

  @Column
  month_num: number;

  @Column
  oil_forecast: number;

  @Column
  gas_forecast: number;
}
