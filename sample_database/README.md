# 📊 Sample Database Files

This directory contains sample data for the Alflix streaming platform that can be imported into MongoDB.

## 📁 Files

- **`movies.json`** - Contains ~1,000+ movies with complete metadata
- **`subscriptions.json`** - Contains 3 subscription plans with pricing

## 🗄️ Data Structure

### Movies Collection
Each movie document contains:
- **Basic Info**: title, description, year, rating
- **Media**: poster, header images, video links
- **Categories**: tags and genres
- **Cast**: actor information with photos
- **Metadata**: creation dates, quotes

### Subscriptions Collection
Each subscription document contains:
- **Plan Info**: title, description
- **Pricing**: normal and discounted prices
- **Benefits**: list of features included

## 🚀 Quick Import

### Using Automated Scripts

**Windows:**
```bash
# Run the Windows batch script
import_database.bat
```

**macOS/Linux:**
```bash
# Make script executable and run
chmod +x import_database.sh
./import_database.sh
```

### Manual Import

1. **Install MongoDB Database Tools**
   - Download from: https://www.mongodb.com/try/download/database-tools

2. **Get MongoDB Atlas Connection String**
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/alflix?retryWrites=true&w=majority`

3. **Import Collections**
   ```bash
   # Navigate to this directory
   cd sample_database
   
   # Import movies
   mongoimport --uri "your_connection_string" --collection movies --file movies.json --jsonArray
   
   # Import subscriptions
   mongoimport --uri "your_connection_string" --collection subscriptions --file subscriptions.json --jsonArray
   ```

## 📈 Data Statistics

- **Total Movies**: ~1,000+
- **Total Subscriptions**: 3 plans
- **File Size**: ~1.1MB
- **Features**: Complete movie metadata, cast info, categories, video links

## 🔗 Related Documentation

- [Main README](../README.md) - Complete project documentation
- [MongoDB Atlas Import Guide](../MONGODB_ATLAS_IMPORT_GUIDE.md) - Detailed visual guide

## 🎯 Sample Data Preview

### Movies Example
```json
{
  "title": "A Minecraft Movie",
  "description": "Four misfits find themselves struggling with ordinary problems...",
  "rating": 6.491,
  "year": 2025,
  "tags": ["Family", "Comedy", "Adventure"],
  "cast": [
    {
      "actorName": "Jason Momoa",
      "roleName": "Garrett"
    }
  ]
}
```

### Subscriptions Example
```json
{
  "title": "Family Premium",
  "description": "Family video love language is much more...",
  "normalPrice": 109000,
  "discountedPrice": 79000,
  "benefits": ["No Ads", "Premium Feature Unlocked", "4 to 6 Users"]
}
```

