// ========================================================
// SWIFLORA LOGISTICS - HYBRID DATA CLIENT SERVICE
// Transparent Supabase PostgreSQL integration with Guaranteed Local Storage Seed
// ========================================================

import { SUPABASE_CONFIG } from '../config/supabase.js';

class DataStorageEngine {
  constructor() {
    this.isRealSupabase = false;
    this.client = null;
    this.init();
  }

  init() {
    // Always seed local mock storage so sample tracking codes like SWF-20260811-884920 work instantly
    this.seedInitialMockData();

    // Check if Supabase JS SDK is present on window and valid credentials exist
    if (window.supabase && SUPABASE_CONFIG.SUPABASE_URL.startsWith('https://') && !SUPABASE_CONFIG.SUPABASE_URL.includes('YOUR-SWIFLORA')) {
      try {
        this.client = window.supabase.createClient(SUPABASE_CONFIG.SUPABASE_URL, SUPABASE_CONFIG.SUPABASE_ANON_KEY);
        this.isRealSupabase = true;
        console.log('🌿 Connected to Swiflora Supabase Cloud Engine');
      } catch (err) {
        console.warn('Supabase initialization failed, falling back to Local Storage Engine:', err);
      }
    }
  }

  storageKey(key) {
    return `swf_${key}`;
  }

  backupKey(key) {
    return `${this.storageKey(key)}_backup`;
  }

  seedInitialMockData() {
    const primaryShipments = localStorage.getItem(this.storageKey('shipments'));
    const backupShipments = localStorage.getItem(this.backupKey('shipments'));

    if (!primaryShipments && backupShipments) {
      localStorage.setItem(this.storageKey('shipments'), backupShipments);
    }

    if (!primaryShipments && !backupShipments) {
      const initialShipments = [
        {
          id: "sh-101",
          tracking_number: "SWF-20260811-884920",
          company_name: "Swiflora Logistics",
          logistics_provider: "Swiflora Express",
          sender_name: "John Harrison",
          sender_phone: "+1 202 555 0147",
          sender_email: "john@example.com",
          sender_address: "1200 Pennsylvania Ave NW",
          sender_city: "Washington",
          sender_country: "United States",
          receiver_name: "Emma Watson",
          receiver_phone: "+44 20 7946 0912",
          receiver_email: "emma@example.co.uk",
          receiver_address: "221B Baker Street",
          receiver_city: "London",
          receiver_country: "United Kingdom",
          package_type: "Carton",
          quantity: 1,
          weight_kg: 4.5,
          dimensions: "30x25x20 cm",
          service_type: "Express Delivery",
          status: "In Transit",
          origin: "Washington, USA",
          destination: "London, UK",
          current_location: "Sorting Center, Heathrow Airport, UK",
          current_lat: 51.4700,
          current_lng: -0.4543,
          dispatch_date: "2026-08-09",
          estimated_delivery: "2026-08-13",
          comment: "Handle with extreme care. High priority fragile package.",
          shipping_cost: 145.00,
          payment_status: "Paid",
          created_at: new Date().toISOString()
        },
        {
          id: "sh-102",
          tracking_number: "SWF-20260811-339102",
          company_name: "Swiflora Logistics",
          logistics_provider: "Swiflora Air Cargo",
          sender_name: "Global Tech Corp",
          sender_phone: "+1 415 555 0199",
          sender_email: "shipping@globaltech.io",
          sender_address: "500 Howard Street",
          sender_city: "San Francisco",
          sender_country: "United States",
          receiver_name: "Tokyo Robotics Lab",
          receiver_phone: "+81 3 5555 0143",
          receiver_email: "import@tokyorobotics.jp",
          receiver_address: "1-1 Chiyoda",
          receiver_city: "Tokyo",
          receiver_country: "Japan",
          package_type: "Box",
          quantity: 2,
          weight_kg: 18.0,
          dimensions: "60x40x40 cm",
          service_type: "Air Freight",
          status: "Customs Clearance",
          origin: "San Francisco, USA",
          destination: "Tokyo, Japan",
          current_location: "Narita Customs Facility, Tokyo",
          current_lat: 35.7720,
          current_lng: 140.3929,
          dispatch_date: "2026-08-08",
          estimated_delivery: "2026-08-14",
          comment: "Contains electronic testing equipment.",
          shipping_cost: 320.00,
          payment_status: "Paid",
          created_at: new Date().toISOString()
        }
      ];
      localStorage.setItem(this.storageKey('shipments'), JSON.stringify(initialShipments));
      localStorage.setItem(this.backupKey('shipments'), JSON.stringify(initialShipments));
    }

    const primaryEvents = localStorage.getItem(this.storageKey('tracking_events'));
    const backupEvents = localStorage.getItem(this.backupKey('tracking_events'));

    if (!primaryEvents && backupEvents) {
      localStorage.setItem(this.storageKey('tracking_events'), backupEvents);
    }

    if (!primaryEvents && !backupEvents) {
      const initialEvents = [
        {
          id: "ev-1",
          shipment_id: "sh-101",
          status: "Shipment Created",
          location: "Washington DC Hub, USA",
          description: "Shipping label generated and package pickup confirmed.",
          timestamp: "2026-08-09T08:00:00Z",
          updated_by: "Dispatcher"
        },
        {
          id: "ev-2",
          shipment_id: "sh-101",
          status: "In Transit",
          location: "Sorting Center, Heathrow Airport, UK",
          description: "Arrived at destination sorting facility. Custom clearance in progress.",
          timestamp: "2026-08-09T14:30:00Z",
          updated_by: "System Operations"
        }
      ];
      localStorage.setItem(this.storageKey('tracking_events'), JSON.stringify(initialEvents));
      localStorage.setItem(this.backupKey('tracking_events'), JSON.stringify(initialEvents));
    }

    if (!localStorage.getItem(this.storageKey('drivers'))) {
      const drivers = [
        { id: "dr-01", full_name: "Michael Scott", email: "michael@swifloralogistics.com", phone: "+1 202 555 0188", license_number: "DL-9948201", status: "On Duty", rating: 4.9, total_deliveries: 342 },
        { id: "dr-02", full_name: "Sarah Jenkins", email: "sarah@swifloralogistics.com", phone: "+1 202 555 0192", license_number: "DL-3882910", status: "Available", rating: 4.8, total_deliveries: 215 },
        { id: "dr-03", full_name: "David Vance", email: "david@swifloralogistics.com", phone: "+1 202 555 0122", license_number: "DL-7729104", status: "Off Duty", rating: 5.0, total_deliveries: 512 }
      ];
      localStorage.setItem(this.storageKey('drivers'), JSON.stringify(drivers));
      localStorage.setItem(this.backupKey('drivers'), JSON.stringify(drivers));
    }

    if (!localStorage.getItem(this.storageKey('vehicles'))) {
      const vehicles = [
        { id: "veh-01", plate_number: "NY-7749-EX", model: "Mercedes Sprinter 3500", type: "Cargo Van", capacity_kg: 2500, status: "In Transit", fuel_type: "Diesel" },
        { id: "veh-02", plate_number: "NY-9920-TR", model: "Volvo FH16 Heavy Cargo", type: "Heavy Truck", capacity_kg: 18000, status: "Available", fuel_type: "Diesel" },
        { id: "veh-03", plate_number: "FLT-BOEING-747", model: "Boeing 747-8 Freighter", type: "Freight Plane", capacity_kg: 130000, status: "Available", fuel_type: "Jet A-1" }
      ];
      localStorage.setItem(this.storageKey('vehicles'), JSON.stringify(vehicles));
      localStorage.setItem(this.backupKey('vehicles'), JSON.stringify(vehicles));
    }

    if (!localStorage.getItem(this.storageKey('testimonials'))) {
      const testimonials = [
        { id: "ts-01", author_name: "Amara Chen", author_title: "Head of Supply Chain", company: "Northline Retail Group", content: "Swiflora replaced two of our regional couriers. One dashboard, real-time visibility, and delivery times actually improved.", rating: 5, avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80", is_approved: true },
        { id: "ts-02", author_name: "Marcus Webb", author_title: "Founder", company: "Webb & Co. Imports", content: "Customs clearance used to be our biggest bottleneck. Swiflora's brokerage team clears our freight in a fraction of the time.", rating: 5, avatar_url: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150&q=80", is_approved: true }
      ];
      localStorage.setItem(this.storageKey('testimonials'), JSON.stringify(testimonials));
      localStorage.setItem(this.backupKey('testimonials'), JSON.stringify(testimonials));
    }

    if (!localStorage.getItem(this.storageKey('faqs'))) {
      const faqs = [
        { id: "faq-01", question: "How do I track my shipment?", answer: "Enter your tracking number (e.g. SWF-20260811-884920) on the Track Package page or the homepage search bar to see live status and location history.", sort_order: 1 },
        { id: "faq-02", question: "What areas does Swiflora Logistics deliver to?", answer: "We operate air, sea, and road freight routes across 100+ countries, with express door-to-door delivery in most major metro areas.", sort_order: 2 },
        { id: "faq-03", question: "How is my shipping cost calculated?", answer: "Rates are based on weight, dimensions, service type (Road, Air, Sea, or Express), and destination. Use the Get a Quote page for an instant estimate.", sort_order: 3 },
        { id: "faq-04", question: "Can I get customs clearance handled for me?", answer: "Yes. Our brokerage team manages import/export documentation, duty calculation, and customs clearance on your behalf for international shipments.", sort_order: 4 },
        { id: "faq-05", question: "How do I book a shipment or request a pickup?", answer: "Submit a quote request, or contact our support line at +1 364 547 2182 and our dispatch team will schedule a pickup.", sort_order: 5 }
      ];
      localStorage.setItem(this.storageKey('faqs'), JSON.stringify(faqs));
      localStorage.setItem(this.backupKey('faqs'), JSON.stringify(faqs));
    }
  }

  // Collection getter for local storage mode
  getCollection(key) {
    const primaryKey = this.storageKey(key);
    const backupKey = this.backupKey(key);

    try {
      const raw = localStorage.getItem(primaryKey);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn(`Could not read ${primaryKey}, falling back to backup.`, err);
    }

    try {
      const backupRaw = localStorage.getItem(backupKey);
      if (backupRaw) {
        return JSON.parse(backupRaw);
      }
    } catch (err) {
      console.warn(`Could not read ${backupKey}.`, err);
    }

    return [];
  }

  // Collection setter
  setCollection(key, data) {
    const primaryKey = this.storageKey(key);
    const backupKey = this.backupKey(key);
    const payload = JSON.stringify(data);
    localStorage.setItem(primaryKey, payload);
    localStorage.setItem(backupKey, payload);
  }
}

export const dbEngine = new DataStorageEngine();
