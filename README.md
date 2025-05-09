# CookieShield Dashboard

A modern, responsive administration interface for the CookieShield consent management system. Built with Next.js, this dashboard allows for easy configuration of cookie consent banners with live preview.

## Motivation

CookieShield was created with the mission to provide a 100% GDPR (DSGVO) and BITV compliant cookie consent solution that is both powerful and free to use. We believe that legal compliance shouldn't be a premium feature - everyone should have access to tools that help them follow privacy regulations while maintaining complete control over design and functionality.

## Features

- 100% GDPR (DSGVO) and BITV compliant cookie management
- Free to use with all features included
- Live preview of banner changes
- Highly customizable design settings (colors, fonts, animations)
- Multi-language support for international websites
- Responsive interface works on all devices
- Persistent settings with local storage
- Integration with CookieShield Backend API

## Requirements

- Node.js 16.x or higher
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file with the backend API URL:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The dashboard will be accessible at `http://localhost:3000`.

## Building for Production

Build the production version:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
yarn start
```

## Integration with CookieShield Backend

This dashboard is designed to work seamlessly with the CookieShield Backend API. Make sure the backend server is running and the `.env.local` file is configured with the correct API URL.

## Customizing

- Modify colors and styles in the `globals.css` file
- Add new features by extending the components in the `components` directory
- Add new languages by updating the translations in the settings

## Developer

Developed by Casian Blanaru at PixelCoda.

- Email: casian@me.com
- Company: PixelCoda

## License

This project is licensed under the MIT License. See the LICENSE file for details.
