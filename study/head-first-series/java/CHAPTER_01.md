# Chapter 1. Dive in A Quick Dip: Breaking the Surface

> Write once, Run anywhere.

## The Way Java Works

You'll type a source code file, compile it using the `javac` compiler, then run the compiled **bytecode** on a Java virtual machine.

## A very brief history of Java

1. Java 1.0.2
   1. 250 classes
   2. Slow, Lots of bugs
   3. Applets
2. Java 1.1
   1. 500 classes
   2. A little faster
   3. Friendlier, becoming very popular
3. Java 2 (versions 1.2 ~ 1.4)
   1. 2,300 classes
   2. Much faster and powerful
   3. J2ME, J2SE, J2EE
4. Java 5 Tiger (versions 1.5 and up)
   1. 3,500 classes
   2. More power, easier to develop with

## Code structure in Java

> Put a class in a source file.
> Put methods in a class.
> Put statements in a method.

A source code file (with the `.java` extension) holds one class definition. The class represents a piece of your program. A class has one or more methods. Method code is basically a set of statements.

Every Java application has to have at least one **class**, and at least one **main** method (not one main per class, just one main per application). The JVM runs everything between the curly braces(`{ }`) of your main method.

## Writing a class with a main

In Java, everything goes in a **class**. You’ll type your source code file (with a `.java` extension), then compile it into a new class file (with a `.class` extension). When you run your program, you’re really running a **class**.

Running a program means telling the **Java Virtual Machine (JVM)** to:

> "Load the MyFirstApp class, then start executing its main() method. Keep running ‘til all the code in main is finished."

The **main()** method is where your program starts running.

1. **Save** `MyFirstApp.java`
2. **Compile** `javac MyFirstApp.java`
3. **Run** `java MyFirstApp`

```java
// MyFirstApp.java
public class MyFirstApp {
  public static void main(String[] args) {
    System.out.println("I Rule!!");
    System.out.println("The World");
  }
}
```

**Java** is

- Compiled Language: Performance
- Typed Language: Safety Guard
- Dynamic binding
