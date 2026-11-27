
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Group {
  id: number;
  name: string;
  description: string;
  members: string[];
  totalExpense: number;
  youOwe: number;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './groups.html',
  styleUrl: './groups.scss'
})
export class Groups {
  searchText = '';
  showAddForm = false;
  successMessage = '';

  newGroup = {
    name: '',
    description: '',
    icon: '🏠'
  };

  groups: Group[] = [
    {
      id: 1,
      name: 'Roommates',
      description: 'Monthly rent, groceries and household expenses',
      members: ['Kajal', 'Rahul', 'Priya'],
      totalExpense: 12500,
      youOwe: 1200,
      color: '#e9e2ff',
      icon: '🏠'
    },
    {
      id: 2,
      name: 'Goa Trip 2026',
      description: 'Our memorable Goa vacation',
      members: ['Kajal', 'Aman', 'Sneha', 'Arjun'],
      totalExpense: 28000,
      youOwe: 2500,
      color: '#dff5ec',
      icon: '🏖️'
    },
    {
      id: 3,
      name: 'Office Lunch',
      description: 'Lunch and coffee expenses',
      members: ['Kajal', 'Rahul', 'Priya', 'Aman'],
      totalExpense: 4500,
      youOwe: 0,
      color: '#fff0dc',
      icon: '🍕'
    }
  ];

  get filteredGroups(): Group[] {
    const search = this.searchText.toLowerCase().trim();

    if (!search) return this.groups;

    return this.groups.filter(group =>
      group.name.toLowerCase().includes(search) ||
      group.description.toLowerCase().includes(search)
    );
  }

  get totalMembers(): number {
    return new Set(this.groups.flatMap(group => group.members)).size;
  }

  get totalExpenses(): number {
    return this.groups.reduce(
      (sum, group) => sum + group.totalExpense, 0
    );
  }

  get totalYouOwe(): number {
    return this.groups.reduce(
      (sum, group) => sum + group.youOwe, 0
    );
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.successMessage = '';
  }

  createGroup(): void {
    const name = this.newGroup.name.trim();

    if (!name) {
      alert('Please enter a group name.');
      return;
    }

    const exists = this.groups.some(
      group => group.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      alert('A group with this name already exists.');
      return;
    }

    const group: Group = {
      id: Date.now(),
      name,
      description: this.newGroup.description.trim() || 'No description added',
      members: ['Kajal'],
      totalExpense: 0,
      youOwe: 0,
      color: '#e1edff',
      icon: this.newGroup.icon
    };

    this.groups = [group, ...this.groups];

    this.newGroup = {
      name: '',
      description: '',
      icon: '🏠'
    };

    this.showAddForm = false;
    this.successMessage = `${name} group created successfully!`;
  }

  deleteGroup(id: number): void {
    const group = this.groups.find(item => item.id === id);

    if (!group) return;

    if (confirm(`Are you sure you want to delete ${group.name}?`)) {
      this.groups = this.groups.filter(item => item.id !== id);
      this.successMessage = `${group.name} group deleted.`;
    }
  }
}
