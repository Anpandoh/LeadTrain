FROM python:3.10.2-slim-bullseye

ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY ./requirements.txt .

RUN apt-get update
RUN apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_current.x | bash - 

RUN apt-get update -y && \
    apt-get install -y netcat && \
    apt-get install -y nodejs && \
    pip install --upgrade pip && \
    pip install -r requirements.txt

RUN npm install -g npm@10.5.1 


COPY ./entrypoint.sh .
RUN chmod +x /code/entrypoint.sh
COPY . .
ENTRYPOINT ["/code/entrypoint.sh"]