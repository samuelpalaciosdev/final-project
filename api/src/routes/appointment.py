from flask import Flask, jsonify, request, url_for, Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, Appointment, Invoice

appointment = Blueprint('appointment', __name__)

@appointment.route('/appointment', methods=['POST'])
@jwt_required()
def add_appointment():
    # Appointment
    id = get_jwt_identity()
    user = User.query.get(id)
    pacient_id = user.id
    dateTime = request.json.get('dateTime')
    doctor_id = request.json.get('doctor_id')
    service_id = request.json.get('service_id')

    # check if there is already an appointment booked by the patient, in the same dateTime with the same doctor
    check_for_booked_appointment = Appointment.query.filter_by(dateTime=dateTime, doctor_id=doctor_id).first()  
    if check_for_booked_appointment: return jsonify({'status': 'failed', 'message': 'Cita ya agendada'}), 400 

    # check_for_booked_appointment = Appointment.query.filter_by(dateTime = '8/30/2022 11:00:00 AM')
    # if check_for_booked_appointment: return jsonify({'status': 'failed', 'message': 'Cita ya agendada'}), 400
    # check_for_booked_appointment = Appointment.query.filter_by(dateTime = '9/19/2022 9:00:00 AM', doctor_id= 8)

    appointment = Appointment()

    # check_for_booked_appointment = 

    appointment.dateTime = dateTime
    appointment.pacient_id = pacient_id
    appointment.doctor_id = doctor_id
    appointment.service_id = service_id

    # DO I NEED TO CREATE A HISTORY OF APPOINTMENTS TO FILTER REF TO IT?


    # Check if currentUser has booked an initial appointment already
    # check_for_initial_appointment = Appointment.query.filter_by(service_id = 1, pacient_id = id)
    # if check_for_initial_appointment: return jsonify({'status': 'failed', 'message': 'Solo puedes agendar una consulta inicial', 'data': None}), 400

    # check_for_already_booked_appointment = Appointment.query.filter_by(dateTime = dateTime, doctor_id = doctor_id)
    # if check_for_already_booked_appointment: return jsonify({'status': 'failed', 'message': 'Ya agendaste una consulta con este mismo doctor, en este mismo horario', 'data': None}), 400


    invoice = Invoice()
    # should be linked to stripe but currently is just the datetime of the appointment
    invoice.date_of_purchase = dateTime # should be date_of_purchase but what is mentioned above
    invoice.pacient_id = user.id
    invoice.service_id = service_id

    #relationship of appointment with invoice
    appointment.invoice = invoice
    appointment.save()

    data = {
        'appointment': appointment.serialize()
    }

    # if add appointment succeded
    if appointment: return jsonify({'status': 'success', 'message': 'Cita agendada exitosamente', 'data': data}), 200
    else: return jsonify({'status': 'failed', 'message': 'Cita no agendada, intente nuevamente', 'data': data}), 200

# Get appointment by date
@appointment.route('/appointment_by_date', methods=['POST'])
def get_appointment_by_date():
    dateTime = request.json.get('dateTime')

    appointments = Appointment.query.filter_by(dateTime=dateTime)
    appointments = list(map(lambda appointment: appointment.serialize(), appointments))
    
    return jsonify(appointments), 200


# Edit (Reagendar fecha y hora) appoinment
@appointment.route('/edit_appoinment/<int:id>', methods=['PUT'])
@jwt_required()
def edit_appoinment(id):
    appointment = Appointment.query.filter_by(id=id).first()
    dateTime = request.json.get('dateTime')
    doctor_id = request.json.get('doctor_id')

    # Check if appointment doesn't exist
    if not appointment:  return jsonify({ "status": "failed", "code": 404, "message": "Cita no encontrada", "data": None }), 404

    # Check if doctor already has a booked appointment in that dateTime

    check_for_booked_appointment = Appointment.query.filter_by(dateTime=dateTime, doctor_id=doctor_id).first()  
    if check_for_booked_appointment: return jsonify({'status': 'failed', 'message': 'Cita ya agendada'}), 400 

    # Update dateTime of appointment
    appointment.dateTime = dateTime

    appointment.update()

    data = {
        'appointment': appointment.serialize()
    }
    return jsonify({'status': 'success', 'message': 'Cita reagendada', 'data': data}), 200

@appointment.route('/delete_appoinment/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_appoinment(id):
    appointment = Appointment.query.filter_by(id=id).first()
    appointment.delete()
    return jsonify({'status': 'success', 'message': 'Appointment Deleted', 'data': None}), 200

# Get all appointments registrated
@appointment.route("/all_appointments", methods=["GET"])
def get_appointments():
    appointments = Appointment.query.all()
    appointments = list(map(lambda appointment: appointment.serialize(), appointments))
    return jsonify(appointments), 200

# Get appointment by id
@appointment.route('/appointments/<int:id>', methods=["GET"])
def get_appointment(id):
    appointment = Appointment.query.get(id)
    appointment = appointment.serialize()
    return jsonify(appointment), 200

# Get current user (client) appointments
@appointment.route("/client_appointments", methods=["GET"])
@jwt_required()
def get_client_appointments():
    id = get_jwt_identity()
    user = User.query.get(id)
    pacient_id = user.id
    appointments = Appointment.query.filter_by(pacient_id=pacient_id)
    appointments = list(map(lambda appointment: appointment.serialize(), appointments))
    return jsonify(appointments), 200

# Get current user (doctor) appointments
@appointment.route("/doctor_appointments", methods=["GET"])
@jwt_required()
def get_doctor_appointments():
    id = get_jwt_identity()
    user = User.query.get(id)
    doctor_id = user.id
    appointments = Appointment.query.filter_by(doctor_id=doctor_id)
    appointments = list(map(lambda appointment: appointment.serialize(), appointments))
    return jsonify(appointments), 200