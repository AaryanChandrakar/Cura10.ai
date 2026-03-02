<p align="center">
  <img src="https://img.shields.io/badge/Cura10.ai-AI%20Medical%20Diagnostics-0A6EBD?style=for-the-badge&logo=openai&logoColor=white" alt="Cura10.ai" />
</p>

<h1 align="center">🏥 Cura10.ai — AI Agents for Medical Diagnostics</h1>

<p align="center">
  <b>A multi-agent AI platform that uses 10 specialized medical agents to analyze patient reports and deliver comprehensive diagnoses.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.12+-3776AB?logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/React.js-19.x-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/LLM-GPT--4.1-412991?logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Deploy-AWS-FF9900?logo=amazonaws&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [The 10 AI Specialist Agents](#-the-10-ai-specialist-agents)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
  - [Docker Setup](#3-docker-setup-optional)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Deployment (AWS)](#-deployment-aws)
- [Security & Compliance](#-security--compliance)
- [Sample Medical Reports](#-sample-medical-reports)
- [Contributing](#-contributing)
- [License](#-license)
- [Disclaimer](#%EF%B8%8F-disclaimer)

---

## 🧠 Overview

**Cura10.ai** is an AI-powered medical diagnostics platform that leverages **10 specialized AI agents** — each acting as a different medical specialist — to analyze patient medical reports and produce comprehensive, multi-perspective diagnoses.

When a medical report is uploaded, the platform:

1. **Intelligently selects** the most relevant specialists using an AI triage agent
2. **Runs parallel analysis** across multiple specialist agents concurrently
3. **Synthesizes findings** through a Multidisciplinary Team agent into a unified final diagnosis
4. **Identifies the top 3 health issues** with severity ratings, reasoning, and actionable next steps

The platform features a full-stack web application with a **React.js** frontend, **FastAPI** backend, **MongoDB Atlas** database, and is designed for deployment on **AWS**.

> ⚠️ **This project is for research and educational purposes only. It is NOT intended for clinical use or as a substitute for professional medical advice.**

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🧠 **10 AI Specialist Agents** | Cardiologist, Psychologist, Pulmonologist, Neurologist, Endocrinologist, Oncologist, Dermatologist, Gastroenterologist, Orthopedist, General Practitioner |
| 🤖 **Smart Specialist Selection** | AI-powered triage automatically selects the 3–5 most relevant specialists based on report content |
| ⚡ **Parallel Analysis** | All selected specialists analyze the report simultaneously using async thread pools |
| 🏥 **Multidisciplinary Team Diagnosis** | A meta-agent synthesizes all specialist findings into a unified final diagnosis |
| 💬 **Follow-Up Chat** | Context-aware AI chat to ask questions about your diagnosis |
| 📄 **PDF Report Generation** | Professionally formatted, downloadable PDF diagnosis reports using ReportLab |
| 📁 **Multi-Format File Support** | Upload `.txt`, `.pdf`, or `.docx` medical reports |
| 🔐 **Google OAuth 2.0** | Secure sign-in with Google, JWT-based session management |
| 🍪 **Dual Auth Mode** | Supports both `httpOnly` secure cookies and `Bearer` token authentication |
| 🛡️ **HIPAA-Aware Security** | Audit logging, PHI sanitization, data deletion controls |
| ⏱️ **Rate Limiting** | Sliding-window rate limiter (60 req/min per user) |
| 📊 **Analytics Dashboard** | Personal and global usage analytics with time-series charts |
| 👑 **Admin Panel** | User management, role control, system stats, audit logs, API usage monitoring |
| 🐳 **Docker Ready** | Full `docker-compose` setup for one-command local deployment |
| ☁️ **AWS Deployment** | Designed and optimized for AWS cloud hosting |

---

## 🩺 The 10 AI Specialist Agents

Cura10.ai deploys **10 specialized medical AI agents**, each trained with domain-specific prompts to analyze patient reports from their area of expertise:

| # | Specialist | Icon | Focus Area |
|---|---|---|---|
| 1 | **Cardiologist** | ❤️ | ECG, blood tests, Holter monitoring, echocardiogram, arrhythmias, structural heart abnormalities |
| 2 | **Psychologist** | 🧠 | Anxiety, depression, trauma, psychological well-being, therapy recommendations |
| 3 | **Pulmonologist** | 🫁 | Asthma, COPD, lung infections, pulmonary function, respiratory issues |
| 4 | **Neurologist** | 🔬 | Neuropathy, seizures, migraines, MS, Alzheimer's, Parkinson's, neurodegenerative diseases |
| 5 | **Endocrinologist** | 💉 | Diabetes, thyroid disorders, adrenal insufficiency, PCOS, hormonal imbalances |
| 6 | **Oncologist** | 🎗️ | Cancer screening, tumor markers, biopsy analysis, neoplastic conditions |
| 7 | **Dermatologist** | 🧴 | Eczema, psoriasis, skin infections, autoimmune skin disorders, suspicious lesions |
| 8 | **Gastroenterologist** | 🏥 | IBS, IBD (Crohn's, UC), GERD, celiac disease, liver disorders, GI malignancies |
| 9 | **Orthopedist** | 🦴 | Fractures, arthritis, tendon injuries, disc herniation, degenerative joint disease |
| 10 | **General Practitioner** | 🩺 | Holistic health assessment, preventive care, red flag identification, specialist referrals |

Additionally, a **Multidisciplinary Team Agent** aggregates all specialist reports and produces the final unified diagnosis with the **top 3 identified health issues**, severity ratings, and prioritized recommendations.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CURA10.AI PLATFORM                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────┐         ┌──────────────────────────────┐    │
│   │  React.js    │  HTTP   │     FastAPI Backend           │    │
│   │  Frontend    │◄───────►│     (Python 3.12+)            │    │
│   │  (Port 3000) │  REST   │     (Port 8000)               │    │
│   └──────────────┘         └──────────┬───────────────────┘    │
│                                       │                         │
│                            ┌──────────▼───────────────────┐    │
│                            │      AI Agent Engine          │    │
│                            │                               │    │
│                            │  ┌─────┐ ┌─────┐ ┌─────┐    │    │
│                            │  │Card.│ │Psych│ │Pulm.│    │    │
│                            │  └─────┘ └─────┘ └─────┘    │    │
│                            │  ┌─────┐ ┌─────┐ ┌─────┐    │    │
│                            │  │Neuro│ │Endo.│ │Onco.│    │    │
│                            │  └─────┘ └─────┘ └─────┘    │    │
│                            │  ┌─────┐ ┌─────┐ ┌─────┐    │    │
│                            │  │Derm.│ │Gast.│ │Orth.│    │    │
│                            │  └─────┘ └─────┘ └─────┘    │    │
│                            │  ┌─────┐                      │    │
│                            │  │ G.P.│  (Parallel Exec.)    │    │
│                            │  └─────┘                      │    │
│                            │          │                    │    │
│                            │  ┌───────▼──────────────┐    │    │
│                            │  │ Multidisciplinary     │    │    │
│                            │  │ Team Agent            │    │    │
│                            │  └──────────────────────┘    │    │
│                            └──────────┬───────────────────┘    │
│                                       │                         │
│                            ┌──────────▼───────────────────┐    │
│                            │     MongoDB Atlas             │    │
│                            │  (Users, Reports, Diagnoses,  │    │
│                            │   Chats, Analytics, Audits)   │    │
│                            └──────────────────────────────┘    │
│                                       │                         │
│                            ┌──────────▼───────────────────┐    │
│                            │     OpenAI GPT-4.1 API        │    │
│                            └──────────────────────────────┘    │
│                                                                 │
│                    Deployed on: AWS ☁️                           │
└─────────────────────────────────────────────────────────────────┘
```

### Diagnosis Pipeline Flow

```
Medical Report (Upload/Text)
        │
        ▼
┌─────────────────────┐
│  Smart Specialist    │──► AI selects best 3-5 specialists
│  Selector (LLM)     │    from pool of 10
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Parallel Execution  │──► ThreadPoolExecutor runs all
│  (async + threads)   │    selected agents concurrently
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Multidisciplinary   │──► Synthesizes all specialist
│  Team Agent          │    reports into final diagnosis
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Final Diagnosis     │──► Top 3 issues, severity,
│  Report              │    reasoning, next steps
└─────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Python 3.12+** | Core language |
| **FastAPI** | Web framework with async support |
| **Uvicorn** | ASGI server |
| **LangChain** | LLM orchestration (prompts, chains) |
| **OpenAI GPT-4.1** | Large Language Model for all agents |
| **MongoDB Atlas** | Cloud database (via Motor async driver) |
| **ReportLab** | PDF report generation |
| **PyPDF2 / python-docx** | File parsing (.pdf, .docx) |
| **python-jose** | JWT token management |
| **Authlib** | Google OAuth 2.0 integration |

### Frontend
| Technology | Purpose |
|---|---|
| **React.js 19** | UI framework |
| **TypeScript** | Type-safe JavaScript |
| **CSS Modules** | Component-scoped styling |

### Infrastructure
| Technology | Purpose |
|---|---|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **AWS** | Cloud hosting and deployment |
| **MongoDB Atlas** | Managed cloud database |

---

## 📁 Project Structure

```
AI-Agents-for-Medical-Diagnostics/
│
├── backend/                          # FastAPI Backend
│   ├── app/
│   │   ├── api/v1/routes/
│   │   │   ├── auth.py               # Google OAuth + JWT login/logout
│   │   │   ├── reports.py            # Upload, list, view, delete reports
│   │   │   ├── diagnosis.py          # Run AI diagnosis, history, PDF download
│   │   │   ├── chat.py               # Follow-up chat about diagnoses
│   │   │   ├── admin.py              # Admin: users, stats, audit logs, API usage
│   │   │   └── analytics.py          # Personal & global usage analytics
│   │   ├── core/
│   │   │   ├── database.py           # MongoDB Atlas connection (Motor async)
│   │   │   ├── security.py           # JWT, OAuth, RBAC, HIPAA helpers
│   │   │   ├── rate_limiter.py       # Sliding-window rate limiting middleware
│   │   │   ├── audit_logger.py       # HIPAA-compliant audit trail middleware
│   │   │   ├── api_usage_tracker.py  # API endpoint usage analytics
│   │   │   ├── monitoring.py         # Cloud monitoring integration
│   │   │   └── https_redirect.py     # HTTPS enforcement for production
│   │   ├── models/
│   │   │   ├── user.py               # User data models (Pydantic)
│   │   │   ├── report.py             # Report data models
│   │   │   ├── diagnosis.py          # Diagnosis data models
│   │   │   └── chat.py               # Chat session data models
│   │   ├── services/
│   │   │   ├── agent_engine.py       # 🧠 Core: 10 specialist agent definitions + runner
│   │   │   ├── specialist_selector.py # AI-powered specialist triage
│   │   │   ├── chat_service.py       # Follow-up chat with diagnosis context
│   │   │   ├── report_parser.py      # Parse .txt, .pdf, .docx files
│   │   │   └── pdf_generator.py      # Professional PDF report generation
│   │   ├── config.py                 # Centralized app configuration
│   │   └── main.py                   # FastAPI app entry point
│   ├── Dockerfile                    # Backend Docker image
│   ├── requirements.txt              # Python dependencies
│   └── .env.example                  # Environment template
│
├── frontend/                         # React.js Frontend
│   ├── src/
│   │   ├── app/                      # Pages (dashboard, analyze, chat, etc.)
│   │   ├── components/               # Reusable UI components (Sidebar, Charts)
│   │   ├── context/                  # AuthContext (React Context for auth state)
│   │   └── lib/                      # API client (centralized fetch wrapper)
│   ├── public/                       # Static assets
│   ├── Dockerfile                    # Frontend Docker image
│   └── package.json                  # Node.js dependencies
│
├── Utils/
│   └── Agents.py                     # Legacy CLI agents (original 3 agents)
│
├── Main.py                           # Legacy CLI entry point
├── Medical Reports/                  # 10 sample medical reports for testing
├── Results/                          # CLI output directory
├── docker-compose.yml                # Full-stack Docker orchestration
├── .env.example                      # Root environment template
├── .gitignore                        # Git ignore rules
├── LICENSE                           # MIT License
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.12+** — [Download](https://www.python.org/downloads/)
- **Node.js 22+** — [Download](https://nodejs.org/)
- **MongoDB Atlas** account (free tier works) — [Sign Up](https://www.mongodb.com/atlas)
- **OpenAI API Key** (GPT-4.1 access) — [Get Key](https://platform.openai.com/api-keys)
- **Google Cloud OAuth** credentials — [Console](https://console.cloud.google.com/apis/credentials)

### 1. Backend Setup

```bash
# Clone the repository
git clone https://github.com/AaryanChandrakar/AI-Agents-for-Medical-Diagnostics.git
cd AI-Agents-for-Medical-Diagnostics

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install backend dependencies
cd backend
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your actual values (MongoDB URI, OpenAI key, etc.)

# Run the backend
uvicorn app.main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

### 2. Frontend Setup

```bash
# In a new terminal, from the project root
cd frontend

# Install dependencies
npm install

# Configure environment
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run the frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`.

### 3. Docker Setup (Optional)

Run the entire platform with a single command:

```bash
# From the project root
docker-compose up --build
```

This starts both the backend (port `8000`) and frontend (port `3000`) with health checks and auto-restart.

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory using the template below:

```env
# ═══════════════════════════════════════════════
# Cura10.ai — Environment Variables
# ═══════════════════════════════════════════════

# ── MongoDB Atlas ────────────────────────────────
MONGODB_URI="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority"
MONGODB_DB_NAME="cura10ai"

# ── OpenAI API ───────────────────────────────────
OPENAI_API_KEY="your-openai-api-key-here"

# ── Google OAuth 2.0 ────────────────────────────
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-google-client-secret"
OAUTH_REDIRECT_URI="http://localhost:8000/api/v1/auth/callback"

# ── JWT / Auth ──────────────────────────────────
# Generate: python -c "import secrets; print(secrets.token_hex(32))"
JWT_SECRET_KEY="change-this-to-a-secure-random-string"
JWT_ALGORITHM="HS256"
JWT_EXPIRATION_MINUTES=1440

# ── Frontend URL ────────────────────────────────
FRONTEND_URL="http://localhost:3000"

# ── File Upload ─────────────────────────────────
MAX_UPLOAD_SIZE_MB=10
```

---

## 📡 API Reference

All endpoints are prefixed with `/api/v1`. Interactive Swagger docs available at `/docs`.

### Authentication
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/auth/login` | Redirect to Google OAuth | ❌ |
| `GET` | `/auth/callback` | OAuth callback → JWT cookie | ❌ |
| `POST` | `/auth/logout` | Clear session cookie | ✅ |
| `GET` | `/users/me` | Get current user profile | ✅ |

### Reports
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/reports/upload` | Upload file (.txt, .pdf, .docx) | ✅ |
| `POST` | `/reports/text` | Submit report as raw text | ✅ |
| `GET` | `/reports` | List all user reports | ✅ |
| `GET` | `/reports/{id}` | Get report with full content | ✅ |
| `DELETE` | `/reports/{id}` | Delete report + associated data | ✅ |

### Diagnosis
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/diagnosis/specialists` | List all 10 available specialists | ✅ |
| `POST` | `/diagnosis/auto-select/{report_id}` | AI-recommended specialists | ✅ |
| `POST` | `/diagnosis/run` | Run full AI diagnosis pipeline | ✅ |
| `GET` | `/diagnosis/history` | Past diagnoses for current user | ✅ |
| `GET` | `/diagnosis/{id}` | Full diagnosis with all reports | ✅ |
| `GET` | `/diagnosis/{id}/pdf` | Download diagnosis as PDF | ✅ |
| `DELETE` | `/diagnosis/{id}` | Delete diagnosis + associated chats | ✅ |

### Chat
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/chat/{diagnosis_id}` | Send follow-up question | ✅ |
| `GET` | `/chat/{diagnosis_id}` | Get chat history | ✅ |
| `DELETE` | `/chat/{diagnosis_id}` | Delete chat session | ✅ |

### Analytics
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/analytics/me` | Personal usage stats | ✅ |
| `GET` | `/analytics/global` | Platform-wide analytics | 🔒 Admin |
| `GET` | `/analytics/time-series` | Daily diagnosis counts | ✅ |

### Admin
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/admin/users` | List all users | 🔒 Admin |
| `PATCH` | `/admin/users/{id}/role` | Update user role | 🔒 Admin |
| `PATCH` | `/admin/users/{id}/deactivate` | Deactivate user | 🔒 Admin |
| `GET` | `/admin/stats` | System-wide statistics | 🔒 Admin |
| `GET` | `/admin/audit-logs` | Paginated audit log entries | 🔒 Admin |
| `GET` | `/admin/api-usage` | API usage by endpoint | 🔒 Admin |

---

## ☁️ Deployment (AWS)

Cura10.ai is designed for deployment on **Amazon Web Services (AWS)**. Recommended architecture:

### Recommended AWS Services

| Component | AWS Service | Description |
|---|---|---|
| **Backend API** | AWS ECS (Fargate) or EC2 | Containerized FastAPI application |
| **Frontend** | AWS Amplify or S3 + CloudFront | Static React.js hosting with CDN |
| **Database** | MongoDB Atlas (on AWS) | Managed MongoDB cluster in AWS region |
| **Load Balancer** | AWS ALB | Application Load Balancer for HTTPS termination |
| **Secrets** | AWS Secrets Manager | Secure storage for API keys and credentials |
| **DNS** | AWS Route 53 | Domain name management |
| **SSL/TLS** | AWS Certificate Manager | Free SSL certificates |
| **Monitoring** | AWS CloudWatch | Logs, metrics, and alarms |
| **Container Registry** | AWS ECR | Docker image storage |

### Deployment Steps (High-Level)

```bash
# 1. Build Docker images
docker build -t cura10-backend ./backend
docker build -t cura10-frontend ./frontend

# 2. Push to AWS ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker tag cura10-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/cura10-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/cura10-backend:latest

# 3. Deploy to ECS Fargate (or use AWS Copilot for simplified deployment)
aws ecs create-service --cluster cura10-cluster --service-name cura10-backend ...

# 4. Configure environment variables in AWS Secrets Manager
aws secretsmanager create-secret --name cura10/backend-env --secret-string file://.env

# 5. Set up ALB + Route 53 for custom domain with HTTPS
```

### Production Checklist
- [ ] Set `FRONTEND_URL` to your production domain (enables HTTPS redirect)
- [ ] Use strong `JWT_SECRET_KEY` (generate with `secrets.token_hex(32)`)
- [ ] Configure Google OAuth redirect URI for production domain
- [ ] Set up MongoDB Atlas IP whitelist for AWS VPC
- [ ] Enable AWS CloudWatch for logging and monitoring
- [ ] Configure AWS WAF for additional security
- [ ] Set up auto-scaling policies for ECS tasks

---

## 🛡️ Security & Compliance

Cura10.ai implements multiple layers of security:

| Layer | Implementation |
|---|---|
| **Authentication** | Google OAuth 2.0 with JWT tokens |
| **Session Security** | httpOnly cookies (immune to XSS) + Bearer tokens |
| **CORS** | Strict origin whitelisting |
| **Rate Limiting** | 60 requests/minute per user (sliding window) |
| **HTTPS** | Automatic redirect in production |
| **RBAC** | Role-based access: `patient`, `doctor`, `admin` |
| **Audit Logging** | HIPAA-compliant access trail (who, what, when, where) |
| **PHI Protection** | Sensitive data sanitized before logging |
| **Data Deletion** | Users can delete their reports, diagnoses, and chat history |
| **Secrets Management** | All credentials stored in `.env` files, excluded from Git |

---

## 📋 Sample Medical Reports

The project includes **10 sample medical reports** for testing:

| # | Patient | Condition |
|---|---|---|
| 1 | Michael Johnson | Panic Attack Disorder |
| 2 | Robert Miller | COPD |
| 3 | David Wilson | Alzheimer's Disease |
| 4 | James Carter | Insomnia |
| 5 | Anna Thompson | Irritable Bowel Syndrome |
| 6 | Kevin Adams | Diabetic Neuropathy |
| 7 | Laura Garcia | Rheumatoid Arthritis |
| 8 | Maria Silva | Polycystic Ovary Syndrome |
| 9 | Olivia White | Recurrent Tonsillitis |
| 10 | Charles Baker | Prostate Cancer (Suspicion) |

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/my-feature`)
3. **Commit** your changes (`git commit -m 'Add my feature'`)
4. **Push** to the branch (`git push origin feature/my-feature`)
5. **Open** a Pull Request

Please ensure your code follows the existing structure and includes appropriate tests.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## ⚕️ Disclaimer

> **IMPORTANT:** Cura10.ai is an AI-powered tool created for **research and educational purposes only**. It is **NOT** a substitute for professional medical advice, diagnosis, or treatment.
>
> - Always consult a qualified healthcare provider for medical decisions
> - Do not use this tool for clinical or diagnostic purposes
> - The AI-generated reports may contain inaccuracies
> - The creators bear no responsibility for actions taken based on AI-generated reports

---

<p align="center">
  Built with ❤️ by the <b>Cura10.ai</b> Team &nbsp;|&nbsp; Powered by <b>OpenAI GPT-4.1</b> &nbsp;|&nbsp; Deployed on <b>AWS</b>
</p>
