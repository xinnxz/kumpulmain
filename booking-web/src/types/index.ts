export interface Venue {
    id: string;
    managerId: string;
    name: string;
    description?: string;
    address: string;
    city?: string;
    pricePerHour: number;
    capacity: number;
    images: string[];
    facilities: string[];
    venueType?: string;
    isActive: boolean;
    createdAt: string;
    manager?: { name: string; phone?: string };
    schedules?: VenueSchedule[];
}

export interface VenueSchedule {
    id: string;
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
    isAvailable: boolean;
}

export interface Booking {
    id: string;
    venueId: string;
    ownerId: string;
    date: string;
    startTime: string;
    endTime: string;
    totalPrice: number;
    pricePerSlot: number;
    maxSlots: number;
    isJoinable: boolean;
    inviteType: "PUBLIC" | "PRIVATE";
    inviteCode: string;
    title?: string;
    notes?: string;
    status: "PENDING" | "OPEN" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
    venue?: Venue;
    owner?: User;
    participants?: BookingParticipant[];
    chatRoom?: { id: string };
    filledSlots?: number;
    availableSlots?: number;
}

export interface BookingParticipant {
    id: string;
    bookingId: string;
    userId: string;
    shareAmount: number;
    paymentStatus: "UNPAID" | "PENDING" | "PAID" | "REFUNDED";
    isOwner: boolean;
    user?: User;
}

export interface User {
    id: string;
    email: string;
    name: string;
    phone?: string;
    avatar?: string;
    role: "USER" | "PENGELOLA" | "ADMIN";
}

export interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    data?: any;
    isRead: boolean;
    createdAt: string;
}

export interface TimeSlot {
    start: string;
    end: string;
    available: boolean;
}
