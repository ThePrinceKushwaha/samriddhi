FROM python:3.11-alpine

WORKDIR /usr/src/app
ENV PYTHONUNBUFFERED=1

COPY requirements.txt ./

RUN pip install --no-cache-dir --user -r requirements.txt

COPY . .