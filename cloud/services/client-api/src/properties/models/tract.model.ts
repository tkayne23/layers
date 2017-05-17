import { Table, Model, PrimaryKey, Column, AutoIncrement, NotEmpty } from "sequelize-typescript";

@Table
export class Tract extends Model<Tract> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  @NotEmpty
  legalDescription: string;
}