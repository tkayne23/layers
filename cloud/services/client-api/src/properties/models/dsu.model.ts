import { Table, Model, PrimaryKey, Column, ForeignKey, IsUUID, DataType, HasMany } from 'sequelize-typescript';
import { Well } from '../../wells/models/well.model';

@Table({
  timestamps: true
})
export class DSU extends Model<DSU> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  legalDescription: string;

  @Column
  polygon: string;

  @HasMany(() => Well)
  wells: Well[];
}
