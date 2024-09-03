import { FlyBehavior } from './fly-behavior';
import { QuackBehavior } from './quack-behavior';

export abstract class Duck {
  flybehavior: FlyBehavior;
  quackBehavior: QuackBehavior;

  constructor(f: FlyBehavior, q: QuackBehavior) {
    this.flybehavior = f;
    this.quackBehavior = q;
  }

  public abstract display: () => void;

  public performFly = () => {
    this.flybehavior.fly();
  };

  public performQuack = () => {
    this.quackBehavior.quack();
  };

  public setFlyBehavior = (f: FlyBehavior) => {
    this.flybehavior = f;
  };

  public setQuackBehavior = (q: QuackBehavior) => {
    this.quackBehavior = q;
  };

  public swim = () => {
    console.log('All ducks float, even decoys!');
  };
}
