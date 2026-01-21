# Team Directory Application

A full-stack web application demonstrating ColdFusion REST API integration with a modern React frontend. This project retrieves employee data from a SQLite database via a ColdFusion API and displays it in an interactive, searchable interface.

## 📋 Project Overview

**Technologies Used:**
- **Backend:** Adobe ColdFusion 2025
- **Database:** SQLite 3
- **Frontend:** React 18 + Vite
- **Styling:** Modern CSS with glassmorphism effects
- **API:** RESTful ColdFusion Component (CFC)

**Features:**
- ✅ Secure REST API with CORS support
- ✅ SQL injection prevention using `cfqueryparam`
- ✅ Modern, responsive React UI
- ✅ Real-time employee search functionality
- ✅ Clean, maintainable code architecture

---

## 🚀 Complete Setup Guide

### Prerequisites

Before starting, ensure you have:
- **Adobe ColdFusion 2025** (Developer Edition - free)
- **Node.js** (v20.15.0 or higher)
- **SQLite** command-line tools OR DB Browser for SQLite

---

## Step 1: Database Setup

### Option A: Using SQLite Command Line

1. **Download SQLite Tools:**
   - Visit: https://www.sqlite.org/download.html
   - Download "sqlite-tools-win-x64-*.zip" (Windows 64-bit)
   - Extract `sqlite3.exe` to `d:\Team_directory_app\database\`

2. **Create Database:**
   ```powershell
   cd d:\Team_directory_app\database
   Get-Content schema.sql | .\sqlite3.exe employees.db
   ```

3. **Verify Database:**
   ```powershell
   .\sqlite3.exe employees.db "SELECT COUNT(*) FROM Employees;"
   ```
   Should show: `8`

### Option B: Using DB Browser for SQLite (Recommended - GUI)

1. **Download DB Browser:**
   - Visit: https://sqlitebrowser.org/dl/
   - Download and install "DB Browser for SQLite"

2. **Create Database:**
   - Open DB Browser for SQLite
   - Click "New Database"
   - Navigate to `d:\Team_directory_app\database\`
   - Name it: `employees.db`
   - Click Save, then Cancel on the table creation dialog

3. **Load Data:**
   - Click "Execute SQL" tab
   - Click "Open SQL file" button
   - Select `d:\Team_directory_app\database\schema.sql`
   - Click "Execute" button (▶ Play icon)
   - Click "Write Changes" (Ctrl+S)

4. **Verify:**
   - Click "Browse Data" tab
   - Select table: "Employees"
   - You should see 8 employee records

---

## Step 2: ColdFusion Backend Setup

### A. Install ColdFusion (if not already installed)

1. **Download ColdFusion:**
   - Visit: https://www.adobe.com/products/coldfusion/download-trial.html
   - Select "ColdFusion 2025 Developer Edition" (free)
   - Fill out the form and download (~1.2 GB)

2. **Install ColdFusion:**
   - Run installer as Administrator
   - Choose "Developer Edition"
   - Select "Server configuration"
   - Use default port: `8500`
   - Set admin password (remember this!)
   - Complete installation (~15 minutes)

3. **Verify Installation:**
   - Open browser: `http://localhost:8500/`
   - You should see ColdFusion welcome page

### B. Install SQLite JDBC Driver

1. **Download Driver:**
   - Visit: https://github.com/xerial/sqlite-jdbc/releases
   - Download latest JAR file (e.g., `sqlite-jdbc-3.51.1.0.jar`)

2. **Install Driver:**
   - Copy JAR file to: `C:\ColdFusion2025\cfusion\lib\`
   - Restart ColdFusion service:
     - Open Services (Win+R, type `services.msc`)
     - Find "ColdFusion 2025 Application Server"
     - Right-click → Restart

### C. Deploy Backend Files

**Copy backend to ColdFusion webroot:**
```powershell
Copy-Item -Recurse d:\Team_directory_app\backend\* C:\ColdFusion2025\cfusion\wwwroot\backend\
```

**Also copy the API file:**
```powershell
Copy-Item d:\Team_directory_app\backend\api.cfc C:\ColdFusion2025\cfusion\wwwroot\api.cfc
```

### D. Configure Datasource

1. **Open ColdFusion Administrator:**
   - Go to: `http://localhost:8500/CFIDE/administrator/`
   - Enter your admin password

2. **Add Datasource:**
   - Click "Data & Services" → "Data Sources"
   - **Data Source Name:** `TeamDirectory`
   - **Driver:** Select "Other"
   - Click "Add"

3. **Configure Connection:**
   - **JDBC URL:** `jdbc:sqlite:d:/Team_directory_app/database/employees.db`
   - **Driver Class:** `org.sqlite.JDBC`
   - **Driver Name:** `SQLite`
   - Leave username/password blank
   - Click "Submit"

4. **Verify Connection:**
   - Click "Verify" button next to your datasource
   - Should show "Connection verified"

### E. Test the API

Open your browser and test:
```
http://localhost:8500/api.cfc?method=getEmployees
```

You should see JSON output with 8 employees!

---

## Step 3: React Frontend Setup

### A. Install Dependencies

```powershell
cd d:\Team_directory_app\frontend
npm install
```

### B. Start Development Server

```powershell
npm run dev
```

You should see:
```
VITE v7.3.1  ready in 483 ms

➜  Local:   http://localhost:5173/
```

### C. View Application

Open your browser to: **http://localhost:5173/**

You should see the Team Directory application with:
- 8 employee cards with gradient avatars
- Search bar for filtering employees
- Modern dark theme with glassmorphism effects

---

## 🧪 Testing the Application

### 1. Test Database
```powershell
cd d:\Team_directory_app\database
.\sqlite3.exe employees.db "SELECT * FROM Employees;"
```

### 2. Test ColdFusion API
Open browser: `http://localhost:8500/api.cfc?method=getEmployees`

Expected: JSON array with 8 employee objects

### 3. Test React Frontend
- Open: `http://localhost:5173/`
- Verify all 8 employees are displayed
- Test search: Type "engineer" or a name
- Verify cards filter in real-time

---

## 📁 Project Structure

```
Team_directory_app/
├── database/
│   ├── employees.db          # SQLite database (created during setup)
│   └── schema.sql            # Database schema and sample data
├── backend/
│   ├── Application.cfc       # ColdFusion app configuration
│   ├── EmployeeService.cfc   # REST API component
│   └── api.cfc              # Simple API endpoint (used by frontend)
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API service layer
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   ├── package.json         # Node dependencies
│   └── vite.config.js       # Vite configuration
├── README.md                # This file
├── VIDEO_SCRIPT.md          # 2-minute video walkthrough guide
└── .gitignore              # Git ignore rules
```

---

## 🔒 Security Features

### SQL Injection Prevention
All database queries use `cfqueryparam` for parameterized queries:
```coldfusion
<cfquery name="qEmployees" datasource="TeamDirectory">
    SELECT * FROM Employees 
    WHERE ID = <cfqueryparam value="#arguments.id#" cfsqltype="cf_sql_integer">
</cfquery>
```

### CORS Configuration
CORS headers are set globally in `Application.cfc` and `api.cfc`:
```coldfusion
<cfheader name="Access-Control-Allow-Origin" value="*">
<cfheader name="Access-Control-Allow-Methods" value="GET, POST, OPTIONS">
```

### Error Handling
Comprehensive try-catch blocks with logging:
```coldfusion
<cftry>
    <!--- Database operations --->
    <cfcatch>
        <cflog type="error" file="TeamDirectory" text="#cfcatch.message#">
        <!--- Return appropriate error response --->
    </cfcatch>
</cftry>
```

---

## 🎨 Design Features

- **Modern UI:** Glassmorphism effects, gradients, smooth animations
- **Responsive Design:** Mobile-first approach, works on all screen sizes
- **Accessibility:** Semantic HTML, proper ARIA labels
- **Performance:** Optimized React hooks (useState, useEffect, useCallback)
- **User Experience:** Real-time search, loading states, error handling

---

## 🛠️ Troubleshooting

### Issue: "Datasource TeamDirectory could not be found"
**Solution:** 
- Verify datasource is created in CF Administrator
- Check datasource name is exactly "TeamDirectory"
- Restart ColdFusion service

### Issue: CORS errors in browser console
**Solution:**
- Ensure `api.cfc` has CORS headers
- Check `Application.cfc` has CORS configuration
- Clear browser cache and refresh

### Issue: React app shows "Failed to load employees"
**Solution:**
- Verify ColdFusion is running: `http://localhost:8500/`
- Test API directly: `http://localhost:8500/api.cfc?method=getEmployees`
- Check browser console for specific errors

### Issue: Database file not found
**Solution:**
- Verify database path in CF Administrator datasource
- Ensure path uses forward slashes: `d:/Team_directory_app/database/employees.db`
- Check file exists and has read permissions

---

## 📝 API Endpoints

### Get All Employees
```
GET http://localhost:8500/api.cfc?method=getEmployees
```

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "Sarah",
    "lastName": "Johnson",
    "role": "Senior Software Engineer",
    "createdAt": "2026-01-20"
  },
  ...
]
```

---

## 🎥 Recording Your Demo Video

Use the included `VIDEO_SCRIPT.md` for a detailed 2-minute walkthrough guide covering:
1. Database demonstration
2. ColdFusion API showcase
3. React frontend demo with search
4. Code walkthrough highlighting security features

---

## 📦 Submission Checklist

Before submitting:
- [ ] Database created with 8 employee records
- [ ] ColdFusion API returns JSON successfully
- [ ] React frontend displays all employees
- [ ] Search functionality works
- [ ] 2-minute video recorded
- [ ] All source code included
- [ ] README.md is complete

---

## 👨‍💻 Author

**Abdul Baqi Qureshi**

Built as a technical assessment for the Software Intern - Adobe ColdFusion position at Sabre/MED49 Solutions.

---

## 📄 License

This project is created for educational and assessment purposes.
