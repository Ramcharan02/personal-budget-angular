import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

interface Dataset {
  data: number[]; // Assuming 'budget' is a number
  backgroundColor: string[];
}

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'] // Corrected property name
})
export class HomepageComponent implements OnInit {

  public dataSource: {
    datasets: Dataset[]; // Use the Dataset interface here
    labels: string[]; // Assuming 'title' is a string
  } = {
    datasets: [{
      data: [],
      backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#FF5733',
          '#28C13E',
          '#283EA6'
      ]
    }],
    labels: []
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        console.log(res);
        for (let i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
        }
        this.createChart(); // Assuming createChart is a method of your component
      });
  }

  createChart() {
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          datasets: this.dataSource.datasets,
          labels: this.dataSource.labels
        }
      });
    } else {
      console.error('Failed to find element with ID "myChart"');
    }
  }
  

}
