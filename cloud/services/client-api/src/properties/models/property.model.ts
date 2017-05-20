import { Table, Model, PrimaryKey, Column, NotEmpty, IsUUID, Min, DataType, HasOne, BelongsToMany } from 'sequelize-typescript';
import { Deed } from './deed.model';
import { Section } from '../../wells/models/section.model';
import { SectionsInProperty } from './sections_in_property.model';
import { Well } from '../../wells/models/well.model';
import { WellProperty } from '../../wells/models/well_property.model';

@Table({
  timestamps: true
})
export class Property extends Model<Property> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column(DataType.UUIDV4)
  // @IsUUID(4)  // is this needed?
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
  fractionalOwnership: number;

  @Column
  appraisal: number;

  @HasOne(() => Deed)
  deed: Deed;

  @BelongsToMany(() => Section, () => SectionsInProperty)
  sections: Section[];

  @BelongsToMany(() => Well, () => WellProperty)
  wells: Well[];
}
