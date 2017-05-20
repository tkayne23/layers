import { Table, Model, PrimaryKey, Column, IsUUID, DataType, ForeignKey } from 'sequelize-typescript';
import { Lease } from './lease.model';
import { Property } from './property.model';
import { DivisionOrder } from './division_order.model';
import { DSU } from './dsu.model';

@Table({
  schema: 'app',
  timestamps: true
})
export class ProducingTract extends Model<ProducingTract> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @ForeignKey(() => Lease)
  leaseId: number;

  @ForeignKey(() => Property)
  propertyId: number;

  @ForeignKey(() => DivisionOrder)
  divisionOrderId: number;

  @ForeignKey(() => DSU)
  dsuId: number;
}
