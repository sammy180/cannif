# OpenCAN-ESP32 Launch Website

A modern launch website for the OpenCAN-ESP32 product with integrated waitlist database and admin dashboard.

## Features

- **Modern Launch Website**: Built with Next.js, React, and Tailwind CSS
- **Waitlist Database**: SQLite database for storing waitlist entries
- **Admin Dashboard**: View and manage waitlist entries with statistics
- **Image Organization**: Structured image folders for different content types
- **Responsive Design**: Mobile-first approach with beautiful animations

## Project Structure

```
canweb/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── globals.css        # Global styles
│   └── layout.js          # Root layout
├── api/                   # API routes
│   └── waitlist/          # Waitlist API endpoints
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── database/             # Database files
│   ├── init.js          # Database initialization
│   └── schema.sql       # Database schema
├── images/              # Image assets
│   ├── hero/            # Hero section images
│   ├── features/        # Feature demonstration images
│   ├── products/        # Product photos and variants
│   └── logos/           # Logos and branding
├── lib/                 # Utility functions
├── main.ts              # Main launch site component
└── admin/               # Admin dashboard components
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Initialize Database

The database will be automatically created when you first run the application. The SQLite database file will be created at `database/waitlist.db`.

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at:
- **Main Site**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

### 4. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Waitlist API

- `POST /api/waitlist` - Add new waitlist entry
- `GET /api/waitlist` - Get waitlist entries (with pagination)
- `GET /api/waitlist/stats` - Get waitlist statistics

### Example API Usage

```javascript
// Add to waitlist
const response = await fetch('/api/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Tech Corp',
    variant: 'CAN FD',
    notes: 'Interested in automotive applications',
    agree: true
  })
});

// Get waitlist entries
const entries = await fetch('/api/waitlist?page=1&limit=20');
const data = await entries.json();
```

## Database Schema

The waitlist database includes the following fields:

- `id` - Primary key
- `name` - User's full name
- `email` - Email address (unique)
- `company` - Company/organization (optional)
- `variant` - Product variant (CAN, CAN FD, LIN)
- `notes` - Additional notes (optional)
- `agree` - Terms agreement (boolean)
- `created_at` - Timestamp
- `updated_at` - Last updated timestamp

## Image Management

Images are organized in the following structure:

- **Hero Images**: Main product visuals and hero section graphics
- **Feature Images**: Demonstrations of key features (IP68, automotive grade)
- **Product Images**: Variant comparisons and technical diagrams
- **Logo Assets**: Branding and certification badges

## Admin Dashboard

The admin dashboard provides:

- **Statistics Overview**: Total entries, recent signups, variant breakdown
- **Entry Management**: View all waitlist entries with pagination
- **Export Functionality**: Download entries as CSV
- **Real-time Updates**: Automatic refresh of statistics

## Customization

### Adding New Images

1. Place images in the appropriate folder (`images/hero/`, `images/features/`, etc.)
2. Update the `main.ts` file to reference the new images
3. Ensure images are optimized for web use

### Modifying the Database

1. Update `database/schema.sql` with new fields
2. Modify `database/init.js` if needed
3. Update API routes in `api/waitlist/` to handle new fields

### Styling Changes

- Global styles: `app/globals.css`
- Component styles: Individual component files
- Tailwind configuration: `tailwind.config.js`

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables if needed
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
