import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  Highcharts = Highcharts;
  chartOptions = {};

  constructor() {
    this.chartOptions = {
      title: {
        text: 'Admission details 2023',
        align: 'left',
      },
      xAxis: {
        categories: ['LWF', 'CF', 'AMF', 'BCA', 'MCA'],
      },
      yAxis: {
        title: {
          text: 'No.of Students',
        },
      },
      tooltip: {
        valueSuffix: ' No.of Students',
      },
      plotOptions: {
        series: {
          borderRadius: '25%',
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          type: 'column',
          name: '2020',
          data: [59, 83, 65, 228, 184],
        },
        {
          type: 'column',
          name: '2021',
          data: [24, 79, 72, 240, 167],
        },
        {
          type: 'column',
          name: '2022',
          data: [58, 88, 75, 250, 176],
        },
        {
          type: 'spline',
          name: 'Average',
          data: [47, 83, 70, 239, 175],
          marker: {
            lineWidth: 2,
            lineColor: 'red',
            fillColor: 'white',
          },
        },
        {
          type: 'pie',
          name: 'Total',
          data: [
            {
              name: '2020',
              y: 619,
              color: 'orange', // 2020 color
              dataLabels: {
                enabled: true,
                distance: -50,
                format: '{point.total} M',
                style: {
                  fontSize: '15px',
                },
              },
            },
            {
              name: '2021',
              y: 586,
              color: 'blue', // 2021 color
            },
            {
              name: '2022',
              y: 647,
              color: 'green', // 2022 color
            },
          ],
          center: [75, 65],
          size: 100,
          innerSize: '70%',
          showInLegend: false,
          dataLabels: {
            enabled: false,
          },
        },
      ],
    };
    HC_exporting(Highcharts);
  }
}
