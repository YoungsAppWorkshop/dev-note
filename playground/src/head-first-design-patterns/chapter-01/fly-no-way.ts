import { FlyBehavior } from './fly-behavior';

export class FlyNoWay implements FlyBehavior {
  public fly = () => {
    console.log('I cannot fly.');
  };
}
