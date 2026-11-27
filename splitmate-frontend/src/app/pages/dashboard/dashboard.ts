
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  userName = 'Kajal';

  balances = {
    total: 4500,
    owe: 1200,
    owed: 5700,
    groups: 4
  };

  expenses = [
    {
      title: 'Dinner at Cafe Coffee Day',
      category: 'Food & Drinks',
      date: '16 Nov 2026',
      amount: 1500,
      paidBy: 'You',
      icon: '🍕'
    },
    {
      title: 'Weekend Trip',
      category: 'Travel',
      date: '14 Nov 2026',
      amount: 3200,
      paidBy: 'Rahul',
      icon: '🚗'
    },
    {
      title: 'Grocery Shopping',
      category: 'Shopping',
      date: '12 Nov 2026',
      amount: 850,
      paidBy: 'Priya',
      icon: '🛒'
    },
    {
      title: 'Movie Night',
      category: 'Entertainment',
      date: '10 Nov 2026',
      amount: 600,
      paidBy: 'You',
      icon: '🎬'
    }
  ];

  groups = [
    {
      name: 'College Friends',
      members: 5,
      amount: 2400,
      color: '#ede9fe',
      icon: '🎓'
    },
    {
      name: 'Weekend Trip',
      members: 4,
      amount: 1800,
      color: '#dbeafe',
      icon: '🏕️'
    },
    {
      name: 'Flat Expenses',
      members: 3,
      amount: 950,
      color: '#dcfce7',
      icon: '🏠'
    },
    {
      name: 'Office Team',
      members: 6,
      amount: 1250,
      color: '#ffedd5',
      icon: '💼'
    }
  ];

  monthlySpending = [
    { month: 'Jun', amount: 1800, height: 35 },
    { month: 'Jul', amount: 2600, height: 50 },
    { month: 'Aug', amount: 2100, height: 40 },
    { month: 'Sep', amount: 3400, height: 65 },
    { month: 'Oct', amount: 2800, height: 54 },
    { month: 'Nov', amount: 4200, height: 82 }
  ];

  addExpense() {
    alert('Add Expense feature is coming next!');
  }

  createGroup() {
    alert('Create Group feature is coming next!');
  }

  addFriend() {
    alert('Add Friend feature is coming next!');
  }

  logout() {
    alert('Authentication will be connected with the backend later.');
  }
}
