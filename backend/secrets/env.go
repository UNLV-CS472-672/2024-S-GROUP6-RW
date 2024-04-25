package secrets

import (
	"errors"
	"os"
	"path/filepath"
	"strings"

	"github.com/joho/godotenv"
)

var envData map[string]string

func LoadEnv() error {
	dir, err := os.Getwd()

	if err != nil {
		return err
	}

	// pathSplit := strings.Split(dir, string(filepath.Separator))
	pathSplit := strings.Split(dir, "\\")

	resultPath := []string{}

	procPath := ""

	// Handle Windows-style path with drive name
	if len(pathSplit) > 1 && strings.Contains(pathSplit[0], ":") {
		procPath = pathSplit[0] + "\\" // Add the drive name
		pathSplit = pathSplit[1:]      // Remove the drive name and the separator
	} else {
		procPath = "/"
	}

	for _, str := range pathSplit {
		resultPath = append(resultPath, str)

		if str == "2024-S-GROUP6-RW" {
			break
		}
	}

	for _, str := range resultPath {
		procPath = filepath.Join(procPath, str)
	}

	procPath = filepath.Join(procPath, "backend")
	procPath = filepath.Join(procPath, ".env")

	err = godotenv.Load(procPath)

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
