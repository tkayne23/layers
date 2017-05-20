import { Table, Model, PrimaryKey, Column, ForeignKey } from 'sequelize-typescript';
import { WellFormation } from './well_formation.model';

@Table({
  schema: 'app',
  timestamps: true
})

export class ProductionActual extends Model<ProductionActual> {
  @PrimaryKey
  @Column
  date: Date;

  @PrimaryKey
  @Column
  @ForeignKey(() => WellFormation)
  id_well_formation: number;

  @Column
  oil_actuals: number;

  @Column
  gas_actuals: number;
}
