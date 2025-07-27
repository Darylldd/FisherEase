const kmeans = require('kmeans-js');

const LOCATION_COORDINATES = {
  'manila bay': { lat: 14.5833, lng: 120.9667 },
  'sulu sea': { lat: 8.0000, lng: 120.0000 },
  'visayan sea': { lat: 11.5000, lng: 123.5000 },
  'sibuyan sea': { lat: 12.5000, lng: 122.5000 },
  'celebes sea': { lat: 4.0000, lng: 124.0000 },
  'philippine sea': { lat: 15.0000, lng: 130.0000 },
  'taal lake': { lat: 14.0000, lng: 121.0000 },
  'laguna de bay': { lat: 14.2333, lng: 121.1667 },
  'sogod bay': { lat: 10.7500, lng: 125.0000 },
  'leyte gulf': { lat: 10.8333, lng: 125.1667 },
  'davao gulf': { lat: 6.8333, lng: 125.7500 },
  'morong bataan': { lat: 14.6833, lng: 120.2667 },
  'bolinao pangasinan': { lat: 16.3833, lng: 119.9000 },
  'san pablo bay': { lat: 14.0667, lng: 121.3167 },
  'coron bay': { lat: 11.9833, lng: 120.2000 },
  'romblon': { lat: 12.5750, lng: 122.2708 }, // Added for Romblon
  'fish pond ng minsu': { lat: 13.4085, lng: 121.1947 }, // Approx for Mindoro State University
  'river bend': { lat: 13.4167, lng: 121.1833 } // Approx for Calapan area
};

function getCoordinatesFromLocation(location) {
  if (!location || typeof location !== 'string') {
    console.warn('Invalid location, using fallback:', location);
    return { lat: 14.5833, lng: 120.9667 };
  }

  const lowerLocation = location.toLowerCase().trim();
  for (const [key, coords] of Object.entries(LOCATION_COORDINATES)) {
    if (lowerLocation.includes(key)) {
      console.log(`Matched location "${lowerLocation}" to ${key}`);
      return coords;
    }
  }

  console.log(`No location match for "${lowerLocation}", using hash-based coordinates`);
  let hash = 0;
  for (let i = 0; i < lowerLocation.length; i++) {
    hash = lowerLocation.charCodeAt(i) + ((hash << 5) - hash);
  }

  return {
    lat: 4.5 + (Math.abs(hash) % 1500) / 100,
    lng: 116 + (Math.abs(hash) % 1800) / 100
  };
}

function prepareDataForClustering(reports) {
  console.log('Input reports:', JSON.stringify(reports, null, 2));
  const data = reports
    .map((report, index) => {
      const quantity = parseFloat(report.quantity);
      if (isNaN(quantity) || quantity <= 0) {
        console.warn(`Skipping report ${index}: Invalid quantity ${report.quantity}`);
        return null;
      }

      let coords;
      const lat = parseFloat(report.latitude);
      const lng = parseFloat(report.longitude);
      if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0 && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        console.log(`Report ${index}: Using lat/lng (${lat}, ${lng})`);
        coords = { lat, lng };
      } else {
        console.log(`Report ${index}: Using location "${report.location}"`);
        coords = getCoordinatesFromLocation(report.location);
        console.log(`Generated coords for "${report.location}":`, coords);
      }

      if (isNaN(coords.lat) || isNaN(coords.lng)) {
        console.warn(`Skipping report ${index}: Invalid coordinates ${JSON.stringify(coords)}`);
        return null;
      }

      return [coords.lat, coords.lng, quantity];
    })
    .filter(point => point !== null);

  console.log('Prepared data unique coordinates:', [...new Set(data.map(p => `${p[0]},${p[1]}`))]);
  console.log('Prepared data:', JSON.stringify(data, null, 2));
  return data;
}

function performKMeansClustering(data, k = 3) {
  console.log('Clustering with k=', k, 'data points:', data.length);
  if (!data || data.length < 1) {
    console.warn('No valid data for clustering');
    return [{
      number: 0,
      center: { lat: 14.5833, lng: 120.9667 },
      averageQuantity: 0,
      points: [],
      indices: []
    }];
  }

  if (data.length === 1 || new Set(data.map(p => `${p[0]},${p[1]}`)).size === 1) {
    console.log('Single or identical data points detected, returning as cluster');
    const totalQuantity = data.reduce((sum, p) => sum + p[2], 0);
    return [{
      number: 0,
      center: { lat: data[0][0], lng: data[0][1] },
      averageQuantity: data.length > 0 ? totalQuantity / data.length : 0,
      points: data,
      indices: data.map((_, i) => i)
    }];
  }

  k = Math.min(k, data.length);

  const km = new kmeans({
    k: k,
    epochs: 100,
    distanceFunction: function euclidean(a, b) {
      return Math.sqrt(
        a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
      );
    }
  });

  try {
    km.cluster(data);

    if (!km.clusters || !km.centroids || km.clusters.length === 0) {
      console.warn('Clustering produced no valid clusters, falling back');
      const totalQuantity = data.reduce((sum, p) => sum + p[2], 0);
      return [{
        number: 0,
        center: { lat: data[0][0], lng: data[0][1] },
        averageQuantity: data.length > 0 ? totalQuantity / data.length : 0,
        points: data,
        indices: data.map((_, i) => i)
      }];
    }

    const clusters = km.clusters.map((points, i) => {
      const center = km.centroids[i];
      if (!center || isNaN(center[0]) || isNaN(center[1])) {
        console.warn(`Invalid centroid for cluster ${i}: ${JSON.stringify(center)}`);
        return null;
      }

      const totalQuantity = points.reduce((sum, point) => sum + point[2], 0);
      const avgQuantity = points.length > 0 ? totalQuantity / points.length : 0;

      const indices = points.map(p =>
        data.findIndex(d => d[0] === p[0] && d[1] === p[1] && d[2] === p[2])
      ).filter(idx => idx !== -1);

      return {
        number: i,
        center: { lat: center[0], lng: center[1] },
        averageQuantity: avgQuantity,
        points: points,
        indices: indices
      };
    }).filter(cluster => cluster !== null);

    console.log('Generated clusters:', JSON.stringify(clusters, null, 2));
    return clusters.length > 0 ? clusters : [{
      number: 0,
      center: { lat: 14.5833, lng: 120.9667 },
      averageQuantity: 0,
      points: [],
      indices: []
    }];
  } catch (error) {
    console.error('Clustering error:', error);
    const totalQuantity = data.reduce((sum, p) => sum + p[2], 0);
    return [{
      number: 0,
      center: { lat: 14.5833, lng: 120.9667 },
      averageQuantity: data.length > 0 ? totalQuantity / data.length : 0,
      points: data,
      indices: data.map((_, i) => i)
    }];
  }
}

module.exports = {
  prepareDataForClustering,
  performKMeansClustering,
  getCoordinatesFromLocation
};