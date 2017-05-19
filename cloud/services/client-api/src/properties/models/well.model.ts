import { Table, Model, PrimaryKey, Column, NotEmpty, DataType } from 'sequelize-typescript';

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

  @Column(DataType.GEOMETRY) // Geometry is the __column__ type
  geometry; // I have no idea what type this is
}
