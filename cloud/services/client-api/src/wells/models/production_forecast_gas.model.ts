import { Table, Model, PrimaryKey, Column, ForeignKey, IsUUID, DataType } from 'sequelize-typescript';
import { WellFormation } from './well_formation.model';

@Table({
  timestamps: true
})
export class ProductionForecastGas extends Model<ProductionForecastGas> {
  @PrimaryKey
  @ForeignKey(() => WellFormation)
  @Column(DataType.UUIDV4)
  id_well_formation: string;

  @PrimaryKey
  @Column
  date: Date;

  @Column
  months_on_gas: number;

  @Column
  gas_actuals: number;

  @Column
  gas_forecast: number;
}
