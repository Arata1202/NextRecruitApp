package api

import (
	"encoding/json"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"
)

type RecaptchaRequest struct {
	RecaptchaResponse string `json:"g-recaptcha-response"`
}

type RecaptchaResponse struct {
	Success bool `json:"success"`
}

func verifyRecaptcha(response, secret string) (bool, error) {
	verificationURL := "https://www.google.com/recaptcha/api/siteverify"
	data := url.Values{}
	data.Set("secret", secret)
	data.Set("response", response)

	client := http.Client{
		Timeout: 10 * time.Second,
	}

	resp, err := client.PostForm(verificationURL, data)
	if err != nil {
		return false, err
	}
	defer resp.Body.Close()

	var result RecaptchaResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return false, err
	}
	return result.Success, nil
}

func RecaptchaHandler(w http.ResponseWriter, r *http.Request) {
	originUrl := os.Getenv("ORIGIN_URL")
	w.Header().Set("Access-Control-Allow-Origin", originUrl)
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	defer r.Body.Close()

	var req RecaptchaRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Printf("Failed to parse request: %v", err)
		http.Error(w, "Failed to parse request body", http.StatusBadRequest)
		return
	}

	if req.RecaptchaResponse == "" {
		http.Error(w, "reCAPTCHA response not found", http.StatusBadRequest)
		return
	}

	secret := os.Getenv("RECAPTCHA_SECRET_KEY")
	if secret == "" {
		http.Error(w, "reCAPTCHA secret not set", http.StatusInternalServerError)
		return
	}

	success, err := verifyRecaptcha(req.RecaptchaResponse, secret)
	if err != nil {
		log.Printf("Failed to send reCAPTCHA verification request: %v", err)
		http.Error(w, "Failed to send reCAPTCHA verification request", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"success": success,
	}
	if success {
		response["message"] = "reCAPTCHA verified successfully"
	} else {
		response["message"] = "reCAPTCHA verification failed"
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Printf("Failed to encode response: %v", err)
	}
}
