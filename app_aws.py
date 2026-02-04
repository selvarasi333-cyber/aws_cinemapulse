from flask import Flask, request, jsonify, session
from flask_cors import CORS
import boto3
import os
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Attr

app = Flask(__name__)
# In production, set this via Environment Variables
app.secret_key = os.environ.get('SECRET_KEY', 'cinema_pulse_ultra_secret_key')
CORS(app, supports_credentials=True)

# AWS Configuration
REGION = 'us-east-1'
dynamodb = boto3.resource('dynamodb', region_name=REGION)
sns = boto3.client('sns', region_name=REGION) # Initializing SNS Client

# Replace this with your actual SNS Topic ARN from the AWS Console
SNS_TOPIC_ARN = os.environ.get('arn:aws:sns:us-east-1:545009822481:cinemapulse')

# DynamoDB Tables
users_table = dynamodb.Table('Users')
movies_table = dynamodb.Table('Movies')
feedback_table = dynamodb.Table('Feedback')

# --- Routes ---

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    try:
        # Check if user exists (Scanning by email)
        existing = users_table.scan(FilterExpression=Attr('email').eq(data['email']))
        if existing['Items']:
            return jsonify({'error': 'Email already exists'}), 400

        # Hash password for security
        hashed_pw = generate_password_hash(data['password'])
        
        user_item = {
            'id': data.get('id', str(uuid.uuid4())),
            'name': data['name'],
            'email': data['email'],
            'password': hashed_pw,
            'role': data['role'],
            'notifications_enabled': 1
        }
        users_table.put_item(Item=user_item)
        return jsonify({'status': 'success'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    try:
        # Find user by email
        response = users_table.scan(FilterExpression=Attr('email').eq(email))
        items = response.get('Items', [])
        
        if items and check_password_hash(items[0]['password'], password):
            user = items[0]
            # Remove password from response for security
            del user['password']
            session['user_id'] = user['id']
            return jsonify(user)
            
        return jsonify({'error': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/movies', methods=['GET'])
def get_movies():
    try:
        response = movies_table.scan()
        return jsonify(response.get('Items', []))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/feedback', methods=['GET', 'POST'])
def handle_feedback():
    try:
        if request.method == 'POST':
            data = request.json
            feedback_item = {
                'id': data.get('id', str(uuid.uuid4())),
                'movie_id': data['movieId'],
                'user_id': data['userId'],
                'user_name': data['userName'],
                'rating': int(data['rating']),
                'text': data['text'],
                'created_at': data['createdAt'],
                'sentiment': data['sentiment']
            }
            feedback_table.put_item(Item=feedback_item)

            # --- SNS Notification Code ---
            notification_message = (
                f"New Feedback Received!\n"
                f"User: {data['userName']}\n"
                f"Rating: {data['rating']}/5\n"
                f"Comment: {data['text']}\n"
                f"Sentiment: {data['sentiment']}"
            )
            
            sns.publish(
                TopicArn=SNS_TOPIC_ARN,
                Message=notification_message,
                Subject="New CinemaPulse Movie Feedback"
            )
            # ------------------------------

            return jsonify({'status': 'success'})
        
        # GET Feedback
        response = feedback_table.scan()
        sorted_feedback = sorted(response.get('Items', []), key=lambda x: x['created_at'], reverse=True)
        return jsonify(sorted_feedback)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/feedback/<id>', methods=['DELETE', 'PUT'])
def modify_feedback(id):
    try:
        if request.method == 'DELETE':
            feedback_table.delete_item(Key={'id': id})
        elif request.method == 'PUT':
            data = request.json
            feedback_table.update_item(
                Key={'id': id},
                UpdateExpression="set rating=:r, #t=:text, sentiment=:s",
                ExpressionAttributeValues={
                    ':r': data['rating'],
                    ':text': data['text'],
                    ':s': data['sentiment']
                },
                ExpressionAttributeNames={
                    "#t": "text" # 'text' is a reserved keyword in DynamoDB
                }
            )
        return jsonify({'status': 'success'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
