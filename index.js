import { createServer } from 'http'
import { readFile } from 'fs'
import path, { join, dirname } from 'path'
import { getContentType } from './getContentType.js'
import { fileURLToPath } from 'url'

// Configuración de rutas del sistema de archivos
const __filename = fileURLToPath(import.meta.url) // Obtener ruta del archivo actual
const __dirname = dirname(__filename) // Obtener ruta de la carpeta actual

// Creación del servidor HTTP
const server = createServer((req, res) => {
  const { method, url } = req

  // Manejo de solicitudes GET
  if (method === 'GET') {
    const rutaLogin = path.join(__dirname, 'views', 'login.html')
    const rutaHome = path.join(__dirname, 'views', 'home.html')
    const rutaRegister = path.join (__dirname, 'views', 'register.html')
    if (url === '/') {
      // TODO: Servir el archivo home.html desde la carpeta views
      // 1. Usar readFile para leer el archivo
      // 2. Establecer el Content-Type correcto
      // 3. Enviar el contenido al cliente
      readFile(rutaHome, 'utf-8', (error, contenido) => {
        if (error) {
          res.writeHead(500)
          res.end('No se puede cargar el archivo home.html')
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html'})
          res.end(contenido)
        }
      })
    } else if (url === '/login') {
      // TODO: Servir el archivo login.html desde la carpeta views
      // 1. Usar readFile para leer el archivo
      // 2. Establecer el Content-Type correcto
      // 3. Enviar el contenido al cliente
      readFile(rutaLogin, 'utf-8', (error, contenido) => {
        if (error) {
          console.log('Error al leer el archivo:', error);
          res.writeHead(500);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(contenido);
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(contenido);
        }
      })

    } else if (url === '/register') {
      readFile(rutaRegister, 'utf-8', (error, contenido) => {
        if (error){
          console.log('Error al leer el archivo:', error);
          res.writeHead(500, { 'Content-Type': 'text/plain'})
          res.end('Error al leer el contenido', error)
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html'})
          res.end(contenido);
        }
      })
      // TODO: Servir el archivo register.html desde la carpeta views
      // 1. Usar readFile para leer el archivo
      // 2. Establecer el Content-Type correcto
      // 3. Enviar el contenido al cliente
      
    } else {
      // TODO: Servir archivos estáticos desde la carpeta public (imágenes y CSS)
      // 1. Usar join para construir la ruta del archivo
      // 2. Usar readFile para leer el archivo
      // 3. Establecer el Content-Type usando getContentType
      // 4. Enviar el contenido al cliente
      const rutaPublic = path.join(__dirname, 'public', url)
      readFile(rutaPublic, (error, contenido) => {
        if(error){
          res.writeHead(404)
          return res.end('Error: archivo no hallado')
        }
        const contentType = getContentType(rutaPublic)
        res.writeHead(200, { 'Content-Type': contentType})
        res.end(contenido)
    })
    }
  }
  // Manejo de solicitudes POST
  else if (method === 'POST') {
    if (url === '/login' || url === '/register') {
      // TODO: Redirigir al usuario a la página de inicio
      // 1. Establecer el código de estado 302
      // 2. Establecer el header Location: '/'
      // 3. Finalizar la respuesta
      res.writeHead(302, { 'location': '/'})
      res.end()
    } else {
      // Enviar respuesta 404 para rutas POST no válidas
      res.writeHead(404)
      res.end('Ruta no encontrada')
    }
  }
})

// Configuración del puerto del servidor
const PORT = process.env.PORT ?? 3000
const localHost = process.env.LOCALHOST
server.listen(PORT, () => {
  console.log((`Servidor andando en --> http://127.0.0.1:${PORT}`))
  console.log((`register.html --> http://127.0.0.1:${PORT}/register`))
  console.log((`login.html --> http://127.0.0.1:${PORT}/login`))
})
