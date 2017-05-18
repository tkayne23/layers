import { Table, Model, PrimaryKey, Column, NotEmpty } from 'sequelize-typescript';

@Table({
  schema: 'app',
  timestamps: true
})
export class Well extends Model<Well> {
  @PrimaryKey
  api10: string;

  @Column
  @NotEmpty
  name: string;

  @Column
  @NotEmpty
  operator: string;

  @Column
  @NotEmpty
  field: string;

  @Column
  status: boolean;

  @Column
  spud_date: Date;

  @Column
  lat: number;

  @Column
  lng: number;

  @Column
  geometry: Geometry;
}
