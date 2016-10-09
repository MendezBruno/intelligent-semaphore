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

import ar.org.neuroph.core.input.WeightedSum;
import ar.org.neuroph.nnet.comp.layer.CompetitiveLayer;
import ar.org.neuroph.util.NeuronProperties;
import ar.org.neuroph.core.Layer;
import ar.org.neuroph.core.NeuralNetwork;
import ar.org.neuroph.nnet.comp.neuron.CompetitiveNeuron;
import ar.org.neuroph.nnet.learning.CompetitiveLearning;
import ar.org.neuroph.util.ConnectionFactory;
import ar.org.neuroph.util.LayerFactory;
import ar.org.neuroph.util.NeuralNetworkFactory;
import ar.org.neuroph.util.NeuralNetworkType;
import ar.org.neuroph.util.TransferFunctionType;

/**
 * Two layer neural network with competitive learning rule.
 * 
 * @author Zoran Sevarac <sevarac@gmail.com>
 */
public class CompetitiveNetwork extends NeuralNetwork {
	
	/**
	 * The class fingerprint that is set to indicate serialization
	 * compatibility with a previous version of the class.
	 */	
	private static final long serialVersionUID = 1L;

	/**
	 * Creates new competitive network with specified neuron number
	 * 
	 * @param inputNeuronsCount
	 *            number of input neurons
         * @param outputNeuronsCount
         *            number of output neurons
	 */
	public CompetitiveNetwork(int inputNeuronsCount, int outputNeuronsCount) {
		this.createNetwork(inputNeuronsCount, outputNeuronsCount);
	}

	/**
	 * Creates Competitive network architecture
	 * 
	 * @param inputNeuronsCount
	 *            input neurons number
         * @param outputNeuronsCount
         *            output neurons number
	 * @param neuronProperties
	 *            neuron properties
	 */
	private void createNetwork(int inputNeuronsCount, int outputNeuronsCount) {
		// set network type
		this.setNetworkType(NeuralNetworkType.COMPETITIVE);

		// createLayer input layer
		Layer inputLayer = LayerFactory.createLayer(inputNeuronsCount, new NeuronProperties());
		this.addLayer(inputLayer);

		// createLayer properties for neurons in output layer
		NeuronProperties neuronProperties = new NeuronProperties();
		neuronProperties.setProperty("neuronType", CompetitiveNeuron.class);
		neuronProperties.setProperty("inputFunction",	WeightedSum.class);
		neuronProperties.setProperty("transferFunction",TransferFunctionType.RAMP);

		// createLayer full connectivity in competitive layer
		CompetitiveLayer competitiveLayer = new CompetitiveLayer(outputNeuronsCount, neuronProperties);

		// add competitive layer to network
		this.addLayer(competitiveLayer);

		double competitiveWeight = -(1 / (double) outputNeuronsCount);
		// createLayer full connectivity within competitive layer
		ConnectionFactory.fullConnect(competitiveLayer, competitiveWeight, 1);

		// createLayer full connectivity from input to competitive layer
		ConnectionFactory.fullConnect(inputLayer, competitiveLayer);

		// set input and output cells for this network
		NeuralNetworkFactory.setDefaultIO(this);

		this.setLearningRule(new CompetitiveLearning());
	}

}
