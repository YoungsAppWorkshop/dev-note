# Learning Design Patterns with Unity

- [GitHub Repo](https://github.com/PacktPublishing/C-Design-Patterns-with-Unity-First-Edition)

## Ch 01. Priming the System

Architectural patterns deal with problems affecting the overall structure you’re building, while design patterns focus on the individual LEGO blocks that make up the final structure.

A codebase that is flexible, maintainable, and reusable is the product of good software design.

### What are design patterns?

Design patterns are systems, and systems are designed to solve specific problems.

There are three categories that all original design patterns fall into – *Creational*, *Behavioral*, and *Structural*.

- First, knowing what problems each pattern category addresses is super important because it narrows the field you have to search.
- Second, reading the first few pages of each chapter in the applicable category will show you pretty quickly if you’re in the right place.
- From there, the more you use design patterns, the more you’ll get a feel for the problems and effective solutions out in the wild.

#### Creational patterns

Creational patterns deal with creating objects that are uniquely suited to a given situation or use case. More specifically, these patterns deal with how to hide object and class creation logic, so the calling instance doesn’t get bogged down with the details.

A good creational pattern black-boxes the creation logic and simply hands back a utility tool to control what, who, how, and when an object or class is created.

- **Singleton**: Ensure a class has only one instance and provide a global point of access to it – commonly used for features like logging or database connections that need to be coordinated and shared through the entire application.
- **Prototype**: Specify the kinds of objects to create using a prototypical instance and create new objects from the “skeleton” of an existing object.
- **Factory Method**: Define an interface for creating a single object, but delegate the instantiation logic to subclasses that decide which class to instantiate.
- **Abstract Factory**: Define an interface for creating families of related or dependent objects, but let subclasses decide which class to instantiate.
- **Builder**: Allows complex objects to be built step by step, separating an object’s construction from its representation – commonly used when creating different versions of an object.
- **Object Pool**: Avoid expensive acquisition and release of resources by recycling objects that are no longer in use – commonly used when resources are expensive, plentiful, or both.

#### Behavioral patterns

Behavioral patterns are concerned with how classes and objects communicate with each other. More specifically, these patterns concentrate on the different responsibilities and connections objects have with each other when they’re working together.

- **Command**: Encapsulate a request as an object, thereby allowing for the parameterization of clients with different requests and the queuing or logging of requests.
- **Observer**: Define a one-to-many dependency between objects where a state change in one object results in all its dependents being notified and updated automatically.
- **State**: Allow an object to alter its behavior when its internal state changes. The object will appear to change its class – commonly used when object behavior drastically changes depending on its internal state.
- **Visitor**: Define a new class operation without changing the underlying object.
- **Strategy**: Define a family of interchangeable behaviors and defer setting the behavior until runtime.
- **Type Object**: Allow the flexible creation of new “classes” from a single class, each instance of which will represent a different type of object.
- **Memento**: Capture and externalize the internal state of an object so it can be restored or reverted to this state later – without breaking encapsulation.

#### Structural patterns

Structural patterns focus on composition, or how classes and objects are composed into larger, more complex structures.

- **Decorator**: Attach additional responsibilities to an object dynamically keeping the same interface.
- **Adapter**: Convert the interface of a class into another interface clients expect. An adapter lets classes work together that could not otherwise because of incompatible interfaces.
- **Façade**: Provide a unified interface to a set of interfaces in a subsystem. Facade defines a high-level interface that makes the subsystem easier to use.
- **Flyweight**: Shares common data between similar objects to limit memory usage and increase performance.
- **Service Locator**: Provide a global access point for services without coupling client code to the concrete service classes.
