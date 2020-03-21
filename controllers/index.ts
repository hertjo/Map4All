import { RegulationController } from './regulation';
import { EnactmentController } from './enactment';
import { RegulationClass } from '../models/regulationClass';

export const CONTROLLERS = [
    new RegulationController(),
    new EnactmentController(),
    new RegulationClass()
];