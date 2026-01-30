
from flask import Flask, request, jsonify, session
from flask_cors import CORS
import sqlite3
import os
import json
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'cinema_pulse_ultra_secret_key'
CORS(app, supports_credentials=True)

DB_PATH = 'cinema_pulse.db'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Tables
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL,
            photo TEXT,
            notifications_enabled INTEGER DEFAULT 1
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS movies (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            poster TEXT,
            description TEXT,
            genre TEXT,
            category TEXT,
            cast TEXT,
            director TEXT,
            hero TEXT,
            heroine TEXT,
            vibe TEXT,
            release_type TEXT,
            rating REAL
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS feedback (
            id TEXT PRIMARY KEY,
            movie_id TEXT,
            user_id TEXT,
            user_name TEXT,
            rating INTEGER,
            text TEXT,
            created_at TEXT,
            sentiment TEXT,
            FOREIGN KEY(movie_id) REFERENCES movies(id),
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    ''')

    # Seed Movies (18 items)
    cursor.execute('SELECT COUNT(*) FROM movies')
    if cursor.fetchone()[0] == 0:
        # Simplified movie list for seeding
        movies = [
            ('t1', 'Vikram', 'Action/Thriller', 'Tamil', 'Kamal Haasan', 'Theatre', 4.8),
            ('t2', 'Jailer', 'Action/Drama', 'Tamil', 'Rajinikanth', 'Theatre', 4.5),
            ('t3', 'Leo', 'Action/Crime', 'Tamil', 'Vijay', 'Theatre', 4.2),
            ('t4', 'Ponniyin Selvan 2', 'Epic Drama', 'Tamil', 'Vikram', 'Theatre', 4.7),
            ('t5', 'The Legend of Hanuman', 'Animation', 'Tamil', 'Hanuman', 'OTT', 4.9),
            ('t6', 'Little Singham', 'Animation', 'Tamil', 'Singham', 'OTT', 4.1),
            ('e1', 'Oppenheimer', 'Biographical', 'English', 'Cillian Murphy', 'Theatre', 4.9),
            ('e2', 'Dune: Part Two', 'Sci-Fi', 'English', 'Timothée Chalamet', 'Theatre', 4.8),
            ('e3', 'Barbie', 'Fantasy', 'English', 'Ryan Gosling', 'Theatre', 4.3),
            ('e4', 'Spider-Man', 'Animation', 'English', 'Miles Morales', 'Theatre', 4.9),
            ('e5', 'Guardians 3', 'Sci-Fi', 'English', 'Chris Pratt', 'Theatre', 4.6),
            ('e6', 'Puss in Boots', 'Animation', 'English', 'Puss', 'Theatre', 4.7),
            ('k1', 'Alchemy of Souls', 'Fantasy', 'K-Drama', 'Lee Jae-wook', 'OTT', 4.9),
            ('k2', 'The Glory', 'Revenge', 'K-Drama', 'Song Hye-kyo', 'OTT', 4.8),
            ('k3', 'Moving', 'Sci-Fi', 'K-Drama', 'Jo In-sung', 'OTT', 4.7),
            ('k4', 'Squid Game', 'Survival', 'K-Drama', 'Lee Jung-jae', 'OTT', 4.4),
            ('k5', 'Suzume', 'Animation', 'K-Drama', 'Souta', 'Theatre', 4.8),
            ('k6', 'Solo Leveling', 'Animation', 'K-Drama', 'Sung Jinwoo', 'OTT', 4.9)
        ]
        for m in movies:
            cursor.execute('''
                INSERT INTO movies (id, title, genre, category, hero, release_type, rating)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', m)

    conn.commit()
    conn.close()

init_db()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()
    
    if user:
        user_dict = dict(user)
        session['user_id'] = user_dict['id']
        return jsonify(user_dict)
    return jsonify({'error': 'User not found'}), 404

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    conn = get_db_connection()
    try:
        conn.execute('''
            INSERT INTO users (id, name, email, password, role, notifications_enabled)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (data['id'], data['name'], data['email'], data['password'], data['role'], 1))
        conn.commit()
        return jsonify({'status': 'success'})
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Email already exists'}), 400
    finally:
        conn.close()

@app.route('/api/feedback', methods=['GET', 'POST'])
def handle_feedback():
    conn = get_db_connection()
    if request.method == 'POST':
        data = request.json
        conn.execute('''
            INSERT INTO feedback (id, movie_id, user_id, user_name, rating, text, created_at, sentiment)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (data['id'], data['movieId'], data['userId'], data['userName'], 
              data['rating'], data['text'], data['createdAt'], data['sentiment']))
        conn.commit()
        conn.close()
        return jsonify({'status': 'success'})
    
    rows = conn.execute('SELECT * FROM feedback ORDER BY created_at DESC').fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

@app.route('/api/feedback/<id>', methods=['DELETE', 'PUT'])
def modify_feedback(id):
    conn = get_db_connection()
    if request.method == 'DELETE':
        conn.execute('DELETE FROM feedback WHERE id = ?', (id,))
        conn.commit()
    elif request.method == 'PUT':
        data = request.json
        conn.execute('''
            UPDATE feedback SET rating = ?, text = ?, sentiment = ? WHERE id = ?
        ''', (data['rating'], data['text'], data['sentiment'], id))
        conn.commit()
    conn.close()
    return jsonify({'status': 'success'})

@app.route('/api/movies', methods=['GET'])
def get_movies():
    conn = get_db_connection()
    rows = conn.execute('SELECT * FROM movies').fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
