# Ejercicio Técnico - Página de Productos

Ejercicio de desarrollo web que implementa una página de producto responsive para productos utilizando Tailwind CSS v4.

## 🚀 Características

- **Diseño Responsivo**: Layout optimizado para desktop y móvil
- **Tailwind CSS v4**: Compilación con CLI para generar estilos optimizados
- **Modo Oscuro**: Soporte completo para tema claro/oscuro
- **Componentes Modulares**: Componentes HTML simples renderizados dinámicamente
- **Optimización de Imágenes**: Formato WebP para mejor rendimiento
- **SEO Optimizado**: Meta tags, Open Graph, Twitter Cards y JSON-LD estructurado

## 🛠️ Tecnologías

- **HTML5** con componentes modulares
- **Tailwind CSS v4** (CLI)
- **JavaScript** vanilla para renderizado de componentes
- **WebP** para optimización de imágenes

## 📦 Instalación

```bash
# Instalar dependencias
npm install tailwindcss @tailwindcss/cli

# Procesar CSS con watch mode (input.css → output.css)
npx @tailwindcss/cli -i ./css/input.css -o ./css/output.css --watch
```

> **Nota**: El CSS fuente usa `@import "tailwindcss";` para importar los estilos base de Tailwind CSS v4.

## 🏗️ Estructura

- `6-1427200-4.html` - Página principal de demostración
- `components/` - Componentes HTML reutilizables
- `css/input.css` - Estilos fuente de Tailwind
- `css/output.css` - CSS compilado (generado)
- `img/` - Imágenes optimizadas en formato WebP

## 📱 Demo

La página `6-1427200-4.html` muestra la implementación completa con componentes dinámicos, diseño responsivo y optimización SEO.

---