# 🏎️ F1 Podium Predictor

An AI-powered Formula 1 podium prediction application that uses machine learning to forecast race results based on historical data, qualifying positions, and driver/constructor performance statistics.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [How It Works](#how-it-works)
- [API Documentation](#api-documentation)
- [Data Sources](#data-sources)
- [Model Information](#model-information)

## 🎯 Overview

The F1 Podium Predictor is a full-stack application that leverages machine learning to predict the top 3 finishers (podium) for any Formula 1 Grand Prix. It combines:

- **Historical F1 data** from multiple seasons
- **Real-time qualifying results** fetched via FastF1
- **XGBoost ML model** trained on driver/constructor performance metrics
- **Modern web interface** for easy interaction

## ✨ Features

- 🏁 Predict podium finishers for any F1 race by season and race name
- 📊 View qualifying positions alongside predicted podium probabilities
- 🎨 Modern, responsive UI with F1-themed design
- ⚡ Real-time predictions using live qualifying data
- 📈 ML model trained on comprehensive historical F1 statistics

## 🛠️ Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **TanStack Query** for data fetching
- **Radix UI** primitives

### Backend (Java)
- **Spring Boot 4.0.1** (Java 21)
- **Spring Web MVC**
- **Lombok** for boilerplate reduction
- **Apache Parquet & Avro** for data processing
- **Apache Hadoop** for distributed data handling

### Python ML Service
- **FastAPI** for REST API
- **XGBoost** for ML predictions
- **FastF1** for real-time F1 data
- **Pandas & NumPy** for data manipulation
- **scikit-learn** for model utilities

## 📁 Project Structure

```
f1-podium-predictor/
├── backend/                    # Spring Boot Java backend
│   ├── src/main/java/
│   │   └── com/f1predictor/backend/
│   │       ├── controller/     # REST controllers
│   │       ├── service/        # Business logic
│   │       └── model/          # Data models
│   └── pom.xml
│
├── frontend/                   # React TypeScript frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── lib/                # Utilities & API client
│   │   └── hooks/              # Custom React hooks
│   └── package.json
│
├── python_service/             # Python ML service
│   ├── api/                    # FastAPI endpoints
│   ├── data_pipeline/          # Data fetching & processing
│   │   ├── fastf1_client.py    # Real-time F1 data
│   │   ├── feature_builder.py  # Feature engineering
│   │   └── feature_store.py    # Historical statistics
│   ├── model/                  # ML model inference
│   └── requirements.txt
│
├── notebook/                   # Jupyter notebooks
│   ├── ml_model.ipynb          # Model training & experiments
│   └── xgb_model.json          # Trained XGBoost model
│
└── data/                       # Historical F1 datasets
    └── raw/                    # CSV files with race data
```

## 📋 Prerequisites

- **Java 21** or higher
- **Maven 3.6+**
- **Node.js 18+** and npm/yarn
- **Python 3.9+**
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd f1-podium-predictor
```

### 2. Backend Setup (Java)

```bash
cd backend
./mvnw clean install
```

### 3. Frontend Setup

```bash
cd frontend
npm install
# or
yarn install
```

### 4. Python Service Setup

```bash
cd python_service
pip install -r requirements.txt
```

**Note:** Update the `MODEL_PATH` in [python_service/model/inference.py](python_service/model/inference.py) to point to your local XGBoost model file.

## 🎮 Running the Application

You need to start all three services:

### 1. Start Java Backend (Port 8080)

```bash
cd backend
./mvnw spring-boot:run
```

### 2. Start Python ML Service (Port 8000)

```bash
cd python_service
uvicorn api.main:app --reload
```

### 3. Start Frontend Dev Server (Port 5173)

```bash
cd frontend
npm run dev
# or
yarn dev
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 🔍 How It Works

1. **User Input**: User enters a race name (e.g., "Monaco Grand Prix") and season year (e.g., 2024)

2. **Data Fetching**: Python service uses FastF1 to fetch qualifying results for that race

3. **Feature Engineering**: System builds feature vectors including:
   - Qualifying position
   - Driver historical performance (wins, podiums, points)
   - Constructor statistics
   - Circuit-specific data

4. **ML Prediction**: XGBoost model predicts podium probability for each driver

5. **Response**: Top 3 drivers with highest probabilities are returned to the frontend

6. **Display**: Results are shown in an elegant podium-style UI

## 📡 API Documentation

### Python Service

#### POST `/predict`

Predicts podium finishers for a given race.

**Request Body:**
```json
{
  "season": 2024,
  "race_name": "Monaco Grand Prix"
}
```

**Response:**
```json
{
  "season": 2024,
  "race": "Monaco Grand Prix",
  "predicted_top3": [
    {
      "driver": "Max Verstappen",
      "qualifying_position": 1,
      "podium_probability": 0.89
    },
    {
      "driver": "Charles Leclerc",
      "qualifying_position": 2,
      "podium_probability": 0.85
    },
    {
      "driver": "Sergio Perez",
      "qualifying_position": 3,
      "podium_probability": 0.78
    }
  ]
}
```

### Java Backend

#### POST `/api/predict`

Proxies prediction requests to the Python service.

**Request Body:**
```json
{
  "season": 2024,
  "raceName": "Monaco Grand Prix"
}
```

## 📊 Data Sources

The project uses historical F1 data including:

- **Races**: Race information, dates, circuits
- **Results**: Final race positions and points
- **Qualifying**: Qualifying session results
- **Drivers**: Driver information and statistics
- **Constructors**: Team information and performance
- **Lap Times**: Detailed lap-by-lap timing data
- **Pit Stops**: Pit stop strategies and durations
- **Sprint Results**: Sprint race outcomes (recent seasons)

Data files are stored in the [data/raw/](data/raw/) directory.

## 🤖 Model Information

### XGBoost Classifier

The prediction model is an **XGBoost binary classifier** that predicts whether a driver will finish on the podium (top 3) for a given race.

**Key Features Used:**
- Qualifying position
- Driver career wins, podiums, and points
- Constructor performance metrics
- Driver recent form (last N races)
- Circuit characteristics

**Training:**
- Model training notebook: [notebook/ml_model.ipynb](notebook/ml_model.ipynb)
- Trained model: [notebook/xgb_model.json](notebook/xgb_model.json)

**Performance:**
- The model considers historical patterns and current form
- Probability scores indicate confidence in podium finish

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📝 License

This project is for educational and demonstration purposes.

## 🙏 Acknowledgments

- **FastF1** for providing real-time F1 data access
- Historical F1 data from Ergast API datasets
- shadcn/ui for beautiful UI components

---

**Note**: Make sure to update the `MODEL_PATH` in the Python service to match your local setup before running predictions.