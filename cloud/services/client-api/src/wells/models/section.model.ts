import { Table, Model, PrimaryKey, Column, IsUUID, DataType, ForeignKey } from 'sequelize-typescript';
import { Township } from './township.model';

@Table({
  schema: 'app',
  timestamps: true
})
export class Section extends Model<Section> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  section: number;

  @ForeignKey(() => Township)
  id_township: number;
}
