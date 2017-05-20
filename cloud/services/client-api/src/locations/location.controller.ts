import { Promise } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Section } from '../wells/models/section.model';
import { Township } from '../wells/models/township.model';

const legalExtractor = /(T|Township)?\s(?:\d+[NS])\s(R|Range)?\s(?:\d+[WE])\s(S|Section)?\s(?:\d+)\s(?:([NS][EW])+)/;

function getLegalSelector(descriptor: string) {
  const [T, R, S, QQ] = legalExtractor.exec(descriptor);
  return {
    T, R, S, QQ
  };
}

export class LocationController {
  constructor(private db: Sequelize, private collection: typeof Section) {}

  getSectionsFromLegal(legalDesc: string): Promise<Section[]> {
    let description = getLegalSelector(legalDesc);

    return this.collection.findAll<Section>({
      where: { sec: description.S },
      include: [{
        model: Township,
        where: { twn: description.T, rng: description.R }
      }]
    });
  }
}
