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
import Header from '@/components/Header';

// Mock data for demonstration with images
const mockEvents = [
	{
		id: 1,
		title: 'Community Coffee Morning',
		description:
			'Join us for a relaxed coffee morning to meet neighbors and make new connections in our community.',
		location: 'Central Park Cafe, Downtown',
		date_time: '2024-06-30T09:00:00',
		organizer: 'Sarah Johnson',
		attendees: 12,
		maxAttendees: 20,
		category: 'Social',
		imageUrl: 'photo-1618160702438-9b02ab6515c9',
	},
	{
		id: 2,
		title: 'Local Photography Walk',
		description:
			'Explore the city through your lens! Bring your camera and discover hidden gems in our neighborhood.',
		location: 'Main Street Square',
		date_time: '2024-07-01T14:00:00',
		organizer: 'Mike Chen',
		attendees: 8,
		maxAttendees: 15,
		category: 'Arts',
		imageUrl: 'photo-1433086966358-54859d0ed716',
	},
	{
		id: 3,
		title: 'Coding Bootcamp Workshop',
		description:
			'Learn the basics of web development in this hands-on workshop. Perfect for beginners!',
		location: 'Tech Hub Co-working Space',
		date_time: '2024-07-02T18:00:00',
		organizer: 'Alex Rivera',
		attendees: 15,
		maxAttendees: 25,
		category: 'Tech',
		imageUrl: 'photo-1461749280684-dccba630e2f6',
	},
	{
		id: 4,
		title: 'Weekend Farmers Market',
		description:
			'Fresh produce, local crafts, and live music. Support local vendors and enjoy the community atmosphere.',
		location: 'Town Square',
		date_time: '2024-07-06T08:00:00',
		organizer: 'Green Valley Association',
		attendees: 45,
		maxAttendees: 100,
		category: 'Community',
		imageUrl: 'photo-1465146344425-f00d5f5c8f07',
	},
];

function Index() {
	const [search, setSearch] = useState('');
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [showRSVPModal, setShowRSVPModal] = useState(false);

	const filteredEvents = mockEvents.filter(event =>
		event.title.toLowerCase().includes(search.toLowerCase()) ||
		event.description.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="container mx-auto py-8 px-4">
			<Header />
			<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
				<h1 className="text-3xl font-bold flex items-center gap-2">
					<Calendar className="w-7 h-7 text-primary" />
					Upcoming Events
				</h1>
				<div className="flex gap-2 items-center">
					<Input
						placeholder="Search events..."
						value={search}
						onChange={e => setSearch(e.target.value)}
						className="w-48"
					/>
					<Button onClick={() => setShowCreateModal(true)}>
						<Plus className="w-4 h-4 mr-2" /> Create Event
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredEvents.map(event => (
					<EventCard
						key={event.id}
						event={event}
						onClick={() => setSelectedEvent(event)}
					/>
				))}
			</div>
			<CreateEventModal open={showCreateModal} onOpenChange={setShowCreateModal} />
			<EventDetailsModal
				event={selectedEvent}
				open={!!selectedEvent}
				onOpenChange={() => setSelectedEvent(null)}
				onRSVP={() => setShowRSVPModal(true)}
			/>
			<RSVPModal open={showRSVPModal} onOpenChange={setShowRSVPModal} />
		</div>
	);
}

export default Index;
