import { Table, Model, PrimaryKey, Column, ForeignKey, IsUUID, DataType } from 'sequelize-typescript';
import { WellFormation } from './well_formation.model';

@Table({
  schema: 'app',
  timestamps: true
})
export class ProductionForecastGas extends Model<ProductionForecastGas> {
  @PrimaryKey
  @ForeignKey(() => WellFormation)
  well_formation_id: number;

  @PrimaryKey
  @Column
  date: Date;

  @Column
  months_on_gas: number;

  @Column
  gas_actuals: number;

  @Column
  gas_forecast: number;

  @Column
  nymex_gas: number;
}
