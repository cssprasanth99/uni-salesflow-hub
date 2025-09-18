// Mock API Service for Universal Sales Dashboard
import { 
  mockCustomers, 
  mockItems, 
  mockQuotations, 
  mockSalesOrders, 
  mockDeliveryNotes, 
  mockSalesInvoices, 
  mockPaymentEntries, 
  mockKPIData,
  mockStockBalances,
  generateId 
} from '@/data/mockData';
import type {
  Customer,
  Item,
  Quotation,
  SalesOrder,
  DeliveryNote,
  SalesInvoice,
  PaymentEntry,
  KPIData,
  StockBalance,
  ReportData
} from './types';

// Simulate API delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

class MockApiService {
  private customers: Customer[] = [...mockCustomers];
  private items: Item[] = [...mockItems];
  private quotations: Quotation[] = [...mockQuotations];
  private salesOrders: SalesOrder[] = [...mockSalesOrders];
  private deliveryNotes: DeliveryNote[] = [...mockDeliveryNotes];
  private salesInvoices: SalesInvoice[] = [...mockSalesInvoices];
  private paymentEntries: PaymentEntry[] = [...mockPaymentEntries];
  private stockBalances: any[] = [...mockStockBalances];

  // Simulate network error occasionally
  private simulateError(errorRate: number = 0.1) {
    if (Math.random() < errorRate) {
      throw new Error('Network error: Please try again');
    }
  }

  // ============= CUSTOMERS =============
  async getCustomers(): Promise<Customer[]> {
    await delay();
    this.simulateError(0.05);
    return [...this.customers];
  }

  async getCustomer(name: string): Promise<Customer | null> {
    await delay();
    return this.customers.find(c => c.name === name) || null;
  }

  async createCustomer(customer: Omit<Customer, 'name'>): Promise<Customer> {
    await delay();
    this.simulateError(0.05);
    const newCustomer: Customer = {
      ...customer,
      name: `CUST-${generateId().toUpperCase()}`,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  async updateCustomer(name: string, updates: Partial<Customer>): Promise<Customer> {
    await delay();
    this.simulateError(0.05);
    const index = this.customers.findIndex(c => c.name === name);
    if (index === -1) throw new Error('Customer not found');
    
    this.customers[index] = { ...this.customers[index], ...updates };
    return this.customers[index];
  }

  async deleteCustomer(name: string): Promise<void> {
    await delay();
    this.simulateError(0.05);
    const index = this.customers.findIndex(c => c.name === name);
    if (index === -1) throw new Error('Customer not found');
    
    this.customers.splice(index, 1);
  }

  // ============= ITEMS =============
  async getItems(): Promise<Item[]> {
    await delay();
    this.simulateError(0.05);
    return [...this.items];
  }

  async getItem(itemCode: string): Promise<Item | null> {
    await delay();
    return this.items.find(i => i.item_code === itemCode) || null;
  }

  async createItem(item: Item): Promise<Item> {
    await delay();
    this.simulateError(0.05);
    this.items.push(item);
    return item;
  }

  async updateItem(itemCode: string, updates: Partial<Item>): Promise<Item> {
    await delay();
    this.simulateError(0.05);
    const index = this.items.findIndex(i => i.item_code === itemCode);
    if (index === -1) throw new Error('Item not found');
    
    this.items[index] = { ...this.items[index], ...updates };
    return this.items[index];
  }

  async deleteItem(itemCode: string): Promise<void> {
    await delay();
    this.simulateError(0.05);
    const index = this.items.findIndex(i => i.item_code === itemCode);
    if (index === -1) throw new Error('Item not found');
    
    this.items.splice(index, 1);
  }

  // ============= QUOTATIONS =============
  async getQuotations(): Promise<Quotation[]> {
    await delay();
    this.simulateError(0.05);
    return [...this.quotations];
  }

  async getQuotation(name: string): Promise<Quotation | null> {
    await delay();
    return this.quotations.find(q => q.name === name) || null;
  }

  async createQuotation(quotation: Omit<Quotation, 'name'>): Promise<Quotation> {
    await delay();
    this.simulateError(0.05);
    const newQuotation: Quotation = {
      ...quotation,
      name: `QTN-${generateId().toUpperCase()}`,
    };
    this.quotations.push(newQuotation);
    return newQuotation;
  }

  async updateQuotation(name: string, updates: Partial<Quotation>): Promise<Quotation> {
    await delay();
    this.simulateError(0.05);
    const index = this.quotations.findIndex(q => q.name === name);
    if (index === -1) throw new Error('Quotation not found');
    
    this.quotations[index] = { ...this.quotations[index], ...updates };
    return this.quotations[index];
  }

  async deleteQuotation(name: string): Promise<void> {
    await delay();
    this.simulateError(0.05);
    const index = this.quotations.findIndex(q => q.name === name);
    if (index === -1) throw new Error('Quotation not found');
    
    this.quotations.splice(index, 1);
  }

  // ============= SALES ORDERS =============
  async getSalesOrders(): Promise<SalesOrder[]> {
    await delay();
    this.simulateError(0.05);
    return [...this.salesOrders];
  }

  async getSalesOrder(name: string): Promise<SalesOrder | null> {
    await delay();
    return this.salesOrders.find(o => o.name === name) || null;
  }

  async createSalesOrder(order: Omit<SalesOrder, 'name'>): Promise<SalesOrder> {
    await delay();
    this.simulateError(0.05);
    const newOrder: SalesOrder = {
      ...order,
      name: `SO-${generateId().toUpperCase()}`,
    };
    this.salesOrders.push(newOrder);
    return newOrder;
  }

  async updateSalesOrder(name: string, updates: Partial<SalesOrder>): Promise<SalesOrder> {
    await delay();
    this.simulateError(0.05);
    const index = this.salesOrders.findIndex(o => o.name === name);
    if (index === -1) throw new Error('Sales Order not found');
    
    this.salesOrders[index] = { ...this.salesOrders[index], ...updates };
    return this.salesOrders[index];
  }

  async deleteSalesOrder(name: string): Promise<void> {
    await delay();
    this.simulateError(0.05);
    const index = this.salesOrders.findIndex(o => o.name === name);
    if (index === -1) throw new Error('Sales Order not found');
    
    this.salesOrders.splice(index, 1);
  }

  // ============= DELIVERY NOTES =============
  async getDeliveryNotes(): Promise<DeliveryNote[]> {
    await delay();
    this.simulateError(0.05);
    return [...this.deliveryNotes];
  }

  async createDeliveryNote(note: Omit<DeliveryNote, 'name'>): Promise<DeliveryNote> {
    await delay();
    this.simulateError(0.05);
    const newNote: DeliveryNote = {
      ...note,
      name: `DN-${generateId().toUpperCase()}`,
    };
    this.deliveryNotes.push(newNote);
    return newNote;
  }

  async updateDeliveryNote(name: string, updates: Partial<DeliveryNote>): Promise<DeliveryNote> {
    await delay();
    this.simulateError(0.05);
    const index = this.deliveryNotes.findIndex(d => d.name === name);
    if (index === -1) throw new Error('Delivery Note not found');
    
    this.deliveryNotes[index] = { ...this.deliveryNotes[index], ...updates };
    return this.deliveryNotes[index];
  }

  async deleteDeliveryNote(name: string): Promise<void> {
    await delay();
    this.simulateError(0.05);
    const index = this.deliveryNotes.findIndex(d => d.name === name);
    if (index === -1) throw new Error('Delivery Note not found');
    
    this.deliveryNotes.splice(index, 1);
  }

  // ============= SALES INVOICES =============
  async getSalesInvoices(): Promise<SalesInvoice[]> {
    await delay();
    this.simulateError(0.05);
    return [...this.salesInvoices];
  }

  async createSalesInvoice(invoice: Omit<SalesInvoice, 'name'>): Promise<SalesInvoice> {
    await delay();
    this.simulateError(0.05);
    const newInvoice: SalesInvoice = {
      ...invoice,
      name: `INV-${generateId().toUpperCase()}`,
    };
    this.salesInvoices.push(newInvoice);
    return newInvoice;
  }

  async updateSalesInvoice(name: string, updates: Partial<SalesInvoice>): Promise<SalesInvoice> {
    await delay();
    this.simulateError(0.05);
    const index = this.salesInvoices.findIndex(i => i.name === name);
    if (index === -1) throw new Error('Sales Invoice not found');
    
    this.salesInvoices[index] = { ...this.salesInvoices[index], ...updates };
    return this.salesInvoices[index];
  }

  async deleteSalesInvoice(name: string): Promise<void> {
    await delay();
    this.simulateError(0.05);
    const index = this.salesInvoices.findIndex(i => i.name === name);
    if (index === -1) throw new Error('Sales Invoice not found');
    
    this.salesInvoices.splice(index, 1);
  }

  // ============= PAYMENT ENTRIES =============
  async getPaymentEntries(): Promise<PaymentEntry[]> {
    await delay();
    this.simulateError(0.05);
    return [...this.paymentEntries];
  }

  async createPaymentEntry(payment: Omit<PaymentEntry, 'name'>): Promise<PaymentEntry> {
    await delay();
    this.simulateError(0.05);
    const newPayment: PaymentEntry = {
      ...payment,
      name: `PAY-${generateId().toUpperCase()}`,
    };
    this.paymentEntries.push(newPayment);
    return newPayment;
  }

  async updatePaymentEntry(name: string, updates: Partial<PaymentEntry>): Promise<PaymentEntry> {
    await delay();
    this.simulateError(0.05);
    const index = this.paymentEntries.findIndex(p => p.name === name);
    if (index === -1) throw new Error('Payment Entry not found');
    
    this.paymentEntries[index] = { ...this.paymentEntries[index], ...updates };
    return this.paymentEntries[index];
  }

  async deletePaymentEntry(name: string): Promise<void> {
    await delay();
    this.simulateError(0.05);
    const index = this.paymentEntries.findIndex(p => p.name === name);
    if (index === -1) throw new Error('Payment Entry not found');
    
    this.paymentEntries.splice(index, 1);
  }

  // ============= STOCK & KPIs =============
  async getStockBalance(itemCode: string, warehouse?: string): Promise<StockBalance[]> {
    await delay();
    this.simulateError(0.05);
    return this.stockBalances.filter(s => 
      s.item_code === itemCode && 
      (warehouse ? s.warehouse === warehouse : true)
    );
  }

  async getKPIData(): Promise<KPIData> {
    await delay();
    this.simulateError(0.05);
    
    // Calculate real-time KPIs from current data
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = this.salesOrders.filter(o => o.transaction_date === today);
    const today_sales = todayOrders.reduce((sum, o) => sum + (o.grand_total || 0), 0);
    
    const pending_deliveries = this.deliveryNotes.filter(d => d.delivery_status !== 'Delivered').length;
    const outstanding_payments = this.salesInvoices
      .filter(i => i.status !== 'Paid')
      .reduce((sum, i) => sum + (i.outstanding_amount || 0), 0);

    return {
      today_sales,
      pending_deliveries,
      outstanding_payments,
      quotations_count: this.quotations.length,
      orders_count: this.salesOrders.length,
      deliveries_count: this.deliveryNotes.length,
      invoices_count: this.salesInvoices.length,
      payments_count: this.paymentEntries.length,
    };
  }

  // ============= REPORTS =============
  async getReportsData(dateRange: { from: string; to: string }): Promise<ReportData> {
    await delay();
    this.simulateError(0.05);
    
    // Mock report data
    return {
      date_range: dateRange,
      sales_trends: [
        { date: '2024-01-15', amount: 12999.90 },
        { date: '2024-01-20', amount: 1999.85 },
        { date: '2024-01-21', amount: 299.99 },
        { date: '2024-01-22', amount: 42499.50 },
        { date: '2024-01-23', amount: 299.99 },
      ],
      top_customers: [
        { customer: 'Global Manufacturing Inc', total_sales: 55499.40 },
        { customer: 'Acme Corporation', total_sales: 3999.70 },
        { customer: 'Tech Solutions Ltd', total_sales: 6499.95 },
        { customer: 'John Smith', total_sales: 599.98 },
      ],
      top_items: [
        { item_code: 'PROD-003', item_name: 'Laptop Computer', qty_sold: 35, total_amount: 45499.65 },
        { item_code: 'PROD-004', item_name: 'Office Chair', qty_sold: 25, total_amount: 9999.75 },
        { item_code: 'PROD-001', item_name: 'Premium Wireless Headphones', qty_sold: 16, total_amount: 4799.84 },
        { item_code: 'PROD-002', item_name: 'Smart Phone Case', qty_sold: 30, total_amount: 1499.70 },
      ],
    };
  }
}

export const mockApiService = new MockApiService();