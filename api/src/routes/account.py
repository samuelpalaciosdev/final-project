from flask import Flask, jsonify, request, url_for, Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from models import User

account = Blueprint('account', __name__)

@account.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# CLIENTS ROUTES

# Get current user profile
@account.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    id = get_jwt_identity()
    user = User.query.get(id)
    data = {
        'user': user.serialize()
    }
    return jsonify({'status': 'success', 'message': 'Login successfully', 'data': data}), 200

# Update current user profile
@account.route('/update_profile', methods=['PUT'])
@jwt_required()
def update_profile():
    id = get_jwt_identity()
    user = User.query.get(id)

    name = request.json.get('name')
    lastname = request.json.get('lastname')
    email = request.json.get('email')
    password = request.json.get('password')
    phone = request.json.get('phone')

    if not email: return jsonify({'status': 'failed', 'message': 'Email is required', 'data': None}), 400

    # update profile

    # check if user already exist
    userFound = User.query.filter_by(email = email).first()
    # if user found and its id is different from the current user id
    if userFound and userFound.id != id: return jsonify({'status': 'failed', 'message': 'Email already exists', 'data': None}), 400

    # if user sends password
    if password:
        user.password = generate_password_hash(password)

    user.name = name
    user.lastname = lastname
    user.email = email
    user.phone = phone
    user.update()

    data = {
        'user': user.serialize()
    }
    return jsonify({'status': 'success', 'message': 'Profile Updated', 'data': data}), 200


# ADMIN ROUTES

# Get all users registrated
@account.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))
    return jsonify(users), 200
    
# Get all clients
@account.route('/clients', methods=['GET'])
def get_clients():
    users = User.query.filter_by(role_id = 3)
    users = list(map(lambda user: user.serialize(), users))
    return jsonify(users), 200
    
# Get all doctors
# @account.route('/doctors', methods=['GET'])
# def get_clients():
#     users = User.query.filter(User.roles.id == 2)
#     users = list(map(lambda user: user.serialize(), users))
#     return jsonify(users), 200

# @account.route('/admin/services', methods=['GET', 'POST'])
# @account.route('/admin/services/<int:id>', methods=['GET', 'PUT', 'DELETE'])
# def services(id):