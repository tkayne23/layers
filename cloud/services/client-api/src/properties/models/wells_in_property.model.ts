import { Table, Model, PrimaryKey, Column, IsUUID, DataType, ForeignKey } from 'sequelize-typescript';
import { Property } from './property.model';
import { Well } from './well.model';

@Table
export class WellsInProperty extends Model<WellsInProperty> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @ForeignKey(() => Property)
  propertyId: number;

  @ForeignKey(() => Well)
  wellId: number;
}
