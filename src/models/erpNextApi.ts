// ERPNext API Service Layer
// This will handle all communication with ERPNext backend

export interface Customer {
  name: string;
  customer_name: string;
  customer_type: 'Company' | 'Individual';
  territory: string;
  customer_group: string;
  phone?: string;
  email?: string;
}

export interface Item {
  item_code: string;
  item_name: string;
  item_group: string;
  stock_uom: string;
  standard_rate: number;
  is_stock_item: boolean;
}

export interface StockBalance {
  item_code: string;
  warehouse: string;
  actual_qty: number;
  reserved_qty: number;
  available_qty: number;
}

export interface SalesOrder {
  name?: string;
  customer: string;
  transaction_date: string;
  delivery_date: string;
  items: SalesOrderItem[];
  grand_total: number;
  status: 'Draft' | 'To Deliver and Bill' | 'To Bill' | 'To Deliver' | 'Completed' | 'Cancelled';
}

export interface SalesOrderItem {
  item_code: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface DeliveryNote {
  name?: string;
  customer: string;
  posting_date: string;
  items: DeliveryNoteItem[];
  status: 'Draft' | 'To Bill' | 'Return Issued' | 'Completed' | 'Cancelled';
}

export interface DeliveryNoteItem {
  item_code: string;
  qty: number;
  against_sales_order?: string;
}

export interface SalesInvoice {
  name?: string;
  customer: string;
  posting_date: string;
  due_date: string;
  items: SalesInvoiceItem[];
  grand_total: number;
  outstanding_amount: number;
  status: 'Draft' | 'Return' | 'Credit Note Issued' | 'Submitted' | 'Paid' | 'Overdue';
}

export interface SalesInvoiceItem {
  item_code: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface PaymentEntry {
  name?: string;
  payment_type: 'Receive';
  party_type: 'Customer';
  party: string;
  paid_amount: number;
  posting_date: string;
  mode_of_payment: string;
  reference_no?: string;
}

// API Service Class
class ERPNextApiService {
  private baseUrl = '/api/resource'; // Frappe API endpoint
  
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Frappe-CSRF-Token': this.getCsrfToken(),
        ...options?.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.data || result;
  }
  
  private getCsrfToken(): string {
    // Get CSRF token from meta tag or cookie
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    return token || '';
  }
  
  // Customer API
  async getCustomers(): Promise<Customer[]> {
    return this.request<Customer[]>('/Customer');
  }
  
  async createCustomer(customer: Omit<Customer, 'name'>): Promise<Customer> {
    return this.request<Customer>('/Customer', {
      method: 'POST',
      body: JSON.stringify(customer),
    });
  }
  
  // Item API
  async getItems(): Promise<Item[]> {
    return this.request<Item[]>('/Item');
  }
  
  async getStockBalance(itemCode: string, warehouse?: string): Promise<StockBalance[]> {
    const filters = warehouse 
      ? `?filters=[["item_code","=","${itemCode}"],["warehouse","=","${warehouse}"]]`
      : `?filters=[["item_code","=","${itemCode}"]]`;
    return this.request<StockBalance[]>(`/Bin${filters}`);
  }
  
  // Sales Order API
  async getSalesOrders(): Promise<SalesOrder[]> {
    return this.request<SalesOrder[]>('/Sales Order');
  }
  
  async createSalesOrder(order: Omit<SalesOrder, 'name'>): Promise<SalesOrder> {
    return this.request<SalesOrder>('/Sales Order', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }
  
  // Delivery Note API
  async getDeliveryNotes(): Promise<DeliveryNote[]> {
    return this.request<DeliveryNote[]>('/Delivery Note');
  }
  
  async createDeliveryNote(note: Omit<DeliveryNote, 'name'>): Promise<DeliveryNote> {
    return this.request<DeliveryNote>('/Delivery Note', {
      method: 'POST',
      body: JSON.stringify(note),
    });
  }
  
  // Sales Invoice API
  async getSalesInvoices(): Promise<SalesInvoice[]> {
    return this.request<SalesInvoice[]>('/Sales Invoice');
  }
  
  async createSalesInvoice(invoice: Omit<SalesInvoice, 'name'>): Promise<SalesInvoice> {
    return this.request<SalesInvoice>('/Sales Invoice', {
      method: 'POST',
      body: JSON.stringify(invoice),
    });
  }
  
  // Payment Entry API
  async getPaymentEntries(): Promise<PaymentEntry[]> {
    return this.request<PaymentEntry[]>('/Payment Entry');
  }
  
  async createPaymentEntry(payment: Omit<PaymentEntry, 'name'>): Promise<PaymentEntry> {
    return this.request<PaymentEntry>('/Payment Entry', {
      method: 'POST',
      body: JSON.stringify(payment),
    });
  }
}

export const erpNextApi = new ERPNextApiService();