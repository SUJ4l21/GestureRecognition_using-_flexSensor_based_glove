# 🧤 Flex Sensor Based Glove for Sign Language Recognition and Multilingual Speech Translation

[![GitHub Stars](https://img.shields.io/github/stars/SUJ4l21/GestureRecognition_using-_flexSensor_based_glove?style=social)](https://github.com/SUJ4l21/GestureRecognition_using-_flexSensor_based_glove)
[![GitHub Forks](https://img.shields.io/github/forks/SUJ4l21/GestureRecognition_using-_flexSensor_based_glove?style=social)](https://github.com/SUJ4l21/GestureRecognition_using-_flexSensor_based_glove)

## 🎯 Overview

This is a cutting-edge **sign language recognition and translation system** that uses a **flex sensor-based smart glove** to capture hand gestures and convert them into text and speech in multiple languages. The system combines hardware sensors, machine learning, and a modern web interface to break barriers in communication for the deaf and hard of hearing community.

### Key Features
- 🤖 **Real-time gesture recognition** using LSTM neural networks
- 📊 **Multi-sensor data acquisition** (5 flex sensors + 6-axis IMU)
- 🌐 **Multilingual translation** powered by Google Cloud Translation API
- 🔊 **Text-to-speech synthesis** in multiple languages
- 💻 **Modern web interface** built with Next.js
- ⚡ **Real-time processing pipeline** with continuous data monitoring
- 📱 **Responsive design** for desktop and mobile devices

---

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Hardware Requirements](#hardware-requirements)
3. [System Architecture](#system-architecture)
4. [Installation & Setup](#installation--setup)
5. [Module Details](#module-details)
6. [Running the System](#running-the-system)
7. [Configuration](#configuration)
8. [API Endpoints](#api-endpoints)
9. [Troubleshooting](#troubleshooting)
10. [Future Enhancements](#future-enhancements)
11. [Contributors](#contributors)
12. [License](#license)

---

## 📂 Project Structure

```
FLEX-SENSOR-BASED-GLOVE/
├── DATA_AQUISITION/              # Data collection from hardware sensors
│   ├── csv_generator.py          # Serial data logger from Arduino/Microcontroller
│   └── data.csv                  # Raw sensor data storage
│
├── gesture-lstm/                 # Machine learning model & inference
│   ├── run.py                    # Main model inference script
│   ├── rnn_lstm_letter_classifier.keras  # Trained LSTM model
│   ├── scaler.pkl                # StandardScaler for feature normalization
│   ├── label_encoder.pkl         # Label encoder for gesture classes
│   ├── requirements.txt           # Python dependencies
│   ├── setup.sh                  # Linux/macOS setup script
│   ├── setup.bat                 # Windows setup script
│   └── README.md                 # Model documentation
│
├── web-interface/                # Next.js web application
│   ├── app/
│   │   ├── page.tsx              # Home page with main interface
│   │   ├── layout.tsx            # App layout & metadata
│   │   ├── globals.css           # Global styling
│   │   ├── about/
│   │   │   └── page.tsx          # About page
│   │   ├── technology/
│   │   │   └── page.tsx          # Technology stack page
│   │   ├── api/                  # Backend API routes
│   │   │   ├── model-output/     # Receives predictions from ML model
│   │   │   ├── translate/        # Google Cloud Translation API
│   │   │   └── tts/              # Text-to-Speech API
│   │   ├── components/
│   │   │   ├── Navbar.tsx        # Navigation component
│   │   │   └── Translator.tsx    # Main translator UI component
│   │   └── public/               # Static assets
│   ├── model_inference.py        # Python script to process CSV & send predictions
│   ├── model_original_modified.py # Alternative model integration
│   ├── send-model-output.py      # Utility script to send data to API
│   ├── model_requirements.txt    # Python dependencies for model integration
│   ├── package.json              # Node.js dependencies
│   ├── next.config.ts            # Next.js configuration
│   ├── tsconfig.json             # TypeScript configuration
│   ├── eslint.config.mjs         # ESLint configuration
│   ├── postcss.config.mjs        # PostCSS configuration
│   ├── MODEL_INTEGRATION.md      # Model integration guide
│   └── README.md                 # Web interface documentation
│
└── README.md                     # This file
```

---

## 🔧 Hardware Requirements

### Microcontroller
- **Arduino Uno/Mega** or **ESP32**
- USB connection for serial communication

### Sensors
- **5 Flex Sensors** - one for each finger
  - Measure flexion of fingers (0-270 degrees)
  - Voltage divider circuit required
  
- **6-Axis IMU (Inertial Measurement Unit)**
  - **Gyroscope** - measures angular velocity (GYRx, GYRy, GYRz)
  - **Accelerometer** - measures linear acceleration (ACCx, ACCy, ACCz)
  - Common modules: MPU-6050, ICM-20689

### Data Interface
- Sensors → Microcontroller → USB Serial → Computer

### Software Requirements
- Python 3.8+
- Node.js 18+ (for web interface)
- TensorFlow/Keras
- Google Cloud SDK (for translation & TTS)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      SMART GLOVE SYSTEM                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
              ┌─────▼─────┐      ┌─────▼──────┐
              │   Sensors │      │ Microcontroller │
              │ (Flex+IMU)│      │  (Arduino)  │
              └─────┬─────┘      └─────┬──────┘
                    │                   │
                    └─────────┬─────────┘
                              │ USB Serial
                    ┌─────────▼─────────┐
                    │   DATA_AQUISITION  │
                    │   csv_generator.py │
                    │    (data.csv)      │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │   gesture-lstm/   │
                    │    run.py          │
                    │ (LSTM Model)       │
                    │ Predictions: A-Z   │
                    └─────────┬─────────┘
                              │ HTTP POST
                    ┌─────────▼─────────────────┐
                    │  web-interface/app/api/   │
                    │  model-output             │
                    └─────────┬─────────────────┘
                              │
                ┌─────────────┼─────────────────┐
                │             │                 │
        ┌───────▼────┐ ┌──────▼──────┐ ┌───────▼────┐
        │ Translator │ │  Translate  │ │    TTS     │
        │  Component │ │   API       │ │   API      │
        │            │ │ (Google)    │ │ (Google)   │
        └───────┬────┘ └──────┬──────┘ └───────┬────┘
                │             │                 │
                └─────────────┼─────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │  User Interface    │
                    │  (Web Browser)     │
                    │  - Display Text    │
                    │  - Play Audio      │
                    └────────────────────┘
```

---

## 📦 Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Python 3.8+** → [Download](https://www.python.org/downloads/)
- **Node.js 18+** → [Download](https://nodejs.org/)
- **Git** → [Download](https://git-scm.com/)

### Clone the Repository
```bash
git clone https://github.com/SUJ4l21/GestureRecognition_using-_flexSensor_based_glove.git
cd FLEX-SENSOR-BASED-GLOVE
```

### 1️⃣ Setup Data Acquisition (DATA_AQUISITION)

This module collects raw sensor data from your microcontroller.

#### Windows Setup
```bash
cd DATA_AQUISITION
python csv_generator.py
```

#### Linux/macOS Setup
```bash
cd DATA_AQUISITION
python3 csv_generator.py
```

**Configuration:**
- Edit `csv_generator.py` and set:
  - `SERIAL_PORT` - Your COM port (e.g., 'COM10' on Windows, '/dev/ttyUSB0' on Linux)
  - `BAUD_RATE` - Typically 115200
  - `OUTPUT_DIR` - Where to save CSV files

**Output:** `data.csv` with columns:
```
flex_1, flex_2, flex_3, flex_4, flex_5, GYRx, GYRy, GYRz, ACCx, ACCy, ACCz
```

---

### 2️⃣ Setup ML Model (gesture-lstm)

This module runs the trained LSTM model for real-time gesture recognition.

#### Windows Setup
```bash
cd gesture-lstm
setup.bat
```

#### Linux/macOS Setup
```bash
cd gesture-lstm
chmod +x setup.sh
./setup.sh
```

#### Manual Setup
```bash
cd gesture-lstm
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### Run the Model
```bash
python run.py
```

**Configuration in `run.py`:**
- `WATCH_DIR` - Path to DATA_AQUISITION folder
- `TARGET_FILE` - CSV filename to monitor
- `CHECK_INTERVAL` - Seconds between file checks
- `API_ENDPOINT` - Web app endpoint (default: `http://localhost:3000/api/model-output`)

**Output:** Real-time predictions sent to web interface via HTTP POST

---

### 3️⃣ Setup Web Interface (web-interface)

This is the frontend and API backend built with Next.js.

#### Installation
```bash
cd web-interface
npm install
```

#### Environment Setup
Create a `.env.local` file in `web-interface/`:
```env
# Google Cloud Configuration
GOOGLE_APPLICATION_CREDENTIALS=./gcloud-credentials.json
GOOGLE_PROJECT_ID=your-project-id
```

#### Development Server
```bash
npm run dev
```
Visit: http://localhost:3000

#### Production Build
```bash
npm run build
npm start
```

---

## 📚 Module Details

### DATA_AQUISITION Module
**Purpose:** Captures real-time sensor data from the flex glove hardware

**File: `csv_generator.py`**
- Reads sensor data from serial port (Arduino/Microcontroller)
- Organizes data into structured CSV format
- Stores data points with timestamps
- Creates multiple files based on configurable row limits

**Key Functions:**
- `start_data_logger()` - Main data collection loop
- Serial communication handling
- CSV file management and rotation

**Output Format:**
```csv
flex_1,flex_2,flex_3,flex_4,flex_5,GYRx,GYRy,GYRz,ACCx,ACCy,ACCz
145,230,178,200,190,2.5,-1.2,0.8,0.1,-0.2,0.05
```

---

### gesture-lstm Module
**Purpose:** Machine learning inference for sign language gesture recognition

**Files:**
- **`run.py`** - Main inference script
- **`rnn_lstm_letter_classifier.keras`** - Trained LSTM model
- **`scaler.pkl`** - StandardScaler for feature normalization
- **`label_encoder.pkl`** - Maps predictions to letter classes (A-Z, space, etc.)

**Model Architecture:**
- **Input:** 120 timesteps × 11 features (flex sensors + IMU)
- **Processing:** LSTM layers for temporal pattern recognition
- **Output:** Probability distribution across gesture classes

**Data Pipeline:**
1. Raw CSV data from sensors
2. Feature scaling using pre-trained scaler
3. Sliding window creation (120-step window, 20-step stride)
4. LSTM prediction for each window
5. Post-processing (filtering, smoothing)
6. Sending to web API

**Example Usage:**
```bash
python run.py
# Monitors DATA_AQUISITION/data.csv
# Automatically processes new data
# Sends predictions to http://localhost:3000/api/model-output
```

---

### web-interface Module
**Purpose:** Modern web UI for translation and accessibility

**Technology Stack:**
- **Frontend:** React 19 + TypeScript + Next.js 15
- **Styling:** Tailwind CSS 4
- **Backend APIs:** Next.js API routes
- **Cloud Services:** Google Cloud Translation & Text-to-Speech
- **UI Components:** Lucide React icons

**Key Components:**

#### **`app/components/Translator.tsx`** - Main UI Component
- Displays recognized text from glove
- Language selection (20+ languages)
- Translation display
- Audio playback controls
- Real-time updates via polling

#### **`app/api/model-output/route.ts`** - Model Prediction Endpoint
```
POST /api/model-output
Body: { text: "ABC" }
```
Receives predictions from ML model, stores in state

#### **`app/api/translate/route.ts`** - Translation Endpoint
```
POST /api/translate
Body: { text: "ABC", targetLanguage: "es" }
Response: { translatedText: "ABC" }
```
Translates text using Google Cloud Translate API

#### **`app/api/tts/route.ts`** - Text-to-Speech Endpoint
```
POST /api/tts
Body: { text: "ABC", language: "es-ES" }
Response: { audioUrl: "data:audio/mp3;base64,..." }
```
Converts text to speech using Google Cloud TTS API

**Pages:**
- `/` - Home page with translator interface
- `/about` - Project information
- `/technology` - Tech stack documentation

---

## 🚀 Running the System

### Full System Startup (All 3 Components)

#### Terminal 1: Start Web Server
```bash
cd web-interface
npm run dev
# Output: ✓ Ready on http://localhost:3000
```

#### Terminal 2: Start ML Model Service
```bash
cd gesture-lstm
source venv/bin/activate  # On Windows: venv\Scripts\activate
python run.py
# Output: ⏳ Watching for new data...
```

#### Terminal 3: Start Data Collection
```bash
cd DATA_AQUISITION
python csv_generator.py
# Output: Listening on COM10 at 115200 baud...
# Connect your flex sensor glove via USB
```

### Interaction Flow
1. **Hardware** captures hand gesture → Serial data
2. **Data Acquisition** reads serial → Saves CSV
3. **ML Model** monitors CSV → Predicts gesture (A-Z, space, etc.)
4. **Model sends** prediction to Web API
5. **Web Interface** receives text → Translates → Speaks
6. **User** sees translated text and hears audio

---

## ⚙️ Configuration

### 1. Data Acquisition (`DATA_AQUISITION/csv_generator.py`)
```python
SERIAL_PORT = 'COM10'              # Your serial port
BAUD_RATE = 115200                 # Microcontroller baud rate
DATA_POINTS_PER_LINE = 11          # Sensor count (5 flex + 6 IMU)
LINES_PER_FILE = 120               # Rows per CSV file before rotation
OUTPUT_DIR = "..."                 # Output directory path
```

### 2. ML Model (`gesture-lstm/run.py`)
```python
WATCH_DIR = "..."                  # Path to DATA_AQUISITION folder
TARGET_FILE = "data.csv"           # CSV file to monitor
CHECK_INTERVAL = 3                 # Seconds between checks
API_ENDPOINT = "http://localhost:3000/api/model-output"
WINDOW = 120                       # Timesteps per sample
STEP = 20                          # Stride for sliding window
```

### 3. Web Interface (`web-interface/.env.local`)
```env
GOOGLE_APPLICATION_CREDENTIALS=./gcloud-credentials.json
GOOGLE_PROJECT_ID=your-gcp-project-id
```

### 4. Supported Languages
The system supports 100+ languages including:
- Spanish (es), French (fr), German (de), Italian (it)
- Chinese (zh), Japanese (ja), Korean (ko)
- Arabic (ar), Hindi (hi), Russian (ru)
- And many more via Google Cloud Translation

---

## 🔌 API Endpoints

### Web API Routes

#### 1. **POST `/api/model-output`**
Receives gesture predictions from ML model
```bash
curl -X POST http://localhost:3000/api/model-output \
  -H "Content-Type: application/json" \
  -d '{"text": "HELLO"}'
```
**Response:** `{ success: true }`

---

#### 2. **POST `/api/translate`**
Translates text to target language
```bash
curl -X POST http://localhost:3000/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello", "targetLanguage": "es"}'
```
**Response:** `{ translatedText: "Hola" }`

---

#### 3. **POST `/api/tts`**
Converts text to speech (audio bytes)
```bash
curl -X POST http://localhost:3000/api/tts \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello", "language": "en-US"}'
```
**Response:** `{ audioUrl: "data:audio/mp3;base64,..." }`

---

## 🐛 Troubleshooting

### Issue 1: Serial Port Not Found
**Error:** `Cannot open COM10`

**Solutions:**
1. Verify microcontroller is connected via USB
2. Check port number:
   - **Windows:** Device Manager → Ports (COM & LPT)
   - **Linux/macOS:** `ls /dev/tty*` or `dmesg | grep ttyUSB`
3. Install CH340 driver if using clone boards
4. Update `SERIAL_PORT` in `csv_generator.py`

---

### Issue 2: Model Predictions Not Appearing
**Error:** No data in web interface after ML runs

**Debugging:**
1. Check web server is running: `http://localhost:3000`
2. Verify CSV has data: `cat DATA_AQUISITION/data.csv`
3. Check model output logs for errors
4. Verify `API_ENDPOINT` in `run.py` matches web server URL
5. Test API endpoint manually:
   ```bash
   curl -X POST http://localhost:3000/api/model-output \
     -H "Content-Type: application/json" \
     -d '{"text": "TEST"}'
   ```

---

### Issue 3: Translation Not Working
**Error:** API returns 400 or 401

**Solutions:**
1. Verify Google Cloud credentials file exists
2. Check `.env.local` has correct `GOOGLE_PROJECT_ID`
3. Ensure Google Cloud Translation API is enabled
4. Check API quotas in Google Cloud Console
5. View server logs: `npm run dev` shows errors

---

### Issue 4: Text-to-Speech Error
**Error:** Audio not playing

**Solutions:**
1. Check Google Cloud TTS API is enabled
2. Verify credentials have TTS permissions
3. Test with simple text: "Hello"
4. Check browser console for CORS errors
5. Ensure audio element is not muted in browser

---

### Issue 5: Python Virtual Environment Issues
**Error:** `No module named tensorflow`

**Solutions:**
```bash
# Deactivate current environment
deactivate

# Delete old venv
rm -rf gesture-lstm/venv  # Linux/macOS
rmdir /s gesture-lstm\venv  # Windows

# Reinstall
cd gesture-lstm
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

---

### Issue 6: Port Already in Use
**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/macOS
lsof -i :3000
kill -9 <PID>
```

---

## 🚀 Future Enhancements

- [ ] **Mobile App** - React Native for iOS/Android
- [ ] **Real-time Visualization** - Sensor data graphs
- [ ] **Model Training Interface** - Add new gestures without retraining from scratch
- [ ] **Offline Mode** - Run ML model without internet
- [ ] **Multi-user Support** - Calibration per user
- [ ] **Gesture Recording** - Train custom gestures
- [ ] **Cloud Deployment** - AWS/Azure/GCP integration
- [ ] **Advanced Animations** - Hand gesture visualization
- [ ] **Accessibility** - Screen reader support
- [ ] **Analytics** - Usage tracking and statistics

---

## 📊 Performance Metrics

| Component | Metric | Value |
|-----------|--------|-------|
| **Data Acquisition** | Sampling Rate | ~100 Hz |
| **Model Inference** | Latency | 50-100 ms |
| **Web Interface** | Page Load | <1 s |
| **Translation** | API Latency | 200-500 ms |
| **TTS** | Generation Time | 1-2 s |
| **Overall E2E** | Gesture to Speech | 3-5 s |

---

## 📝 Usage Examples

### Example 1: Real-time Sign Language Recognition
```
1. Put on flex sensor glove
2. Make gesture (e.g., letter "A")
3. System recognizes and displays: "A"
4. Translate to Spanish: "A" → "A"
5. TTS pronounces in Spanish
```

### Example 2: Sentence Formation
```
Gesture sequence: H → E → L → L → O
System combines: "HELLO"
Translate to French: "HELLO" → "BONJOUR"
Audio plays French pronunciation
```

### Example 3: Real-time Communication
```
User 1 (with glove): Makes signs
System: Recognizes → Translates → Speaks
User 2: Hears translated speech
Accessible communication established!
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Areas
- [ ] Hardware calibration improvements
- [ ] Model accuracy enhancement
- [ ] Web UI/UX improvements
- [ ] Documentation expansion
- [ ] Bug fixes and optimizations
- [ ] Additional language support

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Contributors

- **Lead Developer:** [Your Name/SUJ4l21]
- **Project Advisor:** [If applicable]
- **Contributors:** [List any additional contributors]

---

## 📧 Contact & Support

- **GitHub Issues:** [Report bugs or request features](https://github.com/SUJ4l21/GestureRecognition_using-_flexSensor_based_glove/issues)
- **Email:** [Your contact email if available]
- **Documentation:** Check individual module README files for detailed guides

---

## 🙏 Acknowledgments

- **TensorFlow/Keras** - Deep learning framework
- **Google Cloud** - Translation and TTS APIs
- **Next.js** - Modern web framework
- **Arduino Community** - Microcontroller support
- **Open Source Community** - Various libraries and tools

---

## 📚 References & Resources

### Hardware
- [Arduino Official Documentation](https://www.arduino.cc/en/Guide)
- [Flex Sensor Datasheets](https://www.flexpoint.com/)
- [MPU-6050 Datasheet](https://invensense.tdk.com/)

### Machine Learning
- [TensorFlow Documentation](https://www.tensorflow.org/)
- [LSTM Explained](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)
- [Time Series Forecasting Guide](https://www.tensorflow.org/tutorials/structured_data/time_series)

### Web Development
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Google Cloud APIs](https://cloud.google.com/docs)

### Related Projects
- [Hand Gesture Recognition](https://github.com/topics/hand-gesture-recognition)
- [Sign Language Recognition](https://github.com/topics/sign-language-recognition)
- [IoT Gesture Systems](https://github.com/topics/gesture-recognition)

---

**Made with ❤️ for accessible communication**

---

*Last Updated: December 2024*
*Repository: [GestureRecognition_using-_flexSensor_based_glove](https://github.com/SUJ4l21/GestureRecognition_using-_flexSensor_based_glove)*
