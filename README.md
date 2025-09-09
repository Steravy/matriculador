# Matriculador - Digital Registration System for Driving Schools

## 🚗 The Story Behind Matriculador

After experiencing firsthand the tedious manual registration process at a driving school in Cape Verde, I decided it was time to innovate. Long queues, repetitive paper forms, disorganized payment processes, and constant document misplacement were the norm. Hours wasted, frustration mounting, and the realization that this could all be so much better.

**Matriculador** was born from this frustration and the vision to completely transform the driving school registration experience, making it digital, efficient, and accessible for both students and institutions.

## 🎯 Mission

To digitize and modernize the registration process in Cape Verde's driving schools, eliminating unnecessary bureaucracy and providing a seamless, professional experience for everyone involved.

## ✨ Key Features

### For Students
- **Complete Online Registration**: Fill out digital forms without leaving home
- **Secure Document Upload**: Digitize and submit personal documents safely
- **Real-time Status Tracking**: Always know where your registration stands
- **Integrated Payment System**: Online payments with automatic confirmation
- **Personal Dashboard**: Access all your data and history in one place
- **Mobile QR Code**: Quick check-in for classes via smartphone

### For Driving Schools
- **Administrative Dashboard**: Complete overview of all registrations and their status
- **Document Management**: Digital organization of all student documents
- **Reports & Analytics**: Detailed statistics on enrollments and revenue
- **Automated Notifications**: Streamlined communication with students
- **Class Management**: Efficient organization of schedules and instructors
- **Multi-location Support**: Manage multiple school branches from one platform

### Technological Innovations
- **QR Code System**: Students scan to register or check-in for classes
- **Digital Signatures**: Legally valid digitally signed documents
- **Smart Reminders**: Automatic notifications for renewals and upcoming classes
- **Multi-language Support**: Portuguese and Cape Verdean Creole
- **Installment Payments**: Flexible payment plans with tracking

## 🛠 Technology Stack

### Frontend & Framework
- **Next.js 15** with App Router for optimized performance
- **React 19** for interactive interfaces
- **Tailwind CSS 4** for responsive, modern design
- **shadcn/ui** for consistent, accessible components

### Backend & Database
- **PostgreSQL** for secure, scalable storage
- **Prisma ORM** for efficient database management
- **Better Auth** for robust, secure authentication

### Integrations & Services
- **Resend** for email communications
- **React PDF** for official document generation
- **QR Code** generation for innovative features
- **Zod** for rigorous data validation

## 📊 Data Models

The system manages comprehensive driving school operations:

- **Driving Schools**: Multi-tenant support with unique QR codes
- **Course Plans**: Carta Ligeira, Carta Pesada, and other license types
- **Students**: Complete profile with Cape Verde-specific ID types
- **Registrations**: Enrollment tracking with status workflow
- **Payments**: Full payment history with installment support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/alkiware/matriculador.git

# Enter the directory
cd matriculador

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### Key Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start in production
npm run lint         # Code linting
npm run test         # Run tests
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js routes and pages
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application area
│   ├── actions/           # Server actions
│   ├── api/               # API endpoints
│   ├── dashboard/         # Admin dashboard
│   └── escola/            # Public school routes (planned)
├── components/
│   ├── forms/             # Registration forms
│   ├── ui/                # UI components
│   └── dashboard/         # Dashboard components
├── lib/
│   ├── services/          # Business logic
│   ├── validators/        # Validation schemas
│   ├── email/             # Email templates
│   └── auth.ts            # Authentication config
└── prisma/
    └── schema.prisma      # Data models
```

## 🔒 Security

- Robust authentication with secure sessions
- Encryption of sensitive data
- Rigorous input validation
- CSRF and XSS protection
- GDPR compliance ready

## 🌍 Social Impact

Matriculador is more than just a technological tool - it's a solution that:
- **Reduces registration time** from days to minutes
- **Eliminates queues** and unnecessary trips
- **Reduces errors** through automatic validation
- **Saves paper** contributing to sustainability
- **Democratizes access** allowing registration from anywhere
- **Improves transparency** with clear payment tracking

## 🤝 Contributing

We welcome contributions! If you share our vision of modernizing administrative processes in Cape Verde:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📈 Future Roadmap

- [ ] Complete driving school module implementation
- [ ] Mobile app for students
- [ ] Integration with government systems
- [ ] Expansion to other types of schools
- [ ] Advanced analytics dashboard
- [ ] Instructor scheduling system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions, suggestions, or partnerships:
- Email: info@matriculador.cv
- Website: [www.matriculador.cv](https://matriculador.cv)

---

Developed with ❤️ in Cape Verde, to transform the driving school registration experience.