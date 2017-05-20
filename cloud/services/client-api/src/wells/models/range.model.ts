import { Table, Model, PrimaryKey, Column, IsUUID, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true
})
export class Range extends Model<Range> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  range: string;
}
