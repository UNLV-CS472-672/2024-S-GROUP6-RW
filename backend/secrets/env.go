package secrets

import (
	"errors"
	"fmt"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

var envData map[string]string

func LoadEnv() error {
	dir, err := os.Getwd()

	pathSplit := strings.Split(dir, "/")

	switch pathSplit[len(pathSplit)-1] {
	case "2024-S-GROUP6-RW":
		dir += "/backend"
	case "backend":
		// .env file is here
	case "business":
		dir += "/.."
	case "unit_tests":
		dir += "/../.."
	default:
		return errors.New("invalid execution directory")
	}

	if err != nil {
		return err
	}

	fmt.Println(dir)

	err = godotenv.Load(dir + "/.env")

	if err != nil {
		return errors.New(".env file does not exist")
	}

	envData = map[string]string{}

	for _, pair := range os.Environ() {
		parts := strings.Split(pair, "=")
		key := parts[0]
		value := parts[1]

		envData[key] = value
	}

	return nil
}

func GetEnv(key string) (string, error) {
	value, ok := envData[key]

	if !ok {
		return "", errors.New("failed to locate key in .env file")
	}

	return value, nil
}
