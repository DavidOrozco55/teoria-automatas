# Cerradura de Kleene. P1 - Teoría de autómatas - CETI

[Cerradura de Kleene](https://en.wikipedia.org/wiki/Kleene_star) Es una operación que representa el conjunto finit de strings que pueden ser generados dado un lenguage con un set de elementos

## Instrucciones

Realizar un sistema en el que a través del usuario se ingresen N cantidad de palabras para un lenguaje y
que posteriormente se solicite al usuario un nivel específico de la cerradura de Kleene para aplicar al
lenguaje (L0 L1 L2 L3 .........), al final, el sistema debe de mostrar en pantalla las palabras
correspondientes al nivel de cerradura de Kleene solicitadas.

### Ejemplo

L = { 0, 11 }  
Nivel = 3

L^3 = L^2L = { 00 011 110 1111 } X { 0, 11 } -> { 000 0011 0110 01111 1100 11011 11110 111111 } ✅  
L^2 = L^1L = { 0, 11 } X { 0, 11 } -> { 00 011 110 1111 } ✅  
L^1 = L = { 0, 11 } ✅  
