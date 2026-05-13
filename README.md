# Content Broadcasting System

A role-based content management and broadcasting platform for educational environments. Teachers upload subject-based content, principals approve or reject it, and students view live broadcast content on a public page.

Built with Next.js 14 (App Router), Redux Toolkit, shadcn/ui, Tailwind CSS, and React Hook Form.

---

## Tech Stack

| Layer                | Technology              |
| -------------------- | ----------------------- |
| Framework            | Next.js 14 (App Router) |
| Language             | JavaScript (ES6+)       |
| UI Components        | shadcn/ui               |
| Styling              | Tailwind CSS            |
| State Management     | Redux Toolkit           |
| Forms and Validation | React Hook Form + Zod   |
| HTTP Client          | Axios                   |
| Notifications        | Sonner                  |

---

## Getting Started

### Prerequisites

- Node.js 22+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/prernasaxena3/content-broadcasting-system.git
cd content-broadcasting

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Demo Credentials

| Role      | Email              | Password     |
| --------- | ------------------ | ------------ |
| Teacher   | teacher@demo.com   | teacher123   |
| Teacher 2 | teacher2@demo.com  | teacher123   |
| Principal | principal@demo.com | principal123 |

---

## Project Structure

```
content-broadcasting/
├── app/
│   ├── (auth)/login/          # Login page (public)
│   ├── (dashboard)/
│   │   ├── teacher/           # Teacher pages (protected)
│   │   └── principal/         # Principal pages (protected)
│   └── live/[teacherId]/      # Public live broadcast page
├── components/
│   ├── auth/                  # Login form
│   ├── content/               # Upload form, content card
│   ├── dashboard/             # Stats card
│   ├── principal/             # Approval card, reject modal
│   ├── shared/                # Navbar, status badge, empty/error states, skeletons
│   └── ui/                    # shadcn auto-generated components
├── services/                  # API service layer (all API calls live here)
├── store/slices/              # Redux Toolkit slices
├── hooks/                     # Custom hooks (useAuth, useContent, useApprovals)
├── mock/                      # Mock users and content data
├── utils/                     # Constants, validators, helpers
└── proxy.js                   # Next.js middleware for route protection
```

---

## Features

### Teacher

- Dashboard with content statistics (total, pending, approved, rejected)
- Upload content with file preview, subject selection, and scheduling times
- View all uploaded content with status, scheduling state, and rejection reasons

### Principal

- Dashboard with system-wide content statistics
- Review pending content with file preview
- Approve content with one click
- Reject content with a mandatory written reason via modal
- Filter and search all content by status, title, subject, or teacher name

### Public Live Page

- Accessible at `/live/:teacherId` with no login required
- Shows currently active approved content for a given teacher
- Loading, empty, and error states handled

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

The app runs entirely on mock data. Set `NEXT_PUBLIC_API_URL` to your backend URL when connecting a real API. See `services/` for the exact endpoints expected.

---

## Connecting a Real Backend

Each function in the service layer has a comment showing the real API call:

```js
// Current (mock):
export const getMyContent = async (teacherId) => {
  return mockContent.filter((c) => c.teacherId === teacherId);
};

// Replace with:
export const getMyContent = async (teacherId) => {
  return (await api.get(`/content?teacherId=${teacherId}`)).data;
};
```

Only the service layer needs to change. All components, hooks, and Redux logic remain untouched.

---

## Deployment

This project is deployed on Vercel.

**Live URL:** https://content-broadcasting-system-two.vercel.app/

To deploy your own instance:

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to [vercel.com](https://vercel.com) for automatic deployments on push.

---

## Documentation

See `frontend-notes.txt` in the project root for detailed documentation on:

- Authentication flow
- Role-based routing implementation
- API integration approach
- State management decisions
- Performance considerations
- Assumptions made
