import { Table, Model, PrimaryKey, Column, ForeignKey, IsUUID, DataType, BelongsTo } from 'sequelize-typescript';
import { ProducingTract } from './producing_tract.model';

@Table({
  schema: 'app',
  timestamps: true
})
export class CheckStub extends Model<CheckStub> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  document: string;

  @Column
  nri: string;

  @Column
  amount: number;

  @Column
  tracts: string;

  @ForeignKey(() => ProducingTract)
  @Column(DataType.UUIDV4)
  producingTractId: string;

  @BelongsTo(() => ProducingTract)
  producingTract: ProducingTract;
}
