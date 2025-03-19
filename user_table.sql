-- Users Table
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255), -- Store hashed passwords
    height FLOAT,
    weight FLOAT,
    bmi FLOAT
);

-- Menu Table
CREATE TABLE Menu (
    food_id INT PRIMARY KEY AUTO_INCREMENT,
    food_name VARCHAR(255),
    category VARCHAR(50), -- e.g., High-Protein, Low-Calorie
    price DECIMAL(10,2),
    description TEXT,
    image_url VARCHAR(255)
);

-- BMI Recommendations Table
CREATE TABLE BMI_Recommendations (
    bmi_category VARCHAR(50) PRIMARY KEY, -- e.g., Underweight, Normal, Overweight, Obese
    recommended_foods TEXT -- Comma-separated food IDs (e.g., "1,3,5")
);

-- Orders Table
CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    food_id INT,
    quantity INT,
    total_price DECIMAL(10,2),
    order_status VARCHAR(50) DEFAULT 'Pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (food_id) REFERENCES Menu(food_id)
);
