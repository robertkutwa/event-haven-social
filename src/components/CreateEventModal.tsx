
import { useState } from 'react';
import { Calendar, MapPin, Clock, FileText, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEvent: (event: any) => void;
}

const CreateEventModal = ({ isOpen, onClose, onCreateEvent }: CreateEventModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    category: '',
    maxAttendees: ''
  });

  const categories = ['Social', 'Arts', 'Tech', 'Community', 'Sports', 'Food'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.date || !formData.time) {
      return;
    }

    const dateTime = `${formData.date}T${formData.time}:00`;
    
    const newEvent = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      date_time: dateTime,
      category: formData.category || 'Community',
      maxAttendees: parseInt(formData.maxAttendees) || 20
    };

    onCreateEvent(newEvent);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      location: '',
      date: '',
      time: '',
      category: '',
      maxAttendees: ''
    });
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-purple-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create New Event
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-700 flex items-center mb-2">
              <FileText className="w-4 h-4 mr-2 text-purple-500" />
              Event Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter event title"
              className="border-purple-200 focus:border-purple-400"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700 flex items-center mb-2">
              <FileText className="w-4 h-4 mr-2 text-purple-500" />
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your event"
              className="border-purple-200 focus:border-purple-400 min-h-[80px]"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="location" className="text-sm font-medium text-gray-700 flex items-center mb-2">
              <MapPin className="w-4 h-4 mr-2 text-purple-500" />
              Location *
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter event location"
              className="border-purple-200 focus:border-purple-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center mb-2">
                <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="border-purple-200 focus:border-purple-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="time" className="text-sm font-medium text-gray-700 flex items-center mb-2">
                <Clock className="w-4 h-4 mr-2 text-purple-500" />
                Time *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="border-purple-200 focus:border-purple-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Category
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className="border-purple-200 focus:border-purple-400">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="maxAttendees" className="text-sm font-medium text-gray-700 flex items-center mb-2">
                <Users className="w-4 h-4 mr-2 text-purple-500" />
                Max Attendees
              </Label>
              <Input
                id="maxAttendees"
                type="number"
                value={formData.maxAttendees}
                onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
                placeholder="20"
                min="1"
                className="border-purple-200 focus:border-purple-400"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Create Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventModal;
