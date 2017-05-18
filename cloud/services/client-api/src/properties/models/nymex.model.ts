import { Table, Model, PrimaryKey, Column } from 'sequelize-typescript';

@Table
export class Nymex extends Model<Nymex> {
  @PrimaryKey
  @Column
  date: Date;

  @Column
  oil: string;

  @Column
  gas: string;
}
