/**
 * Copyright 2010 Neuroph Project http://neuroph.sourceforge.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package ar.org.neuroph.nnet;


import java.util.ArrayList;
import java.util.List;

import ar.org.neuroph.core.Layer;
import ar.org.neuroph.core.NeuralNetwork;
import ar.org.neuroph.core.input.WeightedSum;
import ar.org.neuroph.core.transfer.Linear;
import ar.org.neuroph.nnet.comp.neuron.BiasNeuron;
import ar.org.neuroph.nnet.comp.neuron.InputNeuron;
import ar.org.neuroph.nnet.learning.BackPropagation;
import ar.org.neuroph.nnet.learning.MomentumBackpropagation;
import ar.org.neuroph.util.ConnectionFactory;
import ar.org.neuroph.util.LayerFactory;
import ar.org.neuroph.util.NeuralNetworkFactory;
import ar.org.neuroph.util.NeuralNetworkType;
import ar.org.neuroph.util.NeuronProperties;
import ar.org.neuroph.util.TransferFunctionType;
import ar.org.neuroph.util.random.RangeRandomizer;

/**
 * Multi Layer Perceptron neural network with Back propagation learning algorithm.
 *
 * @author Zoran Sevarac <sevarac@gmail.com>
 * @see BackPropagation
 * @see MomentumBackpropagation
 */
public class MultiLayerPerceptron extends NeuralNetwork<BackPropagation> {

    /**
     * The class fingerprint that is set to indicate serialization
     * compatibility with a previous version of the class.
     */
    private static final long serialVersionUID = 2L;

    /**
     * Creates new MultiLayerPerceptron with specified number of neurons in layers
     *
     * @param neuronsInLayers collection of neuron number in layers
     */
    public MultiLayerPerceptron(List<Integer> neuronsInLayers) {
        // init neuron settings
        NeuronProperties neuronProperties = new NeuronProperties();
        neuronProperties.setProperty("useBias", true);
        neuronProperties.setProperty("transferFunction", TransferFunctionType.SIGMOID);

        this.createNetwork(neuronsInLayers, neuronProperties);
    }

    public MultiLayerPerceptron(int... neuronsInLayers) {
        // init neuron settings
        NeuronProperties neuronProperties = new NeuronProperties();
        neuronProperties.setProperty("useBias", true);
        neuronProperties.setProperty("transferFunction", TransferFunctionType.SIGMOID);
        neuronProperties.setProperty("inputFunction", WeightedSum.class);

        List<Integer> neuronsInLayersVector = new ArrayList<>();
        for (int i = 0; i < neuronsInLayers.length; i++) {
            neuronsInLayersVector.add(Integer.valueOf(neuronsInLayers[i]));
        }

        this.createNetwork(neuronsInLayersVector, neuronProperties);
    }

    public MultiLayerPerceptron(TransferFunctionType transferFunctionType, int... neuronsInLayers) {
        // init neuron settings
        NeuronProperties neuronProperties = new NeuronProperties();
        neuronProperties.setProperty("useBias", true);
        neuronProperties.setProperty("transferFunction", transferFunctionType);
        neuronProperties.setProperty("inputFunction", WeightedSum.class);


        List<Integer> neuronsInLayersVector = new ArrayList<>();
        for (int i = 0; i < neuronsInLayers.length; i++) {
            neuronsInLayersVector.add(Integer.valueOf(neuronsInLayers[i]));
        }

        this.createNetwork(neuronsInLayersVector, neuronProperties);
    }

    public MultiLayerPerceptron(List<Integer> neuronsInLayers, TransferFunctionType transferFunctionType) {
        // init neuron settings
        NeuronProperties neuronProperties = new NeuronProperties();
        neuronProperties.setProperty("useBias", true);
        neuronProperties.setProperty("transferFunction", transferFunctionType);

        this.createNetwork(neuronsInLayers, neuronProperties);
    }

    /**
     * Creates new MultiLayerPerceptron net with specified number neurons in
     * getLayersIterator
     *
     * @param neuronsInLayers  collection of neuron numbers in layers
     * @param neuronProperties neuron properties
     */
    public MultiLayerPerceptron(List<Integer> neuronsInLayers, NeuronProperties neuronProperties) {
        this.createNetwork(neuronsInLayers, neuronProperties);
    }

    /**
     * Creates MultiLayerPerceptron Network architecture - fully connected
     * feed forward with specified number of neurons in each layer
     *
     * @param neuronsInLayers  collection of neuron numbers in getLayersIterator
     * @param neuronProperties neuron properties
     */
    private void createNetwork(List<Integer> neuronsInLayers, NeuronProperties neuronProperties) {

        // set network type
        this.setNetworkType(NeuralNetworkType.MULTI_LAYER_PERCEPTRON);

        // create input layer
        NeuronProperties inputNeuronProperties = new NeuronProperties(InputNeuron.class, Linear.class);
        Layer layer = LayerFactory.createLayer(neuronsInLayers.get(0), inputNeuronProperties);

        boolean useBias = true; // use bias neurons by default
        if (neuronProperties.hasProperty("useBias")) {
            useBias = (Boolean) neuronProperties.getProperty("useBias");
        }

        if (useBias) {
            layer.addNeuron(new BiasNeuron());
        }

        this.addLayer(layer);

        // create layers
        Layer prevLayer = layer;

        //for(Integer neuronsNum : neuronsInLayers)
        for (int layerIdx = 1; layerIdx < neuronsInLayers.size(); layerIdx++) {
            Integer neuronsNum = neuronsInLayers.get(layerIdx);
            // createLayer layer
            layer = LayerFactory.createLayer(neuronsNum, neuronProperties);

            if (useBias && (layerIdx < (neuronsInLayers.size() - 1))) {
                layer.addNeuron(new BiasNeuron());
            }

            // add created layer to network
            this.addLayer(layer);
            // createLayer full connectivity between previous and this layer
            if (prevLayer != null) {
                ConnectionFactory.fullConnect(prevLayer, layer);
            }

            prevLayer = layer;
        }

        // set input and output cells for network
        NeuralNetworkFactory.setDefaultIO(this);

        // set learnng rule
//        this.setLearningRule(new BackPropagation());
        this.setLearningRule(new MomentumBackpropagation());
        // this.setLearningRule(new DynamicBackPropagation());

        this.randomizeWeights(new RangeRandomizer(-0.7, 0.7));

    }

    public void connectInputsToOutputs() {
        // connect first and last layer
        ConnectionFactory.fullConnect(getLayerAt(0), getLayerAt(getLayersCount() - 1), false);
    }

}