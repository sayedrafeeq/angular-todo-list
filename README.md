# Angular Todo-List Application

A simple and elegant todo-list web application built with Angular 21.1.4, featuring create, read, update, and delete (CRUD) operations with persistent local storage.

## Project Configuration

- **Angular CLI**: 21.1.5
- **Angular**: 21.1.4
- **TypeScript**: 5.9.2
- **Node.js**: 24.14.0
- **npm**: 11.10.0

## Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete individual todos
- ✅ Filter todos by status (All, Active, Completed)
- ✅ Clear all completed todos at once
- ✅ Persistent storage using browser localStorage
- ✅ Responsive design for mobile and desktop
- ✅ Modern gradient UI with smooth animations

## Project Structure

```
todo-list/
├── src/
│   ├── app/
│   │   ├── app.ts           # Main component (standalone)
│   │   ├── app.html         # Component template
│   │   ├── app.css          # Component styles
│   │   └── app.spec.ts      # Component tests
│   ├── main.ts              # Application entry point
│   ├── index.html           # Main HTML file
│   └── styles.css           # Global styles
├── angular.json             # Angular CLI configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## Getting Started

### Prerequisites

Ensure you have the required versions installed:
- Node.js 24.14.0 or higher
- npm 11.10.0 or higher

### Installation

1. Navigate to the project directory:
```bash
cd todo-list
```

2. Install dependencies:
```bash
npm install
```

### Development Server

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200/`

The application will automatically recompile when you make changes to the files.

### Building for Production

Build the application for production deployment:
```bash
npm run build
```

The build artifacts will be stored in the `dist/todo-list` directory.

### Running Tests

Run unit tests via Vitest:
```bash
npm test
```

Watch for file changes and rerun tests:
```bash
npm run watch
```

## Usage

1. **Add a Todo**: Type text in the input field and click "Add Todo" or press Enter
2. **Complete a Todo**: Check the checkbox next to a todo item
3. **Delete a Todo**: Click the "✕" button to delete a specific todo
4. **Filter Todos**: Use the filter buttons to view All, Active, or Completed todos
5. **Clear Completed**: Click "Clear Completed" to remove all completed todos at once

## Technical Implementation

### Standalone Components
The application uses Angular's standalone API with:
- `@Component` decorator with `standalone: true`
- Direct `imports` array for dependencies
- No NgModules required

### State Management
- Uses Angular signals (`signal`, `effect`) for reactive state management
- Zero external dependencies for state management
- Automatic UI updates through signal reactivity

### Storage
- Data persists using browser's `localStorage`
- Automatic save on every operation
- Data loads automatically on application startup

### Styling
- CSS Grid and Flexbox for responsive layouts
- CSS Variables for consistent theming
- Gradient background with smooth transitions
- Mobile-responsive design with media queries

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Guidelines

- Follow Angular best practices and style guide
- Use TypeScript strict mode
- Maintain semantic HTML structure
- Ensure accessibility (a11y) standards
- Keep components focused and reusable
- Use RxJS observables when needed for complex async operations

## Performance Optimization

- Lazy-loaded component imports
- Optimized change detection with signals
- Efficient DOM rendering with control flow
- Minimal bundle size

## Troubleshooting

### Port Already in Use
If port 4200 is already in use, specify a different port:
```bash
ng serve --port 4300
```

### Clear Node Modules
If you encounter dependency issues:
```bash
rm -r node_modules
npm install
```

### Reset Build Cache
```bash
ng cache clean
```

## Contributing

When contributing to this project:
1. Follow the existing code style
2. Test your changes thoroughly
3. Update documentation as needed
4. Keep components modular and focused

## License

This project is open source and available under the MIT License.

## Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev)

## Support

For issues, questions, or suggestions, please refer to the Angular documentation or create an issue in your repository.

