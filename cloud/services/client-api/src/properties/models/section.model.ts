import { Table, Model, PrimaryKey, Column, IsUUID, DataType, NotEmpty } from 'sequelize-typescript';

@Table({
  schema: 'app',
  timestamps: true
})
export class Section extends Model<Section> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  @NotEmpty
  first_div_id: string;

  @Column
  @NotEmpty
  TWNSHP: string;

  @Column
  @NotEmpty
  RNGDIR: string;

  @Column
  @NotEmpty
  SECTION: string;

  @Column
  @NotEmpty
  county: string;
}
