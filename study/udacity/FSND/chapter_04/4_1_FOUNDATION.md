# Lesson 4-1. Foundation

## Python Decorators Pattern

```python
from functools import wraps

# Let's add a simple decorator to inject a greeting
def add_greeting(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        print("Hello!")
        return f(*args, **kwargs)
    return wrapper

@add_greeting
def print_name(name):
    print(name)


print_name("sandy")
```

```python
# Let's add some complexity in the form of a paramater
def add_greeting(greeting=''):
    def add_greeting_decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            print(greeting)
            return f(*args, **kwargs)
        return wrapper
    return add_greeting_decorator

@add_greeting("what's up!")
def print_name(name):
    print(name)


print_name("kathy")
```

```python
# We can also pass information back to the wrapped method
def add_greeting(greeting=''):
    def add_greeting_decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            print(greeting)
            return f(greeting, *args, **kwargs)
        return wrapper
    return add_greeting_decorator

@add_greeting("Yo!")
def print_name(greeting, name):
    print(greeting)
    print(name)


print_name("Abe")
```
