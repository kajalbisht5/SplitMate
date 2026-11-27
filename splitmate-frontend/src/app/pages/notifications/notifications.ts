import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
  icon: string;
  read: boolean;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss'
})
export class Notifications {

  activeFilter = 'All';

  notifications: Notification[] = [
    {
      id: 1,
      title: 'Payment received',
      message: 'Aman Gupta paid you ₹1,250 for Office Lunch.',
      time: '10 minutes ago',
      type: 'payment',
      icon: '₹',
      read: false
    },
    {
      id: 2,
      title: 'New expense added',
      message: 'Rahul added Hotel Booking of ₹3,500 in Goa Trip 2026.',
      time: '1 hour ago',
      type: 'expense',
      icon: '↗',
      read: false
    },
    {
      id: 3,
      title: 'Settlement reminder',
      message: 'You owe Priya Verma ₹350. Settle your balance.',
      time: '3 hours ago',
      type: 'reminder',
      icon: '⏰',
      read: false
    },
    {
      id: 4,
      title: 'Group invitation',
      message: 'Neha invited you to join Weekend Getaway.',
      time: 'Yesterday',
      type: 'group',
      icon: '♧',
      read: true
    },
    {
      id: 5,
      title: 'Expense updated',
      message: 'Priya updated the grocery expense in Roommates.',
      time: 'Yesterday',
      type: 'expense',
      icon: '↗',
      read: true
    },
    {
      id: 6,
      title: 'Payment reminder',
      message: 'Rahul Sharma reminded you about your pending payment.',
      time: '2 days ago',
      type: 'reminder',
      icon: '⏰',
      read: true
    }
  ];

  get filteredNotifications(): Notification[] {
    if (this.activeFilter === 'Unread') {
      return this.notifications.filter(n => !n.read);
    }

    if (this.activeFilter === 'Read') {
      return this.notifications.filter(n => n.read);
    }

    return this.notifications;
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  get readCount(): number {
    return this.notifications.filter(n => n.read).length;
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  markAsRead(notification: Notification): void {
    notification.read = true;
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
  }

  deleteNotification(id: number): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  clearAll(): void {
    this.notifications = [];
  }
}