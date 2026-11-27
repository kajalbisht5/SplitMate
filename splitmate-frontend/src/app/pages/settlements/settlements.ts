
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Settlement {
  id: number;
  person: string;
  initials: string;
  group: string;
  amount: number;
  date: string;
  direction: 'owe' | 'owed';
  status: 'Pending' | 'Settled';
  method: string;
}

@Component({
  selector: 'app-settlements',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './settlements.html',
  styleUrl: './settlements.scss'
})
export class Settlements {
  searchText = '';
  selectedStatus = 'All';
  successMessage = '';

  settlements: Settlement[] = [
    {
      id: 1,
      person: 'Rahul Sharma',
      initials: 'RS',
      group: 'Goa Trip 2026',
      amount: 700,
      date: '2026-11-14',
      direction: 'owe',
      status: 'Pending',
      method: 'UPI'
    },
    {
      id: 2,
      person: 'Priya Verma',
      initials: 'PV',
      group: 'Roommates',
      amount: 350,
      date: '2026-11-13',
      direction: 'owe',
      status: 'Pending',
      method: 'UPI'
    },
    {
      id: 3,
      person: 'Aman Gupta',
      initials: 'AG',
      group: 'Office Lunch',
      amount: 1250,
      date: '2026-11-12',
      direction: 'owed',
      status: 'Pending',
      method: 'UPI'
    },
    {
      id: 4,
      person: 'Neha Singh',
      initials: 'NS',
      group: 'Roommates',
      amount: 500,
      date: '2026-11-08',
      direction: 'owed',
      status: 'Settled',
      method: 'Cash'
    },
    {
      id: 5,
      person: 'Rahul Sharma',
      initials: 'RS',
      group: 'Goa Trip 2026',
      amount: 300,
      date: '2026-11-05',
      direction: 'owe',
      status: 'Settled',
      method: 'UPI'
    }
  ];

  get totalYouOwe(): number {
    return this.settlements
      .filter(item => item.direction === 'owe' && item.status === 'Pending')
      .reduce((sum, item) => sum + item.amount, 0);
  }

  get totalOwedToYou(): number {
    return this.settlements
      .filter(item => item.direction === 'owed' && item.status === 'Pending')
      .reduce((sum, item) => sum + item.amount, 0);
  }

  get totalSettled(): number {
    return this.settlements
      .filter(item => item.status === 'Settled')
      .reduce((sum, item) => sum + item.amount, 0);
  }

  get pendingCount(): number {
    return this.settlements.filter(
      item => item.status === 'Pending'
    ).length;
  }

  get filteredSettlements(): Settlement[] {
    const search = this.searchText.toLowerCase().trim();

    return this.settlements.filter(item => {
      const matchesSearch =
        item.person.toLowerCase().includes(search) ||
        item.group.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        item.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  markAsSettled(id: number): void {
    const settlement = this.settlements.find(item => item.id === id);

    if (!settlement || settlement.status === 'Settled') {
      return;
    }

    if (settlement.direction === 'owed') {
      alert('This person owes you money. You cannot mark it as paid by you.');
      return;
    }

    const confirmed = confirm(
      `Mark ₹${settlement.amount} paid to ${settlement.person}?`
    );

    if (!confirmed) return;

    settlement.status = 'Settled';
    this.successMessage = `Payment of ₹${settlement.amount} to ${settlement.person} marked as settled!`;
  }

  remindPerson(person: string, amount: number): void {
    alert(`Reminder for ${person}: ₹${amount} is pending. Reminder feature will be connected with notifications later.`);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}
