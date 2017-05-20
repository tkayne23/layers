import { Table, Model, PrimaryKey, Column, ForeignKey, IsUUID, DataType } from 'sequelize-typescript';
import { Range } from './range.model';

@Table({
  schema: 'app',
  timestamps: true
})
export class Township extends Model<Township> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  township: string;

  @ForeignKey(() => Range)
  id_range: number;
}
