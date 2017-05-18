import { Table, Model, PrimaryKey, Column, ForeignKey, IsUUID, DataType } from 'sequelize-typescript';
import { Well } from './well.model';
import { Section } from './section.model';

@Table
export class WellsInSection extends Model<WellsInSection> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @ForeignKey(() => Well)
  sectionId: number;

  @ForeignKey(() => Section)
  api10: number;
}
