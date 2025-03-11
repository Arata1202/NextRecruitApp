package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"NextRecruitApp/api"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	http.HandleFunc("/api/recaptcha", api.RecaptchaHandler)
	http.HandleFunc("/api/sendemail", api.SendEmailHandler)

	fmt.Printf("Server is running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
