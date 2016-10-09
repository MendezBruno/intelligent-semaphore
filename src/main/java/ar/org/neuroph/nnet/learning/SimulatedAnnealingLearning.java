package ar.org.neuroph.nnet.learning;

import java.util.Iterator;

import ar.org.neuroph.core.NeuralNetwork;
import ar.org.neuroph.core.data.DataSet;
import ar.org.neuroph.core.data.DataSetRow;
import ar.org.neuroph.core.learning.SupervisedLearning;
import ar.org.neuroph.util.NeuralNetworkCODEC;

/**
 * This class implements a simulated annealing learning rule for supervised
 * neural networks. It is based on the generic SimulatedAnnealing class. It is
 * used in the same manner as any other training class that implements the
 * SupervisedLearning interface.
 * <p/>
 * Simulated annealing is a common training method. It is often used in
 * conjunction with a propagation training method. Simulated annealing can be
 * very good when propagation training has reached a local minimum.
 * <p/>
 * The name and inspiration come from annealing in metallurgy, a technique
 * involving heating and controlled cooling of a material to increase the size
 * of its crystals and reduce their defects. The heat causes the atoms to become
 * unstuck from their initial positions (a local minimum of the internal energy)
 * and wander randomly through states of higher energy; the slow cooling gives
 * them more chances of finding configurations with lower internal energy than
 * the initial one.
 *
 * @author Jeff Heaton (http://www.jeffheaton.com)
 */
public class SimulatedAnnealingLearning extends SupervisedLearning {

    /**
     * The serial id.
     */
    private static final long serialVersionUID = 1L;

    /**
     * The starting temperature.
     */
    private double startTemperature;

    /**
     * The ending temperature.
     */
    private double stopTemperature;

    /**
     * The number of cycles that will be used.
     */
    private int cycles;

    /**
     * The current temperature.
     */
    protected double temperature;

    /**
     * Current weights from the neural network.
     */
    private double[] weights;

    /**
     * Best weights so far.
     */
    private double[] bestWeights;

    /**
     * Construct a simulated annleaing trainer for a feedforward neural network.
     *
     * @param network   The neural network to be trained.
     * @param startTemp The starting temperature.
     * @param stopTemp  The ending temperature.
     * @param cycles    The number of cycles in a training iteration.
     */
    public SimulatedAnnealingLearning(final NeuralNetwork network,
                                      final double startTemp, final double stopTemp, final int cycles) {
        setNeuralNetwork( network );
        this.temperature = startTemp;
        this.startTemperature = startTemp;
        this.stopTemperature = stopTemp;
        this.cycles = cycles;

        this.weights = new double[NeuralNetworkCODEC
                .determineArraySize(network)];
        this.bestWeights = new double[NeuralNetworkCODEC
                .determineArraySize(network)];

        NeuralNetworkCODEC.network2array(network, this.weights);
        NeuralNetworkCODEC.network2array(network, this.bestWeights);
    }

    public SimulatedAnnealingLearning(final NeuralNetwork network) {
        this(network, 10, 2, 1000);
    }

    /**
     * Get the best network from the training.
     *
     * @return The best network.
     */
    public NeuralNetwork getNetwork() {
        return getNeuralNetwork();
    }

    /**
     * Randomize the weights and thresholds. This function does most of the work
     * of the class. Each call to this class will randomize the data according
     * to the current temperature. The higher the temperature the more
     * randomness.
     * @param randomChance 
     */
    public void randomize(double randomChance ) {

        for (int i = 0; i < this.weights.length; i++)
          if (Math.random() < randomChance)
          {
            double add = 0.5 - (Math.random());
            add /= this.startTemperature;
            add *= this.temperature;
            this.weights[i] = this.weights[i] + add;
          }

        NeuralNetworkCODEC.array2network(this.weights, getNetwork());
    }

    /**
     * Used internally to calculate the error for a training set.
     *
     * @param trainingSet The training set to calculate for.
     * @return The error value.
     */
    private double determineError(DataSet trainingSet) {
        double result = 0d;

        Iterator<DataSetRow> iterator = trainingSet.iterator();
        while (iterator.hasNext() && !isStopped()) {
            DataSetRow trainingSetRow = iterator.next();
            double[] input = trainingSetRow.getInput();
            getNetwork().setInput(input);
            getNetwork().calculate();
            double[] output = getNetwork().getOutput();
            double[] desiredOutput = trainingSetRow
                    .getDesiredOutput();

            double[] patternError = getErrorFunction().calculatePatternError(desiredOutput, output);
            double sqrErrorSum = 0;
            for (double error : patternError) {
                sqrErrorSum += (error * error);
            }
            result += sqrErrorSum / (2 * patternError.length);

        }

        return result;
    }

    /**
     * Perform one simulated annealing epoch.
     */
    @Override
    public void doLearningEpoch(DataSet trainingSet)
    {
      doLearningEpoch( trainingSet, 0.5 );
    }

    public void doLearningEpoch(DataSet trainingSet, double randomChance)
    {
        System.arraycopy(this.weights, 0, this.bestWeights, 0,
                this.weights.length);

        double bestError = determineError(trainingSet);

        this.temperature = this.startTemperature;

        for (int i = 0; i < this.cycles; i++) {

            randomize( randomChance );
            double currentError = determineError(trainingSet);

            if (currentError < bestError) {
                System.arraycopy(this.weights, 0, this.bestWeights, 0,
                        this.weights.length);
                bestError = currentError;
            } else
                System.arraycopy(this.bestWeights, 0, this.weights, 0,
                        this.weights.length);

            NeuralNetworkCODEC.array2network(this.bestWeights, getNetwork());

            final double ratio = Math.exp(Math.log(this.stopTemperature
                    / this.startTemperature)
                    / (this.cycles - 1));
            this.temperature *= ratio;
        }

        // the following line is probably wrong (when is reset() called?), but the result might not be used for anything
        this.previousEpochError = getErrorFunction().getTotalError();

        // moved stopping condition to separate method hasReachedStopCondition()
        // so it can be overriden / customized in subclasses
        if (hasReachedStopCondition()) {
            stopLearning();
        }
    }


    /**
     * Not used.
     */
    @Override
    protected void updateNetworkWeights(double[] patternError) {

    }

}
