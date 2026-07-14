import subprocess

# Start both scripts in parallel
subprocess.Popen(['python', 'summary-service/app.py'])
subprocess.Popen(['python', 'validation-service/app.py'])