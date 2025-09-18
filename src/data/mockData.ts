// Mock data for the Universal Sales Dashboard
import { 
  Customer, 
  Item, 
  SalesOrder, 
  DeliveryNote, 
  SalesInvoice, 
  PaymentEntry,
  KPIData 
} from '@/models/types';

// Generate unique IDs
export const generateId = () => Math.random().toString(36).substr(2, 9);

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    name: "CUST-001",
    customer_name: "Acme Corporation",
    customer_type: "Company",
    territory: "North Zone",
    customer_group: "B2B Enterprise",
    contact_email: "contact@acme.com",
    contact_phone: "+1-555-0123",
    billing_address: "123 Business St, Corporate City, CC 12345",
    shipping_address: "456 Warehouse Ave, Industrial Zone, IZ 67890",
    gstin: "29ABCDE1234F1Z5"
  },
  {
    name: "CUST-002",
    customer_name: "Tech Solutions Ltd",
    customer_type: "Company",
    territory: "South Zone",
    customer_group: "B2B Enterprise",
    contact_email: "orders@techsolutions.com",
    contact_phone: "+1-555-0124",
    billing_address: "789 Tech Park, Silicon Valley, SV 11111",
    shipping_address: "789 Tech Park, Silicon Valley, SV 11111",
    gstin: "29ABCDE1234F2Z6"
  },
  {
    name: "CUST-003",
    customer_name: "John Smith",
    customer_type: "Individual",
    territory: "East Zone",
    customer_group: "Retail",
    contact_email: "john.smith@email.com",
    contact_phone: "+1-555-0125"
  },
  {
    name: "CUST-004",
    customer_name: "Global Manufacturing Inc",
    customer_type: "Company",
    territory: "West Zone",
    customer_group: "B2B Enterprise",
    contact_email: "procurement@global-mfg.com",
    contact_phone: "+1-555-0126",
    billing_address: "101 Industrial Blvd, Manufacturing District, MD 54321",
    shipping_address: "202 Distribution Center, Logistics Park, LP 98765",
    gstin: "29ABCDE1234F3Z7"
  },
  {
    name: "CUST-005",
    customer_name: "Sarah Johnson",
    customer_type: "Individual",
    territory: "Central Zone",
    customer_group: "Retail",
    contact_email: "sarah.j@email.com",
    contact_phone: "+1-555-0127"
  }
];

// Mock Items
export const mockItems: Item[] = [
  {
    item_code: "PROD-001",
    item_name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    item_group: "Electronics",
    stock_uom: "Nos",
    standard_rate: 299.99,
    is_stock_item: true
  },
  {
    item_code: "PROD-002",
    item_name: "Smart Phone Case",
    description: "Protective case for smartphones with premium materials",
    item_group: "Accessories",
    stock_uom: "Nos",
    standard_rate: 49.99,
    is_stock_item: true
  },
  {
    item_code: "SERV-001",
    item_name: "Installation Service",
    description: "Professional installation and setup service",
    item_group: "Services",
    stock_uom: "Hours",
    standard_rate: 75.00,
    is_stock_item: false
  },
  {
    item_code: "PROD-003",
    item_name: "Laptop Computer",
    description: "High-performance laptop for business use",
    item_group: "Electronics",
    stock_uom: "Nos",
    standard_rate: 1299.99,
    is_stock_item: true
  },
  {
    item_code: "PROD-004",
    item_name: "Office Chair",
    description: "Ergonomic office chair with lumbar support",
    item_group: "Furniture",
    stock_uom: "Nos",
    standard_rate: 399.99,
    is_stock_item: true
  }
];

// Mock Quotations
export const mockQuotations: any[] = [
  {
    name: "QTN-001",
    customer: "Acme Corporation",
    quotation_date: "2024-01-15",
    valid_till: "2024-02-15",
    items: [
      { item_code: "PROD-001", qty: 10, rate: 299.99, amount: 2999.90 },
      { item_code: "PROD-002", qty: 20, rate: 49.99, amount: 999.80 }
    ],
    grand_total: 3999.70,
    status: "Submitted"
  },
  {
    name: "QTN-002",
    customer: "Tech Solutions Ltd",
    quotation_date: "2024-01-16",
    valid_till: "2024-02-16",
    items: [
      { item_code: "PROD-003", qty: 5, rate: 1299.99, amount: 6499.95 }
    ],
    grand_total: 6499.95,
    status: "Draft"
  }
];

// Mock Sales Orders
export const mockSalesOrders: SalesOrder[] = [
  {
    name: "SO-001",
    customer: "Acme Corporation",
    transaction_date: "2024-01-20",
    delivery_date: "2024-01-25",
    items: [
      { item_code: "PROD-001", qty: 5, rate: 299.99, amount: 1499.95 },
      { item_code: "PROD-002", qty: 10, rate: 49.99, amount: 499.90 }
    ],
    grand_total: 1999.85,
    status: "To Deliver and Bill"
  },
  {
    name: "SO-002",
    customer: "John Smith",
    transaction_date: "2024-01-21",
    delivery_date: "2024-01-23",
    items: [
      { item_code: "PROD-001", qty: 1, rate: 299.99, amount: 299.99 }
    ],
    grand_total: 299.99,
    status: "Completed"
  },
  {
    name: "SO-003",
    customer: "Global Manufacturing Inc",
    transaction_date: "2024-01-22",
    delivery_date: "2024-01-28",
    items: [
      { item_code: "PROD-003", qty: 25, rate: 1299.99, amount: 32499.75 },
      { item_code: "PROD-004", qty: 25, rate: 399.99, amount: 9999.75 }
    ],
    grand_total: 42499.50,
    status: "To Deliver and Bill"
  }
];

// Mock Delivery Notes
export const mockDeliveryNotes: DeliveryNote[] = [
  {
    name: "DN-001",
    customer: "John Smith",
    sales_order: "SO-002",
    posting_date: "2024-01-23",
    items: [
      { item_code: "PROD-001", qty: 1, warehouse: "Main Store" }
    ],
    shipping_address: "789 Home Street, Residential Area, RA 12345",
    delivery_status: "Delivered",
    status: "Completed"
  },
  {
    name: "DN-002",
    customer: "Acme Corporation",
    sales_order: "SO-001",
    posting_date: "2024-01-24",
    items: [
      { item_code: "PROD-001", qty: 5, warehouse: "Main Store" },
      { item_code: "PROD-002", qty: 10, warehouse: "Main Store" }
    ],
    shipping_address: "456 Warehouse Ave, Industrial Zone, IZ 67890",
    delivery_status: "Out for Delivery",
    status: "To Bill"
  }
];

// Mock Sales Invoices
export const mockSalesInvoices: SalesInvoice[] = [
  {
    name: "INV-001",
    customer: "John Smith",
    posting_date: "2024-01-23",
    due_date: "2024-02-23",
    items: [
      { item_code: "PROD-001", qty: 1, rate: 299.99, amount: 299.99 }
    ],
    grand_total: 299.99,
    outstanding_amount: 0,
    status: "Paid"
  },
  {
    name: "INV-002",
    customer: "Acme Corporation",
    posting_date: "2024-01-25",
    due_date: "2024-02-25",
    items: [
      { item_code: "PROD-001", qty: 5, rate: 299.99, amount: 1499.95 },
      { item_code: "PROD-002", qty: 10, rate: 49.99, amount: 499.90 }
    ],
    grand_total: 1999.85,
    outstanding_amount: 1999.85,
    status: "Submitted"
  },
  {
    name: "INV-003",
    customer: "Global Manufacturing Inc",
    posting_date: "2024-01-15",
    due_date: "2024-01-15",
    items: [
      { item_code: "PROD-003", qty: 10, rate: 1299.99, amount: 12999.90 }
    ],
    grand_total: 12999.90,
    outstanding_amount: 12999.90,
    status: "Overdue"
  }
];

// Mock Payment Entries
export const mockPaymentEntries: PaymentEntry[] = [
  {
    name: "PAY-001",
    payment_type: "Receive",
    party_type: "Customer",
    party: "John Smith",
    paid_amount: 299.99,
    posting_date: "2024-01-23",
    mode_of_payment: "UPI",
    reference_invoice: "INV-001",
    reference_no: "UPI123456789"
  },
  {
    name: "PAY-002",
    payment_type: "Receive",
    party_type: "Customer",
    party: "Tech Solutions Ltd",
    paid_amount: 5000.00,
    posting_date: "2024-01-20",
    mode_of_payment: "Bank",
    reference_no: "CHQ789012345"
  }
];

// Mock KPI Data
export const mockKPIData: KPIData = {
  today_sales: 15750.25,
  pending_deliveries: 2,
  outstanding_payments: 14999.75,
  quotations_count: mockQuotations.length,
  orders_count: mockSalesOrders.length,
  deliveries_count: mockDeliveryNotes.length,
  invoices_count: mockSalesInvoices.length,
  payments_count: mockPaymentEntries.length
};

// Mock Stock Balances
export const mockStockBalances: any[] = [
  { item_code: "PROD-001", warehouse: "Main Store", actual_qty: 50, reserved_qty: 5, available_qty: 45 },
  { item_code: "PROD-002", warehouse: "Main Store", actual_qty: 100, reserved_qty: 10, available_qty: 90 },
  { item_code: "PROD-003", warehouse: "Main Store", actual_qty: 25, reserved_qty: 25, available_qty: 0 },
  { item_code: "PROD-004", warehouse: "Main Store", actual_qty: 75, reserved_qty: 25, available_qty: 50 },
  { item_code: "PROD-001", warehouse: "Secondary Store", actual_qty: 30, reserved_qty: 0, available_qty: 30 },
];