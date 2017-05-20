import { Table, Model, ForeignKey } from 'sequelize-typescript';
import { Well } from './well.model';
import { Section } from './section.model';

@Table({
  schema: 'app',
  timestamps: true
})
export class WellSection extends Model<WellSection> {

  @ForeignKey(() => Well)
  id_well: number;

  @ForeignKey(() => Section)
  id_section: number;
}
