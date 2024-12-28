import sqlite3

# Create users table
conn = sqlite3.connect('users.db')
c = conn.cursor()

# Create the users table (if it doesn't exist already)
c.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
''')

conn.commit()
conn.close()
