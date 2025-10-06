interface Branding {
    name: string;
    theme: {
        primary: string;
        background: string;
        text: string;
    };
}

interface ClassCatalogItem {
    id: string;
    type: "class";
    name: string;
    durationMinutes: number;
    price: number;
    seatsTotal: number;
}

interface RentalCatalogItem {
    id: string;
    type: "rental";
    name: string;
    pricePerNight: number;
    inventory: number;
}

interface ServiceCatalogItem {
    id: string;
    type: "service";
    name: string;
    durationMinutes: number;
    bufferBeforeMinutes: number;
    bufferAfterMinutes: number;
    price: number;
}

type CatalogItem = ClassCatalogItem | RentalCatalogItem | ServiceCatalogItem;

interface Resource {
    id: string;
    kind: string;
    name: string;
}

interface Constraints {
    leadTimeMinutes: number;
    minHorizonDays: number;
    maxHorizonDays: number;
    allowOverlap: boolean;
    allowPast: boolean;
}

interface Policies {
    waitlist: boolean;
    minNights?: number;
    maxNights?: number;
    cancellationCutoffMinutes?: number;
}

interface Copy {
    cta: string;
    sessionLabel?: string;
    seatsLeftLabel?: string;
    dateRangeLabel?: string;
    providersLabel?: string;
    servicesLabel?: string;
    timeLabel?: string;
}

interface Layout {
    flow: string[];
    variant: string;
}

interface AvailabilityQueryMap {
    classId?: string;
    start?: string;
    end?: string;
    itemId?: string;
    startDate?: string;
    endDate?: string;
    serviceId?: string;
    providerId?: string;
}

interface Availability {
    endpoint: string;
    queryMap: AvailabilityQueryMap;
}

interface Booking {
    endpoint: string;
}

export interface AppConfig {
    vertical: string;
    branding: Branding;
    timeScale: string;
    slotIntervalMinutes?: number; // Only in salon.json
    catalog: CatalogItem[];
    resources: Resource[];
    capacityModel: string;
    constraints: Constraints;
    policies: Policies;
    copy: Copy;
    layout: Layout;
    availability: Availability;
    booking: Booking;
}