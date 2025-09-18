// TypeScript interfaces for the Universal Sales Dashboard

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

export interface Quotation {
  name: string;
  customer: string;
  quotation_date: string;
  valid_till: string;
  items: QuotationItem[];
  grand_total: number;
  status: 'Draft' | 'Submitted' | 'Converted' | 'Cancelled';
}

export interface QuotationItem {
  item_code: string;
  qty: number;
  rate: number;
  amount: number;
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
  warehouse?: string;
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

export interface StockBalance {
  item_code: string;
  warehouse: string;
  actual_qty: number;
  reserved_qty: number;
  available_qty: number;
}

export interface ReportData {
  date_range: {
    from: string;
    to: string;
  };
  sales_trends: {
    date: string;
    amount: number;
  }[];
  top_customers: {
    customer: string;
    total_sales: number;
  }[];
  top_items: {
    item_code: string;
    item_name: string;
    qty_sold: number;
    total_amount: number;
  }[];
}