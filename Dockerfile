FROM python:3.9-alpine3.15
WORKDIR /app
COPY requirements.txt .
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt
RUN python -m pip install pymongo

COPY . .

ENTRYPOINT ["python3", "app.py"]