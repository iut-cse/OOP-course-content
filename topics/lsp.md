# Liskov Substitution Principle
### Prerequisites
1. [Polymorphism](polymorphism)
2. [Inheritance](inheritance)
3. [Open Closed Principle](ocp)

## Problem
There is a Rectangle class which has height and width.
We can calculate the area of the Rectangle and can generate a string that represents a graphical form of the rectangle. 

```java
// Language: Java
class Rectangle {
    private int height;
    private int width;

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int area() {
        return height * width;
    }

    public String draw() {
        // The code does not cover all cases.
        // It has not been implemented properly to make it simple.
        String drawing = "";
        for (int c = 0; c < width; c++){
            drawing += "-";
        }
        for (int r = 1; r < height-1; r++){
            drawing += "\n";
            drawing += "|";
            for (int c = 1; c < width-1; c++){
                drawing += " ";
            }
            drawing += "|";
        }

        drawing += "\n";
        for (int c = 0; c < width; c++){
            drawing += "-";
        }

        return drawing;
    }
}
```

Now, our software requires a Square class for which we also need to calculate the area and draw it just like the Rectangle.  

* Task: Write the Square class.
* Constraint: Reuse the code of the Rectangle class

## A solution
Some students may inheritance as a solution to this problem.
The solution involves overriding the setters to keep both sides of the Square equal.

```java
// Language: Java
class Square extends Rectangle {
    @Override
    public void setHeight(int height) {
        super.setHeight(height);
        super.setWidth(height);
    }

    @Override
    public void setWidth(int width) {
        super.setWidth(width);
        super.setHeight(width);
    }
}
```

This Square class makes sense, it will pass the regular test cases.
Additionally, Square _is a_ Rectangle by geometric definition.
We have also created an is-a relation by inheriting.

Now, consider the following code that existed already.

```java
// Language: Java
void growDouble(Rectangle rectangle){
    rectangle.setHeight(rectangle.getHeight() * 2);
    rectangle.setWidth(rectangle.getWidth() * 2);
}
```

Due to inheritance, Square can be substitutable for Rectangle.
That is we can pass an object of Square in the `growDouble` method.
That means we can do the following.
```java
// Language: Java
Square square = new Square();
square.setHeight(4);
growDouble(square);
```
> Ask: what happens if this code is run?  
> Answer: the square is grown 4 times instead of 2.

So, the situation is like this: We cannot pass an object of subclass in a method where superclass was expected due to a problem in the run time.
Note that the problem is not in the compilation time.
The code does compile.
But it behaves unexpectedly when run.

We can solve it by changing the `growDouble` method like below:
```java
// Language: Java
void growDouble(Rectangle rectangle) {
    if (rectangle instanceof Square) {
        rectangle.setWidth(rectangle.getHeight() * 2);
    } else {
        rectangle.setHeight(rectangle.getHeight() * 2);
        rectangle.setWidth(rectangle.getWidth() * 2);
    }
}
```
> Ask: is there a problem with this solution?  
> Answer: it violates [OCP](ocp).

## A better solution
The problem is occurring due to the misuse of inheritance.
This case seems to be a good case for an inheritance, but it is not.
A solution would be using composition in place of inheritance.

```java
class Square {
    private Rectangle wrapped;

    public Square() {
        wrapped = new Rectangle();
    }

    public int getLength() {
        return wrapped.getHeight();
    }

    public void setLength(int length) {
        wrapped.setWidth(length);
        wrapped.setHeight(length);
    }

    public int area(){
        return wrapped.area();
    }

    public String draw() {
        return wrapped.draw();
    }
}
```
## Discussion
Note that the two solutions are about the same with the following differences
1. All occurrences of `super` is replaced with `wrapped` in composition
2. Con: The composition solution had to explicitly call the wrapped methods for `area` and `draw`.
3. Pro: Now there is no separate height and width of Square. It did not make sense in the first place.
4. Pro & Con: Now we cannot pass square in place of rectangle. This is a con because we _cannot_ do it when it is expected. This is a pro because it is not applicable in all cases, so better get rid of it.

The problem that occured is a violation of Liskov Substitution Principle (LSP, L of SOLID). The formal definition of LSP is:

> Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it.

## Practice problems