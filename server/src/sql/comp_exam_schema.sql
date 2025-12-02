-- Comp Exam Settings Table
CREATE TABLE IF NOT EXISTS CompExamSettings (
    id INT PRIMARY KEY DEFAULT 1,
    exam_date VARCHAR(100) NOT NULL DEFAULT 'May 8th, 2025',
    exam_time VARCHAR(100) NOT NULL DEFAULT '9 AM - 12 PM',
    location VARCHAR(200) NOT NULL DEFAULT 'Science Hall 259',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default values
INSERT INTO CompExamSettings (id, exam_date, exam_time, location)
VALUES (1, 'May 8th, 2025', '9 AM - 12 PM', 'Science Hall 259')
ON DUPLICATE KEY UPDATE id = id;
