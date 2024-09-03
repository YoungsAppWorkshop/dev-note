import { QuackBehavior } from './quack-behavior';

export class MuteQuack implements QuackBehavior {
  public quack = () => {
    console.log('<< Silence >>');
  };
}
