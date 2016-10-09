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

package ar.org.neuroph.util;

import ar.org.neuroph.core.transfer.Gaussian;
import ar.org.neuroph.core.transfer.Linear;
import ar.org.neuroph.core.transfer.Log;
import ar.org.neuroph.core.transfer.Ramp;
import ar.org.neuroph.core.transfer.Sgn;
import ar.org.neuroph.core.transfer.Sigmoid;
import ar.org.neuroph.core.transfer.Sin;
import ar.org.neuroph.core.transfer.Step;
import ar.org.neuroph.core.transfer.Tanh;
import ar.org.neuroph.core.transfer.Trapezoid;

/**
 * Contains transfer functions types and labels.
 */
public enum TransferFunctionType {
	LINEAR("Linear"),
	RAMP("Ramp"),
	STEP("Step"),
	SIGMOID("Sigmoid"),
	TANH("Tanh"),
	GAUSSIAN("Gaussian"),
	TRAPEZOID("Trapezoid"),
	SGN("Sgn"), 
        SIN("Sin"), 
        LOG("Log");

	private String typeLabel;
	
	private TransferFunctionType(String typeLabel) {
		this.typeLabel = typeLabel;
	}
	
	public String getTypeLabel() {
		return typeLabel;
	}

        public Class getTypeClass() {
            switch (this) {
                case LINEAR:
			return Linear.class;
		case STEP:
			return Step.class;
		case RAMP:
			return Ramp.class;
		case SIGMOID:
			return Sigmoid.class;
		case TANH:
			return Tanh.class;
		case TRAPEZOID:
			return Trapezoid.class;
		case GAUSSIAN:
			return Gaussian.class;
		case SGN:
			return Sgn.class; 
		case SIN:
			return Sin.class;
		case LOG:
			return Log.class;                     
		} // switch

            return null;

            }

        }

