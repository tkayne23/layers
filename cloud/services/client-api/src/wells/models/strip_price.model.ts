import { Table, Model, PrimaryKey, Column } from 'sequelize-typescript';

@Table({
  schema: 'app',
  timestamps: true
})
export class StripPrice extends Model<StripPrice> {
  @PrimaryKey
  @Column
  date: Date;

  @Column
  nymex_oil: number;

  @Column
  nymex_gas: number;
}
