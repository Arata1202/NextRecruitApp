FROM golang:1.24-alpine

WORKDIR /app

RUN go install github.com/air-verse/air@latest

COPY ./go.mod ./
RUN go mod download

COPY ./.air.toml ./
COPY ./api/ ./api/
COPY ./cmd/ ./cmd/

EXPOSE 8000

CMD ["air", "-c", ".air.toml"]