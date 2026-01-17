# Gabi App - Project TODO

## Database & Schema
- [x] Initialize project with webdev_init_project
- [ ] Create database schema (User, Subscription, Program, Content, Progress, Download)
- [ ] Create Drizzle migrations
- [ ] Seed mock data for programs and content

## Models & Types
- [ ] Create TypeScript interfaces for all entities
- [ ] Create shared types file

## Components
- [ ] Header component
- [ ] Footer component
- [ ] ProgressBar component
- [ ] ContentCard component
- [ ] ProgramCard component
- [ ] MiniPlayer component
- [ ] Full Player component (audio/video)
- [ ] HorizontalList component
- [ ] Button variants
- [ ] Input components
- [ ] Navigation/TabBar

## Screens
- [ ] OnboardingScreen
- [ ] LoginScreen
- [ ] RegisterScreen
- [ ] HomeScreen (Dashboard)
- [ ] ExploreScreen
- [ ] ProgramDetailScreen
- [ ] PlayerScreen
- [ ] ProfileScreen
- [ ] DownloadsScreen

## Contexts & Hooks
- [ ] AuthContext
- [ ] PlayerContext
- [ ] ProgressContext
- [ ] useAuth hook
- [ ] usePlayer hook
- [ ] useProgress hook

## Player Logic
- [ ] Implement player state management
- [ ] Implement play/pause controls
- [ ] Implement timeline/seek functionality
- [ ] Implement speed controls (1x, 1.5x, 2x)
- [ ] Implement skip forward/backward (15s)
- [ ] Implement progress update mechanism (every 5s)
- [ ] Implement completion detection

## API Routes (tRPC)
- [ ] /api/auth/* (register, login, logout, me)
- [ ] /api/programs/* (list, getById, getByCategory)
- [ ] /api/content/* (getById, getByProgramId)
- [ ] /api/progress/* (updateProgress, getProgress, getHistory)
- [ ] /api/downloads/* (addDownload, listDownloads, removeDownload)
- [ ] /api/subscriptions/* (getStatus, startTrial)
- [ ] /api/home/* (getHomeData with daily storie, continue listening, recommendations)

## Features
- [ ] Onboarding flow with carousel
- [ ] Login/Register flow
- [ ] Trial subscription (7 days)
- [ ] Home dashboard with daily content highlight
- [ ] Progress bar for journey
- [ ] Continue listening list
- [ ] Recommendations algorithm (simple)
- [ ] Search functionality
- [ ] Category filtering
- [ ] Program detail view
- [ ] Player with full controls
- [ ] Offline downloads
- [ ] User profile management
- [ ] Subscription management
- [ ] History tracking

## Navigation & Layout
- [ ] Setup main app navigation (TabBar)
- [ ] Setup auth navigation
- [ ] Create layout wrapper
- [ ] Implement routing

## Testing
- [ ] Write tests for auth procedures
- [ ] Write tests for progress tracking
- [ ] Write tests for subscription logic

## Deployment & Polish
- [ ] Create initial checkpoint
- [ ] Test all flows end-to-end
- [ ] Polish UI/UX
- [ ] Optimize performance
- [ ] Add error handling
- [ ] Add loading states
