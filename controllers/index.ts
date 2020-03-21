import { RegulationController } from './regulation';
import { EnactmentController } from './enactment';
import { RegulationClassController } from './regulationClass';

export const CONTROLLERS = [
    new RegulationController(),
    new EnactmentController(),
    new RegulationClassController()
];