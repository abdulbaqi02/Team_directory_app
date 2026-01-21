-- Team Directory Database Schema
-- SQLite Database for Employee Management

-- Drop table if exists (for clean setup)
DROP TABLE IF EXISTS Employees;

-- Create Employees table
CREATE TABLE Employees (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Role VARCHAR(100) NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample employee data
INSERT INTO Employees (FirstName, LastName, Role) VALUES
    ('Sarah', 'Johnson', 'Senior Software Engineer'),
    ('Michael', 'Chen', 'Product Manager'),
    ('Emily', 'Rodriguez', 'UX/UI Designer'),
    ('James', 'Williams', 'DevOps Engineer'),
    ('Priya', 'Patel', 'Data Scientist'),
    ('David', 'Thompson', 'Frontend Developer'),
    ('Lisa', 'Anderson', 'Backend Developer'),
    ('Robert', 'Martinez', 'QA Engineer');

-- Verify data insertion
SELECT * FROM Employees;
