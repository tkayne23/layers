import {Table, Model, PrimaryKey, Column, AutoIncrement} from "sequelize-typescript";

@Table
export class Tract extends Model<Tract> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;
}