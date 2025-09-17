# Universal Sales Dashboard

A modern React-based sales dashboard integrated with ERPNext backend, designed for both wholesale (B2B) and retail (B2C) operations.

## Architecture

This project follows the **MVC (Model-View-Controller)** pattern with modern React patterns for maintainability and scalability.

### Folder Structure

```
src/
├── models/           # Data layer - ERPNext API services
│   └── erpNextApi.ts # API service class with all ERPNext endpoints
├── views/            # UI layer - main pages
│   ├── Dashboard.tsx # Main dashboard with KPIs and sales flow
│   ├── Customers.tsx # Customer management
│   ├── Orders.tsx    # Sales order management
│   └── Settings.tsx  # Application settings
├── controllers/      # Business logic layer
│   ├── salesController.ts    # Sales operations logic
│   └── customerController.ts # Customer operations logic
├── components/       # Reusable UI components
│   ├── Layout/       # Layout components (Sidebar, etc.)
│   └── Dashboard/    # Dashboard-specific components
├── state/            # Global state management
│   ├── industryStore.ts # Industry mode (wholesale/retail)
│   └── queryClient.ts   # React Query configuration
├── utils/            # Helper functions
└── hooks/            # Custom React hooks
```

## State Management Strategy

### Server State (React Query)
- **Purpose**: Manage data from ERPNext backend
- **Features**: 
  - Automatic caching and revalidation
  - Optimistic updates
  - Error handling
  - Loading states
- **Usage**: All API calls for customers, orders, items, etc.

### Client State (Zustand)
- **Purpose**: Manage UI preferences and temporary data
- **Features**:
  - Lightweight and simple
  - No boilerplate
  - Easy to extend
- **Usage**: Industry mode, form data, UI preferences

## Key Features

### 🏭 Industry Modes
- **Wholesale (B2B)**: Bulk ordering, warehouse management, credit terms
- **Retail (B2C)**: POS interface, quick customers, instant payments

### 📊 Sales Flow Management
Interactive diagram showing: Quotation → Sales Order → Delivery Note → Sales Invoice → Payment Entry

### 🎯 Key Pages
1. **Dashboard**: KPIs, sales flow, recent activity
2. **Customers**: Search, filter, quick retail customer creation
3. **Items & Stock**: Inventory with warehouse-wise tracking
4. **Sales Orders**: Order management with stock validation
5. **Deliveries**: Delivery note creation and tracking
6. **Invoices**: Invoice status management (Draft, Paid, Overdue)
7. **Payments**: Payment entry recording
8. **Reports**: Sales analytics and trends
9. **Settings**: Industry mode switching, ERPNext configuration

## API Integration

### ERPNext Endpoints
All API calls go through the ERPNext Frappe framework:

```typescript
// Example API call
const customers = await erpNextApi.getCustomers();
const newOrder = await erpNextApi.createSalesOrder(orderData);
```

### Supported DocTypes
- Customer
- Item
- Bin (Stock Balance)
- Sales Order
- Delivery Note
- Sales Invoice
- Payment Entry

## Development Workflow

### Adding New Features

1. **Model Layer**: Add API functions in `models/erpNextApi.ts`
2. **Controller Layer**: Create business logic in `controllers/`
3. **View Layer**: Build UI components in `views/` and `components/`

### State Management

```typescript
// Server state (React Query)
const { data: orders, isLoading } = useSalesOrders();

// Client state (Zustand)
const { mode, setMode } = useIndustryStore();
```

### Error Handling
- Toast notifications for user feedback
- Loading states with skeleton loaders
- Graceful error boundaries

## Design System

### Colors & Themes
- **Primary**: Deep blue for enterprise feel
- **Success**: Emerald green for positive actions
- **Warning**: Amber for attention items
- **Semantic tokens**: All colors defined in design system

### Components
- Built on shadcn/ui components
- Fully customizable with variants
- Responsive design
- Dark/light mode support

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure ERPNext**
   - Set up ERPNext backend
   - Configure API endpoints in settings
   - Ensure proper authentication

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Best Practices

### Performance
- React Query for efficient data fetching
- Component-level code splitting
- Optimized re-renders with proper dependencies

### Maintainability
- Clear separation of concerns (MVC)
- TypeScript for type safety
- Consistent naming conventions
- Comprehensive error handling

### User Experience
- Responsive design for all screen sizes
- Fast loading with skeleton states
- Clear feedback with toast notifications
- Intuitive navigation and workflows

## Industry-Specific Features

### Wholesale Mode
- Bulk order processing
- Credit terms management
- Warehouse-wise stock tracking
- Volume pricing support
- Advanced reporting

### Retail Mode
- POS-style interface
- Quick customer creation
- Instant payment processing
- Simple inventory tracking
- Customer loyalty features

This architecture ensures the dashboard is fast, maintainable, and easily extensible for future requirements.