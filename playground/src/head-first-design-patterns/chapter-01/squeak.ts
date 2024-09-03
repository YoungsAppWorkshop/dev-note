import { QuackBehavior } from './quack-behavior';

export class Squeack implements QuackBehavior {
  public quack = () => {
    console.log('Squeack!!');
  };
}
