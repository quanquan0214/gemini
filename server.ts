import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import ee from "@google/earthengine";
import { createServer as createViteServer } from "vite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // 1. Initialize GEE with Service Account
  const initializeGEE = () => {
    return new Promise((resolve, reject) => {
      const privateKey = process.env.GEE_PRIVATE_KEY?.replace(/\\n/g, '\n');
      const serviceAccount = process.env.GEE_SERVICE_ACCOUNT;

      if (!privateKey || !serviceAccount) {
        console.warn("GEE credentials missing. GEE features will be disabled.");
        return resolve(false);
      }

      console.log("Initializing Earth Engine with Service Account...");
      ee.data.authenticateViaServiceAccount(
        { client_email: serviceAccount, private_key: privateKey },
        () => {
          ee.initialize(
            null,
            null,
            () => {
              console.log("Earth Engine successfully initialized!");
              resolve(true);
            },
            (err: any) => {
              console.error("Earth Engine initialization failed:", err);
              reject(err);
            }
          );
        },
        (err: any) => {
          console.error("Authentication failed:", err);
          reject(err);
        }
      );
    });
  };

  try {
    await initializeGEE();
  } catch (err) {
    console.error("Critical: Could not boot GEE service.");
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", gee: !!process.env.GEE_SERVICE_ACCOUNT });
  });

  /**
   * Endpoint to calculate indices for a specific location (Poyang Lake)
   */
  app.post("/api/gee/process-lake", async (req, res) => {
    try {
      const { index, startDate, endDate } = req.body;
      
      // Example of actual GEE logic
      // Define AOI (Poyang Lake area)
      const poyangAOI = ee.Geometry.Rectangle([115.8, 28.4, 116.7, 29.8]);
      
      // Load Sentinel-2 imagery
      let collection = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
        .filterBounds(poyangAOI)
        .filterDate(startDate || '2024-01-01', endDate || '2024-01-31')
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
        .median();

      let resultImg;
      if (index === 'NDVI') {
        resultImg = collection.normalizedDifference(['B8', 'B4']).rename('NDVI');
      } else if (index === 'NDWI') {
        resultImg = collection.normalizedDifference(['B3', 'B8']).rename('NDWI');
      } else {
        resultImg = collection.select(['B4', 'B3', 'B2']); // RGB
      }

      // Get some stats
      const stats = resultImg.reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: poyangAOI,
        scale: 100,
        maxPixels: 1e9
      });

      stats.evaluate((data: any, error: any) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        
        // Generate Tile ID
        const mapId = resultImg.getMap({
          min: index === 'NDVI' ? -0.1 : 0,
          max: index === 'NDVI' ? 0.8 : 3000,
          palette: index === 'NDVI' ? ['red', 'yellow', 'green'] : undefined
        });

        res.json({
          stats: data,
          mapId: mapId.mapid,
          token: mapId.token,
          tileUrlTemplate: `https://earthengine.googleapis.com/v1/projects/earthengine-legacy/maps/${mapId.mapid}/tiles/{z}/{x}/{y}?token=${mapId.token}`
        });
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
