import { Calendar, MapPin, Users, Clock, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const EventDetailsModal = ({ isOpen, onClose, event, onRSVPClick }) => {
  if (!event) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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

  const getAttendanceStatus = () => {
    const percentage = (event.attendees / event.maxAttendees) * 100;
    if (percentage >= 90) return { text: 'Almost Full', color: 'text-red-600' };
    if (percentage >= 70) return { text: 'Filling Up', color: 'text-orange-600' };
    return { text: 'Available Spots', color: 'text-green-600' };
  };

  const attendanceStatus = getAttendanceStatus();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-sm border-purple-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between mb-4">
            <Badge className={`${getCategoryColor(event.category)} font-medium`}>
              {event.category}
            </Badge>
            <div className="text-right">
              <div className="text-sm font-semibold text-purple-600">
                {formatDate(event.date_time)}
              </div>
              <div className="text-xs text-gray-500 flex items-center justify-end">
                <Clock className="w-3 h-3 mr-1" />
                {formatTime(event.date_time)}
              </div>
            </div>
          </div>
          
          <DialogTitle className="text-2xl font-bold text-gray-800 leading-tight">
            {event.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Event Details */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-purple-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">Location</p>
                <p className="text-gray-600">{event.location}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <User className="w-5 h-5 text-purple-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">Organized by</p>
                <p className="text-gray-600">{event.organizer}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-purple-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">Attendance</p>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">
                    {event.attendees} of {event.maxAttendees} people
                  </span>
                  <span className={`text-sm font-medium ${attendanceStatus.color}`}>
                    • {attendanceStatus.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">About this event</h3>
            <p className="text-gray-600 leading-relaxed">
              {event.description || "No description provided for this event."}
            </p>
          </div>
          
          <Separator />
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              Close
            </Button>
            <Button
              onClick={() => onRSVPClick(event)}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              disabled={event.attendees >= event.maxAttendees}
            >
              {event.attendees >= event.maxAttendees ? 'Event Full' : 'RSVP Now'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
