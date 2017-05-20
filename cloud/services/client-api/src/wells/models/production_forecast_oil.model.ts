import { Table, Model, PrimaryKey, Column, ForeignKey, DataType } from 'sequelize-typescript';
import { WellFormation } from './well_formation.model';

@Table({
  timestamps: true
})
export class ProductionForecastOil extends Model<ProductionForecastOil> {
  @PrimaryKey
  @ForeignKey(() => WellFormation)
  @Column(DataType.UUIDV4)
  id_well_formation: string;

  @PrimaryKey
  @Column
  date: Date;

  @Column
  months_on_oil: number;

  @Column
  oil_actuals: number;

  @Column
  oil_forecast: number;
}
