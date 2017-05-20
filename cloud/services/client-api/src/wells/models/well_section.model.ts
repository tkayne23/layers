import { Table, Model, ForeignKey, PrimaryKey, DataType, Column } from 'sequelize-typescript';
import { Well } from './well.model';
import { Section } from './section.model';

@Table({
  timestamps: true
})
export class WellSection extends Model<WellSection> {
  @PrimaryKey
  @ForeignKey(() => Well)
  @Column(DataType.UUIDV4)
  id_well: string;

  @PrimaryKey
  @ForeignKey(() => Section)
  @Column(DataType.UUIDV4)
  id_section: string;
}
