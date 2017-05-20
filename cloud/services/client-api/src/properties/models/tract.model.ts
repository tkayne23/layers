import { Table, Model, PrimaryKey, Column, AutoIncrement, NotEmpty } from 'sequelize-typescript';

@Table({
  schema: 'app',
  timestamps: true
})
export class ProducingTract extends Model<ProducingTract> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  @NotEmpty
  legalDescription: string;
}
