import { Table, Model, PrimaryKey, Column, IsUUID, DataType, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { Township } from './township.model';
import { Property } from '../../properties/models/property.model';
import { SectionsInProperty } from '../../properties/models/sections_in_property.model';

@Table({
  timestamps: true
})
export class Section extends Model<Section> {
  @PrimaryKey
  @IsUUID(4)
  @Column(DataType.UUIDV4)
  id: string;

  @Column
  sec: string;

  @Column
  cnty_name: string;

  @Column
  

  @ForeignKey(() => Township)
  @Column(DataType.UUIDV4)
  id_township: string;

  @BelongsTo(() => Township)
  township: Township

  @BelongsToMany(() => Property, () => SectionsInProperty)
  properties: Property[];
}
