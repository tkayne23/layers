import { Table, Model, PrimaryKey, Column, ForeignKey } from 'sequelize-typescript';
import { FormationsForWell } from './formations_for_well.model';

@Table
export class Production extends Model<Production> {
  @PrimaryKey
  @Column
  date: Date;

  @PrimaryKey
  @Column
  @ForeignKey(() => FormationsForWell)
  api12: string;

  @Column
  month_num: number;

  @Column
  oil_actuals: string;

  @Column
  oil_forecast: string;

  @Column
  gas_actuals: string;

  @Column
  gas_forecast: string;

  @Column
  nymex_oil: string;

  @Column
  nymex_gas: string;
}
