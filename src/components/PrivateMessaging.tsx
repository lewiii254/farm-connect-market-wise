
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Search } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const PrivateMessaging = () => {
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const contacts = [
    { id: 1, name: 'Joseph Kamau', lastMessage: 'Thanks for the maize variety info!', time: '2 hours ago', unread: 2 },
    { id: 2, name: 'Faith Wanjiku', lastMessage: 'The weather alert was very helpful', time: '1 day ago', unread: 0 },
    { id: 3, name: 'Daniel Omondi', lastMessage: 'Can you share the irrigation contact?', time: '2 days ago', unread: 1 },
    { id: 4, name: 'Mary Njeri', lastMessage: 'Great advice on pest control', time: '1 week ago', unread: 0 }
  ];

  const messages = [
    { id: 1, sender: 'Joseph Kamau', content: 'Hi! I saw your post about the new maize variety. Could you share more details?', time: '3 hours ago', isOwn: false },
    { id: 2, sender: 'You', content: 'Sure! It\'s the drought-resistant variety from Kenya Seed Company. Very good yield even with minimal rainfall.', time: '2 hours ago', isOwn: true },
    { id: 3, sender: 'Joseph Kamau', content: 'Thanks for the info! Where can I get the seeds?', time: '2 hours ago', isOwn: false }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedContact) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
    setMessageText('');
  };

  const handleStartConversation = (contactId: number) => {
    setSelectedContact(contactId);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Contacts List */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${
                    selectedContact === contact.id ? 'border-green-500 bg-green-50' : 'border-transparent'
                  }`}
                  onClick={() => handleStartConversation(contact.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-green-100 text-green-800">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm">{contact.name}</p>
                        {contact.unread > 0 && (
                          <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1">
                            {contact.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                      <p className="text-xs text-gray-400">{contact.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-2">
        <Card className="h-full flex flex-col">
          {selectedContact ? (
            <>
              <CardHeader className="border-b">
                <CardTitle className="text-lg">
                  {contacts.find(c => c.id === selectedContact)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col p-4">
                {/* Messages */}
                <div className="flex-grow overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isOwn ? 'text-green-100' : 'text-gray-500'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-grow resize-none"
                    rows={2}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex-grow flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p>Select a contact to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PrivateMessaging;
