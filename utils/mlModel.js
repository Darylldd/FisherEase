const tf = require('@tensorflow/tfjs');
const moment = require('moment');

class DataPreprocessor {
  constructor() {
    this.speciesMap = new Map();
    this.locationMap = new Map();
    this.methodMap = new Map();
    this.maxQuantity = 1;
  }

  preprocess(data) {
    // Filter and validate data
    const validData = data.filter(d => d.quantity > 0);
    if (validData.length < 3) {
      throw new Error("Need at least 3 records with quantity > 0");
    }

    // Create mappings for categorical data
    this._createMappings(validData);
    
    // Calculate max quantity with smoothing
    this.maxQuantity = Math.max(...validData.map(d => d.quantity)) * 1.5;

    // Prepare features and targets
    const features = validData.map(d => this._createFeatureVector(d));
    const targets = validData.map(d => this._normalizeQuantity(d.quantity));

    return { features, targets };
  }

  _createMappings(data) {
    // Create unique mappings for each categorical feature
    const unique = (arr) => [...new Set(arr)];
    
    unique(data.map(d => d.species)).forEach((s, i) => this.speciesMap.set(s, i));
    unique(data.map(d => d.location)).forEach((l, i) => this.locationMap.set(l, i));
    unique(data.map(d => d.method_of_fishing)).forEach((m, i) => this.methodMap.set(m, i));
  }

  _createFeatureVector(d) {
    const date = new Date(d.date);
    return [
      date.getHours() / 24,
      date.getDay() / 6,
      date.getMonth() / 11,
      this.speciesMap.get(d.species) / Math.max(1, this.speciesMap.size - 1),
      this.locationMap.get(d.location) / Math.max(1, this.locationMap.size - 1),
      this.methodMap.get(d.method_of_fishing) / Math.max(1, this.methodMap.size - 1),
      date.getDate() / 31
    ];
  }

  _normalizeQuantity(q) {
    // Smooth normalization that prevents zeros
    return 0.1 + 0.8 * (q / this.maxQuantity);
  }

  _denormalizeQuantity(normQ) {
    // Ensure minimum prediction of 1
    return Math.max(1, Math.round((normQ - 0.1) / 0.8 * this.maxQuantity));
  }
}

exports.trainAndPredict = async (data) => {
  try {
    const preprocessor = new DataPreprocessor();
    const { features, targets } = preprocessor.preprocess(data);

    // Create model with multiple safeguards
    const model = tf.sequential();
    model.add(tf.layers.dense({
      units: 16,
      activation: 'relu',
      inputShape: [features[0].length],
      kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
    }));
    model.add(tf.layers.dropout({ rate: 0.2 }));
    model.add(tf.layers.dense({
      units: 8,
      activation: 'relu',
      kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
    }));
    model.add(tf.layers.dense({
      units: 1,
      activation: 'sigmoid',
      kernelConstraint: tf.constraints.minMaxNorm({ minValue: 0.1, maxValue: 0.9 })
    }));

    model.compile({
      optimizer: tf.train.adam(0.005),
      loss: 'meanSquaredError',
      metrics: ['mae']
    });

    // Custom training with manual validation
    const xs = tf.tensor2d(features);
    const ys = tf.tensor2d(targets);
    
    await model.fit(xs, ys, {
      epochs: 100,
      batchSize: 4,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          if (epoch % 20 === 0) {
            console.log(`Epoch ${epoch}: loss=${logs.loss.toFixed(4)}`);
          }
        }
      },
      verbose: 0
    });

    // Generate predictions for next 3 days
    const predictions = [];
    const now = new Date();
    
    for (let i = 1; i <= 3; i++) {
      const predDate = new Date(now);
      predDate.setDate(now.getDate() + i);
      predDate.setHours(6, 0, 0, 0); // Set to 6 AM

      // Create input for each known combination
      for (const [species] of preprocessor.speciesMap) {
        for (const [location] of preprocessor.locationMap) {
          const mockReport = {
            date: predDate.toISOString(),
            species,
            location,
            method_of_fishing: data[0].method_of_fishing, // Use first method
            quantity: 0 // Will be predicted
          };

          const input = preprocessor._createFeatureVector(mockReport);
          const prediction = model.predict(tf.tensor2d([input]));
          const predValue = prediction.dataSync()[0];
          
          // Calculate dynamic confidence based on data support
          const dataSupport = data.filter(d => 
            d.species === species && d.location === location
          ).length;
          
          const confidence = Math.min(0.9, 0.3 + (dataSupport / data.length * 0.6)).toFixed(2);
          
          predictions.push({
            species,
            location,
            predicted_best_time: predDate.toISOString(),
            predicted_quantity: preprocessor._denormalizeQuantity(predValue),
            confidence,
            data_support: dataSupport // For debugging
          });
        }
      }
    }

    // Clean up
    tf.dispose([xs, ys, model]);

    // Sort by confidence then quantity
    return predictions.sort((a, b) => {
      if (b.confidence !== a.confidence) return b.confidence - a.confidence;
      return b.predicted_quantity - a.predicted_quantity;
    });

  } catch (error) {
    console.error("Prediction error:", error);
    return generateFallbackPredictions(data);
  }
};

function generateFallbackPredictions(data) {
  const predictions = [];
  const now = new Date();
  const species = [...new Set(data.map(d => d.species))] || ["Talaktok (Giant Trevally)"];
  const locations = [...new Set(data.map(d => d.location))] || ["Default Location"];

  for (let i = 1; i <= 3; i++) {
    for (const s of species) {
      for (const l of locations) {
        predictions.push({
          species: s,
          location: l,
          predicted_best_time: new Date(now.getTime() + i * 86400000).toISOString(),
          predicted_quantity: 5 + Math.floor(Math.random() * 6), // 5-10
          confidence: "0.50",
          is_fallback: true
        });
      }
    }
  }
  
  return predictions;
}