import subprocess

# Start both scripts in parallel
subprocess.Popen(['python', 'summarizer.py'])
subprocess.Popen(['python', 'fact_checker.py'])
