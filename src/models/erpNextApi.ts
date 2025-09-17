// ERPNext API Service Layer
// This will handle all communication with ERPNext backend

export interface Customer {
  name: string;
  customer_name: string;
  customer_type: 'Company' | 'Individual';
  territory: string;
  customer_group: string;
  email_id?: string;
  mobile_no?: string;
  contact_email?: string;
  contact_phone?: string;
  billing_address?: string;
  shipping_address?: string;
  gstin?: string;
}

export interface Item {
  item_code: string;
  item_name: string;
  description: string;
  item_group: string;
  stock_uom: string;
  standard_rate: number;
  is_stock_item: boolean;
}

export interface ItemPrice {
  item_code: string;
  price_list: string;
  price_list_rate: number;
}

export interface StockBalance {
  item_code: string;
  warehouse: string;
  actual_qty: number;
  reserved_qty: number;
  available_qty: number;
}

export interface KPIData {
  today_sales: number;
  pending_deliveries: number;
  outstanding_payments: number;
  quotations_count: number;
  orders_count: number;
  deliveries_count: number;
  invoices_count: number;
  payments_count: number;
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
  sales_order?: string;
  posting_date: string;
  items: DeliveryNoteItem[];
  shipping_address?: string;
  delivery_status: 'Pending' | 'Out for Delivery' | 'Delivered';
  status: 'Draft' | 'To Bill' | 'Return Issued' | 'Completed' | 'Cancelled';
}

export interface DeliveryNoteItem {
  item_code: string;
  qty: number;
  warehouse: string;
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
  payment_type: 'Receive' | 'Pay';
  party_type: 'Customer';
  party: string;
  paid_amount: number;
  posting_date: string;
  mode_of_payment: 'Cash' | 'Bank' | 'UPI' | 'Card';
  reference_invoice?: string;
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
  
  // Dashboard KPIs API
  async getKPIData(): Promise<KPIData> {
    const [orders, deliveries, invoices, payments] = await Promise.all([
      this.request<any[]>('/Sales Order?filters=[["docstatus","=","1"]]'),
      this.request<any[]>('/Delivery Note?filters=[["status","!=","Delivered"]]'),
      this.request<any[]>('/Sales Invoice?filters=[["status","!=","Paid"]]'),
      this.request<any[]>('/Payment Entry'),
    ]);

    // Calculate today's sales
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.transaction_date === today);
    const today_sales = todayOrders.reduce((sum, o) => sum + (o.grand_total || 0), 0);

    return {
      today_sales,
      pending_deliveries: deliveries.length,
      outstanding_payments: invoices.reduce((sum, i) => sum + (i.outstanding_amount || 0), 0),
      quotations_count: 0, // TODO: Implement quotations
      orders_count: orders.length,
      deliveries_count: deliveries.length,
      invoices_count: invoices.length,
      payments_count: payments.length,
    };
  }

  // Customer API
  async getCustomers(): Promise<Customer[]> {
    return this.request<Customer[]>('/Customer?fields=["name","customer_name","customer_type","email_id","mobile_no"]');
  }

  async createCustomer(customer: Omit<Customer, 'name'>): Promise<Customer> {
    return this.request<Customer>('/Customer', {
      method: 'POST',
      body: JSON.stringify(customer),
    });
  }

  async getCustomerHistory(customerName: string): Promise<any[]> {
    return this.request<any[]>(`/Sales Invoice?filters=[["customer","=","${customerName}"]]`);
  }
  
  // Item API
  async getItems(): Promise<Item[]> {
    return this.request<Item[]>('/Item?fields=["item_code","item_name","description","stock_uom"]');
  }

  async getStockBalance(itemCode: string, warehouse?: string): Promise<StockBalance[]> {
    const filters = warehouse 
      ? `?filters=[["item_code","=","${itemCode}"],["warehouse","=","${warehouse}"]]`
      : `?filters=[["item_code","=","${itemCode}"]]`;
    return this.request<StockBalance[]>(`/Bin${filters}`);
  }

  async getItemPrice(itemCode: string, priceList: string = 'Retail Price List'): Promise<ItemPrice[]> {
    return this.request<ItemPrice[]>(`/Item Price?filters=[["item_code","=","${itemCode}"],["price_list","=","${priceList}"]]`);
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