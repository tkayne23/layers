import { Table, Model, PrimaryKey, Column, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Property } from './property.model';

@Table({
  schema: 'app',
  timestamps: true
})
export class Lease extends Model<Lease> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Property)
  propertyId: number;

  @BelongsTo(() => Property)
  property: Property;
}
