import type { CategoryContentMap, ToolContentMap } from "@/lib/tools/content-types";

export const esCategoryContent: CategoryContentMap = {
  "generate": {
    "title": "Generar",
    "description": "Herramientas de creación rápida para generar activos que puede utilizar de inmediato."
  },
  "image": {
    "title": "Imagen",
    "description": "Flujos de trabajo de imágenes que permanecen locales en el navegador siempre que sea posible."
  },
  "encrypt": {
    "title": "cifrar",
    "description": "Ayudantes de hash, codificación y cifrado simétrico común."
  },
  "time": {
    "title": "Tiempo",
    "description": "Herramientas de conversión de marcas de tiempo, aritmética de fechas y hora mundial."
  },
  "convert": {
    "title": "Convertir",
    "description": "Herramientas de conversión local para unidades, temperaturas, tamaños de datos y duraciones comunes."
  },
  "finance": {
    "title": "Finanzas",
    "description": "Ayudas prácticas para redacción de montos, listas de totales y estimaciones de préstamos."
  },
  "text": {
    "title": "Texto",
    "description": "Un práctico banco de trabajo de texto para editar, convertir y validar."
  },
  "dev": {
    "title": "desarrollador",
    "description": "Ayudas de formato, conversión y depuración para desarrolladores."
  }
};

export const esToolContent: ToolContentMap = {
  "rand-password": {
    "title": "Contraseña aleatoria",
    "description": "Genere contraseñas aleatorias seguras por longitud y conjunto de caracteres con historial local.",
    "highlights": [
      "Longitud personalizada",
      "Caso, dígitos, símbolos.",
      "Historia local"
    ]
  },
  "qrcode": {
    "title": "Código QR",
    "description": "Convierta texto o URL en códigos QR con tamaño y colores ajustables.",
    "highlights": [
      "Ajustar tamaño",
      "Personalizar colores",
      "Descargar imagen"
    ]
  },
  "screen-record": {
    "title": "Registro de pantalla",
    "description": "Grabe su pantalla con las API del navegador y exporte el resultado localmente.",
    "highlights": [
      "Captura del navegador nativo",
      "Vista previa instantánea",
      "exportación local"
    ]
  },
  "random-number": {
    "title": "Laboratorio de números de rango",
    "description": "Genere por lotes valores aleatorios por rango, precisión y unicidad para datos de muestreo o prueba.",
    "highlights": [
      "Alcance y precisión",
      "Alternancia única",
      "Salida multilínea"
    ]
  },
  "guid": {
    "title": "Forja por lotes de UUID",
    "description": "Cree varios UUID en el navegador para pruebas de API, accesorios y registros de marcadores de posición.",
    "highlights": [
      "Salida por lotes",
      "Alternar caso",
      "Exportación de texto"
    ]
  },
  "random-group": {
    "title": "Agrupación aleatoria",
    "description": "Mezcla una lista en grupos aleatorios por número o tamaño de grupo, o elige un solo ganador.",
    "highlights": [
      "Por número o tamaño del grupo",
      "Modo de selección única",
      "Separadores flexibles"
    ]
  },
  "watermark": {
    "title": "Marca de agua sin conexión",
    "description": "Aplique marcas de agua de texto repetidas a imágenes locales sin cargarlas.",
    "highlights": [
      "Opacidad y ángulo",
      "Representación local",
      "Resultado de exportación"
    ]
  },
  "image-compress": {
    "title": "Comprimir imagen",
    "description": "Comprime imágenes en el navegador y compara el resultado del antes y el después.",
    "highlights": [
      "Control de calidad",
      "Comparar antes/después",
      "Descargar archivo"
    ]
  },
  "qrcode-decode": {
    "title": "Lector de contenido QR",
    "description": "Extraiga texto copiable de una imagen QR local para inspeccionar enlaces, notas o cargas útiles de Wi-Fi.",
    "highlights": [
      "Decodificación sin conexión",
      "Vista previa de la imagen",
      "Copiar resultado"
    ]
  },
  "barcode": {
    "title": "Lienzo de código de barras",
    "description": "Redacte códigos de barras con múltiples estándares y exporte ilustraciones SVG nítidas de inmediato.",
    "highlights": [
      "Cambiar estándares",
      "Color y tamaño",
      "descargar SVG"
    ]
  },
  "md5": {
    "title": "Texto MD5",
    "description": "Calcule hashes MD5 de texto y muestre variantes en minúsculas y mayúsculas.",
    "highlights": [
      "Salida de 32 caracteres",
      "Mayúsculas/minúsculas",
      "Copiar rápidamente"
    ]
  },
  "file-md5": {
    "title": "Archivo MD5",
    "description": "Hash de archivos locales en fragmentos para una verificación MD5 confiable.",
    "highlights": [
      "Archivos locales",
      "hash fragmentado",
      "Compatible con archivos grandes"
    ]
  },
  "hmac": {
    "title": "Hash HMAC",
    "description": "Calcule hashes HMAC con clave para las variantes MD5 y SHA.",
    "highlights": [
      "Múltiples algoritmos",
      "hash con clave",
      "salida hexagonal"
    ]
  },
  "sha": {
    "title": "hash sha",
    "description": "Calcule SHA1, SHA256, SHA512 y valores hash relacionados.",
    "highlights": [
      "Variantes SHA",
      "hash rápido",
      "salida hexagonal"
    ]
  },
  "aes": {
    "title": "Cifrado AES",
    "description": "Cifre y descifre con AES usando modos comunes y opciones de relleno.",
    "highlights": [
      "BCE/BCCh",
      "Hexadecimal o Base64",
      "Personalizado IV"
    ]
  },
  "rabbit": {
    "title": "cifrado de conejo",
    "description": "Cifre y descifre texto con el cifrado de flujo Rabbit.",
    "highlights": [
      "Ligero",
      "Lado del navegador",
      "Copiar resultado"
    ]
  },
  "des": {
    "title": "DES/3DES",
    "description": "Maneja el cifrado y descifrado de texto DES y TripleDES.",
    "highlights": [
      "DES y 3DES",
      "Cifrado de texto",
      "salida base64"
    ]
  },
  "rc4": {
    "title": "Cifrado RC4",
    "description": "Ejecute el cifrado o descifrado RC4 en el texto de entrada.",
    "highlights": [
      "cifrado clásico",
      "Acciones rápidas",
      "Sólo locales"
    ]
  },
  "base64": {
    "title": "Base64",
    "description": "Convierta entre texto sin formato y Base64 rápidamente.",
    "highlights": [
      "Seguro para Unicode",
      "Codificar/decodificar",
      "Copiar resultado"
    ]
  },
  "unicode": {
    "title": "Convertir Unicode",
    "description": "Convierta texto a secuencias de escape Unicode y viceversa.",
    "highlights": [
      "Salida de escape",
      "Restaurar texto legible",
      "Procesamiento local"
    ]
  },
  "url": {
    "title": "Codificación de URL",
    "description": "Codifique y decodifique valores de URL de forma segura para su transporte.",
    "highlights": [
      "Seguro para parámetros",
      "Codificar/decodificar",
      "Resultado instantáneo"
    ]
  },
  "timestamp": {
    "title": "Marca de tiempo",
    "description": "Muestra la marca de tiempo actual y convierte entre cadenas de tiempo y marcas de tiempo.",
    "highlights": [
      "Segundos/ms",
      "reloj en vivo",
      "Conversión bidireccional"
    ]
  },
  "calculation": {
    "title": "Cálculo de fecha",
    "description": "Sumar o restar tiempo a una fecha y medir intervalos de fechas.",
    "highlights": [
      "Añadir días/meses/años",
      "Intervalo de días",
      "Formularios claros"
    ]
  },
  "world": {
    "title": "hora mundial",
    "description": "Vea un momento determinado en un conjunto de zonas horarias importantes del mundo.",
    "highlights": [
      "Varias ciudades",
      "Mesa de lado a lado",
      "Elige zona base"
    ]
  },
  "working-day": {
    "title": "Compensación de día hábil",
    "description": "Horarios de turnos por días hábiles con anulación opcional de días festivos y días laborables de recuperación.",
    "highlights": [
      "Saltar fines de semana",
      "Lista de vacaciones personalizada",
      "conteo de rango"
    ]
  },
  "batch-timestamp": {
    "title": "Convertidor de tiempo multilínea",
    "description": "Normalice los registros con muchas marcas de tiempo línea por línea en fechas legibles o valores Unix sin procesar.",
    "highlights": [
      "dirección automática",
      "Segundos y ms",
      "Exportación por lotes"
    ]
  },
  "unit-converter": {
    "title": "Centralita de la unidad",
    "description": "Mantenga unidades diarias y de ingeniería comunes en un solo lugar para realizar conversiones rápidas en paralelo.",
    "highlights": [
      "Conmutación agrupada",
      "Unidad objetivo directo",
      "Mesa para todo el grupo"
    ]
  },
  "english-amount": {
    "title": "Borrador de cantidad en inglés",
    "description": "Borrador de texto de cantidad en inglés listo para factura a partir de un valor monetario numérico.",
    "highlights": [
      "Caso de sentencia",
      "Estilo en mayúsculas",
      "Factura lista"
    ]
  },
  "sum-list": {
    "title": "Resumen de la hoja numérica",
    "description": "Convierta listas numéricas sueltas en resúmenes de suma, promedio y mínimo/máximo para realizar presupuestos rápidamente.",
    "highlights": [
      "Separadores mixtos",
      "Promedio y extremos",
      "Sugerencias de tokens no válidos"
    ]
  },
  "loan": {
    "title": "Planificador de pagos de préstamos",
    "description": "Calcule la carga mensual y el interés total a partir del principal, la tasa y el plazo del préstamo.",
    "highlights": [
      "Estimación mensual",
      "Interés total",
      "primeros 12 meses"
    ]
  },
  "rmb": {
    "title": "RMB en mayúsculas",
    "description": "Convierta números a letras RMB chinas en mayúsculas.",
    "highlights": [
      "Redacción financiera",
      "Enteros y decimales",
      "Resultado instantáneo"
    ]
  },
  "text-dedupe": {
    "title": "Limpieza de lista",
    "description": "Limpie las entradas repetidas, las diferencias entre mayúsculas y minúsculas y los espacios ruidosos en una lista más ordenada.",
    "highlights": [
      "Línea, coma o espacio",
      "ignorar caso",
      "Resumen mantenido"
    ]
  },
  "emoji-clean": {
    "title": "Limpiador de emojis",
    "description": "Elimine los emoji y los símbolos pictográficos del texto para obtener una salida de texto sin formato más limpia y formal.",
    "highlights": [
      "Salida de texto sin formato",
      "Recuento eliminado",
      "Fácil de usar"
    ]
  },
  "id-card-cn": {
    "title": "Verificación de identificación CN",
    "description": "Valide los números de identificación de 18 dígitos de China continental y extraiga los detalles de fecha de nacimiento, edad y sexo.",
    "highlights": [
      "validación de 18 dígitos",
      "Cumpleaños y edad",
      "Prefijo de región"
    ]
  },
  "simplified-traditional": {
    "title": "Cambio de escritura china",
    "description": "Cambie rápidamente entre chino simplificado y tradicional para la limpieza de copias y variantes regionales.",
    "highlights": [
      "interruptor bidireccional",
      "Diccionario sin conexión",
      "Compatible con textos largos"
    ]
  },
  "pinyin": {
    "title": "Transcriptor Pinyin",
    "description": "Transcribe texto chino a pinyin e iniciales para indexación, búsqueda u organización de notas.",
    "highlights": [
      "Marcado, simple o numérico",
      "Salida de iniciales",
      "Sólo local"
    ]
  },
  "pluralize": {
    "title": "Pluralizar",
    "description": "Cambie rápidamente entre sustantivos en singular y plural en inglés.",
    "highlights": [
      "Singular/plural",
      "Formas de palabras comunes",
      "Entrada sencilla"
    ]
  },
  "english-case": {
    "title": "Caso inglés",
    "description": "Convierta texto en mayúsculas, minúsculas, títulos u oraciones.",
    "highlights": [
      "Varios estilos de casos",
      "copia limpia",
      "Copiar rápidamente"
    ]
  },
  "cn-en": {
    "title": "Espaciado CN/EN",
    "description": "Mejore el espaciado entre chino, inglés y números automáticamente.",
    "highlights": [
      "Mejor espaciado mixto",
      "Legibilidad mejorada",
      "Solución con un solo clic"
    ]
  },
  "trim": {
    "title": "Recortar texto",
    "description": "Recorte los espacios en blanco de todo el texto o línea por línea.",
    "highlights": [
      "Ajuste completo",
      "Recorte de línea",
      "Compatible con lotes"
    ]
  },
  "regex": {
    "title": "Prueba de expresiones regulares",
    "description": "Pruebe si una cadena coincide con un patrón de expresión regular.",
    "highlights": [
      "Banderas soportadas",
      "Validación rápida",
      "Ejemplos de plantillas"
    ]
  },
  "md-html": {
    "title": "Rebaja a HTML",
    "description": "Represente Markdown en HTML y cambie entre código y vista previa.",
    "highlights": [
      "Flujo de dos paneles",
      "salida HTML",
      "Vista previa en vivo"
    ]
  },
  "json": {
    "title": "Formato JSON",
    "description": "Formatee, minimice y valide el contenido JSON.",
    "highlights": [
      "Bonito estampado",
      "Minimizar",
      "Validación"
    ]
  },
  "json-to-types": {
    "title": "Boceto de tipo JSON",
    "description": "Dibuje interfaces TypeScript a partir de JSON de muestra antes de refinarlas a mano.",
    "highlights": [
      "Cambiar el nombre del tipo raíz",
      "Sigue anidando",
      "Doble panel Mónaco"
    ]
  },
  "css": {
    "title": "Formato CSS",
    "description": "Formatee CSS y aplique una compresión ligera.",
    "highlights": [
      "Formato más bonito",
      "Salida minimizada",
      "editor de código"
    ]
  },
  "js": {
    "title": "Formato JavaScript",
    "description": "Formatee o compacte fragmentos de JavaScript para una limpieza rápida.",
    "highlights": [
      "Formato más bonito",
      "Minimizar la salida",
      "Copiar resultado"
    ]
  },
  "html": {
    "title": "Formato HTML",
    "description": "Embellezca HTML o comprímalo en una representación más ajustada.",
    "highlights": [
      "Estructura más limpia",
      "Salida minimizada",
      "Compatible con fragmentos"
    ]
  },
  "sql": {
    "title": "Formato SQL",
    "description": "Formatee las declaraciones SQL para facilitar su lectura o comprímalas para su transporte.",
    "highlights": [
      "Palabras clave en mayúsculas",
      "Comprimir espacios",
      "Consulta amigable"
    ]
  },
  "crontab": {
    "title": "Horario cron",
    "description": "Obtenga una vista previa de los siguientes tiempos de ejecución desde una expresión cron.",
    "highlights": [
      "Próximas 10 carreras",
      "Validación de expresiones",
      "Lista de tiempo"
    ]
  },
  "naming-converter": {
    "title": "Nombrar caja de cambios",
    "description": "Divida el lenguaje natural o los identificadores existentes y cámbielos a estilos de nombres de códigos comunes.",
    "highlights": [
      "División automática de palabras",
      "6 estilos de nombres",
      "Salida instantánea"
    ]
  },
  "color-converter": {
    "title": "Puente de formato de color",
    "description": "Conecte los formatos HEX, RGB y HSL con una muestra en vivo para una confirmación visual rápida.",
    "highlights": [
      "Tres formatos",
      "selector de color",
      "Vista previa en vivo"
    ]
  },
  "websocket": {
    "title": "Prueba de WebSocket",
    "description": "Conéctese a un punto final WebSocket, envíe mensajes e inspeccione registros.",
    "highlights": [
      "Conectar/cerrar",
      "Registro de mensajes",
      "Configuración de latidos"
    ]
  },
  "go-struct-json": {
    "title": "Ir a estructura / JSON",
    "description": "Convierta entre estructuras Go y esqueletos JSON.",
    "highlights": [
      "Conversión bidireccional",
      "Sigue anidando",
      "Utilidad para desarrolladores"
    ]
  },
  "less2css": {
    "title": "Menos a CSS",
    "description": "Compile menos fragmentos y genere el CSS generado.",
    "highlights": [
      "Compilación en el navegador",
      "dos columnas",
      "Copiar salida"
    ]
  },
  "binary": {
    "title": "Conversión básica",
    "description": "Convierta números en binario, octal, decimal, hexadecimal y más.",
    "highlights": [
      "2/8/10/16/32/36 bases",
      "mesa instantánea",
      "Útil en el desarrollo"
    ]
  }
};
