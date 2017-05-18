import { Table, Model, PrimaryKey, Column, DataType, IsUUID, ForeignKey } from 'sequelize-typescript';
import { Property } from './property.model';
import { Section } from './section.model';

@Table
export class SectionsInProperty extends Model<SectionsInProperty> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @ForeignKey(() => Property)
  propertyId: number;

  @ForeignKey(() => Section)
  sectionId: number;

  @Column
  fractional_overlap: number;
}
