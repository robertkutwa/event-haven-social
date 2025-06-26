import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EventCard = ({ event, onEventClick, onRSVPClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAttendanceColor = () => {
    const percentage = (event.attendees / event.maxAttendees) * 100;
    if (percentage >= 80) return 'text-red-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-green-600';
  };

  const getCategoryColor = (category) => {
    const colors = {
      Social: 'bg-blue-100 text-blue-800',
      Arts: 'bg-purple-100 text-purple-800',
      Tech: 'bg-green-100 text-green-800',
      Community: 'bg-orange-100 text-orange-800',
      Sports: 'bg-red-100 text-red-800',
      Food: 'bg-yellow-100 text-yellow-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300 cursor-pointer group overflow-hidden">
      {/* Event Image */}
      {event.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={`https://images.unsplash.com/${event.imageUrl}?auto=format&fit=crop&w=400&q=80`}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onClick={() => onEventClick(event)}
          />
          <div className="absolute top-3 left-3">
            <Badge className={`${getCategoryColor(event.category)} font-medium shadow-sm`}>
              {event.category}
            </Badge>
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-right">
            <div className="text-sm font-semibold text-purple-600">
              {formatDate(event.date_time)}
            </div>
            <div className="text-xs text-gray-500 flex items-center justify-end">
              <Clock className="w-3 h-3 mr-1" />
              {formatTime(event.date_time)}
            </div>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        {!event.imageUrl && (
          <div className="flex items-start justify-between mb-2">
            <Badge className={`${getCategoryColor(event.category)} font-medium`}>
              {event.category}
            </Badge>
            <div className="text-right">
              <div className="text-sm font-semibold text-purple-600">
                {formatDate(event.date_time)}
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatTime(event.date_time)}
              </div>
            </div>
          </div>
        )}
        
        <h3 
          className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200 line-clamp-2"
          onClick={() => onEventClick(event)}
        >
          {event.title}
        </h3>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p 
          className="text-gray-600 text-sm mb-4 line-clamp-2"
          onClick={() => onEventClick(event)}
        >
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2 text-purple-500" />
            <span className="truncate">{event.location}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-500">
              <Users className="w-4 h-4 mr-2 text-purple-500" />
              <span className={getAttendanceColor()}>
                {event.attendees}/{event.maxAttendees} attending
              </span>
            </div>
            <span className="text-xs text-gray-400">by {event.organizer}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50"
            onClick={() => onEventClick(event)}
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            onClick={(e) => {
              e.stopPropagation();
              onRSVPClick(event);
            }}
          >
            RSVP
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
