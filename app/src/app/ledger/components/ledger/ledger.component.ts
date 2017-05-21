import { MOCK_LEDGERS } from './../../shared/ledger.mock';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { Creators, Actions } from './../../store/ledger-actions';
import { Store } from '@ngrx/store';
import { CoreState } from 'app/core/store';
import { Component, OnInit } from '@angular/core';

const getStats = ledger => {
  const count = ledger.length;
  let totalValue;
  let totalAcres;
  let avgValue;
  let avgAcres;
  let typeCurve;
  let history;

  if (count > 0) {
    totalValue = ledger.reduce((acc, asset) => acc + asset.appraisal, 0);
    totalAcres = ledger.reduce((acc, asset) => acc + asset.netAcreage, 0);
    avgValue = totalValue / count;
    avgAcres = totalAcres / count;
    typeCurve = ledger[0].typeCurve;
    history = ledger[0].appraisalHistory;
  } else {
    totalValue = 0;
    totalAcres = 0;
    avgValue = 0;
    avgAcres = 0;
    typeCurve = [];
    history = [];
  }

  typeCurve.forEach((point, i) => this.lineChartLabels.push(i));

  return {
    count,
    totalValue,
    totalAcres,
    avgValue,
    avgAcres,
    graphData: [
      this.makeSeries('Type Curve', typeCurve),
      this.makeSeries('Historic Value', history)
    ]
  };
};

@Component({
  selector: 'lys-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {
  createModalOpen: boolean;
  workbookModalOpen: boolean;
  ledger$: Observable<any[]>;
  stats$: Observable<any>;
  userName$: Observable<string>;
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartLabels: string[] = [];
  public lineChartOptions: any = {
    responsive: true,
    legend: {
      labels: {
        fontColor: '#ccc'
      },
    },
    scales: {
            yAxes: [{
                display: false
            }],
            xAxes: [{
                display: false
            }]
    }
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(88,99,217,0.2)',
      borderColor: 'rgba(88,99,217,1)',
      pointBackgroundColor: 'rgba(88,99,217,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(88,99,217,0.8)'
    },
  ];

  constructor(private store: Store<CoreState>) {
    this.ledger$ = store.select('ledger').map(state => {
      // const list = [];
      // for (const key in ledger){
      //   if (ledger.hasOwnProperty(key)){
      //     list.push(ledger[key]);
      //   }
      // }
      return MOCK_LEDGERS();
    });
    this.userName$ = store.select('auth', 'user').map((user: CognitoUser) => user.getUsername());
    this.stats$ = this.ledger$.map(getStats);
  }

  ngOnInit() {
    this.store.dispatch({ type: Actions.LEDGER_FETCH });
  }

  makeSeries(title, data) {
    return {data: data.map(point => point.value), label: title};
  }

  onSelect(id: string) {
    this.store.dispatch(go(['ledger', id]));
  }

}
