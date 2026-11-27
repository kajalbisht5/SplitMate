import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Message {
  id: number;
  text: string;
  time: string;
  sentByMe: boolean;
}

interface Chat {
  id: number;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './messages.html',
  styleUrl: './messages.scss'
})
export class Messages {

  searchText = '';
  newMessage = '';

  chats: Chat[] = [
    {
      id: 1,
      name: 'Rahul Sharma',
      initials: 'RS',
      lastMessage: 'I have paid my share!',
      time: '10:45 AM',
      unread: 2,
      online: true,
      messages: [
        {
          id: 1,
          text: 'Hey! Did you add the Goa trip expenses?',
          time: '10:30 AM',
          sentByMe: false
        },
        {
          id: 2,
          text: 'Yes, I added all the expenses.',
          time: '10:32 AM',
          sentByMe: true
        },
        {
          id: 3,
          text: 'Great! How much do I owe you?',
          time: '10:40 AM',
          sentByMe: false
        },
        {
          id: 4,
          text: 'Your share is ₹700.',
          time: '10:42 AM',
          sentByMe: true
        },
        {
          id: 5,
          text: 'I have paid my share!',
          time: '10:45 AM',
          sentByMe: false
        }
      ]
    },
    {
      id: 2,
      name: 'Priya Verma',
      initials: 'PV',
      lastMessage: 'Okay, let us settle tomorrow.',
      time: 'Yesterday',
      unread: 0,
      online: true,
      messages: [
        {
          id: 1,
          text: 'Hey Kajal, can you check the room expenses?',
          time: 'Yesterday',
          sentByMe: false
        },
        {
          id: 2,
          text: 'Sure, I will check them.',
          time: 'Yesterday',
          sentByMe: true
        },
        {
          id: 3,
          text: 'Okay, let us settle tomorrow.',
          time: 'Yesterday',
          sentByMe: false
        }
      ]
    },
    {
      id: 3,
      name: 'Aman Gupta',
      initials: 'AG',
      lastMessage: 'Thanks for sharing!',
      time: 'Monday',
      unread: 0,
      online: false,
      messages: [
        {
          id: 1,
          text: 'I have uploaded the lunch bill.',
          time: 'Monday',
          sentByMe: true
        },
        {
          id: 2,
          text: 'Thanks for sharing!',
          time: 'Monday',
          sentByMe: false
        }
      ]
    },
    {
      id: 4,
      name: 'Neha Singh',
      initials: 'NS',
      lastMessage: 'See you soon!',
      time: 'Sunday',
      unread: 0,
      online: false,
      messages: [
        {
          id: 1,
          text: 'Are we meeting this weekend?',
          time: 'Sunday',
          sentByMe: false
        },
        {
          id: 2,
          text: 'Yes, definitely!',
          time: 'Sunday',
          sentByMe: true
        },
        {
          id: 3,
          text: 'See you soon!',
          time: 'Sunday',
          sentByMe: false
        }
      ]
    }
  ];

  selectedChat: Chat = this.chats[0];

  get filteredChats(): Chat[] {
    return this.chats.filter(chat =>
      chat.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selectChat(chat: Chat): void {
    this.selectedChat = chat;
    chat.unread = 0;
  }

  sendMessage(): void {
    const message = this.newMessage.trim();

    if (!message) {
      return;
    }

    const now = new Date();

    const time = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    this.selectedChat.messages.push({
      id: Date.now(),
      text: message,
      time: time,
      sentByMe: true
    });

    this.selectedChat.lastMessage = message;
    this.selectedChat.time = time;

    this.newMessage = '';
  }
}