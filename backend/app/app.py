import re
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Function to get a user by username from the database
def get_user_from_db(username):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username = ?", (username,))
    user = c.fetchone()
    conn.close()
    return user

# Function to add a new user to the database
def add_user_to_db(username, password):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
    conn.commit()
    conn.close()

# Function to get products from the database with optional price filter
def get_products_from_db(query, max_price=None):
    conn = sqlite3.connect('products.db')
    c = conn.cursor()

    if max_price:
        c.execute("SELECT * FROM products WHERE (name LIKE ? OR category LIKE ?) AND price <= ?", 
                  ('%' + query + '%', '%' + query + '%', max_price))
    else:
        c.execute("SELECT * FROM products WHERE name LIKE ? OR category LIKE ?", 
                  ('%' + query + '%', '%' + query + '%'))

    products = c.fetchall()
    conn.close()
    return products

# Format the response for multiple products
def format_product_response(products, query):
    if not products:
        return f"Sorry, no products found for your query: {query}."

    response_message = f"Here are some {query} that may interest you:\n"
    for product in products:
        response_message += f"- {product[1]} | Category: {product[2]} | Price: ₹{product[4]} | Stock: {product[5]}\n"
    
    return response_message

# Format the response for a single product
def format_single_product_response(product_name, product):
    response_message = f"Here is some information about {product_name}:\n"
    response_message += f"Product Name: {product[1]}\nCategory: {product[2]}\nDescription: {product[3]}\nPrice: ₹{product[4]}\nStock: {product[5]}\n"
    return response_message

# Handle login
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        # Fetch the user from the database
        user = get_user_from_db(username)

        # Check if user exists and password matches
        if user and user[2] == password:  # user[2] is the password from the db
            return jsonify({"status": "success", "message": "Hello, welcome back! How can I help you today?"}), 200
        return jsonify({"status": "error1", "message": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Handle signup
@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        # Check if the username already exists
        existing_user = get_user_from_db(username)
        if existing_user:
            return jsonify({"status": "error", "message": "User already exists!"}), 400

        # Add the new user to the database
        add_user_to_db(username, password)
        return jsonify({"status": "success", "message": "User registered successfully!"}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Handle chat
@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '').lower()

        # Handle greeting
        if "hello" in user_message or "hi" in user_message or "hey" in user_message:
            return jsonify({"status": "success", "response": "Hello, welcome back! How can I help you today?"}), 200

        if "thanks" in user_message or "thankyou" in user_message:
            return jsonify({"status": "success", "response": "You are welcome!! Please feel free to ask any other queries!"}), 200

        # Handle "tell me about" queries
        if "tell me about" in user_message:
            product_name = user_message.replace("tell me about", "").strip()
            products = get_products_from_db(product_name)
            if products:
                response_message = format_single_product_response(product_name, products[0])
            else:
                response_message = f"Sorry, I couldn't find any products with the name {product_name}."
        
        # Handle price range queries (e.g., laptops under 100000)
        elif "under" in user_message:
            price_query_match = re.search(r"under (\d+)", user_message)
            if price_query_match:
                max_price = float(price_query_match.group(1))
                query = re.sub(r"under \d+", "", user_message).strip()  # Remove the price part
                products = get_products_from_db(query, max_price)
                response_message = format_product_response(products, query)
        
        # Handle product category searches (e.g., laptop, smartphone)
        else:
            categories = ["laptop", "smartphone", "mobile", "headphone", "tv", "tablet", "shirt", "pant", "gaming"]
            query_found = None
            for category in categories:
                if category in user_message:
                    query_found = category
                    break

            if query_found:
                products = get_products_from_db(query_found)
                response_message = format_product_response(products, query_found)
            else:
                # Handle direct product name search (e.g., "IQOO Neo 9 Pro")
                products = get_products_from_db(user_message)
                if products:
                    response_message = format_single_product_response(user_message, products[0])
                else:
                    response_message = "Sorry, I couldn't find any products with that name."

        return jsonify({"status": "success", "response": response_message}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
