# Gacha Simulator Static Data

The gacha-simulator-static-data service is an integral part of the Gacha Simulator project. It manages all static data required by the system, including character and weapon metadata, banner images, and localized content. This microservice ensures that other components, such as the Telegram bot and REST API, have consistent and efficient access to the static resources they need.

## Features

- Static Data Management:
  - Handles data for Genshin Impact characters, weapons, and banners.
  - Generates and stores metadata in multiple languages for global support.
- Image Generation:
  - Downloads and processes gacha-related images, such as splash art and weapon thumbnails.
  - Converts text into images for visual representation of items.
- Localization:
  - Supports multiple languages, including English, Russian, Korean, and Chinese.
  - Dynamically generates localized data for characters and weapons.
- Efficient Storage:
  - Uses MongoDB to store static data and integrates with external APIs for image retrieval.
- Dynamic Updates:
  - Regularly updates data using scripts for characters, weapons, and images.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/RegisRivijski/gacha-simulator-static-data.git
cd gacha-simulator-static-data
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file and configure the following variables:

```dotenv
MONGODB_1_HOSTNAME=your_mongodb_url
MONGO_INITDB_ROOT_USERNAME=your_mongo_username
MONGO_INITDB_ROOT_PASSWORD=your_mongo_password
GENSHIN_DEV_PROTOCOL=https
GENSHIN_DEV_HOST=genshin-api.example.com
GENSHIN_IMAGES_PROTOCOL=https
API_AMBR_HOST=images.example.com
API_AMBR_GENSHIN_IMAGES_URL=/genshin/images
```

4. Start the service:

```dotenv
npm start
```

## Core Functionality

## Data Generation

### The service dynamically generates and stores the following static data:

- Characters:
  - Localized character details (names, elements, and descriptions).
  - Associated images, such as gacha splash and gacha slice art.
- Weapons:
  - Localized weapon details (names, types, and descriptions).
  - Gacha-specific images.
- Banners:
  - Metadata for banners, including drop rates, featured items, and availability.

### Generation Scripts

- databaseData: Creates the base structure for MongoDB storage.
- itemsData: Generates localized JSON data for characters and weapons.
- itemsImages: Downloads and processes gacha-related images.
- finalGachaImages: Combines splash and slice images into final gacha assets.

### Language Support

The service supports multiple languages with the following configurations:

| Language Code | Language Name        | Font          | Image Generation |
|---------------|----------------------|---------------|------------------|
| `en`          | English              | `zh-cn.ttf`   | Yes              |
| `ru`          | Russian              | `zh-cn.ttf`   | Yes              |
| `ko`          | Korean               | `ja-jp.ttf`   | Yes              |
| `zh-hans`     | Chinese Simplified   | `ja-jp.ttf`   | Yes              |
| `id`          | Indonesian           | `zh-cn.ttf`   | No               |

### Image Processing

The service uses the following libraries for image handling:
- sharp: Processes and resizes images.
- text2png: Converts text into image format for visual representation.
- genshin-db: Fetches Genshin Impact-related data, such as character and weapon images.

### Data Storage

- MongoDB: Stores localized JSON data and metadata.
- Database: genshinImpactStaticData
- Collections: Characters, Weapons, Banners
- Cloudinary (via cloudinaryManager): Retrieves and caches images for gacha visuals.

## Dependencies

- genshin-db: Fetches game-related data (characters, weapons, etc.).
- mongoose: Connects to MongoDB for storing static data.
- sharp: Processes images for gacha visuals.
- text2png: Converts text into image format.
- lodash: Provides utility functions for data manipulation.
- axios: Makes HTTP requests to external APIs.

## Integration with Other Services

- Telegram Bot:
- Supplies static data (e.g., banner configurations and localized content) to the Telegram bot for user interaction.
- REST API:
- Provides metadata and assets for gacha mechanics and other features in the REST API.

## Key Advantages

- Localization: Supports multiple languages for a global audience.
- Image Optimization: Efficiently processes and stores images for banners, characters, and weapons.
- Scalable: Easily integrates with other microservices in the Gacha Simulator ecosystem.
- Dynamic Updates: Keeps data up to date with the latest game content using generation scripts.

## Contribution

Feel free to contribute by submitting pull requests or reporting issues. Ensure all scripts are optimized and follow project standards.

## Disclaimer

This service is intended for educational and entertainment purposes. It simulates game mechanics and does not guarantee real-world probabilities.
