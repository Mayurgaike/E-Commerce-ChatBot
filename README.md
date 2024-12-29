# **E-Commerce Chatbot AI**

## **Introduction**

The **E-Commerce Chatbot AI** is an innovative conversational assistant designed to simplify the online shopping experience. It enables users to search for products, inquire about availability and pricing, and interact with an easy-to-use chat interface. Developed using a **Flask** backend, **SQLite** database, and **React** frontend, this chatbot ensures seamless communication between the user and the product database.

## **Features**

- **Product Search**: Query products by name, category, or price range.
- **Interactive Chat Interface**: Provides an engaging and intuitive user experience.
- **Secure Login System**: Ensures only authorized users can access the chatbot.
- **Efficient Backend**: Handles complex queries and retrieves accurate product data.

## **Prerequisites**

- **Python** (>= 3.6)
- **Node.js** (>= 14)
- **SQLite**

## **Setup Instructions**

### **Clone the Repository**

```bash
git clone <your-git-repo-url>
cd ecommerce-chatbot-ai
```

## **Backend Setup**

### **For Windows:**

```bash
# Navigate to the backend folder
cd backend

# Create a virtual environment and activate it
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install flask flask-cors

# Populate the database
python createDatabase.py

# Start the Flask server
python app.py
```

### **For Linux:**

```bash
# Navigate to the backend folder
cd backend

# Create a virtual environment and activate it
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install flask flask-cors

# Populate the database
python3 createDatabase.py

# Start the Flask server
python3 app.py
```

## **Frontend Setup**

### **For Windows and Linux:**

```bash
# Navigate to the frontend folder
cd ../frontend

# Install dependencies
npm install

# Install Axios and Web-Vitals for making HTTP requests and measuring performance
npm install axios web-vitals

# Start the React app
npm start
```

## **Access the Application**

Open a browser and navigate to [http://localhost:3000](http://localhost:3000) to interact with the chatbot.

## **How to Use**

### **Login:**

- Sign up if you are a new user with a unique username and password and use it to log in.
- Upon successful login, you will be redirected to the chatbot interface.

### **Chatbot Interaction:**

Type your queries in the chat window. Examples:

- `"Show me laptops."`
- `"smartphones under 20000."`
- `"Hello"` or `"Thank you"` for general interactions.

## **Project Structure**

- **Backend**: Contains Flask app and database scripts.
- **Frontend**: Contains React components for the chat interface.
- **Database**: Includes `products.db` and `products.json` for storing product information.
