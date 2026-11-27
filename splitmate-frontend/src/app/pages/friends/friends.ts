
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Friend {
  id: number;
  name: string;
  email: string;
  phone: string;
  initials: string;
  color: string;
  totalShared: number;
  youOwe: number;
  theyOwe: number;
}

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './friends.html',
  styleUrl: './friends.scss'
})
export class Friends {

  searchText = '';
  showAddForm = false;
  successMessage = '';

  newFriend = {
    name: '',
    email: '',
    phone: ''
  };

  friends: Friend[] = [
    {
      id: 1,
      name: 'Rahul Sharma',
      email: 'rahul@gmail.com',
      phone: '9876543210',
      initials: 'RS',
      color: '#e9e2ff',
      totalShared: 4500,
      youOwe: 500,
      theyOwe: 1200
    },
    {
      id: 2,
      name: 'Priya Verma',
      email: 'priya@gmail.com',
      phone: '9876543211',
      initials: 'PV',
      color: '#ffe8ef',
      totalShared: 3200,
      youOwe: 0,
      theyOwe: 800
    },
    {
      id: 3,
      name: 'Aman Singh',
      email: 'aman@gmail.com',
      phone: '9876543212',
      initials: 'AS',
      color: '#dff5ec',
      totalShared: 2100,
      youOwe: 700,
      theyOwe: 0
    },
    {
      id: 4,
      name: 'Sneha Kapoor',
      email: 'sneha@gmail.com',
      phone: '9876543213',
      initials: 'SK',
      color: '#fff0dc',
      totalShared: 1800,
      youOwe: 0,
      theyOwe: 450
    },
    {
      id: 5,
      name: 'Arjun Mehta',
      email: 'arjun@gmail.com',
      phone: '9876543214',
      initials: 'AM',
      color: '#e1edff',
      totalShared: 2900,
      youOwe: 350,
      theyOwe: 0
    }
  ];

  get filteredFriends(): Friend[] {
    const search = this.searchText.toLowerCase().trim();

    if (!search) {
      return this.friends;
    }

    return this.friends.filter(friend =>
      friend.name.toLowerCase().includes(search) ||
      friend.email.toLowerCase().includes(search)
    );
  }

  get totalFriends(): number {
    return this.friends.length;
  }

  get totalYouOwe(): number {
    return this.friends.reduce((sum, friend) => sum + friend.youOwe, 0);
  }

  get totalTheyOwe(): number {
    return this.friends.reduce((sum, friend) => sum + friend.theyOwe, 0);
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.successMessage = '';
  }

  addFriend(): void {
    const name = this.newFriend.name.trim();
    const email = this.newFriend.email.trim();
    const phone = this.newFriend.phone.trim();

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid name and email address.');
      return;
    }

    if (this.friends.some(friend =>
      friend.email.toLowerCase() === email.toLowerCase()
    )) {
      alert('This friend is already in your list.');
      return;
    }

    const initials = name
      .split(' ')
      .filter(part => part.length > 0)
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const colors = ['#e9e2ff', '#ffe8ef', '#dff5ec', '#fff0dc'];

    const friend: Friend = {
      id: Date.now(),
      name,
      email,
      phone,
      initials,
      color: colors[this.friends.length % colors.length],
      totalShared: 0,
      youOwe: 0,
      theyOwe: 0
    };

    this.friends = [friend, ...this.friends];

    this.newFriend = { name: '', email: '', phone: '' };
    this.showAddForm = false;
    this.successMessage = `${name} added to your friends list!`;
  }

  removeFriend(id: number): void {
    const friend = this.friends.find(item => item.id === id);

    if (!friend) return;

    const confirmed = confirm(`Remove ${friend.name} from your friends?`);

    if (confirmed) {
      this.friends = this.friends.filter(item => item.id !== id);
      this.successMessage = `${friend.name} removed successfully.`;
    }
  }
}
