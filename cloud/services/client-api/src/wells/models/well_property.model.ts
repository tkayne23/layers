import { Table, Model, PrimaryKey, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Property } from '../../properties/models/property.model';
import { Well } from './well.model';

@Table({
  timestamps: true
})
export class WellProperty extends Model<WellProperty> {
  @PrimaryKey
  @ForeignKey(() => Property)
  @Column(DataType.UUIDV4)
  propertyId: string;

  @PrimaryKey
  @ForeignKey(() => Well)
  @Column(DataType.UUIDV4)
  wellId: string;

  @Column
  fractionalOverlap: number;
}
