import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../data.services';
import * as d3 from 'd3';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
  @ViewChild('myChart') chartContainer!: ElementRef;
  private svg: any;
  private radius: number | undefined;
  private arc: any;
  private pie: any;
  dataSource: any;

  constructor(private dataService: DataService) {}

  ngAfterViewInit(): void {
    this.dataSource = this.dataService.dataSource;
    this.createChart();
    
    console.log(this.dataSource)
  }

  private createChart(): void {
    this.radius = Math.min(this.chartContainer.nativeElement.offsetWidth, this.chartContainer.nativeElement.offsetHeight) / 2;

    this.svg = d3.select('#myChart')
      .append('svg')
      .attr('width', this.chartContainer.nativeElement.offsetWidth)
      .attr('height', this.chartContainer.nativeElement.offsetHeight)
      .append('g')
      .attr('transform', 'translate(' + this.chartContainer.nativeElement.offsetWidth / 2 + ',' +
        this.chartContainer.nativeElement.offsetHeight / 2 + ')');

    this.arc = d3.arc()
      .innerRadius(this.radius * 0.4)
      .outerRadius(this.radius * 0.8);

    this.pie = d3.pie()
      .sort(null)
      .value((d: any) => d.value);
      this.draw();
  }

  private draw(): void {
    const color = d3.scaleOrdinal()
      .domain(this.dataSource.labels)
      .range(["#ffcd56", "#ff6384", "#36a2eb", "#fd6b19", "#ff1a1a", "#00ff00", "#0000ff"]);

    const dataReady = this.pie(this.getData());

    this.svg.selectAll('pieces')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', this.arc)
      .attr('fill', (d: any) => color(d.data.label))
      .attr('stroke', 'white')
      .style('stroke-width', '2.5px')
      .style('opacity', 1);

    this.svg.selectAll('labels')
      .data(dataReady)
      .enter()
      .append('text')
      .text((d: any) => d.data.label)
      .attr('transform', (d: any) => 'translate(' + this.arc.centroid(d) + ')')
      .style('text-anchor', 'middle');
  }

  private getData(): any[] {
    const arr: any[] = [];
    const labels = this.dataSource.labels;
    for (let i = 0; i < this.dataSource.datasets[0].data.length; i++) {
      arr.push({
        label: labels[i],
        value: this.dataSource.datasets[0].data[i],
      });
    }
    return arr;
  }
}
