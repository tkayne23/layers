import { Table, Model, PrimaryKey, Column, IsUUID, DataType, HasMany } from 'sequelize-typescript';
import { Section } from './section.model';

@Table({
  timestamps: true
})
export class Township extends Model<Township> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  twn: string;

  @Column
  rng: string;

  @Column
  tdir: string;

  @Column
  rdir: string;

  @Column
  prim_code: string;

  @Column
  geom: any;

  @HasMany(() => Section)
  sections: Section[];
}
