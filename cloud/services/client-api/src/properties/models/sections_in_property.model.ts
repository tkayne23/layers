import { Table, Model, PrimaryKey, Column, DataType, IsUUID, ForeignKey } from 'sequelize-typescript';
import { Property } from './property.model';
import { Section } from '../../wells/models/section.model';

@Table({
  schema: 'app',
  timestamps: true
})
export class SectionsInProperty extends Model<SectionsInProperty> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @ForeignKey(() => Property)
  @Column(DataType.UUIDV4)
  propertyId: string;

  @ForeignKey(() => Section)
  @Column(DataType.UUIDV4)
  sectionId: string;

  @Column
  fractional_overlap: number;
}
