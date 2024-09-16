# Medifácil App

Medifácil es una aplicación móvil que permite a los usuarios buscar y comparar precios de medicamentos en distintas farmacias del Norte de Quito. La aplicación está desarrollada utilizando React Native y TypeScript.

## Características

- **Búsqueda de Medicamentos**: Los usuarios pueden agregar medicamentos y la aplicación buscará precios en varias farmacias.
- **Comparación de Precios**: Los precios obtenidos de las farmacias se pueden ordenar para comparar fácilmente.
- **Navegación Sencilla**: Navegación fácil entre pantallas utilizando `@react-navigation/native`.

## Requisitos

- Node.js
- npm o yarn
- Expo CLI

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/MedifacilFrontend.git
    cd MedifacilFrontend
    ```

2. Instala las dependencias:
    ```sh
    npm install
    # o
    yarn install
    ```

3. Configura el archivo `.env` con tu `SECRET_TOKEN`:
    ```plaintext
    SECRET_TOKEN=tu_token_secreto
    ```

4. Inicia la aplicación:
    ```sh
    npm start
    # o
    yarn start
    ```

## Estructura del Proyecto

```plaintext
medifacil-app/
├── assets/                 # Archivos de imagen, fuentes, etc.
├── components/             # Componentes de la aplicación
│   ├── AppBar.tsx          # Componente de barra de aplicación
│   ├── AppNavigator.tsx    # Configuración de navegación
│   ├── HomeScreen.tsx      # Pantalla principal
│   ├── MedicationForm.tsx  # Formulario para agregar medicamentos
│   ├── MedicationList.tsx  # Lista de medicamentos
│   └── QuoteScreen.tsx     # Pantalla de cotización de precios
├── styles/                 # Estilos compartidos
│   ├── formStyles.ts       # Estilos del formulario
│   └── globalStyles.ts     # Estilos globales
├── types/                  # Definiciones de tipos TypeScript
│   └── index.ts            # Tipos utilizados en la aplicación
├── .env.example            # Ejemplo de archivo de configuración de entorno
├── App.tsx                 # Componente principal de la aplicación
├── babel.config.js         # Configuración de Babel
├── tsconfig.json           # Configuración de TypeScript
├── package.json            # Dependencias y scripts
├── README.md               # Documentación de la aplicación
└── ...                     # Otros archivos de configuración
```

## Componentes

### AppBar

Componente de barra de aplicación que muestra un título.

### AppNavigator

Configura la navegación de la aplicación utilizando `@react-navigation/native`.

### HomeScreen

Pantalla principal donde los usuarios pueden agregar medicamentos y ver la lista actual.

### MedicationForm

Formulario para agregar nuevos medicamentos.

### MedicationList

Lista de medicamentos agregados, con la opción de eliminarlos.

### QuoteScreen

Pantalla que muestra los resultados de la búsqueda de precios de medicamentos en varias farmacias.

## Estilos

Los estilos están organizados en archivos separados dentro del directorio `styles/`:

- **formStyles.ts**: Estilos utilizados en el formulario de medicamentos.
- **globalStyles.ts**: Estilos globales utilizados en la aplicación.

## Despliegue

Primero configurar el archivo QuoteScreen.tsx. En la línea donde se usa http://127.0.0.1:5000/search?name, se debe reemplazar por el url donde está expuesto el backend

### Web

Se genera archivos estáticos al usar:

```bash
npx expo export --platform web
```
Simplemente copiar esos archivos al servidor en la ruta principal

### Android
Hay muchas maneras de generar el APK firmado. La más sencilla es con EXPO, Android Studio y eas: https://docs.expo.dev/build/setup/

Para esto es necesario seguir los pasos indicados en el tutorial (Como crearse una cuenta en EXPO)

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android
```

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commits (`git commit -m 'Añadir nueva característica'`).
4. Sube tus cambios (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

### Notas Adicionales

- Asegúrate de tener un archivo `.env` en tu proyecto con el `SECRET_TOKEN` requerido para las solicitudes a la API.
- Revisa y actualiza cualquier sección según las necesidades y características específicas de tu proyecto.