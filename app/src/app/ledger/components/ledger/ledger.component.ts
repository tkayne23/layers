import { CognitoUser } from 'amazon-cognito-identity-js';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { Creators, Actions } from './../../store/ledger-actions';
import { Store } from '@ngrx/store';
import { CoreState } from 'app/core/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lys-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {
  ledger$: Observable<any[]>;
  stats$: Observable<any>;
  userName$: Observable<string>;
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartOptions: any = {
    responsive: true
  };

  constructor(private store: Store<CoreState>) {
    this.ledger$ = store.select('ledger').map(ledger => {
      const list = [];
      for (const key in ledger){
        if (ledger.hasOwnProperty(key)){
          list.push(ledger[key]);
        }
      }
      return list;
    });
    this.userName$ = store.select('auth', 'user').map((user: CognitoUser) => user.getUsername());
    this.stats$ = this.ledger$.map(ledger => {
      const count = ledger.length;
      let totalValue;
      let totalAcres;
      let avgValue;
      let avgAcres;
      let typeCurve;
      let history;

      if (count > 0) {
        totalValue = ledger.reduce((acc, asset) => acc + asset.appraisal, 0);
        totalAcres = ledger.reduce((acc, asset) => acc + asset.netAcres, 0);
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
    });
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
