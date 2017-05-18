import { Table, Model, PrimaryKey, Column, NotEmpty, IsUUID, Min, DataType, ForeignKey } from 'sequelize-typescript';
import { Deed } from './deed.model';

@Table({
  schema: 'app',
  timestamps: true
})
export class Property extends Model<Property> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  @IsUUID(4)
  ownerId: string; // Cognito UUID

  @Column
  @NotEmpty
  name: string;

  @Column
  @NotEmpty
  legalDescription: string;

  @Column
  @Min(0)
  netAcreage: number;

  @Column
  @Min(0)
  grossAcreage: number;

  @Column
  fractional_ownership: number;

  @Column
  appraisal: number;

  @ForeignKey(() => Deed)
  deedId: number;
}
