import { Table, Model, Column, PrimaryKey, ForeignKey, IsUUID, DataType, BelongsTo  } from 'sequelize-typescript';
import { Well } from './well.model';

@Table({
  timestamps: true
})

export class WellFormation extends Model<WellFormation> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @ForeignKey(() => Well)
  @Column(DataType.UUIDV4)
  id_well: string;

  @BelongsTo(() => Well)
  well: Well;

  @Column
  api12: string;

  @Column
  ip_date_oil: Date;

  @Column
  ip_date_gas: Date;
}
