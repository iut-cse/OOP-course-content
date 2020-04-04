# Generics
## Problem
The code below implements a very simple stack. It can only store integer data type. Can you change it so that it can store any data types? For example, String, Animal and any other types?

```java
// Language: Java
public class SimpleStack {
    private int[] container;
    private int topIndex;
    
    public SimpleStack(int size) {
        container = new int[size];
    }

    public void push(int item) {
        topIndex++;
        container[topIndex] = item;
    }

    public int pop() {
        int item = container[topIndex--];
        return item;
    }
}
```
A sample unit test.
```java
// Language: Java, framework: JUnit 5
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class SimpleStackTest {
    @Test
    void simpleStackDemoWithInt() {
        SimpleStack stack = new SimpleStack(10);
        stack.push(5);
        int item = stack.pop();
        Assertions.assertEquals(5, item);
    }
}
```

## A solutions
This is likely that some students will come up with the solution below.
```java
// Language: java, framework: JUnit 5
public class SimpleStack {
    private Object[] container;
    private int topIndex;

    public SimpleStack(int size) {
        container = new Object[size];
    }

    public void push(Object item) {
        container[++topIndex] = item;
    }

    public Object pop() {
        return container[topIndex--];
    }
}
```
**Tests**
```java
// Language: java, framework: JUnit 5
public class SimpleStackTest {
    @Test
    void simpleStackDemoWithInt() {
        SimpleStack stack = new SimpleStack(10);
        stack.push(5);
        int item = (int) stack.pop();
        Assertions.assertEquals(5, item);
    }

    @Test
    void simpleStackDemoWithString() {
        SimpleStack stack = new SimpleStack(10);
        stack.push("alpha");
        String item = (String) stack.pop();
        Assertions.assertEquals("ALPHA", item.toUpperCase());
    }

    @Test
    void simpleStackDemo_DoingItWrong() {
        // This test will fail
        SimpleStack stack = new SimpleStack(10);
        stack.push(55);
        String item = (String) stack.pop(); // This line will through error in runtime
        Assertions.assertEquals("ALPHA", item.toUpperCase());
    }
}
```

The `Object` based solution is good.
The `SimpleStack` now support any data types.
However, there is one limitation with the solution above.
There is not compile time type checking.
There is possibility of runtime error as demonstrated in the case `simpleStackDemo_DoingItWrong` above.
Simply speaking, you cannot create a stack of a specific type of object.

## A better solution
This problem can be solved by a feature known as generics.
Popular languages like Java, C#, TypeScript, C++ have generics support.

```java
// Language: Java
public class SimpleStack<TItem> {
    private Object[] container;
    private int topIndex;

    public SimpleStack(int size) {
        container = new Object[size];
    }

    public void push(TItem item) {
        container[++topIndex] = item;
    }

    public TItem pop() {
        return (TItem)container[topIndex--];
    }
}
```
```java
// Language: Java, Framework: JUnit 5
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class SimpleStackTest {
    @Test
    void simpleStackDemoWithInt() {
        SimpleStack<Integer> stack = new SimpleStack<>(10);
        stack.push(5);
        int item = stack.pop();
        Assertions.assertEquals(5, item);
    }

    @Test
    void simpleStackDemoWithString() {
        SimpleStack<String> stack = new SimpleStack<>(10);
        stack.push("alpha");
        String item = stack.pop();
        Assertions.assertEquals("ALPHA", item.toUpperCase());
    }

    @Test
    void simpleStackDemo_DoingItWrong() {
        // This test will fail
        SimpleStack<String> stack = new SimpleStack<>(10);
        //stack.push(55); // Now this will not compile!
        //String item = (String) stack.pop();
        //Assertions.assertEquals("ALPHA", item.toUpperCase());
    }
}
```
## Discussion
The `SimpleStack` class is now implemented with generics.
Notice that the case `simpleStackDemo_DoingItWrong` now throws compilation error.
The type castings in the other test methods are no longer required.  

The `TType` in the `SimpleStack` class is called _Generic Argument_.  

### Notes
1. Generics is not applicable for dynamic languages because it is a compile time feature.
2. Generics is supported by most of the mordern statically typed OO languages, including C#, Java, TypeScript and C++.
3. Implimantation of generics vary a little from one language to another, however, the purpose and concept is the same.
   1. In Java language, it is not possible to get the generic arguments in the runtime. Therefore some runtime processing is not possible with Java Generics
   2. TypeScript is transpiled to JavaScript, which is a dynamic language. Therefore TypeScript generics is also not available in the runtime.
   3. C# has a rich generics implementation with runtime support.
   4. C++ has a feature called _Template_ which implements generic in a rather dynamic way.

## Practice problems
TODO: add some practice problems.