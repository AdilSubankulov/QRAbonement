# Use an official Python runtime as a parent image
FROM python:3.13-slim

# Set unbuffered output for Python
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

# Upgrade pip
RUN pip install --upgrade pip

# Copy requirements first to leverage caching
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy the entire project
COPY . /app/

# Set the working directory to the Django project (backend directory)
WORKDIR /app/backend

# Expose port 8000 for the Django server
EXPOSE 8000

# Start the server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
