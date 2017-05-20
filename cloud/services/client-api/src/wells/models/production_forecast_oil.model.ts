import { Table, Model, PrimaryKey, Column, ForeignKey } from 'sequelize-typescript';
import { WellFormation } from './well_formation.model';

@Table({
  schema: 'app',
  timestamps: true
})
export class ProductionForecastOil extends Model<ProductionForecastOil> {
  @PrimaryKey
  @ForeignKey(() => WellFormation)
  id_well_formation: number;

  @PrimaryKey
  @Column
  date: Date;

  @Column
  months_on_oil: number;

  @Column
  oil_actuals: number;

  @Column
  oil_forecast: number;

  @Column
  nymex_oil: number;
}
