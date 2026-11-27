import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Chart,
  registerables
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reports.html',
  styleUrl: './reports.scss'
})
export class Reports implements AfterViewInit, OnDestroy {

  monthlyChart?: Chart;
  categoryChart?: Chart;

  totalSpending = 12450;
  averageDaily = 415;
  highestCategory = 'Food & Dining';
  totalTransactions = 28;

  categories = [
    { name: 'Food & Dining', amount: 4500, percentage: 36, color: '#6654e8' },
    { name: 'Travel', amount: 3200, percentage: 26, color: '#28bd83' },
    { name: 'Shopping', amount: 2100, percentage: 17, color: '#f3a34b' },
    { name: 'Entertainment', amount: 1500, percentage: 12, color: '#ed6a85' },
    { name: 'Others', amount: 1150, percentage: 9, color: '#58a6d9' }
  ];

  monthlyData = [
    { month: 'Jun', amount: 8500 },
    { month: 'Jul', amount: 10500 },
    { month: 'Aug', amount: 9200 },
    { month: 'Sep', amount: 11800 },
    { month: 'Oct', amount: 9800 },
    { month: 'Nov', amount: 12450 }
  ];

  ngAfterViewInit(): void {
    this.createMonthlyChart();
    this.createCategoryChart();
  }

  createMonthlyChart(): void {
    const canvas = document.getElementById('monthlyChart') as HTMLCanvasElement;

    if (!canvas) return;

    this.monthlyChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.monthlyData.map(item => item.month),
        datasets: [{
          label: 'Monthly Spending',
          data: this.monthlyData.map(item => item.amount),
          backgroundColor: '#6654e8',
          borderRadius: 7,
          barThickness: 30
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => '₹' + value
            }
          }
        }
      }
    });
  }

  createCategoryChart(): void {
    const canvas = document.getElementById('categoryChart') as HTMLCanvasElement;

    if (!canvas) return;

    this.categoryChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: this.categories.map(item => item.name),
        datasets: [{
          data: this.categories.map(item => item.amount),
          backgroundColor: this.categories.map(item => item.color),
          borderWidth: 0,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        cutout: '65%'
      }
    });
  }

  ngOnDestroy(): void {
    this.monthlyChart?.destroy();
    this.categoryChart?.destroy();
  }
}