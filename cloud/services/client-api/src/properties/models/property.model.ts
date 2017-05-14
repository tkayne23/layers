import { Table, Model, PrimaryKey, Column, AutoIncrement, NotEmpty, IsUUID, Min } from "sequelize-typescript";

@Table({
  timestamps: true
})
export class Property extends Model<Property> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  @IsUUID(4)
  ownerId: string; //Cognito UUID

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
}