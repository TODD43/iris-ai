# IRIS AI

IRIS AI is a 3D beauty and dermatological AI studio built with Next.js, React Three Fiber, MediaPipe face landmarks, and AssemblyAI voice streaming.

## Features
- Real-time webcam face tracking
- 3D beauty mesh overlay with reactive product shading
- AssemblyAI streaming voice assistant integration
- Product try-on catalog and coaching guidance
- Mirror mode with AI-powered symmetry / precision / blending scoring

## Local development

1. Install dependencies:
   npm install
2. Copy environment file:
   cp .env.example .env.local
3. Start the app:
   npm run dev

## Production notes
- Set `NEXT_PUBLIC_ASSEMBLYAI_API_KEY` for live voice recognition
- Set `OPENAI_API_KEY` for your AI agent endpoint
- Use `scripts/push-to-github.sh <GITHUB_REPO_URL>` to publish the project
