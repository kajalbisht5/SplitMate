
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Expense {
  id: number;
  title: string;
  category: string;
  amount: number;
  paidBy: string;
  group: string;
  date: string;
  icon: string;
}

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss'
})
export class Expenses {
  showForm = false;
  searchText = '';
  selectedCategory = 'All';
  successMessage = '';

  newExpense = {
    title: '',
    category: 'Food',
    amount: 0,
    paidBy: 'Kajal',
    group: 'Roommates',
    date: new Date().toISOString().slice(0, 10)
  };

  categories = [
    'Food',
    'Travel',
    'Shopping',
    'Entertainment',
    'Utilities',
    'Rent',
    'Other'
  ];

  expenses: Expense[] = [
    {
      id: 1,
      title: 'Dinner at restaurant',
      category: 'Food',
      amount: 1200,
      paidBy: 'Kajal',
      group: 'Roommates',
      date: '2026-11-14',
      icon: '🍕'
    },
    {
      id: 2,
      title: 'Cab to airport',
      category: 'Travel',
      amount: 850,
      paidBy: 'Rahul',
      group: 'Goa Trip 2026',
      date: '2026-11-12',
      icon: '🚕'
    },
    {
      id: 3,
      title: 'Monthly groceries',
      category: 'Shopping',
      amount: 2400,
      paidBy: 'Priya',
      group: 'Roommates',
      date: '2026-11-10',
      icon: '🛒'
    },
    {
      id: 4,
      title: 'Movie tickets',
      category: 'Entertainment',
      amount: 900,
      paidBy: 'Aman',
      group: 'Office Lunch',
      date: '2026-11-08',
      icon: '🎬'
    },
    {
      id: 5,
      title: 'Electricity bill',
      category: 'Utilities',
      amount: 1800,
      paidBy: 'Kajal',
      group: 'Roommates',
      date: '2026-11-05',
      icon: '💡'
    }
  ];

  get filteredExpenses(): Expense[] {
    const search = this.searchText.toLowerCase().trim();

    return this.expenses.filter(expense => {
      const matchesSearch =
        expense.title.toLowerCase().includes(search) ||
        expense.paidBy.toLowerCase().includes(search) ||
        expense.group.toLowerCase().includes(search);

      const matchesCategory =
        this.selectedCategory === 'All' ||
        expense.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  get totalExpenses(): number {
    return this.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
  }

  get myExpenses(): number {
    return this.expenses
      .filter(expense => expense.paidBy === 'Kajal')
      .reduce((sum, expense) => sum + expense.amount, 0);
  }

  get averageExpense(): number {
    return this.expenses.length
      ? Math.round(this.totalExpenses / this.expenses.length)
      : 0;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.successMessage = '';
  }

  getIcon(category: string): string {
    const icons: Record<string, string> = {
      Food: '🍕',
      Travel: '🚕',
      Shopping: '🛒',
      Entertainment: '🎬',
      Utilities: '💡',
      Rent: '🏠',
      Other: '💳'
    };

    return icons[category] || '💳';
  }

  addExpense(): void {
    const title = this.newExpense.title.trim();
    const amount = Number(this.newExpense.amount);

    if (!title || !Number.isFinite(amount) || amount <= 0) {
      alert('Please enter a valid expense title and amount.');
      return;
    }

    if (!this.newExpense.date) {
      alert('Please select an expense date.');
      return;
    }

    const expense: Expense = {
      id: Date.now(),
      title,
      category: this.newExpense.category,
      amount,
      paidBy: this.newExpense.paidBy,
      group: this.newExpense.group,
      date: this.newExpense.date,
      icon: this.getIcon(this.newExpense.category)
    };

    this.expenses = [expense, ...this.expenses];

    this.newExpense = {
      title: '',
      category: 'Food',
      amount: 0,
      paidBy: 'Kajal',
      group: 'Roommates',
      date: new Date().toISOString().slice(0, 10)
    };

    this.showForm = false;
    this.successMessage = 'Expense added successfully!';
  }

  deleteExpense(id: number): void {
    const expense = this.expenses.find(item => item.id === id);

    if (!expense) return;

    if (confirm(`Delete "${expense.title}"?`)) {
      this.expenses = this.expenses.filter(item => item.id !== id);
      this.successMessage = 'Expense deleted successfully!';
    }
  }
}
