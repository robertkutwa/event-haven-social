import { useState } from 'react';
import { Calendar, MapPin, Users, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EventCard from '@/components/EventCard';
import CreateEventModal from '@/components/CreateEventModal';
import EventDetailsModal from '@/components/EventDetailsModal';
import RSVPModal from '@/components/RSVPModal';

// Mock data for demonstration with images
const mockEvents = [
  {
    id: 1,
    title: "Community Coffee Morning",
    description: "Join us for a relaxed coffee morning to meet neighbors and make new connections in our community.",
    location: "Central Park Cafe, Downtown",
    date_time: "2024-06-30T09:00:00",
    organizer: "Sarah Johnson",
    attendees: 12,
    maxAttendees: 20,
    category: "Social",
    imageUrl: "photo-1618160702438-9b02ab6515c9"
  },
  {
    id: 2,
    title: "Local Photography Walk",
    description: "Explore the city through your lens! Bring your camera and discover hidden gems in our neighborhood.",
    location: "Main Street Square",
    date_time: "2024-07-01T14:00:00",
    organizer: "Mike Chen",
    attendees: 8,
    maxAttendees: 15,
    category: "Arts",
    imageUrl: "photo-1433086966358-54859d0ed716"
  },
  {
    id: 3,
    title: "Coding Bootcamp Workshop",
    description: "Learn the basics of web development in this hands-on workshop. Perfect for beginners!",
    location: "Tech Hub Co-working Space",
    date_time: "2024-07-02T18:00:00",
    organizer: "Alex Rivera",
    attendees: 15,
    maxAttendees: 25,
    category: "Tech",
    imageUrl: "photo-1461749280684-dccba630e2f6"
  },
  {
    id: 4,
    title: "Weekend Farmers Market",
    description: "Fresh produce, local crafts, and live music. Support local vendors and enjoy the community atmosphere.",
    location: "Town Square",
    date_time: "2024-07-06T08:00:00",
    organizer: "Green Valley Association",
    attendees: 45,
    maxAttendees: 100,
    category: "Community",
    imageUrl: "photo-1465146344425-f00d5f5c8f07"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const [events, setEvents] = useState(mockEvents);

  const categories = ['All', 'Social', 'Arts', 'Tech', 'Community', 'Sports', 'Food'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
  };

  const handleRSVPClick = (event) => {
    setSelectedEvent(event);
    setIsRSVPModalOpen(true);
  };

  const handleCreateEvent = (newEvent) => {
    const event = {
      ...newEvent,
      id: events.length + 1,
      organizer: "Current User", // In real app, this would be the logged-in user
      attendees: 0,
    };
    setEvents([event, ...events]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EventPal
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover Amazing
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Local Events</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with your community, make new friends, and create unforgettable memories at events happening near you.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-purple-100">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'border-purple-200 text-purple-600 hover:bg-purple-50'
                } transition-all duration-200`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{events.length}</h3>
              <p className="text-gray-600">Active Events</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {events.reduce((sum, event) => sum + event.attendees, 0)}
              </h3>
              <p className="text-gray-600">People Attending</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">5+</h3>
              <p className="text-gray-600">Locations</p>
            </CardContent>
          </Card>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEventClick={handleEventClick}
              onRSVPClick={handleRSVPClick}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find more events.</p>
          </div>
        )}
      </main>

      {/* Modals */}
      <CreateEventModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onCreateEvent={handleCreateEvent}
      />
      
      <EventDetailsModal 
        isOpen={isEventDetailsOpen} 
        onClose={() => setIsEventDetailsOpen(false)}
        event={selectedEvent}
        onRSVPClick={handleRSVPClick}
      />
      
      <RSVPModal 
        isOpen={isRSVPModalOpen} 
        onClose={() => setIsRSVPModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default Index;
