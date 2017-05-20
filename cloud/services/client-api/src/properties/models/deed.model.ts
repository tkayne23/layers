import { Table, Model, PrimaryKey, Column, IsUUID, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Property } from './property.model';

@Table({
  schema: 'app',
  timestamps: true
})
export class Deed extends Model<Deed> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  document: string;

  @Column
  fractionalOwnership: number;

  @Column
  legalDescription: string;

  @Column
  grossAcreage: number;

  @ForeignKey(() => Property)
  @Column(DataType.UUIDV4)
  peopertyId: string;

  @BelongsTo(() => Property)
  property: Property;
}
