import { Table, Model, PrimaryKey, Column, IsUUID, DataType } from 'sequelize-typescript';

@Table({
  schema: 'app',
  timestamps: true
})
export class Well extends Model<Well> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  api10: string;

  @Column
  well_name: string;

  @Column
  operator: string;

  @Column
  field: string;

  @Column
  status: string;

  @Column
  spud_date: Date;

  @Column
  lat: number;

  @Column
  lng: number;

  @Column(DataType.GEOMETRY) // Geometry is the __column__ type
  geometry: any; // I have no idea what type this is
}
