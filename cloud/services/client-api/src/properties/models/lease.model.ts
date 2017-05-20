import { Table, Model, PrimaryKey, Column, IsUUID, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Property } from './property.model';
import { ProducingTract } from './producing_tract.model';

@Table({
  timestamps: true
})
export class Lease extends Model<Lease> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @ForeignKey(() => Property)
  @Column(DataType.UUIDV4)
  propertyId: string;

  @Column
  document: string;

  @Column
  royaltyRate: number;

  @BelongsTo(() => Property)
  property: Property;

  @HasMany(() => ProducingTract)
  producingTracts: ProducingTract[];
}
