

class MessageComponent {
    constructor(container) {
        this.container = typeof container === 'string' ? $(container) : container;
        this.conversations = [];
        this.currentConversation = null;
        this.messages = [];
        this.loading = false;
        this.render();
        this.loadConversations();
        this.setupEventListeners();
    }

    async loadConversations() {

        this.conversations = [
            {
                id: '1',
                participant: {
                    id: '2',
                    name: 'Sarah Johnson',
                    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
                    isOnline: true
                },
                lastMessage: {
                    content: 'Looking forward to your event!',
                    timestamp: '2024-01-15T14:30:00Z',
                    read: true
                },
                unreadCount: 0
            },
            {
                id: '2',
                participant: {
                    id: '3',
                    name: 'Mike Chen',
                    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
                    isOnline: false
                },
                lastMessage: {
                    content: 'Can you send me the event details?',
                    timestamp: '2024-01-15T12:15:00Z',
                    read: false
                },
                unreadCount: 2
            },
            {
                id: '3',
                participant: {
                    id: '4',
                    name: 'Emily Davis',
                    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
                    isOnline: true
                },
                lastMessage: {
                    content: 'Thanks for the quick response!',
                    timestamp: '2024-01-15T10:45:00Z',
                    read: true
                },
                unreadCount: 0
            }
        ];

        this.renderConversations();
    }

    render() {
        this.container.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden h-96">
                    <div class="flex h-full">
                        <!-- Conversations List -->
                        <div class="w-1/3 border-r border-gray-200 dark:border-gray-700">
                            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Messages</h2>
                            </div>
                            <div id="conversations-list" class="overflow-y-auto h-full">
                                <!-- Conversations will be rendered here -->
                            </div>
                        </div>

                        <!-- Chat Area -->
                        <div class="flex-1 flex flex-col">
                            <div id="chat-header" class="p-4 border-b border-gray-200 dark:border-gray-700 hidden">
                                <div class="flex items-center space-x-3">
                                    <div class="relative">
                                        <img id="chat-avatar" src="" alt="" class="w-10 h-10 rounded-full">
                                        <div id="chat-status" class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800"></div>
                                    </div>
                                    <div>
                                        <h3 id="chat-name" class="font-medium text-gray-900 dark:text-white"></h3>
                                        <p id="chat-online-status" class="text-sm text-gray-500 dark:text-gray-400"></p>
                                    </div>
                                </div>
                            </div>

                            <div id="messages-area" class="flex-1 overflow-y-auto p-4 space-y-4">
                                <div class="text-center text-gray-500 dark:text-gray-400">
                                    <i data-lucide="message-circle" class="h-12 w-12 mx-auto mb-4"></i>
                                    <p>Select a conversation to start messaging</p>
                                </div>
                            </div>

                            <div id="message-input-area" class="p-4 border-t border-gray-200 dark:border-gray-700 hidden">
                                <div class="flex space-x-2">
                                    <input
                                        type="text"
                                        id="message-input"
                                        placeholder="Type a message..."
                                        class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                    <button
                                        id="send-message-btn"
                                        class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        <i data-lucide="send" class="h-4 w-4"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        lucide.createIcons();
    }

    renderConversations() {
        const container = $('#conversations-list');

        container.innerHTML = this.conversations.map(conversation => `
            <div class="conversation-item p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600" data-conversation-id="${conversation.id}">
                <div class="flex items-center space-x-3">
                    <div class="relative">
                        <img src="${conversation.participant.avatar}" alt="${conversation.participant.name}" class="w-12 h-12 rounded-full">
                        <div class="absolute bottom-0 right-0 w-3 h-3 ${conversation.participant.isOnline ? 'bg-green-400' : 'bg-gray-400'} rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between">
                            <h3 class="font-medium text-gray-900 dark:text-white truncate">${conversation.participant.name}</h3>
                            ${conversation.unreadCount > 0 ? `
                                <span class="bg-primary-600 text-white text-xs rounded-full px-2 py-1">${conversation.unreadCount}</span>
                            ` : ''}
                        </div>
                        <p class="text-sm text-gray-500 dark:text-gray-400 truncate">${conversation.lastMessage.content}</p>
                        <p class="text-xs text-gray-400 dark:text-gray-500">${this.formatMessageTime(conversation.lastMessage.timestamp)}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {

        on('#conversations-list', 'click', (e) => {
            const conversationItem = e.target.closest('.conversation-item');
            if (conversationItem) {
                const conversationId = conversationItem.dataset.conversationId;
                this.selectConversation(conversationId);
            }
        });

        on('#send-message-btn', 'click', () => {
            this.sendMessage();
        });

        on('#message-input', 'keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    selectConversation(conversationId) {
        this.currentConversation = this.conversations.find(c => c.id === conversationId);

        if (this.currentConversation) {

            const chatHeader = $('#chat-header');
            const chatAvatar = $('#chat-avatar');
            const chatName = $('#chat-name');
            const chatStatus = $('#chat-status');
            const chatOnlineStatus = $('#chat-online-status');
            const messageInputArea = $('#message-input-area');

            chatHeader.classList.remove('hidden');
            messageInputArea.classList.remove('hidden');

            chatAvatar.src = this.currentConversation.participant.avatar;
            chatAvatar.alt = this.currentConversation.participant.name;
            chatName.textContent = this.currentConversation.participant.name;
            chatStatus.className = `absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${this.currentConversation.participant.isOnline ? 'bg-green-400' : 'bg-gray-400'
                }`;
            chatOnlineStatus.textContent = this.currentConversation.participant.isOnline ? 'Online' : 'Offline';


            this.loadMessages(conversationId);

            $$('.conversation-item').forEach(item => {
                item.classList.remove('bg-primary-50', 'dark:bg-primary-900');
            });
            $(`.conversation-item[data-conversation-id="${conversationId}"]`).classList.add('bg-primary-50', 'dark:bg-primary-900');
        }
    }

    async loadMessages(conversationId) {

        const mockMessages = {
            '1': [
                {
                    id: '1',
                    senderId: '2',
                    content: 'Hi! I saw your tech conference event and I\'m really interested in attending.',
                    timestamp: '2024-01-15T14:25:00Z',
                    read: true
                },
                {
                    id: '2',
                    senderId: auth.getCurrentUser().id,
                    content: 'That\'s great! I\'d love to have you there. Do you have any specific questions about the event?',
                    timestamp: '2024-01-15T14:27:00Z',
                    read: true
                },
                {
                    id: '3',
                    senderId: '2',
                    content: 'Looking forward to your event!',
                    timestamp: '2024-01-15T14:30:00Z',
                    read: true
                }
            ],
            '2': [
                {
                    id: '4',
                    senderId: '3',
                    content: 'Hey, I heard about your upcoming event. Can you send me the event details?',
                    timestamp: '2024-01-15T12:10:00Z',
                    read: false
                },
                {
                    id: '5',
                    senderId: '3',
                    content: 'Also, is there a group discount available?',
                    timestamp: '2024-01-15T12:15:00Z',
                    read: false
                }
            ],
            '3': [
                {
                    id: '6',
                    senderId: auth.getCurrentUser().id,
                    content: 'Hi Emily! Thanks for your interest in the art gallery opening.',
                    timestamp: '2024-01-15T10:40:00Z',
                    read: true
                },
                {
                    id: '7',
                    senderId: '4',
                    content: 'Thanks for the quick response!',
                    timestamp: '2024-01-15T10:45:00Z',
                    read: true
                }
            ]
        };

        this.messages = mockMessages[conversationId] || [];
        this.renderMessages();
    }

    renderMessages() {
        const messagesArea = $('#messages-area');
        const currentUserId = auth.getCurrentUser().id;

        messagesArea.innerHTML = this.messages.map(message => {
            const isOwn = message.senderId === currentUserId;
            return `
                <div class="flex ${isOwn ? 'justify-end' : 'justify-start'}">
                    <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isOwn
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }">
                        <p class="text-sm">${message.content}</p>
                        <p class="text-xs mt-1 ${isOwn ? 'text-primary-200' : 'text-gray-500 dark:text-gray-400'}">
                            ${this.formatMessageTime(message.timestamp)}
                        </p>
                    </div>
                </div>
            `;
        }).join('');

        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    sendMessage() {
        const messageInput = $('#message-input');
        const content = messageInput.value.trim();

        if (!content || !this.currentConversation) return;

        const newMessage = {
            id: Math.random().toString(36).substr(2, 9),
            senderId: auth.getCurrentUser().id,
            content: content,
            timestamp: new Date().toISOString(),
            read: true
        };

        this.messages.push(newMessage);
        this.renderMessages();

        this.currentConversation.lastMessage = {
            content: content,
            timestamp: newMessage.timestamp,
            read: true
        };

        messageInput.value = '';

        this.renderConversations();
        $(`.conversation-item[data-conversation-id="${this.currentConversation.id}"]`).classList.add('bg-primary-50', 'dark:bg-primary-900');
    }

    formatMessageTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
        }
    }
}

window.MessageComponent = MessageComponent;