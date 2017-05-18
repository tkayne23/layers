import { Table, Model, PrimaryKey, Column, IsUUID, DataType, ForeignKey } from 'sequelize-typescript';
import { Section } from './section.model';

@Table
export class TypeCurve extends Model<TypeCurve> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @ForeignKey(() => Section)
  sectionId: number;

  @Column
  month_num: number;

  @Column
  oil_forecast: string;

  @Column
  gas_forecast: string;
}
