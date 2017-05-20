import { Table, Model, PrimaryKey, Column, ForeignKey, IsUUID, DataType, BelongsTo } from 'sequelize-typescript';
import { ProducingTract } from './producing_tract.model';

@Table({
  timestamps: true
})
export class DivisionOrder extends Model<DivisionOrder> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @ForeignKey(() => ProducingTract)
  @Column(DataType.UUIDV4)
  producingTractId: string;

  @BelongsTo(() => ProducingTract)
  producingTract: ProducingTract;

  @Column
  document: string;

  @Column
  fractionalOwnership: number;

  @Column
  decimalInterest: number;
}
