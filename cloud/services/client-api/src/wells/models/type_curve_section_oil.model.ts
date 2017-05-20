import { Table, Model, PrimaryKey, Column, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import { Section } from './section.model';

@Table({
  timestamps: true
})
export class TypeCurveSectionOil extends Model<TypeCurveSectionOil> {
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
  oil_forecast: number;
}
