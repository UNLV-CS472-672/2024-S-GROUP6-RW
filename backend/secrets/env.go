package secrets

import (
	"github.com/joho/godotenv"
	"errors"
	"os"
)

func GetEnv(key string) (string, error) {
	err := godotenv.Load()
	if err != nil {
		return "", errors.New(".env file does not exist")
	}

	return string(os.Getenv(key)), nil
}
