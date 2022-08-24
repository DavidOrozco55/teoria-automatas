package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"strconv"
)

func readInput() ([]string, int) {
	lenguage := make([]string, 0)
	scanner := bufio.NewScanner(os.Stdin)
	for {
		fmt.Print("Nuevo elemento (enter para terminar): ")
		scanner.Scan()
		text := scanner.Text()
		if len(text) == 0 {
			break
		}
		lenguage = append(lenguage, text)
	}

	fmt.Print("Nivel: ")
	scanner.Scan()
	level, _ := strconv.Atoi(scanner.Text())
	return lenguage, level
}

func helper(baseLng, currentLng []string) []string {
	result := make([]string, 0)
	for i := 0; i < len(baseLng); i++ {
		for j := 0; j < len(currentLng); j++ {
			result = append(result, baseLng[i]+currentLng[j])
		}
	}
	return result
}

func getKleen(baseLng []string, level int) []string {
	if level == 0 {
		lambda := make([]string, 1)
		lambda[0] = "λ"
		return lambda
	}
	if level == 1 {
		return baseLng
	}
	return helper(baseLng, getKleen(baseLng, level-1))
}

func main() {
	language, level := readInput()
	closure := getKleen(language, level)

	fmt.Println(closure)
	fmt.Println("Cantidad de palabras")
	fmt.Printf("Esperadas: %d | Calculadas: %d \n", int(math.Pow(2, float64(level))), len(closure))
}
