import { Table, Model, PrimaryKey, Column, ForeignKey, IsUUID, DataType } from 'sequelize-typescript';
import { ProducingTract } from './producing_tract.model';

@Table
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
  producingTractId: number;
}
