import { Table, Model, Column, PrimaryKey, ForeignKey, IsUUID, DataType  } from 'sequelize-typescript';
import { Well } from './well.model';

@Table({
  schema: 'app',
  timestamps: true
})

export class WellFormation extends Model<WellFormation> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @ForeignKey(() => Well)
  id_well: number;

  @PrimaryKey
  @Column
  api12: string;

  @Column
  ip_date_oil: Date;

  @Column
  ip_date_gas: Date;
}
