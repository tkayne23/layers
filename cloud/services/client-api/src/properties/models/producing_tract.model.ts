import { Table, Model, PrimaryKey, Column, IsUUID, DataType, ForeignKey, HasOne, HasMany, BelongsTo } from 'sequelize-typescript';
import { Lease } from './lease.model';
import { Property } from './property.model';
import { DivisionOrder } from './division_order.model';
import { DSU } from './dsu.model';
import { CheckStub } from './check_stub.model';

@Table({
  timestamps: true
})
export class ProducingTract extends Model<ProducingTract> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @ForeignKey(() => Lease)
  @Column(DataType.UUIDV4)
  leaseId: string;

  @ForeignKey(() => Property)
  @Column(DataType.UUIDV4)
  propertyId: string;

  @ForeignKey(() => DSU)
  @Column(DataType.UUIDV4)
  dsuId: string;

  @HasOne(() => DivisionOrder)
  divisionOrder: DivisionOrder;

  @HasMany(() => CheckStub)
  checkStubs: CheckStub[];

  @BelongsTo(() => DSU)
  dsu: DSU;

  @BelongsTo(() => Property)
  property: Property;

  @BelongsTo(() => Lease)
  lease: Lease;
}
