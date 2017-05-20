const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const MOCK_LEDGERS = [
  {
    id: '2c9fcfb3-5e8d-4893-b90c-9ea18c39882a',
    appraisal: 1500,
    netAcreage: 213,
    grossAcreage: 640,
    legalDesc: 'T6N R66E 36 NESE',
    fractionalOwnership: 1 / 3,
    survey: {},
    deed: {
      document: '',
      legalDesc: 'T6N R66E 36 NESE'
    },
    leases: [
      {
        name: 'Whiting',
        legalDesc: 'T6N R66E 36 NESE',
        document: '',
        royalty_rate: 0.16,
      }
    ],
    producingTracts: [
      {
        divisionOrder: {
          document: '',
          decimalInterest: 0.16,
          fractionalOwnership: 1 / 3,
        },
        checkstubs: []
      }
    ],
    typeCurve: [
      { date: randomDate(new Date(2017, 0, 1), new Date()), value: 1300 },
      { date: randomDate(new Date(2017, 0, 1), new Date()), value: 1350 },
      { date: randomDate(new Date(2017, 0, 1), new Date()), value: 1400 },
      { date: randomDate(new Date(2017, 0, 1), new Date()), value: 1450 },
      { date: randomDate(new Date(2017, 0, 1), new Date()), value: 1500 },
      { date: randomDate(new Date(2017, 0, 1), new Date()), value: 1550 },
      { date: randomDate(new Date(2017, 0, 1), new Date()), value: 1600 },
    ],
    appraisalHistory: [
      { date: randomDate(new Date(2017, 0, 1), new Date()), value: 1300 },
      { date: randomDate(new Date(2017, 0, 1), new Date()), value: 1350 },
      { date: randomDate(new Date(2017, 0, 1), new Date()), value: 1400 },
      { date: randomDate(new Date(2017, 0, 1), new Date()), value: 1450 },
      { date: randomDate(new Date(2017, 0, 1), new Date()), value: 1500 },
      { date: randomDate(new Date(2017, 0, 1), new Date()), value: 1550 },
      { date: randomDate(new Date(2017, 0, 1), new Date()), value: 1600 },
    ]
  }
];

export const MOCK_NEW_LEDGER = {
  id: '8257680d-f493-4ca3-9d05-97110463416c'
};