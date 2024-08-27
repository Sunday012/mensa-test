CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE,
  user_id INT
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('todo', 'in_progress', 'done') DEFAULT 'todo',
  project_id INT,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);