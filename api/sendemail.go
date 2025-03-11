package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"strings"
)

type EmailRequestBody struct {
	Title   string `json:"title"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

func sendEmail(emailTo, emailFrom, smtpUser, smtpPass, userEmail, title, message string) error {
	baseTitle := os.Getenv("BASE_TITLE")
	from := fmt.Sprintf("\"%s\" <%s>", baseTitle, emailFrom)

	var builder strings.Builder
	builder.WriteString(fmt.Sprintf("From: %s\r\n", from))
	builder.WriteString(fmt.Sprintf("To: %s,%s\r\n", emailTo, userEmail))
	builder.WriteString("Subject: お問い合わせありがとうございます\r\n")
	builder.WriteString("MIME-Version: 1.0\r\n")
	builder.WriteString("Content-Type: text/html; charset=\"UTF-8\"\r\n")
	builder.WriteString("\r\n")
	builder.WriteString("<p>以下の内容でお問い合わせを承りました。</p>")
	builder.WriteString(fmt.Sprintf("<p style='padding: 12px; border-left: 4px solid #d0d0d0;'>メールアドレス: %s</p>", userEmail))
	builder.WriteString(fmt.Sprintf("<p style='padding: 12px; border-left: 4px solid #d0d0d0;'>件名: %s</p>", title))
	builder.WriteString(fmt.Sprintf("<p style='padding: 12px; border-left: 4px solid #d0d0d0;'>お問い合わせ内容: %s</p>", message))

	msg := builder.String()

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"
	auth := smtp.PlainAuth("", smtpUser, smtpPass, smtpHost)

	return smtp.SendMail(smtpHost+":"+smtpPort, auth, emailFrom, []string{emailTo, userEmail}, []byte(msg))
}

func SendEmailHandler(w http.ResponseWriter, r *http.Request) {
	originUrl := os.Getenv("ORIGIN_URL")
	w.Header().Set("Access-Control-Allow-Origin", originUrl)
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(map[string]string{"status": "Method Not Allowed"})
		return
	}

	defer r.Body.Close()

	var req EmailRequestBody
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Printf("Failed to parse request body: %v", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"status": "Invalid request body"})
		return
	}

	if req.Email == "" || req.Title == "" || req.Message == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"status": "Missing required fields"})
		return
	}

	emailTo := os.Getenv("EMAIL_TO")
	emailFrom := os.Getenv("EMAIL_FROM")
	smtpUser := os.Getenv("SMTP_USER")
	smtpPass := os.Getenv("SMTP_PASS")

	if emailTo == "" || emailFrom == "" || smtpUser == "" || smtpPass == "" {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"status": "Environment variables missing"})
		return
	}

	if err := sendEmail(emailTo, emailFrom, smtpUser, smtpPass, req.Email, req.Title, req.Message); err != nil {
		log.Printf("Failed to send email: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"status": "fail", "error": err.Error()})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"success": "success"})
}
