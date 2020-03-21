import { RegulationController } from './regulation';
import { EnactmentController } from './enactment';

export const CONTROLLERS = [
    new RegulationController(),
    new EnactmentController()
];