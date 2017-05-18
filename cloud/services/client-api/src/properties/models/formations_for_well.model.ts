import { Table, Model, Column, PrimaryKey, ForeignKey  } from 'sequelize-typescript';
import { Well } from './well.model';

@Table
export class FormationsForWell extends Model<FormationsForWell> {
  @PrimaryKey
  @Column
  @ForeignKey(() => Well)
  api10: number;

  @PrimaryKey
  @Column
  formation: string;

  @PrimaryKey
  @Column
  api12: string;

  @Column
  ip_date_oil: Date;

  @Column
  ip_date_gas: Date;
}
