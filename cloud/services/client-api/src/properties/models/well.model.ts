import { Table, Model, PrimaryKey, Column } from 'sequelize-typescript';

@Table({
  schema: 'app',
  timestamps: true
})
export class Well extends Model<Well> {
  @PrimaryKey

  @Column
  name: string;

  @Column
  operator: string;

  @Column
  field: string;

  @Column
  status: boolean;

  @Column
  spud_date: date;

  
}
