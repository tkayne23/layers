import { Table, Model, PrimaryKey, Column, ForeignKey, DataType } from 'sequelize-typescript';
import { WellFormation } from './well_formation.model';

@Table({
  timestamps: true
})

export class ProductionActual extends Model<ProductionActual> {
  @PrimaryKey
  @Column
  date: Date;

  @PrimaryKey
  @ForeignKey(() => WellFormation)
  @Column(DataType.UUIDV4)
  id_well_formation: number;

  @Column
  oil_actuals: number;

  @Column
  gas_actuals: number;
}
