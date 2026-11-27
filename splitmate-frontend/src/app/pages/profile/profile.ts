
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  editing = false;
  successMessage = '';
  activeTab = 'profile';

  profile = {
    name: 'Kajal Bisht',
    email: 'kajal@example.com',
    phone: '9876543210',
    city: 'Dehradun',
    bio: 'Managing shared expenses with SplitMate.',
    currency: 'INR',
    language: 'English'
  };

  password = {
    current: '',
    newPassword: '',
    confirm: ''
  };

  settings = {
    emailNotifications: true,
    paymentReminders: true,
    expenseUpdates: true,
    weeklySummary: false
  };

  constructor(private router: Router) {}

  toggleEdit(): void {
    this.editing = !this.editing;
    this.successMessage = '';
  }

  saveProfile(): void {
    if (!this.profile.name.trim() || !this.profile.email.trim()) {
      alert('Name and email are required.');
      return;
    }

    this.editing = false;
    this.successMessage = 'Profile updated successfully!';
  }

  changePassword(): void {
    if (!this.password.current || !this.password.newPassword) {
      alert('Please fill in all password fields.');
      return;
    }

    if (this.password.newPassword.length < 6) {
      alert('New password must contain at least 6 characters.');
      return;
    }

    if (this.password.newPassword !== this.password.confirm) {
      alert('New password and confirm password do not match.');
      return;
    }

    this.password = {
      current: '',
      newPassword: '',
      confirm: ''
    };

    this.successMessage = 'Password updated successfully!';
  }

  logout(): void {
    const confirmed = confirm('Are you sure you want to logout?');

    if (confirmed) {
      localStorage.removeItem('splitMateUser');
      localStorage.removeItem('splitMateToken');
      this.router.navigate(['/login']);
    }
  }
}
