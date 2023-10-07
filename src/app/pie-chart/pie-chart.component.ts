import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  Highcharts = Highcharts;
  chartOptions = {};

  constructor() {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Seats enrolled in 2023',
        align: 'left',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: 'Enrolled',
          colorByPoint: true,
          data: [
            {
              name: 'BCA',
              y: 40,
              color: 'rgb(0,226,114)',
            },
            {
              name: 'MCA',
              y: 29,
              color: 'rgb(84,79,197)',
            },
            {
              name: 'AMF',
              y: 8,
              color: 'green',
            },
            {
              name: 'CF',
              y: 15,
              color: 'rgb(44,175,254)',
            },
            {
              name: 'LWF',
              y: 8,
              color: 'teal',
            },
          ],
        },
      ],
    };
    HC_exporting(Highcharts);
  }
}
