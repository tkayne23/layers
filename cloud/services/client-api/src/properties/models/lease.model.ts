import {Table, Model, PrimaryKey, Column, AutoIncrement} from "sequelize-typescript";

@Table
export class Lease extends Model<Lease> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;
}