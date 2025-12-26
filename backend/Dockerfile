FROM python:3.12-slim

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y \
    curl \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Datadog tracer
RUN pip install --no-cache-dir \
    fastapi \
    uvicorn \
    google-genai \
    ddtrace \
    pydantic

# Copy app
COPY app /app

# Datadog env
ENV DD_SERVICE=llm-observability-api
ENV DD_ENV=prod
ENV DD_VERSION=1.0.0
ENV DD_TRACE_ENABLED=true

# Cloud Run port
ENV PORT=8080

CMD ["ddtrace-run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
