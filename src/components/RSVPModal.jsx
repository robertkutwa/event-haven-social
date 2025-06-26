import { useState } from 'react';
import { MessageSquare, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';

const RSVPModal = ({ isOpen, onClose, event }) => {
  const [status, setStatus] = useState('Going');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!event) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "RSVP Confirmed!",
      description: `You've successfully RSVP'd to ${event.title}`,
    });

    // Reset form
    setStatus('Going');
    setMessage('');
    setIsSubmitting(false);
    onClose();
  };

  const statusOptions = [
    { value: 'Going', label: 'Going', emoji: '✅' },
    { value: 'Maybe', label: 'Maybe', emoji: '🤔' },
    { value: 'Not Going', label: 'Not Going', emoji: '❌' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-purple-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-purple-600" />
            RSVP to Event
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            {event.title}
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Your attendance status
            </Label>
            <RadioGroup value={status} onValueChange={setStatus} className="space-y-3">
              {statusOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border border-purple-100 hover:bg-purple-50 transition-colors">
                  <RadioGroupItem 
                    value={option.value} 
                    id={option.value}
                    className="border-purple-300 text-purple-600"
                  />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 cursor-pointer font-medium text-gray-700 flex items-center"
                  >
                    <span className="mr-2 text-lg">{option.emoji}</span>
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-medium text-gray-700 flex items-center mb-2">
              <MessageSquare className="w-4 h-4 mr-2 text-purple-500" />
              Message to organizer (optional)
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a message for the event organizer..."
              className="border-purple-200 focus:border-purple-400 min-h-[80px]"
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">
              Share any questions, dietary restrictions, or special requests
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Confirm RSVP'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RSVPModal;
