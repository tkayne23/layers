import { Table, Model, PrimaryKey, Column, ForeignKey, IsUUID, DataType } from 'sequelize-typescript';
import { Well } from './well.model';

@Table
export class DSU extends Model<DSU> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  legal_description: string;

  @Column
  polygon: string;

  @ForeignKey(() => Well)
  api10_Well: number;
}
