# Chapter 2. Objects in Python

After completing this chapter, we will understand:

- How to create classes and instantiate objects in Python
- How to add attributes and behaviors to Python objects
- How to organize classes into packages and modules
- How to suggest people don't clobber our data

## Creating Python classes

Define Class:

```python
class MyFirstClass:
    pass
```

The class name must follow standard Python variable naming rules:

- It must start with a letter or underscore
- It can only be comprised of letters, underscores, or numbers
- The Python style guide **PEP8** recommends that classes should be named using *CamelCase* notation

> Run the code and then drop to the interactive interpreter: `python -i first_class.py`

Instantiate an Object:

```python
a = MyFirstClass()
```

## Adding attributes

What do we have to do to assign an attribute to a given object? It turns out that *we don't have to do anything special in the class definition*. We can set arbitrary attributes on an instantiated object using the dot notation:

```python
class Point:
    pass

p1 = Point()
p2 = Point()

p1.x = 5
p1.y = 4

p2.x = 3
p1.y = 4
```

## Making it do something

The one difference between methods and normal functions is that all methods have one required argument. This argument is conventionally named `self`. The `self` argument to a method is simply a reference to the object that the method is being invoked on.



```python
class Point:
    def reset(self):
        self.x = 0
        self.y = 0

p = Point()
p.reset()
```

When we call the `p.reset()` method, we do not have to pass the `self` argument into it.

```python
p = Point()
Point.reset(p)
print(p.x, p.y)
```

However, the method really is just a function that happens to be on a class. Instead of calling the method on the object, we can invoke the function on the class, explicitly passing our object as the `self` argument.

## Initializing the object

Most object-oriented programming languages have the concept of a constructor, a special method that creates and initializes the object when it is created. **Python is a little different. It has a constructor and an initializer.** *The constructor function is rarely used unless you're doing something exotic.*

```python
class Point:
    def __init__(self, x=0, y=0):
        self.move(x, y)
```

The constructor function is called `__new__` as opposed to `__init__`, and accepts exactly one argument; the class that is being constructed (it is called before the object is constructed, so there is no `self` argument). It also has to return the newly created object. This has interesting possibilities when it comes to the complicated art of metaprogramming, but is not very useful in day-to-day programming. In practice, you will rarely, if ever, need to use `__new__` and `__init__` will be sufficient.

## Explaining yourself - `docstrings`

Docstrings are simply Python strings enclosed with apostrophe (`'`) or quote (`"`) characters. Often, docstrings are quite long and span multiple lines (the style guide suggests that the line length should not exceed 80 characters), which can be formatted as multi-line strings, enclosed in matching triple apostrophe (`'''`) or triple quote (`"""`) characters.

Try typing or loading (`python -i filename.py`) this file into the interactive interpreter. Then, enter `help(Point)` at the Python prompt. You should see nicely formatted documentation for the class.

## Modules and packages

**Modules** are simply Python files, nothing more. The single file in our small program is a module. The `import` statement is used for importing modules or specific classes or functions from modules.

```python
import database
db = database.Database()

import database
db = database.Database()

from database import Database as DB
db = DB()

from database import Database, Query

from database import *
```

**A package** is a collection of modules in a folder. The name of the package is the name of the folder. All we need to do to tell Python that a folder is a package is place a (normally empty) file in the folder named `__init__.py`.

### Absolute imports

Absolute imports specify the complete path to the module, function, or path we want to import. If we need access to the Product class inside the products module, we could use any of these syntaxes to do an absolute import:

```python
import ecommerce.products
product = ecommerce.products.Product()

from ecommerce.products import Product
product = Product()

from ecommerce import products
product = products.Product()
```

Packages can also be installed to the Python site packages folder, or the `PYTHONPATH` environment variable could be customized to dynamically tell Python what folders to search for packages and modules it is going to import.

### Relative imports

Relative imports are basically a way of saying find a class, function, or module as it is positioned relative to the current module.

```python
from .database import Database

from ..contact.email import send_mail
```

## Organizing module contents

All module-level code is executed immediately at the time it is imported. We should always put our startup code in a function (conventionally, called main) and only execute that function when we know we are running the module as a script, but not when our code is being imported from a different script.

```python
def main():
    '''creates a useful class and does something with it for our module.'''
    useful = UsefulClass()
    print(useful)

if __name__ == "__main__":
    main()
```

So, methods go in classes, which go in modules, which go in packages. Is that all there is to it? Actually, no. This is the typical order of things in a Python program, but it's not the only possible layout. Classes can be defined anywhere.

```python
def format_string(string, formatter=None):
    '''Format a string using the formatter object, which
    is expected to have a format() method that accepts
    a string.'''
    class DefaultFormatter:
        '''Format a string in title case.'''
        def format(self, string):
            return str(string).title()

    if not formatter:
        formatter = DefaultFormatter()

    return formatter.format(string)

hello_string = "hello world, how are you today?"
print(" input: " + hello_string)
print("output: " + format_string(hello_string))
```

Since it is created inside the scope of the function, this class cannot be accessed from anywhere outside of that function. Similarly, functions can be defined inside other functions as well; in general, any Python statement can be executed at any time. These inner classes and functions are occasionally useful for one-off items that don't require or deserve their own scope at the module level, or only make sense inside a single method.

## Who can access my data?

Most object-oriented programming languages have a concept of access control. This is related to abstraction. Some attributes and methods on an object are marked private, meaning only that object can access them. Others are marked protected, meaning only that class and any subclasses have access. The rest are public, meaning any other object is allowed to access them.

Python doesn't do this. Python doesn't really believe in enforcing laws that might someday get in your way. Instead, it provides unenforced guidelines and best practices. Technically, all methods and attributes on a class are publicly available. If we want to suggest that a method should not be used publicly, we can put a note in docstrings indicating that the method is meant for internal use only. By convention, we should also prefix an attribute or method with an underscore character, `_`.

There's another thing you can do to strongly suggest that outside objects don't access a property or method: prefix it with a double underscore, `__`. This will perform **name mangling** on the attribute in question. This basically means that the method can still be called by outside objects if they really want to do it, but it requires extra work and is a strong indicator that you demand that your attribute remains private. When we use a double underscore, the property is prefixed with `_<classname>`.
