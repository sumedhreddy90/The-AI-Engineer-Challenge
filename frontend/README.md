# 🚀 AI Chat Frontend

Welcome to the **AI Chat Frontend** - a beautiful, modern chat interface powered by GPT-4.1-nano! ✨

This is a React-based frontend that connects to your FastAPI backend to create an amazing AI chat experience. Think of it as ChatGPT, but with your own custom backend and a gorgeous UI! 🎨

## ✨ Features

- **Real-time Streaming**: Watch AI responses appear word by word, just like the real ChatGPT!
- **Beautiful UI**: Modern, responsive design with smooth animations and gradients
- **Settings Management**: Easy configuration for API keys and model selection
- **Chat History**: Your conversations are saved locally (for now!)
- **Connection Status**: Real-time backend health monitoring
- **Keyboard Shortcuts**: Press Enter to send, Shift+Enter for new lines
- **Mobile Friendly**: Works perfectly on all devices

## 🛠️ Tech Stack

- **React 18** with TypeScript for type safety
- **Tailwind CSS** for beautiful, responsive styling
- **Lucide React** for crisp, modern icons
- **Streaming API** for real-time responses
- **Local Storage** for persistent settings

## 🚀 Quick Start

### Prerequisites

Make sure you have:
- Node.js 16+ installed
- Your FastAPI backend running (see the `api/` folder)
- An OpenAI API key (get one from [OpenAI Platform](https://platform.openai.com/))

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser** and go to `http://localhost:3000`

5. **Configure your settings:**
   - Click the settings icon (⚙️) in the top right
   - Enter your OpenAI API key
   - Choose your preferred model
   - Set a custom system message (optional)

6. **Start chatting!** 🎉

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8000
```

### Available Models

- `gpt-4.1-nano` (default) - Fast and efficient
- `gpt-4.1-mini` - Balanced performance
- `gpt-4o-mini` - Latest and greatest

## 🎨 Customization

### Styling

The app uses Tailwind CSS, so you can easily customize colors, spacing, and more by editing:
- `tailwind.config.js` - Theme configuration
- `src/index.css` - Custom component styles

### Components

All components are modular and reusable:
- `ChatMessage.tsx` - Individual message display
- `TypingIndicator.tsx` - Loading animation
- `SettingsModal.tsx` - Configuration panel
- `App.tsx` - Main application logic

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `build/` folder.

### Deploy Options

- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `build/` folder
- **AWS S3**: Upload the `build/` folder to an S3 bucket
- **Docker**: Use the provided Dockerfile (coming soon!)

## 🔍 Troubleshooting

### Common Issues

1. **"Connection Failed"**
   - Make sure your FastAPI backend is running on port 8000
   - Check the `REACT_APP_API_URL` environment variable

2. **"API Key Error"**
   - Verify your OpenAI API key is correct
   - Ensure you have sufficient credits in your OpenAI account

3. **"Module not found"**
   - Run `npm install` to install missing dependencies
   - Clear your node_modules and reinstall if needed

### Debug Mode

Enable debug logging by opening the browser console and typing:
```javascript
localStorage.setItem('debug', 'true')
```

## 🤝 Contributing

Want to make this even better? Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📝 License

This project is part of The AI Engineer Challenge. Feel free to use, modify, and distribute!

## 🎯 What's Next?

- [ ] Voice input/output
- [ ] File upload support
- [ ] Chat export functionality
- [ ] Multiple conversation tabs
- [ ] Custom themes
- [ ] Plugin system

---

**Happy coding! 🎉**

*Built with ❤️ and lots of ☕*