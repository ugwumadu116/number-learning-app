# Kids Learning Games App

An interactive learning application for kids featuring numbers, alphabets, colors, and drums with audio feedback.

## Features

- **Numbers Learning**: Tap numbers to hear them pronounced
- **Alphabet Learning**: Interactive A-Z letter learning with audio
- **Color Learning**: Discover colors with fun animations and sounds
- **Drum Learning**: Play virtual drums with realistic sounds
- **Swipe Interface**: Swipe between different learning modules
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15.3.4 with React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Audio**: HTML5 Audio API

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Start production server**:
   ```bash
   npm start
   ```

## Deployment to Render.com

### Prerequisites
- A Render.com account
- Your code pushed to a Git repository (GitHub, GitLab, etc.)

### Deployment Steps

1. **Push your code to Git**:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Render.com**:

   **Option A: Using render.yaml (Recommended)**
   - The `render.yaml` file is already configured
   - Connect your Git repository to Render
   - Render will automatically detect and deploy using the configuration

   **Option B: Manual Setup**
   - Go to [Render.com](https://render.com) and sign in
   - Click "New +" and select "Web Service"
   - Connect your Git repository
   - Configure the service:
     - **Name**: `number-learning-app` (or your preferred name)
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Environment Variables**:
       - `NODE_ENV`: `production`

3. **Automatic Deployments**:
   - Render will automatically deploy when you push changes to your main branch
   - Each deployment gets a unique URL
   - You can set up a custom domain if needed

### Environment Variables

The following environment variables are automatically set by Render:
- `NODE_ENV`: Set to `production` for optimized builds

### Build Configuration

The app uses the following build configuration:
- **Node.js**: Latest LTS version
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Static Files**: Served from the `public` directory

### Performance Optimizations

- Static generation for better performance
- Optimized images and audio files
- Responsive design for all devices
- Efficient bundle splitting

## Project Structure

```
number-learning-app/
├── public/
│   └── sounds/          # Audio files for learning modules
├── src/
│   └── app/            # Next.js app router pages
│       ├── alphabets/  # Alphabet learning module
│       ├── colors/     # Color learning module
│       ├── drums/      # Drum learning module
│       ├── numbers/    # Number learning module
│       └── swipe/      # Swipe interface
├── render.yaml         # Render.com deployment configuration
└── package.json        # Dependencies and scripts
```

## Audio Files

The app includes audio files for:
- **Numbers**: 1-10 pronunciation
- **Alphabets**: A-Z letter sounds
- **Colors**: Color names with examples
- **Drums**: Various drum sounds

All audio files are stored in the `public/sounds/` directory and are served statically.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
