import { Table, Model, PrimaryKey, Column, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import { Section } from './section.model';

@Table({
  timestamps: true
})
export class TypeCurveSectionGas extends Model<TypeCurveSectionGas> {
  @PrimaryKey
  @ForeignKey(() => Section)
  @Column(DataType.UUIDV4)
  id_section: string;

  @BelongsTo(() => Section)
  section: Section;

  @PrimaryKey
  @Column
  month_num: number;

  @Column
  gas_forecast: number;
}
