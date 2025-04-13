const tf = require("@tensorflow/tfjs");
const moment = require("moment");

exports.trainAndPredict = async (data) => {
    let predictions = [];

    if (data.length < 2) {
        return predictions; // Not enough data to train the model
    }

    // Convert dates to numerical format (timestamps)
    let dates = data.map(d => new Date(d.date).getTime());
    let quantities = data.map(d => d.quantity);

    // Normalize data (Min-Max Scaling)
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    const minQuantity = Math.min(...quantities);
    const maxQuantity = Math.max(...quantities);

    let normalizedDates = dates.map(d => (d - minDate) / (maxDate - minDate));
    let normalizedQuantities = quantities.map(q => (q - minQuantity) / (maxQuantity - minQuantity));

    // Convert to TensorFlow tensors
    const xs = tf.tensor2d(normalizedDates, [normalizedDates.length, 1]);
    const ys = tf.tensor2d(normalizedQuantities, [normalizedQuantities.length, 1]);

    // Define a simple neural network model
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 10, inputShape: [1], activation: "relu" }));
    model.add(tf.layers.dense({ units: 10, activation: "relu" }));
    model.add(tf.layers.dense({ units: 1 })); // Output layer

    // Compile the model
    model.compile({ optimizer: "adam", loss: "meanSquaredError" });

    // Train the model
    await model.fit(xs, ys, { epochs: 100 });

    // Predict future catch times (e.g., next 7 days)
    for (let i = 1; i <= 7; i++) {
        let futureDate = moment().add(i, "days").valueOf();
        let normalizedFutureDate = (futureDate - minDate) / (maxDate - minDate);

        // Predict and de-normalize
        let tensorPrediction = model.predict(tf.tensor2d([normalizedFutureDate], [1, 1]));
        let predictedQuantity = tensorPrediction.dataSync()[0] * (maxQuantity - minQuantity) + minQuantity;

        predictions.push({
            species: data[0].species, // Assuming single species prediction
            predicted_best_time: moment(futureDate).format("YYYY-MM-DD HH:mm:ss"),
            predicted_quantity: Math.max(0, predictedQuantity.toFixed(2)), // Ensure non-negative
            confidence: (Math.random() * (0.95 - 0.7) + 0.7).toFixed(2) // Placeholder confidence score
        });
    }

    return predictions;
};
 